import { Chart } from "chart.js/auto";

const req = new XMLHttpRequest();
let data = null;
req.addEventListener("load", (evt) => {
  data = JSON.parse(req.responseText);
  render();
});
req.open(
  "GET",
  "http://www.cril.univ-artois.fr/~lecoutre/teaching/jssae/code5/results.json"
);
req.send();

let family = [];
let familyAVG = [];
function render() {
  for (let i = 0; i < data[2]["data"].length; i++) {
    //boucle pour récupérer toutes les familles
    if (family.indexOf(data[2]["data"][i]["family"]) == -1) {
      //indexOf == -1 pour vérif si la valeur est dans le tableau
      family.push(data[2]["data"][i]["family"]); //si elle n'y est pas alors je la push
    }
  }



  for (let j = 0; j < family.length; j++) {
    //boucle qui parcours family
    let familleMoyenne = 0; //initialise la moyenne
    let compteur = 0; //compteur pour la division a la fin
    for (let k = 0; k < data[2]["data"].length; k++) {
      //boucle qui parcour les data
      if (data[2]["data"][k]["family"] == family[j]) {
        //si on trouve un objet de la famille recherché
        compteur += 1; //on ajoute un au compteur
        familleMoyenne += parseInt(data[2]["data"][k]["time"]); // j'ajoute a la valeur
      }
    }
    familleMoyenne /= compteur; //division finale
    let obj = {
      //création ded l'objet associé à la famille
      id: j,
      name: family[j],
      average: familleMoyenne,
    };
    familyAVG.push(obj); //je le push dans le tableau
  }



  let tempsMoyen = familyAVG.map((row) => row.average);
  let famille = familyAVG.map((row) => row.name);
  (async function () {
    new Chart(document.getElementById("problemes"), {
      type: "bar",
      data: {
        labels: famille,
        datasets: [
          {
            label: "Temps moyen de résolution en seconde",
            data: tempsMoyen,
          },
        ],
      },
    });
  })();
}
