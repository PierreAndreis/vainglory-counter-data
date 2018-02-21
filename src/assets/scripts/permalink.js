import heroPageData from "./../../App.vue";

//Get URL params
function getHero () {
    var url = window.location.href.split("hero=")[1];
    heroPageData.currentHero = url;
}

export default getHero;