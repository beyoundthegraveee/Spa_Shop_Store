import DashBoard from "../views/DashBoard.js";
import AboutView from "../views/AboutView.js";
import SignInView from "../views/SignInView.js";
import RegisterView from "../views/RegisterView.js";
import TShirtsView from "../views/TShirtsView.js";
import OuterwearView from "../views/OuterwearView.js";
import HoodiesView from "../views/HoodiesView.js";
import BottomsView from "../views/BottomsView.js";
import AccessoriesView from "../views/AccessoriesView.js";
import CartView from "../views/CartView.js";
import SearchView from '../views/SearchView.js';

const navigateTo = url =>{
    history.pushState(null, null,url);
    router();
}


const router = async() => {
    const routes = [
        {path: "/", view: DashBoard},
        {path: "/home", view: DashBoard },
        {path: "/about", view: AboutView},
        {path: "/login", view: SignInView},
        {path: "/register", view: RegisterView},
        {path: "/t-shirts-and-tops", view: TShirtsView },
        {path: "/hoodies", view: HoodiesView },
        {path: "/outerwear", view: OuterwearView },
        {path: "/bottoms", view: BottomsView},
        {path: "/accessories", view: AccessoriesView},
        {path: "/showcart", view: CartView},
        {path: "/search", view: SearchView}
    ];

    const potentialMatches = routes.map(route => {
        return{
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatches => potentialMatches.isMatch);

    if(!match){
        match ={
            route : routes[0],
            isMatch: true
        };
    }

    const view = new match.route.view();

    document.querySelector("#app").innerHTML = await view.getHtml();

    if (typeof view.addEventListeners === "function") {
        view.addEventListeners();
    }
};

window.addEventListener("popstate", router);


document.addEventListener("DOMContentLoaded", () =>{
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    if (message === 'registered') {
        alert('You registered successfully!');
    } else if (message === 'loggedin') {
        alert('You logged in successfully!');
    }
    document.body.addEventListener("click", e => {
        if(e.target.matches("[data-link]")){
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    router();
});

