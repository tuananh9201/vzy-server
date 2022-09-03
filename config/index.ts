import dotenv from 'dotenv';
dotenv.config();

let mongoDBConnectString = process.env.MONGODB_CONNECT_STRING;
let aws_secret = JSON.parse(process.env.AWS_SECRET)
console.log(process.env.NODE_ENV)
console.log(aws_secret)
let baseUrl = process.env.BASE_URL
let publishDomain = '.vzy.io'
if (process.env.NODE_ENV === "development") {
    mongoDBConnectString = "mongodb://localhost/vzy";
    baseUrl = 'http://localhost:8001';
    publishDomain = '.localtest.me:8001'
}

export const isDev = () => {
    if (process.env.NODE_ENV === "development") {
        return (true)
    } else {
        return false
    }
}
// console.log(process.env.NODE_ENV);

export default {
    mongoDBConnectString,
    aws_secret,
    baseUrl,
    publishDomain,
}