import ses from "node-ses";
import config, { isDev } from "../../config"

const mailClient = ses.createClient(config.aws_secret);


let sendMail = async ({ email_address, heading, message }) => {

    // if (process.env.NODE_ENV) {
    if (isDev()) {
        console.log(heading);
        console.log(message);
        return
    }

    // Create sendEmail params 
    // var params = {
    //     Destination: { /* required */
    //         CcAddresses: [
    //             // 'hey@vzy.co',
    //             /* more items */
    //         ],
    //         ToAddresses: [
    //             email_address,
    //             /* more items */
    //         ]
    //     },
    //     Message: { /* required */
    //         Body: { /* required */
    //             Html: {
    //                 Charset: "UTF-8",
    //                 Data: message,
    //             },
    //             // Text: {
    //             //     Charset: "UTF-8",
    //             //     Data: "TEXT_FORMAT_BODY_text"
    //             // }
    //         },
    //         Subject: {
    //             Charset: 'UTF-8',
    //             Data: 'Test email'
    //         }
    //     },
    //     Source: 'hey@vzy.co', /* required */
    //     ReplyToAddresses: [
    //         'hey@vzy.co',
    //         /* more items */
    //     ],
    // };
    let params = {
        to: email_address
        , from: 'help@vzy.co'
        // , cc: 'theWickedWitch@nerds.net'
        // , bcc: ['canAlsoBe@nArray.com', 'forrealz@.org']
        , subject: heading
        , message: message
        , altText: '@'
    }
    mailClient.sendEmail(params, (err, data, res) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data)
            console.log(res)
        }

        // let res = await 
    })
}

// sendMail({email_address:'kelly11609@yahoo.com', message:'@@'})

export default { sendMail }