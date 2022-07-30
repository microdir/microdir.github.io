/* VERSÃO 1.0.0 */
/* 
    * SCRIPTS TO PAGE CONTROLLERS 
    * CONSTRUCTOR REQUEST FOUR ELEMENTS DIV
*/
const PageControllers = class {
    
    constructor(primeiro, anterior, proximo, ultimo){
        this.primeiro = primeiro;
        this.anterior = anterior;
        this.proximo = proximo;
        this.ultimo = ultimo;
    }

    changePage = (element) => {
        if(!element.classList.contains("bt-active")){
            this.page(element.innerHTML);
        }   
    }

    nextPage = (action) => {
        if(action == "-1" || action == "+1"){
            const atual = document.getElementsByClassName("bt-active")[0].innerHTML;
            
            this.page(parseInt(atual) + parseInt(action));
        } else {
            this.page(action);
        }   
    }

    page = (num) => {
        this.showArrows(num);
        document.getElementsByClassName("bt-active")[0].classList.remove("bt-active");
        Array.from(document.getElementsByClassName("bt-controller")).filter((element) => {
            return element.innerHTML == num;
        })[0].classList.add("bt-active");

        if(characters.searchValue()){
            characters.searchAnime((num-1)*10);
        } else {
            characters.getAnime((num-1)*10);
        }
    }

    showArrows = (num) => {
        if(num > 4){
            this.primeiro.style.display = "inline-block";
            this.anterior.style.display = "inline-block";
            this.proximo.style.display = "none";
            this.ultimo.style.display = "none";
        } else if(num > 3){
            this.primeiro.style.display = "inline-block";
            this.anterior.style.display = "inline-block";
            this.proximo.style.display = "inline-block";
            this.ultimo.style.display = "none";
        } else if(num > 2){
            this.primeiro.style.display = "inline-block";
            this.anterior.style.display = "inline-block";
            this.proximo.style.display = "inline-block";
            this.ultimo.style.display = "inline-block";
        } else if(num > 1){
            this.primeiro.style.display = "none";
            this.anterior.style.display = "inline-block";
            this.proximo.style.display = "inline-block";
            this.ultimo.style.display = "inline-block";
        } else if(num == 1){
            this.primeiro.style.display = "none";
            this.anterior.style.display = "none";
            this.proximo.style.display = "inline-block";
            this.ultimo.style.display = "inline-block";
        }
    }
}