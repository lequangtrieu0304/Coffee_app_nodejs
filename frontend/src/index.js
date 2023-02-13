import Header from "./components/Header.js";
import CartScreen from "./screens/CartSreen.js";
import ErrorScreen from "./screens/ErrorScreen.js";
import HomeScreen from "./screens/HomeScreen.js";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.js";
import ShippingScreen from "./screens/ShippingScreen.js";
import { parseRequestUrl } from "./ultis.js";

const routes = {
    "/": HomeScreen,
    "/cart": CartScreen,
    "/shipping": ShippingScreen,
    "/orderplace": PlaceOrderScreen,
}

const router = async () => {
    const request = parseRequestUrl();
    const parseUrl = (request.resource ? `/${request.resource}` : '/') + 
                        (request.id ? '/:id' : '') + 
                        (request.verb ? `${request.verb}` : '');

    const screen = routes[parseUrl] ? routes[parseUrl] : ErrorScreen;

    const header = document.getElementById('header-container');
    header.innerHTML = await Header.render();

    const main = document.getElementById('main-container');
    main.innerHTML = await screen.render();
    if(screen.after_render) await screen.after_render();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);