import { getSite } from "../routes/site/site_controller";

export const isUserOwner = async (req: any, res: any, next: any) => {
    const siteId = req.params.siteId||req.body.siteId;
    const { email } = req.user;
    // console.log(email, siteId)

    const site = await getSite(siteId, email);
    if (site.error) {
        return res.status(403).send({ message: "you don't have permission to edit this site" });
    }
    next()
}
