import express from "express";
import { createSite, getSite, getSites, handleUpload, publishSite, saveSite, editSite, duplicateSite, deleteSite, getDeletedSites, restoreSite, deleteSitePermanently } from "./site_controller";
import { authenticateToken, generateAccessToken } from '../../modules/jwt';
import { isUserOwner } from '../../modules/security';
import upload from "./modules/imageUpload";

var router = express.Router();

router.post('/publish', authenticateToken, async (req: any, reply) => {
    try {
        let { email } = req.user;
        let { id } = req.body
        console.log('publish site: ', id);
        let res = await publishSite(id, email)
        console.log(res)
        if (res) {
            reply.status(200).send({ message: 'successful', data: res });
        } else {
            reply.status(500).send({ message: 'an error occured' });
        }
    } catch (err) {
        console.log(err);
    }
})

router.post('/', authenticateToken, async (req: any, reply) => {
    try {
        console.log(req.body)
        let { name, url } = req.body
        let { email } = req.user;
        let res = await createSite(email, name);
        if (!res.error) {
            reply.status(200).send({ data: res.data })
        } else {
            reply.status(500).send("something's not right")
        }
    } catch (error) {
        console.log(error)
    }
})

router.get('/', authenticateToken, async (req: any, reply) => {
    try {
        let { email } = req.user;
        let res = await getSites(email);
        if (!res.error) {
            reply.status(200).send({ data: res.data })
        } else {
            reply.status(500).send("something's not right")
        }
    } catch (err) {
        console.log(err)
    }
})

router.get('/deleted', authenticateToken, async (req: any, reply) => {
    try {
        let { email } = req.user;
        let res = await getDeletedSites(email);
        if (!res.error) {
            reply.status(200).send({ data: res.data })
        } else {
            reply.status(500).send("something's not right")
        }
    } catch (err) {
        console.log(err)
    }
})

router.get('/:siteId', authenticateToken, async (req: any, reply) => {
    try {
        let { email } = req.user;
        let siteId = req.params.siteId
        let res = await getSite(siteId, email);
        if (!res.error) {
            reply.status(200).send({ data: res.data })
        } else {
            reply.status(500).send("something's not right")
        }
    } catch (err) {
        console.log(err)
    }
})

router.delete('/:siteId', authenticateToken, isUserOwner, async (req: any, reply) => {
    try {
        let { email } = req.user;
        let siteId = req.params.siteId
        let res = await deleteSite(siteId);
        if (!res.error) {
            reply.status(200).send({ data: res.data })
        } else {
            reply.status(500).send("something's not right")
        }
    } catch (err) {
        console.log(err)
    }
})

router.put('/deleted/:siteId', authenticateToken, isUserOwner, async (req: any, reply) => {
    try {
        let { email } = req.user;
        let siteId = req.params.siteId
        let res = await restoreSite(siteId);
        if (!res.error) {
            reply.status(200).send({ data: res.data })
        } else {
            reply.status(500).send("something's not right")
        }
    } catch (err) {
        console.log(err)
    }
})

router.delete('/deleted/:siteId', authenticateToken, isUserOwner, async (req: any, reply) => {
    try {
        let { email } = req.user;
        let siteId = req.params.siteId
        let res = await deleteSitePermanently(siteId);
        if (!res.error) {
            reply.status(200).send({ data: res.data })
        } else {
            reply.status(500).send("something's not right")
        }
    } catch (err) {
        console.log(err)
    }
})

router.put('/:siteId', authenticateToken, isUserOwner, async (req: any, reply) => {
    try {
        let { email } = req.user;
        let siteId = req.params.siteId;
        let name = req.body.name;
        let res = await editSite(siteId, { name });
        if (!res.error) {
            reply.status(200).send({ message: res.message })
        } else {
            reply.status(500).send({ message: "something's not right" })
        }
    } catch (err) {
        console.log(err)
        reply.status(500).send({ message: "something's not right" })
    }
})

router.post('/save', authenticateToken, async (req: any, reply) => {
    try {
        let { email } = req.user;
        console.log(email);
        let update = req.body;
        // console.log();
        let res = await saveSite(email, update);
        if (!res.error) {
            reply.status(200).send({ message: 'saved succesfully' });
        } else {
            reply.status(500).send("something's not right");
        }
    } catch (err) {
        console.log(err);
    }
})

// router.post
router.post('/upload/:siteId', authenticateToken, isUserOwner, upload.single('file'), async (req: any, reply) => {
    if (!req.file) {
        console.log("No file received");
        reply.status(400).send("no file received");
    } else {
        // console.log('file received');
        // console.log(req.file)
        // return
        let res = await handleUpload(req.file, req.params.siteId)
        if (!res.error) {
            reply.status(200).send({ message: 'upload successful', data: res.data });
        } else {
            reply.status(500).send("something's not right");
        }
    }
});

router.post('/duplicate/', authenticateToken, isUserOwner, async (req: any, reply) => {
    try {
        const siteId = req.body.siteId;

        let res = await duplicateSite(siteId);
        if (!res.error) {
            reply.status(200).send({ message: 'duplicated succesfully', data: res.data });
        } else {
            reply.status(500).send("something's not right");
        }
    } catch (err) {
        console.log(err);
    }
});

export default router