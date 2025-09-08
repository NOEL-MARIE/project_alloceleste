
# Bienvenue dans la documentation Allocoa

Ce site explique pourquoi j'ai fait certains choix techniques dans le projet.

## Conception

Je vous invite à découvrir la maquette du site via ce lien Figma.
https://www.figma.com/design/PfoliLKkWoraSB2f2kasUO/Allo-Coca---Ben?node-id=2210-441096&p=f&t=D3w1bYGLwg0CEbsk-0

Je vous invite à consulter le dépôt Git dans lequel j'ai conservé l'intégralité du site.
http://github.com/NOEL-MARIE/allococa

## Architecture

Ici vous trouverez les détails sur l’architecture choisie.

vitepress
Générateur de site statique pour documentation.
```
https://vitepress.dev
```
vue-router
Routage pour applications Vue.
```
https://router.vuejs.org
````
pinia
Gestion d’état pour Vue 3.
```
https://pinia.vuejs.org
```


tailwindcss
Framework CSS utilitaire.
```
https://tailwindcss.com
```


vite-svg-loader
Loader SVG pour Vite.
```
https://github.com/jpkleemans/vite-svg-loader
```


typescript
Support du langage TypeScript.
```
https://typescriptlang.org
```


prettier
Outil de formatage automatique du code.
```
https://prettier.io
```


Tous mes fichiers Vue se trouvent dans le dossier principal views.
Par exemple, la page LandingPage.vue se trouve dans ce dossier views.

Toutes les sections liées à cette page sont regroupées dans un sous-dossier appelé LandingPage_Component, qui lui-même est situé dans le dossier components.

## Choix technologiques

Explications des raisons pour lesquelles j’ai opté pour tel ou tel outil.


# Point Ptratique 
À part utiliser les titres de sections avec "##" en Markdown dans VitePress, vous pouvez utiliser plusieurs autres options pour structurer et enrichir votre contenu :

Titres de différents niveaux : utilisez # à ###### pour les titres de niveau 1 à 6, permettant une hiérarchie claire.

Listes (à puces - ou numérotées 1.) pour organiser des idées ou éléments.

Blocs de code avec triple backticks ``` pour insérer du code ou des configurations.

Tableaux en Markdown pour comparer des données ou structurer des informations.

Citations avec > pour mettre en avant des notes ou extraits importants.

Texte en gras ou italique pour insister sur certains mots clés.

Lien et images pour illustrer ou référencer des ressources.

Composants Vue : grâce à VitePress qui supporte Vue 3, vous pouvez intégrer des composants Vue interactifs directement dans vos pages Markdown.

Notes de bas de page et Table des matières (via configuration VitePress ou Markdown étendu) pour faciliter la navigation.

Directives Markdown étendues ou plugins pour enrichir encore plus votre documentation (exemple : diagrammes, tableaux dynamiques).

````
^ → début de la chaîne (on vérifie depuis le premier caractère).

[A-Za-zÀ-ÖØ-öø-ÿ\s] → autorise uniquement :

les lettres A-Z majuscules et a-z minuscules

les lettres accentuées de À à ÿ (utile pour le français et d’autres langues latines)

\s → les espaces (pour permettre les prénoms composés comme Jean Pierre)

{3,} → il faut au moins 3 caractères valides (pas de limite max).

$ → fin de la chaîne (on s’assure que toute la valeur respecte la règle).

.test(name.value) → vérifie si la valeur name.value respecte la regex (retourne true ou false).
````





````
````

POUR LESEMAIS
````
^ → début de la chaîne.

[^\s@]+ →

^ à l’intérieur des crochets signifie "tout sauf"

donc [^\s@]+ = un ou plusieurs caractères qui ne sont ni des espaces (\s) ni le symbole @

ça correspond à la partie avant le @ dans un email.

@ → il doit y avoir exactement un symbole @.

[^\s@]+ → la partie après le @ et avant le point (.), donc le nom de domaine (ex: gmail).

\. → un point littéral (le . doit être écrit \. dans la regex pour ne pas signifier "n'importe quel caractère").

[^\s@]+ → la fin du domaine, ex: com, net, org.

$ → fin de la chaîne (on s’assure que tout l’email est conforme).
````