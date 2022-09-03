// // Load the AWS SDK for Node.js
// var AWS = require('aws-sdk');
// import config from "../config"

// // Set the region 
// AWS.config.update({
//   region: 'us-east-1',
//   // credentials:config.aws_secret
// });

// // 2020-05-31

// const cloudfront = new AWS.CloudFront({ apiVersion: '2020-05-31' });


// export default async() => {
//   let res = await cloudfront.createInvalidation({
//     DistributionId: 'E3DQJVD2ZDAVGP', /* required */
//     InvalidationBatch: { /* required */
//       CallerReference: Date.now().toString(), /* required */
//       Paths: { /* required */
//         Quantity: '1', /* required */
//         Items: [
//           '/oo*',
//           /* more items */
//         ]
//       }
//     }
//   }).promise();

//   console.log(res);
// }





let testString = 'site · Copy · Copy · Copy · Copy · Copy · Copy · Copy · Copy';

let getBaseName = (name)=>{
  let nameArr = name.split(' · ');
  console.log(nameArr)
  
// checks if it looks like a copy and extracts the base name
}

// get all that match that copy from the db and sort by the number of copy occurences

// get the longest copy

