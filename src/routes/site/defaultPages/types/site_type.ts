export default interface site {
    id: string;
    design: design;
    settings: settings;
    pages: page[];
}

interface design {
    colour: { accent: string; textColour: string };
    headFont: string;
    bodyFont: string;
    headWeight: number;
    letterSpacing: number;
    shape: string;
}

interface settings {
    name: string;
    link: string;
    favicon: string;
    email: string;
}

export interface page {
    pageId: string;
    template:string;
    pageSettings: pageSettings;
    components: any[];
}

interface pageSettings {
    title: string;
    text: string;
    link: string;
    coverImage: string;
}

// interface components {}
