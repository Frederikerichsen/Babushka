//Json script hentes og variable defineres med en let.

document.addEventListener("DOMContentLoaded", loadJson);

//for at loade Json, skal man bruge en async function
async function loadJson() {
    let minListe = await fetch("menu.json");
    menu = await minListe.json();
    console.log(menu);
    let forretter = menu.filter(ret => ret.kategori == "forretter");
    let hovedretter = menu.filter(ret => ret.kategori == "hovedretter");
    let desserter = menu.filter(ret => ret.kategori == "desserter");
    let drikkevarer = menu.filter(ret => ret.kategori == "drikkevarer");



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

    document.querySelector("[data-overskrift]").textContent = overskrift;
    let template = document.querySelector(".menutemplate");
    let modtager = document.querySelector(".menukort");
    modtager.innerHTML = "";

    menu.forEach(event => {
        let klon = template.cloneNode(true).content;

        /*==========Indhold af ARRAY==========*/

        klon.querySelector(".billede").src = "imgs/small/" + event.billede + "-sm.jpg";
        klon.querySelector(".billede").alt = "billede af " + event.navn;
        klon.querySelector(".navn").textContent = event.navn;
        klon.querySelector(".oprindelsesregion").textContent = event.oprindelsesregion;
        klon.querySelector(".kortbeskrivelse").textContent = event.kortbeskrivelse;
        klon.querySelector(".pris").textContent = "Pris:  " + event.pris + " kr.";

        modtager.appendChild(klon);
    });
};


//Pilen => er en arrow funktion som er et anonymt symbol.
//Her har vi en liste med elementer. Template bruger man som en skabelon. Hver eneste element i min liste skal præsenteres. Html containeren fungerer som modtager af min data.
//I Javascript har jeg mine 2 variabler. templatemodtager & mytemplate.
//ForEach betyder: for hvert element i min kode vil jeg gøre noget.
//hverPerson kan navngives hvad som helst, det er de informationer man får.
