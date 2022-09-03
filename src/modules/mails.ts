
export const confirmEmail = (data: { name: string, email: string,url:string }) => {

    return (
        `<p>Hi ${data.name}, </p>
    <p>Welcome to Vzy</p>
    <p>Just double-checking to make sure ${data.email} is your email address</p>
    <button><a href="${data.url}">Confirm Email</a></button>
    <p>Thank you</p>
    <p>You friends at Vzy</p>
    <p>Vzy Inc, · 2055 Limestone Rd Ste 200c · Wilmington, Delaware, USA 19808</p>
    `)
}

export default { confirmEmail }