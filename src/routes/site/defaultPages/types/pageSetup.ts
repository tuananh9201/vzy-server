export default interface PageSetup_types {
    design: {
        colour: { accent: string; textColour: string };
        headFont: string;
        bodyFont: string;
        headWeight: number;
        letterSpacing: number;
        cornerRadius:string
    };
    settings: {
        title: string;
    };
}
