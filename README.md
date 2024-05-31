# iVibes
iVibes est une application Android/iOS développé en React Native, et utilisant l'API d'iTunes pour récupérer les informations de titres musical dans la base de donnée iTunes à savoir les titres, les auteurs ou des preview de 30s.  
L'application permet alors :
- Explorer avec une recherche qui s'actualise
- Explorer tout les titres trouvés dans les résultats
- Explorer les artistes
- Explorer les musiques d'un artistes
- Mettre en pause, arrêter, mettre en boucle
- Ajouter en favoris
- Like/Dislikes (pour une future implémentation de reviews plus appronfondies?)
- Afficher les favoris/likes sur la page d'accueil
- Explorer une tab pour les favoris/likes/dislikes en liste

## Utilisation de l'application
![Screenshot_2024-06-01-00-12-34-876_host exp exponent-imageonline co-merged](https://github.com/teddyfresnes/LP_iVibes/assets/80900011/52c39b23-507d-45c2-9b39-192495b35fb9)  

## Affichage des titres sauvegardés
![Screenshot_2024-06-01-00-12-51-195_host exp exponent-imageonline co-merged](https://github.com/teddyfresnes/LP_iVibes/assets/80900011/fae84844-01c8-4c66-abba-fecd98aec2d9)  


# Features et progression technique
- Recherche en temps réel (recherche s'actualise à chaque changement de caractère)
- Aperçu de 3 artistes et 3 titres et possibilité d'afficher davantage
- Filtrer les musiques par nom d'artistes
- Gestion de la limite de recherche étant de 3 caractères sans espaces pour l'api (on rajoute des char)
- Lecture audio automatiquement lancé ou stoppé à chaque affichage de résultats
- Slide retourne à 0 quand la lecture est enclenché (bug rencontré sur le mouvement du slide stoppant le titre)
- Amélioration du slide et du timer incorrect (pour avoir les 30s)
- Page Home qui contient la recherche + les boutons d'accueil permettant la recherche interactive, les éléments de recherches et d'accueil sont donc alternativement visibles/invisibles
- Actualisation de la page d'accueil (si on enlève le like d'un titre, on retirer le titre de la page d'accueil)
- Boutons intuitifs pour sauvegarder les titres + Ajout du bouton favoris directement dans la ligne d'affichage du titre

# Structure du projet
## navigation
- AppNavigator.js
## Screens
- HomeScreen.js : page d'affichage d'accueil pour l'ensemble de la recherche et des interactions
- DetailScreen.js : page d'affichage du résultat (rassemblement des composants)
- FavoritesScreen.js : page d'affichage liste des titres ajoutés en favoris (pour sa propre base)
- LikedMusicScreen.js : page d'affichage liste des titres aimés
- DislikedMusicScreen.js : page d'affichage liste des titres pas aimés
## Components
- ResultDetail.js : design du résultat (image, titre, likes ect)
- AudioPlayer.js : lecteur audio pour le titre
- SearchResultItem.js : design de la ligne du titre
- ResultsList.js : affichage de la liste contenant les SearchResultItem
- ArtistList.js : affichage d'une liste d'artistes (différentes des titres)
- SectionRenderer.js : affichage des sections de résultats et d'artistes, masquage des éléments de l'accueil et inversement
- SearchBar.js : barre de recherche
- ButtonSection.js : boutons et redirection
- HorizontalScrollList : affichage en scroll horizontal style wordpress sur la page d'accueil pour faire moins vide


