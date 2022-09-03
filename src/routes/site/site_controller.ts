import { Site } from "./site_model"
import getPage, { getDefaultPage } from "./defaultPages";
import { User } from "../user/user_model";
import { clearWebsiteFiles, duplicateAssets, genHTML } from "./modules/generator";
import config, { isDev } from "../../../config";
import { getCopyCount, getCount,getBaseName, getRandomName, getSearchName } from "./site_functions";
import randomString from "randomstring"


function getTemplate(title = 'blank page', link = 'blank', template = '') {
    let res: any = {}
    switch (template) {
        // case def:
        //     break;
        default:
            res = getPage("blank");
            break;
    }
    res.pageSettings.title = title;
    res.pageSettings.link = link;
    console.log(res.pageSettings)
    return { ...res };
}

const getBlankPage = (title: string, link: string, name: string) => {
    const page = JSON.parse(JSON.stringify(getPage('blank')));
    page.pageSettings.title = title;
    page.pageSettings.link = link;
    page.components[0].data.logoText = name
    return page
}
export const createSite = async (email: string, name: string) => {
    try {
        // let name = randomString.generate({ length: 8, charset: 'alphanumeric', capitalization: 'lowercase', readable: true });
        // let url = getRandomName()
        let url = name.toLowerCase().split(' ')[0].replace(/[^a-zA-Z1-3-]/g, '')

        let check = Site.findOne({'settings.link':url});
        console.log('check')
        console.log(check)
        if(check){
            url = url+'-'+randomString.generate({ length: 8, charset: 'numeric', capitalization: 'lowercase', readable: true });;
        }

        let owner_id = (await User.findOne({ email }))._doc._id;
        let pages = [getBlankPage('Home', 'index', name), getBlankPage('About', 'about', name), getBlankPage('Contact', 'contact', name)];
        let design = getDefaultPage().design;
        let settings = { name, link: url, email };
        // return
        let site = (await (new Site({ owner_id, pages, design, settings }).save()));
        console.log(site);
        let res = { error: false, data: site };
        console.log(res);
        return (res)
    } catch (error) {
        console.log(error);
        return { error: 'something is not right', data: false }
    }
}


export const getSites = async (email: string) => {
    try {
        let owner_id = (await User.findOne({ email }))._doc._id;
        let sites = (await Site.find({
            owner_id, $and: [
                {
                    $or:
                        [{ deleted: false }, { deleted: null }]
                },
                {
                    $or: [
                        { removed: false }, { removed: null }
                    ]
                }
            ]
        })).map((site) => ({ id: site._id, title: site.settings.name, url: site.settings.link, deployed: site.pageKeys.length > 0 }));
        console.log(sites);
        let res = { error: false, data: sites };
        // console.log(res);
        return (res)
    } catch (error) {
        console.log(error);
        return { error: 'something is not right', data: false }
    }
}


export const getDeletedSites = async (email: string) => {
    try {
        let owner_id = (await User.findOne({ email }))._doc._id;
        let sites = (await Site.find({ owner_id, deleted: true, $or: [{ removed: false }, { removed: null }] })).map((site) => ({ id: site._id, title: site.settings.name, url: site.settings.link }));
        console.log(sites);
        let res = { error: false, data: sites };
        // console.log(res);
        return (res)
    } catch (error) {
        console.log(error);
        return { error: 'something is not right', data: false }
    }
}

export const getSite = async (id: string, email: string, getPageKeys = false) => {
    try {
        let owner_id = (await User.findOne({ email }))._doc._id;
        let res = (await Site.findById(id))._doc;
        let site
        if (!getPageKeys) {
            let { pageKeys, ...rest } = res;
            site = rest
        } else {
            site = res
        }
        if (site.owner_id.toString() !== owner_id.toString()) {
            console.log('not your site')
            return ({ error: true, message: 'Unauthorized' })
        } else {
            let res = { error: false, data: site };
            return (res)
        }
    } catch (error) {
        console.log(error);
        return { error: 'something is not right', data: false }
    }
}

export const publishSite = async (id: string, email: string) => {
    try {
        let { data: site } = await getSite(id, email, true)
        if (!site) { return false }
        let res = await genHTML(site)
        if (res) {
            let res2 = await Site.findByIdAndUpdate(id, { pageKeys: res.awsPageKeys });
            return res.url
        }
    } catch (err) {
        console.log(err);
        return { error: 'something is not right', data: false }
    }
}


export const saveSite = async (email: string, update: any) => {
    try {
        let { id, pages, settings, design } = update;
        let res = await Site.findByIdAndUpdate(id, { pages, settings, design }, { new: true });
        // console.log('update:.............')
        // console.log(res)
        if (res) {
            return { error: false }
        } else {
            return { error: true }
        }
    } catch (err) {
        console.log(err);
    }
}

export const handleUpload = async (file: any, siteId: string) => {
    try {
        let url = file.location;
        let key = file.key;
        if (isDev()) {
            url = `${config.baseUrl}/${file.path}`;
            key = file.path;
        }
        let asset = { type: getType(file.mimetype), url, key };
        let res = await Site.findByIdAndUpdate(siteId, { $push: { assets: asset } });
        return { error: false, data: [url] }
    } catch (error) {
        console.log(error)
        return { error: 'something is not right', data: false }
    }
}

