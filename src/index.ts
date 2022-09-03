

import express from "express";
import cors from "cors";
import morgan from 'morgan';
// import got from 'got';
// const got = require('got').default;
const axios = require('axios').default;
var subdomain = require('express-subdomain');
var bodyParser = require('body-parser')
var router = express.Router();

import setupRoutes from "./routes/index_router";
import { setup } from "./modules/db";
import config from '../config'
// import test from "./test";
const path = require('path');

// if (!process.env.PORT) {
//     // process.exit(1);
// }

const PORT: number = 8001

const app = express();

// app.use(helmet());
app.use(cors({
    origin: '*'
}));

app.use(express.json());


// parse application/json
app.use(bodyParser.json())

// logger
app.use(morgan('dev'));


setupRoutes(app)

app.get('/test',async (req:any,reply) => {
    reply.send('yy')
    // reply.send(await test())
})

// console.log(path.join(process.cwd(),'generated','demo'))

// serve static files
// app.use('/public', express.static(path.join(process.cwd(), 'generated', 'demo'), {
//     index: false,
//     redirect: false
// }))

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads'), {
    index: false,
    redirect: false
}))


// app.get('/public/:link', async (req, reply) => {
//     let link = req.params.link
//     if (!link.includes('.')) {
//         reply.redirect(`/public/${link}/index.html`)
//     } else {
//         let res = await axios.get(`${config.baseUrl}/public/404.html`)
//         reply.send(await res.data)
//     }
// })

// router.get('/:filepath', async (req, reply) => {
//     try {
//         let site_name = req.subdomains[0];
//         if (!site_name) {
//             reply.redirect(`${config.baseUrl}/public/404.html`)
//         } else {
//             console.log(site_name);
//             let filepath = req.params.filepath;
//             console.log(filepath);
//             let res = await axios.get(`${config.baseUrl}/public/${site_name}/${filepath}`);
//             reply.send(res.data)
//         }

//     } catch (err) {
//         console.log('subdomain \'/filepath\' access failed');
//         console.log(err);
//     }
// });
// router.get('', async (req, reply) => {
//     try {
//         let site_name = req.subdomains[0];
//         if (!site_name) {
//             reply.redirect(`${config.baseUrl}/public/404.html`)
//         } else {
//             console.log(site_name);
//             let res = await axios.get(`${config.baseUrl}/public/${site_name}/index.html`);
//             reply.send(res.data);
//         }
//     } catch (err) {
//         console.log('subdomain \' \' access failed')
//         // console.log(err)
//     }
// })
// app.use(subdomain('*', router));

app.get('/', function (req, res) {
    res.send('just checking');
});

setup(
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
)
