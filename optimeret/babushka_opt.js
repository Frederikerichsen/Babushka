//Json script hentes og variable defineres med en let.
let menu;
let kategori;

document.addEventListener("DOMContentLoaded", loadJson);

//for at loade Json, skal man bruge en async function
async function loadJson() {
    let minListe = await fetch("menu.json");
    menu = await minListe.json();
    //menu.sort((a, b) => a.navn.localeCompare(b.navn));
    //find knappens overskrift og sæt dem til små bogstaver
    document.querySelector("nav").addEventListener("click", () => {

        //Hvis kategori er forskellig fra "alle" skal overskriften være knappes tekst - ellers skal den være "Menu"
        let kategori = event.target.textContent.toLowerCase();
        //Fordi kategorien alle ikke findes, skal man kalde den.
        if (kategori != "alle") {
            document.querySelector("[data-overskrift]").textContent = event.target.textContent;
            let kat = menu.filter(ret => ret.kategori == kategori);
            visMenu(kat, kategori);

        } else {
            visMenu(menu, kategori);
        }
    })
    visMenu(menu, "Menu");

};

function visMenu(menu, overskrift) {
    //overskrift bliver cleared og derefter ændrer den sig med en textcontent funktion.
    document.querySelector("[data-overskrift]").textContent = "";
    document.querySelector("[data-overskrift]").textContent = overskrift;
    //Template og modtager bliver defineret som en variable.
    let template = document.querySelector(".menutemplate");
    let modtager = document.querySelector(".menukort");
    //Modtager hentes? Skriv kommentar**
    modtager.innerHTML = "";
    // Skriv kommentar**
    menu.forEach(hverRet => {
        let klon = template.cloneNode(true).content;

        /*==========Indhold af ARRAY==========*/

        klon.querySelector("[data-billede]").src = "imgs/small/" + hverRet.billede + "-sm.jpg";
        klon.querySelector("[data-billede]").alt = "billede af " + hverRet.navn;
        klon.querySelector("[data-navn]").textContent = hverRet.navn;
        klon.querySelector("[data-oprindelsesregion]").textContent = hverRet.oprindelsesregion;
        klon.querySelector("[data-kortbeskrivelse]").textContent = hverRet.kortbeskrivelse;
        klon.querySelector("[data-pris]").textContent = "Pris:  " + hverRet.pris + " kr.";
        klon.querySelector("[data-ret]").setAttribute("data-id", hverRet.id);

        klon.querySelector("[data-ret]").addEventListener("click", showSingle);
        modtager.appendChild(klon);
    });
};

function showSingle() {
    document.querySelector("[data-billede]").src = "";
    //Ligesom funktionen cleartimer. - Clearer denne funktion containeren og før det nye billede vises
    //Preload funktion
    let myId = this.getAttribute("data-id")
    let single = menu.find(ret => {
        if (myId == ret.id) {
            //Hvis myId og ret matcher skal indhold vises
            //style visibility linker til CSS-dokumentet. dvs. funktionen - visibile eller hidden.
            document.querySelector(".popup").style.visibility = "visible";
            document.querySelector("[data-navn]").textContent = ret.navn;
            document.querySelector("[data-langbeskrivelse]").textContent = ret.langbeskrivelse;
            document.querySelector("[data-billede]").src = "imgs/medium/" + ret.billede + "-md.jpg";
            document.querySelector(".closepopup").addEventListener("click", hideSingle);
            document.querySelector(".popup").addEventListener("click", hideSingle);
            document.querySelector("#filter-alle").addEventListener("click", hideSingle);
            document.querySelector("#filter-forretter").addEventListener("click", hideSingle);
            document.querySelector("#filter-hovedretter").addEventListener("click", hideSingle);
            document.querySelector("#filter-desserter").addEventListener("click", hideSingle);
            document.querySelector("#filter-drikkevarer").addEventListener("click", hideSingle);
        }
        //Den her knap lukker popupvinduet ned med en keycommand i dette tilfælde esc.
        // Note til mig: Prøv at tilføje piltaste funktion.
        document.addEventListener("keydown", () => {
            if (event.which == 27) {
                hideSingle();
            }
        });
    });
};

function hideSingle() {
    document.querySelector(".popup").style.visibility = "hidden";
};

// SORTERING */
//Der er et problem med det kodestykke vi har fået udleveret. - Overskrifter mangler under hvert afsnit.

// ALFABETISK */
document.querySelector(".alfa").addEventListener("click", alfasort);
document.querySelector(".prisop").addEventListener("click", prisopsort);
document.querySelector(".prisned").addEventListener("click", prisnedsort);

function alfasort() {
    console.log(overskrift, kategori);
    menu.sort((a, b) => a.navn.localeCompare(b.navn));
    visMenu(menu);
    sletmarkering();
    this.classList.add("markeret");
}
// PRIS LAV TIL HØJ */

function prisopsort() {
    menu.sort((a, b) => b.pris - a.pris);
    visMenu(menu);
    sletmarkering();
    this.classList.add("markeret");
}
// PRIS HØJ TIL LAV */

function prisnedsort() {

    menu.sort((a, b) => a.pris - b.pris);
    visMenu(menu);
    sletmarkering();
    this.classList.add("markeret");
}

function sletmarkering() {
    document.querySelector(".alfa").classList.remove("markeret");
    document.querySelector(".prisop").classList.remove("markeret");
    document.querySelector(".prisned").classList.remove("markeret");
}


// BURGER MENU START */
document.querySelector(".burger").addEventListener("click", toggleMenu);

function toggleMenu() {
    document.querySelector(".burger").classList.toggle("change");
    document.querySelector("nav").classList.toggle("show");
    document.querySelector(".sortering").classList.toggle("show");
}


// BURGER MENU SLUT */


//Pilen => er en arrow funktion som er et anonymt symbol.
//Her har vi en liste med elementer. Template bruger man som en skabelon. Hver eneste element i min liste skal præsenteres. Html containeren fungerer som modtager af min data.
//I Javascript har jeg mine 2 variabler. templatemodtager & mytemplate.
//ForEach betyder: for hvert element i min kode vil jeg gøre noget.
//hverPerson kan navngives hvad som helst, det er de informationer man får.
