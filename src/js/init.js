/* VERSÃO 1.0.0 */
/* INIT ON LOAD PAGE */
let pages = new PageControllers(
    document.getElementById("primeiro"),
    document.getElementById("anterior"),
    document.getElementById("proximo"),
    document.getElementById("ultimo")
);

let characters = new CharacteresData(document.getElementById("cards"),document.getElementById("pesquisa"),10);

(()=>{
    characters.getAnime(0);
    // getAnime(0);
    Array.from(document.getElementsByClassName("bt-controller")).forEach((element) => {
        element.addEventListener('click', ()=>{
            pages.changePage(element);
        });
    });
    Array.from(document.getElementsByClassName("img-controller")).forEach((element) => {
        element.addEventListener('click', ()=>{
            pages.nextPage(element.getAttribute("data-action"));
        });
    });
    let header = document.getElementsByTagName('header')[0];
    document.getElementsByTagName('body')[0].onscroll = () => {
        effectScroll(header, this);
    }
})();

function effectScroll(header, body){
    if(body.scrollY > 2){
        header.classList.add("shadow-low");
    } else {
        header.classList.remove("shadow-low");
    }
}