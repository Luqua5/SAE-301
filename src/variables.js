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

let nbVariables = [];
let variableAVG = [];
function render() {
  for (let i = 0; i < data[2]["data"].length; i++) {
    if (nbVariables.indexOf(data[2]["data"][i]["nb_variables"]) == -1) {
      nbVariables.push(data[2]["data"][i]["nb_variables"]); 
    }
  }



  for (let j = 0; j < nbVariables.length; j++) {
    let variableMoyenne = 0;
    let compteur = 0;
    for (let k = 0; k < data[2]["data"].length; k++) {
      if (data[2]["data"][k]["nb_variables"] == nbVariables[j]) {
        compteur += 1; 
        variableMoyenne += parseInt(data[2]["data"][k]["time"]); 
      }
    }
    variableMoyenne /= compteur; 
    let obj = {
      id: j,
      nbVariables: nbVariables[j],
      average: variableMoyenne,
    };
    variableAVG.push(obj);
    }
    console.log(variableAVG);

    function compare(a, b) {
        if (a.average < b.average) {
          return -1;
        }
        if (a.average > b.average) {
          return 1;
        }
        return 0;
    }

    variableAVG.sort(compare);
    console.log(compare);



  let tempsMoyen = variableAVG.map((row) => row.average);
  let famille = variableAVG.map((row) => row.nbVariables);
  (async function () {
    new Chart(document.getElementById("problemes"), {
      type: "line",
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
