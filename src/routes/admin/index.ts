import express from "express";
import { authenticateToken } from "../../modules/jwt";
import { downloadFeedback, downloadWaitlist, getFeedBack, getWaitlist, loginAdmin } from "./admin_controller";

var router = express.Router();

router.post("/login", async (req, reply) => {
  try {
    console.log(req.body);
    let res = await loginAdmin(req.body);
    console.log(res);
    if (res) {
      reply.status(200).send({ message: "successful", data: res });
    } else {
      reply.status(401).send({ message: "wrong credentials" });
    }

    //   if (res?.error) {
    //      reply.status(401).send({ message: 'wrong passwordd' })
    //   } else if (res?.user) {
    //      reply.status(200).send({ message: 'successful', data: res })
    //   } else {
    //      reply.status(404).send({ message: 'user not found', data: res })
    //   }
  } catch (err) {
    console.log(err);
    reply.status(500).send({ message: "server error" });
  }
});


router.get("/feedback", authenticateToken, async (req, reply) => {
  try {
    let res = await getFeedBack(Number(req.query.page || 1));
    reply.status(200).send(res);
  } catch (err) {
    console.log(err);
  }
});


router.get("/feedback/download",authenticateToken, async (req, reply) => {
  try {
    reply.redirect('download/backup.csv')
    // let res = await getCSV();
    // reply.writeHead(200,{'Content-Type':'text/csv'}).end(res);
    // // .send(res);
  } catch (err) {
    console.log(err);
  }
});



router.get("/feedback/download/:name",authenticateToken, async (req, reply) => {
  try {
    let res = await downloadFeedback();
    reply.writeHead(200,{'Content-Type':'text/csv'}).end(Buffer.from(res));
    // .send(res);
  } catch (err) {
    console.log(err);
  }
});




router.get("/waitlist", authenticateToken, async (req, reply) => {
  try {
    let res = await getWaitlist(Number(req.query.page || 1));
    reply.status(200).send(res);
  } catch (err) {
    console.log(err);
  }
});


router.get("/waitlist/download", authenticateToken, async (req, reply) => {
  try {
    reply.redirect('download/backup.csv')
    // let res = await getCSV();
    // reply.writeHead(200,{'Content-Type':'text/csv'}).end(res);
    // // .send(res);
  } catch (err) {
    console.log(err);
  }
});



router.get("/waitlist/download/:name", authenticateToken, async (req, reply) => {
  try {
    let res = await downloadWaitlist();
    reply.writeHead(200,{'Content-Type':'text/csv'}).end(Buffer.from(res));
    // .send(res);
  } catch (err) {
    console.log(err);
  }
});

export default router;
