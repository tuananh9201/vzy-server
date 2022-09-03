
import express from "express";
import { authenticateToken } from "../../modules/jwt";
import { preRegisterUser, forgotPassword, getUser, googleSignIn, loginUser, resetPassword, verifyUser, updateUser,saveFeedBack, addToWaitlist } from "./user_controller";

var router = express.Router();

router.post('/login', async (req, reply) => {
   try {
      console.log(req.body);
      let res = await loginUser(req.body)
      console.log(res)
      if (res?.error) {
         reply.status(401).send({ message: 'wrong passwordd' })
      } else if (res?.user) {
         reply.status(200).send({ message: 'successful', data: res })
      } else {
         reply.status(404).send({ message: 'user not found', data: res })
      }
   } catch (err) {
      console.log(err)
      reply.status(500).send({ message: 'server error' })
   }
});

router.post('/', async (req, reply) => {
   try {
      console.log(req.body);
      let res = await preRegisterUser(req.body)
      if (res.error) {
         reply.status(409).send({ message: 'duplicate email' })
         return
      } else if (res.email) {
         reply.status(200).send({ message: 'succesful' })
         return
      } else {
         reply.status(500).send({ message: 'server error' })
         return
      }
   } catch (err) {
      console.log(err)
      reply.status(500).send({ message: 'server error' })
   }
});

router.post('/verify-account', async (req, reply) => {
   try {
      console.log(req.body);
      let { code, email } = req.body;
      let res = await verifyUser(email, code);
      console.log(res)
      if (res.error == 'no account found') {
         reply.status(404).send({ message: 'no account found' })
      } else if (res.error=='wrong code') {
       reply.status(401).send({message:'wrong code'})
      } else if (res.user) {
         reply.status(200).send({ message: 'succesful', data: res })
      } else {
         reply.status(500).send({ message: 'server error' })
      }
   } catch (err) {
      console.log(err)
      reply.status(500).send({ message: 'server error' })
   }
});

router.put('/', authenticateToken, async (req: any, reply) => {
   try {
      let { email } = req.user;
      let res = await updateUser(email, req.body);
      if (res.error == 'no account found') {
         reply.status(404).send({ message: 'no account found' })
      } else if (res.user) {
         reply.status(200).send({ message: 'succesful', data: res })
      } else {
         reply.status(500).send({ message: 'server error' })
      }
   } catch (err) {
      console.log(err)
      reply.status(500).send({ message: 'server error' })
   }
})

router.get('/', authenticateToken, async (req: any, reply) => {
   let { email } = req.user;
   reply.send(await getUser(email))
});

router.post('/forgot-password', async (req, reply) => {
   try {
      console.log(req.body);
      let res = await forgotPassword(req.body.email)
      if (res) {
         reply.status(200).send({ message: 'successful', data: res })
      } else {
         reply.status(404).send({ message: 'user not found', data: res })
      }
   } catch (err) {
      console.log(err)
      reply.status(500).send({ message: 'server error' })
   }

});


router.post('/reset-password', async (req, reply) => {
   try {
      console.log(req.body);
      let res = await resetPassword(req.body)
      reply.status(200).send({ message: 'succesful', data: res })
   } catch (err) {
      console.log(err)
      reply.status(500).send({ message: 'server error' })
   }

});

router.post('/google-auth', async (req, reply) => {
   try {
      // console.log(req.body);
      // let res = await googleSignIn(req.body.credential)
      let res = await googleSignIn(req.body.token)
      // let res = await googleSignIn(req.body.code)
      if (res) {
         reply.status(200).send({ message: 'successful', data: res })
      } else {
         reply.status(404).send({ message: 'user not found', data: res })
      }
   } catch (err) {
      console.log(err)
      reply.status(500).send({ message: 'server error' })
   }
})


router.post('/feedback', async (req, reply) => {
   try {
      // console.log(req.body);
      let userAgent = req.get('user-agent');
      // console.log(user_agent);
      // return false;
      let res = await saveFeedBack(req.body,userAgent)
      if (res) {
         reply.status(200).send({ message: 'successful'})
      } else {
         reply.status(500).send({ message: 'an error occurred'})
      }
   } catch (err) {
      console.log(err)
      reply.status(500).send({ message: 'server error' })
   }
})


router.post('/waitlist', async (req, reply) => {
   try {
      // console.log(req.body);
      let res = await addToWaitlist(req.body)
      if (res) {
         reply.status(200).send({ message: 'successful'})
      } else {
         reply.status(500).send({ message: 'an error occurred'})
      }
   } catch (err) {
      console.log(err)
      reply.status(500).send({ message: 'server error' })
   }
})


export default router