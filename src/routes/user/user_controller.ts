import { PasswordReset, User, IntendingUser, Feedback, Waitlist } from './user_model'
import bcrypt from "bcrypt";
import { authenticateToken, generateAccessToken } from '../../modules/jwt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import mail from "../../modules/mail";
import randomString from "randomstring";
import DeviceDetector from "device-detector-js";

import { OAuth2Client } from 'google-auth-library';
import mails from '../../modules/mails';
import { generateVerificationMail } from "vzy-mail";
// import config from '../../config';

interface User_type {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}
// export const createUser = async ({ email, firstName, lastName, password }: User_type) => {
//     try {
//         let hash = await bcrypt.hash(password, 10);
//         let res = await (new User({ email, firstName, lastName, passwordHash: hash })).save()
//         if (res) {
//             console.log('account created succesfully: ', res);
//             let { passwordHash, _id, __v, ...user } = res._doc;
//             let token = generateAccessToken(email);
//             return ({ user, token })
//         } else {
//             return ({ user: false })
//         }
//     } catch (err) {
//         console.log(err);
//         return ({ error: 'user already exists' })
//     }

// }

export const preRegisterUser = async (payload: { email: string, name: string, password: string }) => {
    try {
        let { email, name, password } = payload
        let user = (await User.findOne({ email }))?._doc;
        if (user) {
            return { error: 'duplicate email' }
        } else {
            let passwordHash = await bcrypt.hash(password, 10);
            let code = randomString.generate({ length: 12, });
            let res = await (new User({ email, name, passwordHash }).save())
            let res2 = await (new IntendingUser({ email, code }).save())
            console.log(res2)

            if (res) {
                console.log('user account created succesfully: ', res);
                let link = `https://app.vzy.co/verify-account/?verify=${code}&email=${email}`
                await mail.sendMail({ email_address: email, heading: 'Confirm your Email Address', message: generateVerificationMail({ name, link }) })
                // await mail.sendMail({ email_address: email, heading: 'Confirm your Email', message: `Please confirm your email. \n ${config.baseUrl}/verify-user/?verify=${code}` })
                return ({ email })
            } else {
                return ({ user: { email } })
            }
        }

    } catch (err) {
        console.log(err);
        return ({ error: 'an error occured' })
    }
}
// console.log(IntendingUser.findOne({ email:'t@t.com' }))
export const verifyUser = async (email: string, code: string) => {
    try {
        let user = (await IntendingUser.findOne({ email }));
        console.log(user)
        if (user) {
            if (user.code === code) {
                // let res = await (new User({email,firstName,}))
                // let temporary_password = randomString.generate(15)
                // let passwordHash = await bcrypt.hash(temporary_password, 10);
                // let res = await (new User({ email, firstName: '', lastName: '', passwordHash })).save()
                // todo: do in one transaction create new and delete old

                // todo: check if too old
                let res = await User.findOneAndUpdate({ email }, { verified: true }, { new: true });
                if (res) {
                    let del = await IntendingUser.findOneAndDelete({ email });
                    console.log(del)
                    console.log('account verified succesfully: ', res);
                    // let { passwordHash, _id, __v, ...user } = res._doc;
                    let token = generateAccessToken(email);
                    return ({ user: res, token })
                } else {
                    return ({ user: false, error: 'unable to verify account' })
                }
            } else {
                return { error: 'wrong code' }
            }
        } else {
            return { error: 'no account found' }
        }
    } catch (err) {
        console.log(err);
        return ({ error: 'an error occured' })
    }
}
// verifyUser('t@t.com','8808')
export const updateUser = async (email: string, data) => {
    try {
        // let user = (await User.findOne({ email }))?._doc;
        let { password, ...payload } = data;
        console.log(data)
        if (password) {
            data.passwordHash = await bcrypt.hash(password, 10);
        }
        console.log(data)
        let user = await User.findOneAndUpdate({ email }, { ...data }, { new: true });
        console.log('userupdate: ', user);
        if (user) {
            // todo: invalidate a token
            let { passwordHash, email, _id, __v, ...res } = user._doc;
            let token = generateAccessToken(email)
            return ({ user: { email, ...res }, token })
        } else {
            return { error: 'no account found' }
            // todo: change all these to constants
        }
    } catch (err) {
        console.log(err);
        return ({ error: 'an error occured while updating user' })
    }
}

interface login_type {
    email: string;
    password: string;
}
export const loginUser = async ({ email, password }: login_type) => {
    let user = await User.findOne({ email })
    // console.log(user)
    if (!user) { return { user: false } }
    let check = await bcrypt.compare(password, user.passwordHash)
    // console.log(check)
    if (check) {
        let { passwordHash, _id, __v, ...res } = user._doc;
        if (user._doc.verified) {
            let token = generateAccessToken(email)
            return ({ user: res, token })
        } else {
            return ({ user: res, token: 'unverified' })
        }
    } else {
        return { error: 'wrong password' }
    }
}

const bcryp = async (pw) => {
    // console.log(await bcrypt.hash(pw, 10))
    console.log(await bcrypt.compare(pw, '$2b$10$rssCgBs49bwHUvF9aUThPOpN6m9ouN5msd26CV8T44jK6HB4BAHCm'))
}
bcryp('qwerty');

export const getUser = async (email: string) => {
    let user = (await User.findOne({ email }))?._doc;
    console.log(user)
    if (user) {
        let { passwordHash, _id, __v, ...res } = user
        return res;
    } else {
        return false;
    }
}

