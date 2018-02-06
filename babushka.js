//Json script hentes og variable defineres med en let.


let menu;
//for at loade Json, skal man bruge en async function
async function loadJson() {
    let minListe = await fetch("menu.json");
    menu = await minListe.json();
    //console.log(menu);
    let forretter = menu.filter(ret => ret.kategori == "forretter");
    let hovedretter = menu.filter(ret => ret.kategori == "hovedretter");
    let desserter = menu.filter(ret => ret.kategori == "desserter");
    let drikkevarer = menu.filter(ret => ret.kategori == "drikkevarer");


    console.log("ret er", menu[0].kategori);

    document.querySelector("#filter-alle").addEventListener("click", () => {
        visMenu(menu, "Menu")
    });

    document.querySelector("#filter-forretter").addEventListener("click", () => {
        visMenu(forretter, "Forretter")
    });

    document.querySelector("#filter-hovedretter").addEventListener("click", () => {
        visMenu(hovedretter, "Hovedretter")
    });

    document.querySelector("#filter-desserter").addEventListener("click", () => {
        visMenu(desserter, "Desserter")
    });
    document.querySelector("#filter-drikkevarer").addEventListener("click", () => {
        visMenu(drikkevarer, "Drikkevarer")
    });


    visMenu(menu, "Menu");

};
/*==========HENT Json-FIL SLUT==========*/
//Json script hentes og variable defineres med en let.
function visMenu(menu, overskrift) {
    //overskrift ændre sig.
    document.querySelector("[data-overskrift]").textContent = "";

    document.querySelector("[data-overskrift]").textContent = overskrift;
    let template = document.querySelector(".menutemplate");
    let modtager = document.querySelector(".menukort");
    modtager.innerHTML = "";

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
            document.querySelector(".popup").style.visibility = "visible";
            document.querySelector("[data-navn]").textContent = ret.navn;
            document.querySelector("[data-langbeskrivelse]").textContent = ret.langbeskrivelse;
            document.querySelector("[data-billede]").src = "imgs/medium/" + ret.billede + "-md.jpg";
            document.querySelector(".closepopup").addEventListener("click", hideSingle);
        }

    });
};

function hideSingle() {
    document.querySelector(".popup").style.visibility = "hidden";
    //style visibility linker til CSS-dokumentet. dvs. funktionen - visibile eller hidden.
};

document.addEventListener("DOMContentLoaded", loadJson);


//Pilen => er en arrow funktion som er et anonymt symbol.
//Her har vi en liste med elementer. Template bruger man som en skabelon. Hver eneste element i min liste skal præsenteres. Html containeren fungerer som modtager af min data.
//I Javascript har jeg mine 2 variabler. templatemodtager & mytemplate.
//ForEach betyder: for hvert element i min kode vil jeg gøre noget.
//hverPerson kan navngives hvad som helst, det er de informationer man får.
