let serverUrl = 'http://localhost:8001/public'
if (process.env.NODE_ENV !== "development") {
    serverUrl = 'https://backend.vzy.co/sites'
    //todo:prelaunch check this
    //Host on amazon S3
}

const generate = ({ title = '', text = '' }, settings:{favicon :String}, design: { headFont: string, bodyFont: string }) => {
    console.log(title)
    let {favicon}=settings;
    return (`
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http - equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="title" content="${text}">
    <title>${title}</title>
    <link rel="icon" type="image/${favicon.substring(favicon.length - 3)}" href="${favicon}" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="${getFontLink(design.headFont)}" rel="stylesheet">
    <link href="${getFontLink(design.bodyFont)}" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://vzy.netlify.app/hosted/css/vzy.css">
    <link rel="mask-icon" href="${favicon}" color="#808080">
    </head>

<body>
    <!--Container -->
    <div class="container">
`)
}

const getFontLink = (fontName: string) => {
    let defaultUrl = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    let fontObject = [
        {
            name: 'Inter',
            url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
        },
        {
            name: 'Cormorant Garamond',
            url: 'https://fonts.googleapis.com/css2?family=Cormorant%20Garamond:wght@400;500;600;700&display=swap'
        },
        {
            name: 'Space Grotesk',
            url: 'https://fonts.googleapis.com/css2?family=Space Grotesk:wght@400;500;600;700&display=swap'
        },
        {
            name: 'Julius Sans One',
            url: 'https://fonts.googleapis.com/css2?family=Julius+Sans+One:wght@400;500;600;700&display=swap'
        },
        {
            name: 'Syne',
            url: 'https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&display=swap'
        },
        {
            name: 'IBM Plex Sans',
            url: 'https://fonts.googleapis.com/css2?family=IBM Plex Sans:wght@400;500;600;700&display=swap'
        },
        {
            name: 'Bebas Neue',
            url: 'https://fonts.googleapis.com/css2?family=Bebas Neue:wght@400;500;600;700&display=swap'
        },
        {
            name: 'Lora',
            url: 'https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap'
        },
    ]
    let url = fontObject.find((font)=>(font.name===fontName)).url||defaultUrl
    console.log(url);
    return url;
}
export default { generate }