/* VERSÃO 1.0.0 */
/* 
    * SCRIPTS TO SEARCH CHARACTERES 
    * AUTOMATIC INIT EVENT LISTENER ON ELEMENT INPUT SEARCH/TEXT
    * CONSTRUCTOR REQUEST ELEMENT DIV AND ELEMENT INPUT AND INT TO LIMIT CARDS
*/
const CharacteresData = class {

    constructor(cards, elementsearch, limitcards){
        this.cards = cards;
        this.elementsearch = elementsearch;
        this.limitcards = limitcards;
        this.startSearch();
    }

    searchValue(){
        return this.elementsearch.value;
    }

    startSearch = () => {
        this.elementsearch.addEventListener('keyup', ()=>{
            if(this.elementsearch.value){
                this.searchAnime(0);
            } else {
                this.getAnime(0);
            }
        });
    }

    getAnime = async(page) => {
        try{

            const url = "https://kitsu.io/api/edge/characters?page[limit]="+this.limitcards+"&page[offset]="+page;
            const response = await (await fetch(url)).json();
            
            this.cards.innerHTML = "";

            this.buscaLinks(response.data);

        } catch(error){
            console.log('Ocorreu um erro: '+error);
        }
    }

    searchAnime = async(page) => {
        try{

            const url = "https://kitsu.io/api/edge/characters?filter[name]="+this.elementsearch.value+"&page[limit]="+this.limitcards+"&page[offset]="+page;
            const response = await (await fetch(url)).json();
            
            this.cards.innerHTML = "";

            this.buscaLinks(response.data);

        } catch(error){
            console.log('Ocorreu um erro: '+error);
        }
    }

    buscaLinks = (response) => {
        const r = response.map(async (resp) => {
            const url1 = (resp ? resp.relationships.mediaCharacters.links.related : false);

            if(url1){
                const links_medias = await (await fetch(url1)).json();

                const medias = links_medias.data.map(async(element) => {
                    return await (await fetch(element.relationships.media.links.related)).json();
                });

                resp.medias = medias;

                return resp;
            }
        });
        
        this.addElements(r);
    }

    // ADD CARDS WITH CHARACTERES DETAILS
    addElements = (response) => {
        this.cards.innerHTML = "";

        response.forEach((promisse1) => {
            promisse1.then(resp => {
                var divimg = document.createElement("div");
                divimg.className = "img";
                divimg.style.backgroundImage = "url("+(resp.attributes.image ? resp.attributes.image.original : "")+")";
                divimg.style.float = "left";

                var desc = document.createElement("div");
                desc.innerHTML = "<strong>"+resp.attributes.name+"</strong>";
                desc.style.marginLeft = "20px";
                
                var divcol31 = document.createElement("div");
                divcol31.className = "col-3 flex-center-vertical";
                divcol31.appendChild(divimg);
                divcol31.appendChild(desc);

                var divcol32 = document.createElement("div");
                divcol32.className = "col-3 pl-24 sm-none limit-2-lines lines";

                // SECOND LINE RESPONSIVE
                var conteudosecondlineresp = document.createElement("div");
                conteudosecondlineresp.className = "col line3 hidden";
                
                var secondlineresp = document.createElement("div");
                secondlineresp.className = "row";
                secondlineresp.appendChild(conteudosecondlineresp);


                const array_medias = []
                resp.medias.forEach((promise, index) => {
                    promise.then(result => {
                        array_medias.push(result.data.attributes.canonicalTitle);
                        if(resp.medias.length-1 == index){
                            divcol32.innerHTML = array_medias.join(", ");
                            conteudosecondlineresp.innerHTML = "<hr><p><strong>Séries: </strong>"+array_medias.join(", ")+"</p>";
                        }
                    });
                });
                
                var divcol33 = document.createElement("div");
                divcol33.className = "col-3 pl-24 sm-none limit-2-lines lines";
                divcol33.innerHTML = resp.attributes.otherNames ? resp.attributes.otherNames.join(", ") : "";

                // FIRST LINE
                var divrow = document.createElement("div");
                divrow.className = "row";
                divrow.appendChild(divcol31);
                divrow.appendChild(divcol32);
                divrow.appendChild(divcol33);

                // SECOND LINE
                var divcoldesc = document.createElement("div");
                divcoldesc.className = "col hidden line2";
                divcoldesc.innerHTML = "<hr><p>"+resp.attributes.description+"</p>";

                var divrowdesc = document.createElement("div");
                divrowdesc.className = "row";
                divrowdesc.appendChild(divcoldesc);

                // 3ª LINE RESPONSIVE
                var conteudoresp3 = document.createElement("div");
                conteudoresp3.className = "col line3 hidden";
                conteudoresp3.innerHTML = resp.attributes.otherNames && resp.attributes.otherNames.length > 0 ? "<hr><strong>Eventos: </strong>"+resp.attributes.otherNames.join(", ") : "";
                
                var resp3 = document.createElement("div");
                resp3.className = "row";
                resp3.appendChild(conteudoresp3);

                var divcard = document.createElement("div");
                divcard.className = "card";
                divcard.appendChild(divrow);
                if(window.innerWidth <= 720){
                    divcard.appendChild(secondlineresp);
                    divcard.appendChild(resp3);
                }
                divcard.appendChild(divrowdesc);

                this.cards.appendChild(divcard);
                
                divcard.addEventListener('click', ()=>{
                    Array.from(document.getElementsByClassName("lines")).forEach((element) => {
                        if(element != divcol32 && element != divcol33){
                            element.classList.add("limit-2-lines");
                        }
                    });
                    Array.from(document.getElementsByClassName("line2")).forEach((element) => {
                        if(element != divcoldesc){
                            element.classList.add("hidden");
                        }
                    });
                    
                    divcol32.classList.toggle("limit-2-lines");
                    divcol33.classList.toggle("limit-2-lines");
                    divcoldesc.classList.toggle("hidden");

                    if(window.innerWidth <= 720){
                        Array.from(document.getElementsByClassName("line3")).forEach((element) => {
                            if(element != conteudosecondlineresp && element != conteudoresp3){
                                element.classList.add("hidden");
                            }
                        });
    
                        conteudosecondlineresp.classList.toggle("hidden");
                        conteudoresp3.classList.toggle("hidden");
                    }
                });    
            });
        });
    }
}