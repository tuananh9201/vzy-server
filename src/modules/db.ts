import mongoose from "mongoose";
import config from "../../config"

export const setup = async (cb: any) => {
    try {
        // let connect = await mongoose.connect('mongodb://localhost/vzy');
        console.log("connect db ...", config.mongoDBConnectString);
        
        let connect = await mongoose.connect(config.mongoDBConnectString)
        // , {
        //     ssl: true,
        //     sslValidate: true,
        //     // For example, see https://medium.com/@rajanmaharjan/secure-your-mongodb-connections-ssl-tls-92e2addb3c89
        //     // for where the `rootCA.pem` file comes from.
        //     // Please note that, in Mongoose >= 5.8.3, `sslCA` needs to be
        //     // the **path to** the CA file, **not** the contents of the CA file
        //     sslCA: `${__dirname}/../../config/X509-cert-2793349503414079103.pem`
        //     // sslCA: `../../config/X509-cert-2793349503414079103.pem`
        // });
        if (connect) {
            console.log('connected to db')
        }
        cb
    } catch (err) {
        console.log(err)
    }

}


