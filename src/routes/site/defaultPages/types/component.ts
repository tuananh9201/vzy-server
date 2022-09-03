export default interface component {
    type: string;
    data?: hero|any
    // index:number;

}



interface hero {
    title: string,
    subtitle: string,
    media: 'image' | 'video',
    media_link: string,
    action: 'button' | 'form',
    input: { email: boolean, name: boolean },
    button_text: string,
    link: string,
}
