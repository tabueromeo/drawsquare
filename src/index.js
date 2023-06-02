import "./style.css";
const rootElement = document.getElementById("root");
const divElt = document.createElement("div");
let randomColor = Math.floor(Math.random() * 16777215).toString(16);

const tabForDelete = [];
let comptBeforeDelete = 0;
let xPosition = 0;
let yPosition = 0;
let divEltDraw = null;

rootElement.style = "height:700px";
divElt.innerHTML = `<h1> Bienvenue au jeu de couleur et de carré</h1>`;
rootElement.appendChild(divElt);
rootElement.addEventListener("mousedown", getClickPosition, false);

/**
 * Cette fonction écoute la pression sur la souris, recupère le position x, y du pixel pressé
 * Ensuite elle crée la figure retangulaire grace à une div
 * Avec le random, elle choisit une couleur aléatoire pour le rectangle
 * Ajoute un écouteur du double-click pour la suppression
 * Ajoute un écouteur mousemove pour suivre le parcour de la souris entre le mousedown et le mouseup
 */
function getClickPosition(e) {
	xPosition = e.clientX;
	yPosition = e.clientY;
	divEltDraw = document.createElement("div");
	randomColor = Math.floor(Math.random() * 16777215).toString(16);

	divEltDraw.addEventListener("dblclick", removeSquare, false);
	rootElement.addEventListener("mousemove", drawSquare, false);
}

/**
 * Cette fonction removehandle permet de retirer l'écouter de l'évènement mousemove.
 * Elle sera appelée lorsque l'utilisateur va lacher la pression sur la souris mouseup
 */
function removehandle() {
	rootElement.removeEventListener("mousemove", drawSquare);
}

/**
 *
 * @param {} e
 * Cette fonction dessine le rectangle grace à la position de mousedown recupérée avec la fonction getClickPosition
 * Et la position actuelle de la souris durant le mousemove (x,y)
 * Ensuite, la fonction ajoute le rectangle comme enfant de la div principale d'id root
 * et écoute le mouseup, c-a-dire lorsque l'utilisation arrête de presser sur la souris
 */
function drawSquare(e) {
	let x = e.clientX;
	let y = e.clientY;

	if (x - xPosition < 0 || y - yPosition < 0) {
		divEltDraw.style = `background-color:#${randomColor};position:absolute;left:${x}px;top:${y}px;width:${Math.abs(
			x - xPosition
		)}px;height:${Math.abs(y - yPosition)}px`;
	} else {
		divEltDraw.style = `background-color:#${randomColor};position:absolute;left:${xPosition}px;top:${yPosition}px;width:${
			x - xPosition
		}px;height:${y - yPosition}px`;
	}

	rootElement.appendChild(divEltDraw);
	rootElement.addEventListener("mouseup", removehandle, false);
}

/**
 *
 * @param {} e
 * Cette fonction reçois l'évènement e, recupère l'élément sur lequel on a cliqué avec e.target
 * lance la rotation de l'élément et le sauvegarde
 * dans un tableau des rectangles à supprimer.
 * Elle lance ensuite la suppression qui doit patienter 2 minutes d'animation avant de s'excuter
 */
function removeSquare(e) {
	e.target.style.animation = "rotate 2s";
	tabForDelete.push(e.target);
	comptBeforeDelete += 1;
	if (comptBeforeDelete === 1) {
		setTimeout(() => {
			deleteSquare();
		}, 2000);
	}
}

/**
 * La fonction deleteSquare permet de supprimer les rectangle sauvegardé dans le tableau
 * Pour chaque rectangle à supprimer après le premier rectangle,
 * la fonction attends 1 minutes avant la suppression et suite, vide le tableau de suppression.
 */

function deleteSquare() {
	setTimeout(() => {
		tabForDelete.forEach((elt) => {
			rootElement.removeChild(elt);
		});
		comptBeforeDelete = 0;
		tabForDelete.splice(0, tabForDelete.length);
	}, 1000 * (tabForDelete.length - 1));
}
