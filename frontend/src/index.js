import CartScreen from "./screens/CartSreen.js";
import ErrorScreen from "./screens/ErrorScreen.js";
import HomeScreen from "./screens/HomeScreen.js";
import { parseRequestUrl } from "./ultis.js";

const routes = {
    "/": HomeScreen,
    "/cart": CartScreen,
}

const router = async () => {
    const request = parseRequestUrl();
    const parseUrl = (request.resource ? `/${request.resource}` : '/') + 
                        (request.id ? '/:id' : '') + 
                        (request.verb ? `${request.verb}` : '');

    const screen = routes[parseUrl] ? routes[parseUrl] : ErrorScreen;
    const main = document.getElementById('main-container');
    main.innerHTML = await screen.render();
    await screen.after_render();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);