const getType = (mimeType: string) => {
    mimeType = mimeType.split('/')[0]
    let res = 'file'
    switch (mimeType) {
        case 'image':
            res = ('image')
            break;

        default:
            res = ('file')
            break;
    }
    return res
}

export const duplicateSite = async (siteId: string,) => {
    try {
        let copyFrom = await Site.findById(siteId);
        let { owner_id, settings, design, pages, assets } = copyFrom;
        // let searchName = getSearchName(settings.name);
        // // console.log(searchName);
        // let regex = new RegExp(searchName + '\\((\\d+)\\)$')
        // let check = await Site.find({ ownedBy: copyFrom.ownedBy, 'settings.name': { $regex: regex, $options: 'i' } });
        // // console.log(check)
        // if (check.length == 0) {
        //     settings.name = searchName + `(${1})`;
        // } else {
        //     // let list = check.filter((c)=>(c.settings.name.startsWith(searchName))).map((c)=>({name:c.settings.name,number}))
        //     let list = check.map((c) => ({ name: c.settings.name, count: getCount(regex, c.settings.name) }));
        //     // console.log(list);
        //     let maxNo = list.reduce((prev, curr) => { if (curr.count > prev.count) { return (curr) } else { return prev } }).count;
        //     // console.log(maxNo);
        //     settings.name = searchName + `(${++maxNo})`;
        // }
        
        // let check = Site.findOne({'settings.name':settings.name})
        // if(check)

        // [ · Copy]+$

        let searchName = getBaseName(settings.name);
        console.log(searchName);
        let regex = new RegExp(searchName + '[ · copy]+$')
        let check = await Site.find({ ownedBy: copyFrom.ownedBy, 'settings.name': { $regex: regex, $options: 'i' } });
        console.log(check)
        if (check.length == 0) {
            settings.name = searchName + ` · copy`;
        } else {
            // let list = check.filter((c)=>(c.settings.name.startsWith(searchName))).map((c)=>({name:c.settings.name,number}))
            let list = check.map((c) => ({ name: c.settings.name, count: getCopyCount(c.settings.name) }));
            console.log(list);
            let maxNo = list.reduce((prev, curr) => { if (curr.count > prev.count) { return (curr) } else { return prev } }).count;
            console.log(maxNo);
            settings.name = searchName + " · copy".repeat(++maxNo);
        }

        // settings.name = settings.name+' · Copy'
        settings.link = getRandomName();
        let newSiteData = { owner_id, settings, design, pages };
        let res = await (new Site(newSiteData).save());
        if (res) {
            let newSiteData = res._doc;
            await duplicateAssets(assets, copyFrom._id.toString(), newSiteData._id.toString());
            let newAssets = assets.map((a) => ({
                type: a.type,
                url: a.url.replace(copyFrom._id.toString(), newSiteData._id.toString()),
                key: a.key.replace(copyFrom._id.toString(), newSiteData._id.toString()),
            }));
            let { pageKeys, ...data } = await Site.findByIdAndUpdate(newSiteData._id.toString(), { assets: newAssets }, { new: true });
            return { error: false, message: 'successful', data };
        } else {
            return { error: true, message: 'an error ocurred' }
        }

    } catch (err) {
        console.log(err)
        return { error: true, message: 'an error ocurred' }
    }
}

export const editSite = async (id: string, payload: { name: String }) => {
    try {
        console.log('editing site');
        let res = await Site.findByIdAndUpdate(id, { 'settings.name': payload.name }, { new: true })
        if (res) {
            return { error: false, message: 'successful' };
        } else {
            return { error: true, message: 'an error ocurred', data: null }
        }
    } catch (err) {
        console.log(err)
        return { error: true, message: 'an error ocurred', data: null }
    }
}

export const deleteSite = async (id: string) => {
    try {
        console.log('delete site');
        let res = await Site.findByIdAndUpdate(id, { deleted: true }, { new: true });
        console.log(res);
        let pageKeys = res.pageKeys
        if (pageKeys && pageKeys.length > 0) {
            console.log('deleting')
            pageKeys = pageKeys.map((pK: any) => ({ Key: pK?.Key })).filter((pK) => (pK.Key != null))
            // console.log(pageKeys);
            // return;
            await clearWebsiteFiles(pageKeys)
        };
        console.log(res)
        if (res) {
            return { error: false, message: 'successful' };
        } else {
            return { error: true, message: 'an error ocurred', data: null }
        }
    } catch (err) {
        console.log(err)
        return { error: true, message: 'an error ocurred', data: null }
    }
}

export const restoreSite = async (id: string) => {
    try {
        console.log('delete site');
        let res = await Site.findByIdAndUpdate(id, { deleted: false }, { new: true })
        console.log(res)
        if (res) {
            return { error: false, message: 'successful' };
        } else {
            return { error: true, message: 'an error ocurred', data: null }
        }
    } catch (err) {
        console.log(err)
        return { error: true, message: 'an error ocurred', data: null }
    }
}

export const deleteSitePermanently = async (id: string) => {
    try {
        console.log('delete site');
        // let res = await Site.findByIdAndDelete(id);
        let res = await Site.findByIdAndUpdate(id, { removed: true, 'settings.url': '' }, { new: true })
        console.log(res)
        if (res) {
            return { error: false, message: 'successful' };
        } else {
            return { error: true, message: 'an error ocurred', data: null }
        }
    } catch (err) {
        console.log(err)
        return { error: true, message: 'an error ocurred', data: null }
    }
}
