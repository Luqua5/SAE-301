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



let solveurs = [];
let solveurPerf = [];
function render() {
  for (let i = 0; i < data[2]["data"].length; i++) {
    if (solveurs.indexOf(data[2]["data"][i]["name"]) == -1) {
      solveurs.push(data[2]["data"][i]["name"]);
    }
  }


  //je récupère les données
  for (let j = 0; j < solveurs.length; j++) {
    let SAT = 0;
    let UNSAT = 0;
    let unknown = 0;
    let unsupported = 0
    for (let k = 0; k < data[2]["data"].length; k++) {
      if (data[2]["data"][k]["name"] == solveurs[j]) {
        if(data[2]["data"][k]["status"] == "SAT"){
          SAT++;
        }
        if(data[2]["data"][k]["status"] == "UNSAT"){
          UNSAT++;
        }
        if(data[2]["data"][k]["status"] == "UNKNOWN"){
          unknown++;
        }
        if(data[2]["data"][k]["status"] == "UNSUPPORTED"){
          unsupported++;
        }
      }
    }
    let obj = {
      id: j,
      name: solveurs[j],
      SAT: SAT,
      UNSAT: UNSAT,
      UNKNOWN: unknown,
      UNSUPPORTED: unsupported
    };
    solveurPerf.push(obj);
  }

  //chaque fois qu'un utilisateur choisit une option dans la liste, ça charge le graphique correspondant
  document.querySelector("select").addEventListener("change", (e) => {
    for (solveur of solveurPerf) {
      if(solveur.name == e.target.value){
        if(document.getElementById("laDiv").firstElementChild){ //si il y a un canva je le supprime, pour en mettre un nouveau
          canvas = document.querySelector("canvas");
          document.getElementById("laDiv").removeChild(canvas);
        }
        let graph = document.createElement("canvas"); //on crée le canva
        (async function () { //on met le graphique dedans
          console.log(solveur.unknown);
              new Chart(graph, {
                type: "pie",
                data: {
                  labels: ["SAT", "UNSAT", "UNKNOWN", "UNSUPPORTED"],
                  datasets: [
                    {
                      label: "Nombre de problème",
                      data: [solveur.SAT, solveur.UNSAT, solveur.UNKNOWN, solveur.UNSUPPORTED]
                    },
                  ],
                },
              });
              document.getElementById("laDiv").append(graph); //on insère le canva dans la div
            })();


      }
    }
    
  
  
  });

  
}
