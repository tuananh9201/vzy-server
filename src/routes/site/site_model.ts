import mongoose, { Schema } from "mongoose";

const page_schema = new Schema({
    // pageId: { type: String, required:true },
    pageSettings: {
        title: { type: String, required: true },
        link: String,
        text: String,
        coverImage: String,
    },
    components: [{}]
})

const setting_schema = new Schema({
    name: { type: String, required: true },
    link: { type: String, required: false },
    favicon: { type: String, required: false },
    email: { type: String, required: false },
})

const design_schema = new Schema({
    colour: { accent: String, textColour: String },
    headFont: String,
    bodyFont: String,
    headWeight: Number,
    letterSpacing: Number,
    shape: String,
})

const asset_schema = new Schema({
    type:String,
    url:String,
    key:String,
})

const Site_schema = new Schema({
    // _id
    owner_id: { type: String, required: true },
    editors: [String],

    customDomain: { type: String, required: false },
    plan: { type: String, required: false, default: 'free' },

    settings: setting_schema,
    design: design_schema,
    pages: [page_schema],
    assets: [asset_schema],

    pageKeys: [{ Key: String }],

    deleted:{type:Boolean, default:false},
    removed:{type:Boolean, default:false},
})

export const Site = mongoose.model('Site', Site_schema)
