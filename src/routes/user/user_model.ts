import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const User_schema = new Schema({
    // id: ObjectId
    email: { type: String, unique: true },
    name:String,
    // firstName: String,
    // lastName: String,
    passwordHash: String,
    profileImage: String,
    verified:{type:Boolean,default:false},
    social: { type: String, required: false, enum: ['google', 'email'], default: 'email' }
})
export const User = mongoose.model('User', User_schema)

const PasswordReset_schema = new Schema({
    userId: String,
    token: { type: String, unique: true },
    expiry: Date,
})
export const PasswordReset = mongoose.model('PasswordReset', PasswordReset_schema)


const IntendingUser_schema = new Schema({
    email: String,
    code: { type: String },
    // todo: add date of entry
})

export const IntendingUser = mongoose.model('IntendingUser', IntendingUser_schema)

const Feedback_schema = new Schema({
    rating: { type: String},
    feedback: { type: String},
    email: { type: String},
    location: { type: String},
    device: { type: String},
    duration: { type: Number},
    date:{type:Date},
    model: { type: String},
    browser: { type: String},
    // todo: add date of entry
})

export const Feedback = mongoose.model('Feedback', Feedback_schema)

const Waitlist_schema = new Schema({
    email: { type: String},
    date:{type:Date},
    // todo: add date of entry
})

export const Waitlist = mongoose.model('Waitlist', Waitlist_schema)
