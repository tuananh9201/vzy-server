import demoPage from "./default_pages/demo.json";
import blank from "./default_pages/blank.json";
import type { page } from "./types/site_type";

const getPage = (page: "demo" | "blank" | "portfolio" | "services") => {
    let res: page;
    switch (page) {
        case "demo":
            res = demoPage;
            break;
        default:
            res = blank;
            break;
    }
    res.pageId = makeid(10);
    return res;
};
export default getPage;

function makeid(length: number) {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_+=-~#@";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

export const getDefaultPage= () => ({
    design: {
        colour: {
            accent: "var(--c-blue)",
            textColour: "var(--c-light)",
        },
        headFont: "Inter",
        bodyFont: "Inter",
        headWeight: 700,
        shape: "r-small",
        letterSpacing: -0.05,
    },
    settings: {
        name: "Vzy Demo",
        link: "demo.vzy.co",
        favicon: "",
        email: "hey@vzy.co",
    },
    pageSettings: {
        title: "Vzy Demo",
        text:'',
        link: "demo.vzy.co",
        coverImage: "/assets/images/hero2.jpg",
    },
});