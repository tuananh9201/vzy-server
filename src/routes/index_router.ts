import user_route from "./user";
import site_route from "./site";
import admin_route from "./admin";

export default (app:any) => {
    app.use('/users', user_route)
    app.use('/sites', site_route)
    app.use('/admin', admin_route)
}