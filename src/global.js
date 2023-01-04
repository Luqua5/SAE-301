import Chart from 'chart.js/auto'


// Transformation des données de départ
function données (data) {

  let testResults = data[2].data
  console.log(testResults)
  
  let uniqueResults = [];
  
  testResults.forEach((testResult) => {
    uniqueResults[testResult.name] = uniqueResults[testResult.name] || {}; // Un objet par nom de solveur
    uniqueResults[testResult.name][testResult.status] = (uniqueResults[testResult.name][testResult.status] || 0) + 1; //Compte le nombre d'itération de chaque statut
    uniqueResults[testResult.name].name = testResult.name; // Récupération du nom de chaque objet
  });
  
  for (const name in uniqueResults) {
    let time = testResults
      .filter((result) => result.name === name)
      .map((result) => parseInt(result.time, 10))
      .sort((a, b) => a - b); //Récupération du temps
    uniqueResults[name].averageTime = time.reduce((total, time) => total + time, 0) / time.length; // Calcul du temps de résolution moyen
    uniqueResults[name].medianTime = time[Math.floor(time.length / 2)]; // Calcul du temps de résolution médian
  }
  
  console.log(uniqueResults);
  return uniqueResults
  }




// Requête JSON et fabrication du ChartJS

const req = new XMLHttpRequest();
req.addEventListener("load", evt => {
  let data = JSON.parse(req.responseText);
  data = données(data)


// Taux de réussite 
  let solvingRate = Object.values(data).map(row => row.SAT + row.UNSAT);
  console.log(solvingRate)

// Taux de réussite global
  let globalSolvingRate = 0;
for (let i = 0; i < solvingRate.length; i++) {
    globalSolvingRate += solvingRate[i];
}

  globalSolvingRate = Math.round(globalSolvingRate / 2000  * 100) + "%"


  let h2 = document.getElementById("globalSolvingRate")
  h2.textContent = globalSolvingRate

  new Chart(
    document.getElementById('results'),
    {
      type: 'bar',
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: 'Nombre de problèmes résolus',
            data: Object.values(data).map(row => row.SAT + row.UNSAT)
          },
          {
            label: 'Nombre de problèmes non-résolus',
            data: Object.values(data).map(row => {if(row.UNSUPPORTED > 0){ return row.UNKNOWN + row.UNSUPPORTED} return row.UNKNOWN})
          }
        ]
      },
      options: {
        layout: {
          padding: {
            top : 20,
            bottom : 50,
            left : 50,
            right : 50
          }
      },
        plugins: {
            title: {
                display: true,
                text: 'Proportion de problèmes résolus et non-résolus pour chaque solveur'
            }
        },
        scales: {
          y: {
            min: 0,
            max: 200,
          }
        }
    }
    }
  );

  new Chart(
    document.getElementById('fails'),
    {
      type: 'bar',
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: 'Nombre total de problèmes échoués par le solveur',
            data: Object.values(data).map(row => {if(row.UNSUPPORTED > 0){ return row.UNKNOWN + row.UNSUPPORTED} return row.UNKNOWN})
          },
          {
            label: 'Nombre de problèmes dont la solution est inconnue',
            data: Object.values(data).map(row => row.UNKNOWN)
          },
          {
            label: 'Nombre de problèmes non-supportés',
            data: Object.values(data).map(row => row.UNSUPPORTED)
          }
        ]
      },
      options: {
        indexAxis: 'y',
        layout: {
          padding: {
            top : 20,
            bottom : 50,
            left : 50,
            right : 50
          }
      },
        plugins: {
            title: {
                display: true,
                text: "Proportion de non-supportés et d'inconnu parmi les échecs"
            }
        },
        scales: {
          y: {
            min: 0,
            max: 200,
          },
          x: {
            min: 0,
            max: 200
          }
        }
    }
    }
  );

  new Chart(
    document.getElementById('avgTime'),
    {
      type: 'bar',
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: 'Temps de résolution médian',
            type: 'line',
            data: Object.values(data).map(row => row.medianTime)
          },
          {
            label: 'Temps de résolution moyen',
            data: Object.values(data).map(row => row.averageTime)
          }

        ]
      },
      options: {
        responsive: true,
        layout: {
          padding: 20
      },
        plugins: {
            title: {
                display: true,
                text: 'Temps de résolution moyens et médians pour chaque solveur (en secondes)'
            }
        },
        scales: {
          y: {
            min: 0,
            max: 10000,
          }
        }
    }
    }
  );

  new Chart(
    document.getElementById('solvedRate'),
    {
      type: 'bar',
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: 'Taux de résolution ( en % )',
            type: 'line',
            data: Object.values(data).map(row => ((row.SAT+row.UNSAT)/200)*100)
          }
        ]
      },
      options: {
        responsive: true,
        layout: {
          padding: 20
      },
        plugins: {
            title: {
                display: true,
                text: 'Taux de résolution de problèmes ( en % )'
            }
        },
        scales: {
          y: {
            min: 0,
            max: 100,
          }
        }
    }
    }
  );


})


req.open("GET", "http://www.cril.univ-artois.fr/~lecoutre/teaching/jssae/code5/results.json");
req.send()







