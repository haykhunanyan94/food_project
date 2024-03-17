window.addEventListener("DOMContentLoaded", () => {
 const tabs = document.querySelectorAll(".tabheader__items .tabheader__item ");
const tabsContent = document.querySelectorAll(".tabcontainer .tabcontent");
const tabsParent = document.querySelector(".tabheader__items");
let animate = true;


function hideTabContent() {
    tabsContent.forEach(item=>{
        item.classList.add("hide");
        item.classList.remove("show", `${animate ? "fade" : null}`);
    }) ;

    tabs.forEach(item=>{
        item.classList.remove("tabheader__item_active");
    });

}
function showTabContent (item  = 0) {
    tabsContent[item].classList.remove("hide");
    tabsContent[item].classList.add("show",`${animate ? "fade" : null}`);
    tabs[item].classList.add("tabheader__item_active");
}
hideTabContent();
showTabContent()

tabsParent.addEventListener("click",(e) => {
    if(e.target && e.target.matches(".tabheader__item")) {
        tabs.forEach((item, index) => {
          if (e.target === item) {
            hideTabContent();
            showTabContent(index);
          }
        });
    }
});
});