# SAE-303

## Composition de L'equipe

- Bouchez Enzo
- Courmont Luka

## Description de l'architecture de visualisation

Nous avons conçu l'architecture de visualisation en considérant plusieurs facteurs : 
- Le type des données analysées 
- La provenance des données analysées 
- L'objectif que doit satisfaire l'analyse de ces données

Aprés avoir pris conaissance du sujet, nous sommes venus à la conclusion que l'objectif de l'analyse de ces données était de déterminer le Solveur le plus performant. 

Nous avons donc conçu l'architecture de visualisation selon cet objectif.

L'architecture principale est composée de 4 graphiques :
- Proportion globale de problèmes résolus et non résolus
- Temps de résolution moyen et médian de chaque solveur
- Taux de résolution de problèmes de chaque solveur
- Proportion de statuts UNSUPPORTED et UNKNOWN parmi le total des echécs de chaque solveur

En plus de cette architecture principale, Nous avons conçu des onglets spécifiques aux Solveurs et Problèmes. Ces onglets permettent de voir le temps de 
résolution moyen pour chaque problème et pour chaque Solveur, la proportion des differents statuts.

## Technologies utilisées

Pour réaliser ce projet, nous avons utilisé ChartJS dans une architecture HTML/CSS de base, ainsi que Parcel en tant que Bundler

## Problèmes rencontrés

### Lecture du fichier JSON 
  Résolution : Reprise exos et utilisation du lien du fichier sur le site

### GIT
  Problèmes dû à l'oubli de la création d'un fichier `.gitignore` et au manque d'organisation

### Utilisation de tableau d'objets
  Découverte des propriétés JS `Object.keys()` et `Object.values()`
  
## Screenshots 
![Screenshot 2023-01-04 at 16-50-51 SAE 301](https://user-images.githubusercontent.com/113178225/210582900-62d08d10-cfac-4a22-a0e3-80f022662877.png)
![Screenshot 2023-01-04 at 17-19-06 SAE 301](https://user-images.githubusercontent.com/113178225/210587917-030c2a10-fb1f-49e3-b0f3-f4d6c54bf5a8.png)
![Screenshot 2023-01-04 at 17-18-46 SAE 301](https://user-images.githubusercontent.com/113178225/210587926-0e50bc66-e61e-4bfb-80ce-c09f0e426ccb.png)


  

