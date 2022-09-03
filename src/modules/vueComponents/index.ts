const fs = require('fs');
const path = require('path');

export { default as preHTML } from './vue files/preHTML'
export { default as postHTML } from './vue files/postHTML'

const scriptRegex = /<script(.|\s)*<\/script>/g
const TemplateRegex = /(^<template>|<\/template>\s*$)/g


// export preHTML
export const headerVue = fs.readFileSync(path.join(process.cwd(), 'src', 'modules', 'vueComponents', 'vue files', 'header.vue')).toString().replace(scriptRegex, '').replace(TemplateRegex, '')
export const heroVue = fs.readFileSync(path.join(process.cwd(), 'src', 'modules', 'vueComponents', 'vue files', 'hero.vue')).toString().replace(scriptRegex, '').replace(TemplateRegex, '')
export const cardsVue = fs.readFileSync(path.join(process.cwd(), 'src', 'modules', 'vueComponents', 'vue files', 'cards.vue')).toString().replace(scriptRegex, '').replace(TemplateRegex, '')
export const footerVue = fs.readFileSync(path.join(process.cwd(), 'src', 'modules', 'vueComponents', 'vue files', 'footer.vue')).toString().replace(scriptRegex, '').replace(TemplateRegex, '')
// export const postHTML = fs.readFileSync(path.join(__dirname, 'vue files', 'postHTML.html')).toString()