export const forgotPassword = async (email: string) => {
    console.log(email)
    let user = (await User.findOne({ email }))?._doc;
    if (user) {
        let { passwordHash, _id, __v, ...res } = user;
        let token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
        let expiry = new Date((new Date(Date.now())).getTime() + 60 * 10000);
        console.log(token);

        // send link to email
        await mail.sendMail({ email_address: email, heading: 'Password Reset', message: `Please click the link below to reset your password. \n ${token}` })
        await (new PasswordReset({ token, userId: _id, expiry })).save()
        return { message: 'link sent to email' };
    } else {
        return false;
    }
}


export const resetPassword = async ({ token, password }: any) => {
    let passwordReset = (await PasswordReset.findOne({ token }))?._doc;
    if (passwordReset) {
        let { expiry, userId } = passwordReset;
        if (Date.now() > expiry) {
            await PasswordReset.deleteOne({ token })
            console.log('expired passwordReset deleted')
            return ({ message: 'expired' })
        } else {
            let hash = await bcrypt.hash(password, 10);
            await User.findByIdAndUpdate(userId, { passwordHash: hash })
            return ({ message: 'password reset successful' })
        }
    } else {
        console.log('no passwordReset order found')
        return false;
    }
}

const OauthClient = new OAuth2Client(
    {
        clientId: '478750075779-amh7dmu109hfoje6tii5pkmpk3fc291e.apps.googleusercontent.com',
        clientSecret: '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',
        //   redirectUri: 'https://backend.vzy.co'
        redirectUri: 'http://localhost:8001'
    }
)

async function verifyCode(code) {
    try {
        // let { tokens } = await OauthClient.getToken(code)
        // OauthClient.setCredentials({ access_token: tokens.access_token })
        OauthClient.setCredentials({ access_token: code })
        const userinfo = await OauthClient.request({
            url: 'https://www.googleapis.com/oauth2/v3/userinfo'
        })
        console.log(userinfo)
        return userinfo.data
    } catch (err) {
        console.log(err)
    }
}
export const googleSignIn = async (token: string) => {
    try {
        console.log(token)
        let userData: any = await verifyCode(token);
        // let userData: any = jwt.decode('eyJhbGciOiJSUzI1NiIsImtpZCI6IjNkZDZjYTJhODFkYzJmZWE4YzM2NDI0MzFlN2UyOTZkMmQ3NWI0NDYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NDY1Nzc4MjYsImF1ZCI6IjU5MTU5NzQxNjY0Ny1pNWk5cXB0dHBudW4zNnUwNWtoZmw2cXZvN2plZnFkby5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwMjMxNDMxNDEyOTMxNjQ1NTc0OCIsImVtYWlsIjoib25lbHNvbi5tYWluQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhenAiOiI1OTE1OTc0MTY2NDctaTVpOXFwdHRwbnVuMzZ1MDVraGZsNnF2bzdqZWZxZG8uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJuYW1lIjoiTmVsc29uIE9udW9oYSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQVRYQUp6SU5xUm5jUGZWMndTMGVRcFB1OWRZak9rS3pxeTdCdnNjWXRRYz1zOTYtYyIsImdpdmVuX25hbWUiOiJOZWxzb24iLCJmYW1pbHlfbmFtZSI6Ik9udW9oYSIsImlhdCI6MTY0NjU3ODEyNiwiZXhwIjoxNjQ2NTgxNzI2LCJqdGkiOiIxZmMxMjZkNTY2ZTRkZWMzNDFlZWFhZmVhOWI0ODQ0ZDk5YTA1ZDQyIn0.hW9sYW4TuIphxLszRqZPq867ukxNO1yCzSYeuUDaNaRHeCMmKQaU3WwJbgZ-sb0-rscDsKt1PYOdGHSZ2rf5y7MddN1OHK-R0IRz5hfuUVYrEczrxqV3LdO4Sg4MAhwcdj_WSon15AAxSjNYsgirKftLIAZCjKvw5fufGXQKKr8NKZmWub-IeGAWxi3mDcpuBTwdxjkOD7yOzOFAjENuBRfZSJAiTQBr1mwxMysW9jFzj-U2jg5jtWRUuu8BSsn0kZy6UmRFKdJTSeQm_oqsMvpQ6GgAp1K81gjkea_oIgWBVE4-e1aP_hHiPj7bGLQFThRaeims_6VRMmuW0-gq3w')
        // let userData: any = jwt.decode(token)
        console.log(userData)
        let { email, given_name: firstName, family_name: lastName, picture } = userData
        let check = await User.findOne({ email })
        console.log(check)

        if (check) {//if user exists login user
            let { passwordHash, _id, __v, ...res } = check._doc;
            let token = generateAccessToken(email)
            return ({ user: res, token })
        } else { //if user does not exist, sign user up
            console.log('no user found')

            let res = await (new User({ email, name: (firstName +" "+ lastName), social: 'google', profileImage: picture, verified: true })).save()
            console.log(res)
            let { passwordHash, _id, __v, ...user } = res._doc;
            let token = generateAccessToken(email)
            return ({ user, token })
        }
    } catch (err) {
        console.log('google sign in failed')
        console.log(err)
        return false;
    }
    // console.log(user)
}

// decode()

export const saveFeedBack = async (payload, userAgent) => {

    // return false
    try {
        const deviceDetector = new DeviceDetector();
        const device = deviceDetector.parse(userAgent);
        // console.log(device);
        let { client: { name: browser_name, version: browser_version }, device: { brand, model } } = device;
        payload.date = Date.now();
        payload.model = model;
        payload.browser = browser_name;

        let res = await new Feedback(payload).save();
        console.log(res);
        if (res) {
            return true
        }
    } catch (error) {
        console.log(error)
        return false
    }

}


export const addToWaitlist = async (payload) => {
    try {
        payload.date = Date.now()
        let res = await new Waitlist(payload).save();
        console.log(res);
        if (res) {
            return true
        }
    } catch (err) {
        console.log(err)
        return false

    }
}