// const aws = require("aws-sdk");
// const multer = require("multer");
// const multerS3 = require("multer-s3");

import multer from "multer"
import aws from "aws-sdk"
import multerS3 from "multer-s3"
import randomString from "randomstring"
import fs from "fs";
import { isDev } from "../../../../config";

function ensureExists(path: any, mode: any, cb?: (arg0: any) => void) {
  if (typeof mode == 'function') { // Allow the `mode` parameter to be optional
    cb = mode;
    mode = 0o744;
  }
  fs.mkdir(path, mode, function (err) {
    if (err) {
      if (err.code == 'EEXIST') cb(null); // Ignore the error if the folder already exists
      else cb(err); // Something else went wrong
    } else cb(null); // Successfully created folder
  });
}

const storage_Local = multer.diskStorage({
  destination: function (req, file, callback) {
    // console.log(req.params);
    const siteId = req.params.siteId
    callback(null, `uploads/${siteId}`);
  },
  filename: function (req, file, callback) {
    // console.log(file);
    const ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
    const name = `${randomString.generate({ length: 8, charset: 'alphanumeric', capitalization: 'lowercase' })}_${Date.now()}.${ext}`
    // console.log(name);
    const folder = `uploads/${req.params.siteId}`;
    ensureExists(folder, () => { callback(null, name) });
    // callback(null, name);
  }
});

const s3 = new aws.S3();

aws.config.update({
  region: "us-east-1",
});


const storage_AWS = multerS3({
  // acl: "public-read",
  s3,
  bucket: 'vzy-projects',
  // metadata: function (req, file, cb) {
  //   cb(null, { fieldName: "TESTING_METADATA" });
  // },
  key: function (req, file, callback) {
    console.log(file);
    const ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
    const name = `${randomString.generate({ length: 8, charset: 'alphanumeric', capitalization: 'lowercase' })}_${Date.now()}.${ext}`;
    // console.log(name);
    const folder = `uploads/${req.params.siteId}`;
    callback(null, folder + '/' + name);

    // ensureExists(folder, () => { callback(null, name) });
    //     // callback(null, name);
    // cb(null, Date.now().toString());
  },
})

let upload;
if (isDev()) {
  upload = multer({ storage: storage_Local });
} else {
  upload = multer({ storage: storage_AWS });
}


const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

// const upload = multer({
//   fileFilter,
//   storage: multerS3({
//     acl: "public-read",
//     s3,
//     bucket: 'vzy-projects',
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: "TESTING_METADATA" });
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString());
//     },
//   }),
// });

// module.exports = upload;

export default upload