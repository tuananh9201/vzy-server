const fs = require('fs')
var path = require('path');

import { createSSRApp, } from 'vue';
import { renderToString } from 'vue/server-renderer'
import randomString from "randomstring"

import { preHTML, postHTML, headerVue, heroVue, cardsVue, footerVue } from '../../../modules/vueComponents'
import config, { isDev } from '../../../../config'
import { Readable } from 'stream';
import AWS from 'aws-sdk'
import util from "util";
import vzyMenu from '../../../modules/vueComponents/vue files/vzyMenu';

// Set the region 
AWS.config.update({
  region: 'us-east-1',
});
// Create S3 service object
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
// const cloudfront = new AWS.CloudFront({apiVersion:'2020-05-31'});

export const genHTML = async (data) => {
  try {
    let { settings, design, pages, pageKeys } = data;
    let HTML_pages = []
    for (let x = 0; x < pages.length; x++) {
      const page = pages[x];
      let { components, pageSettings } = page
      // components = components.map((d) => ({ component: d }))

      // since every page starts with a header and ends with a footer, copy header into footer to provide headerData;
      components[components.length - 1].headerData = components[0];
      console.log(components)
      // return
      let res = preHTML.generate(pageSettings,settings,design);
      for (let x = 0; x < components.length; x++) {
        const component = components[x];
        res = res + await getComponent(component);
      }
      res+=vzyMenu.generate()
      res = addCSS(res, design) //todo: generate another CSS file.
      res += postHTML.generate();
      // console.log(res);
      HTML_pages.push({ title: pageSettings.link, data: res });
    }

    let url = randomString.generate({ length: 4, charset: 'alphanumeric', capitalization: 'lowercase', readable: true });

    // let generatedFolder = path.join(process.cwd(), 'generated', 'demo', url); //change this name
    console.log('pageKeys: ');
    console.log(pageKeys);
    if (pageKeys && pageKeys.length > 0) {
      console.log('deleting')
      pageKeys = pageKeys.map((pK: any) => ({ Key: pK?.Key })).filter((pK) => (pK.Key != null))
      // console.log(pageKeys);
      // return;
      await clearWebsiteFiles(pageKeys)
    };
    // return({message:'nothing'})
    // await fs.promises.mkdir(generatedFolder, { recursive: true })

    let awsPageKeys = []
    for (let x = 0; x < HTML_pages.length; x++) {
      const { title, data } = HTML_pages[x];
      // fs.promises.writeFile(`${generatedFolder}/${title}.html`, data)
      let pageKey = await writeToBucket(settings.link, title, data);
      if (pageKey) {
        awsPageKeys.push(pageKey);
      }
    }
    console.log(settings);
    return { awsPageKeys, url: `${settings.link}.vzy.io` }
    // return (url+config.publishDomain)
  } catch (err) {
    console.log(err)
    return (false)
  }
}

// todo: clear the previous folder before generating
//turn callback below to promise

const Bucket = 'vzy.io'
const writeToBucket = async (url: string, fileName: string, data: string) => {
  try {
    const s = new Readable();
    s._read = () => { }; // redundant? see update below
    s.push(data);
    s.push(null);
    // let s3Upload = util.promisify(s3.upload);
    let res = await s3.upload({
      Bucket,
      Body: s,
      // Key: `index.html`,
      Key: `${url}/${fileName}.html`,
      // Metadata: { 'Content-Type': 'text/html' },
      ContentType: 'text/html'
    }).promise()
    console.log(res.Key)
    return { Key: res.Key }
  } catch (err) {
    console.log(err)
  }
}

export const clearWebsiteFiles = async (pageKeys: [any]) => {
  try {
    let res = await s3.deleteObjects({
      Bucket,
      Delete: {
        Objects: pageKeys
      }
    }).promise()
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

interface componentType {
  type: 'header' | 'hero' | 'cards' | 'footer',
  data: any
  headerData?: any
}
const getComponent = async (component: componentType) => {
  console.log(component.type)
  let res = '<div></div>'
  switch (component.type) {
    case 'header':
      res = await getHTML(headerVue, { component })
      break;
    case 'hero':
      res = await getHTML(heroVue, { component })
      break;
    case 'cards':
      res = await getHTML(cardsVue, { component })
      break;
    case 'footer':
      res = await getHTML(footerVue, { component, headerData: component.headerData })
      break;
    default:
      break;
  }
  return res;
}

const getHTML = async (template, data) => {
  let res = await renderToString(createSSRApp({
    template,
    data: () => (data)
  }))

  return res
}
const addCSS = (html: string, design: any) => {
  let { colour: { accent, textColour }, shape, headFont, headWeight, bodyFont, letterSpacing } = design

  // html = setClasses(html, 'r', cornerRadius)

  let res = `
  <style>
  :root {
    --accent: ${accent};
    --shape: var(--${shape});
    --min-shape: var(--min-${shape});
    }
    button{
              background:${accent}!important;
          }
          h1:not(.block-card), h2:not(.block-card), h3:not(.block-card){
            font-family:${headFont}!important;
            font-weight:${headWeight}!important;
          }
          p:not(.block-card),input,input::placeholder{
            font-family:${bodyFont}!important;
          }
          header>nav>ul>li>a, button{
            font-family:${bodyFont}!important;
          }
          .footer-card ul>li>a, .footer-card .footer-bottom>.footer-bottom-right>a{
            font-family:${bodyFont}!important;
          }
          button{
            color:${textColour}!important;
          }
          
    h1{
      letter-spacing:${letterSpacing}em!important;
    }
    h2{
      letter-spacing:${letterSpacing / 1.5}em!important;
    }
    h3{
      letter-spacing:${letterSpacing / 2}em!important;
    }

  .container{
    padding:0!important
  }
  .container > *:hover {
    border: 0px solid;
  }
  .card-box{
    overflow:visible;
  }
</style>
`


  // button{
  //   background:${buttonColour}!important;
  // }
  // h1 h2, h3{
  // font-family:${headFont}!important;
  // font-weight:${headWeight}!important;
  // }
  // p, input, input::placeholder{
  // font-family:${bodyFont}!important;
  // }
  // header>nav>ul>li>a, button{
  // font-family:${bodyFont}!important;
  // }
  // button{
  // color:${textColour}!important;
  // }
  return html += res
}
const setClasses = (html: string, keyname: string, value: string) => {
  let regex_space = new RegExp(`\\s${keyname}-\\w+`, 'g');
  let regex_apostrophe = new RegExp(`"${keyname}-\\w+`, 'g');
  html = html.replace(regex_space, ' ' + value)
  html = html.replace(regex_apostrophe, '"' + value)
  return html;
}

export const duplicateAssets = async (assets: { key: string }[], oldFolder: string, newFolder: string) => {
  try {
    console.log(assets)
    console.log(oldFolder)
    console.log(newFolder)
    if (isDev()) {

    } else {
      for (let x = 0; x < assets.length; x++) {
        const fileName = assets[x].key;
        if (!fileName) { continue };
        const newFileName = fileName.replace(oldFolder, newFolder);
        let res = await s3.copyObject({ Bucket: 'vzy-projects', CopySource: 'vzy-projects' + '/' + fileName, Key: newFileName }).promise()
        console.log(res)
      }
    }
  } catch (err) {
    console.log(err)
  }

}