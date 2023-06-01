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
 * cette fonction écoute la pression sur la souris, recupère le position x,y du lu pixel pressé
 * Ensuite elle crée le la figure retangulaire grace à une div
 * Avec le random, elle choisit une couleur aléatoire pour le rectangle
 * Ajoute un écouteur du click pour la suppression
 * ajoute un écouteur mousemove pour suivre le parcour de la souris entre le mousedown et le mouseup
 */
function getClickPosition(e) {
	xPosition = e.clientX;
	yPosition = e.clientY;
	divEltDraw = document.createElement("div");
	randomColor = Math.floor(Math.random() * 16777215).toString(16);
	divEltDraw.addEventListener("click", removeSquare, false);
	rootElement.addEventListener("mousemove", drawSquare, false);
}

/**
 * Cette fonction removeListener permet d'ajouter un écouteur à l'évènement mousemove qui nous permet
 * d'appeler a fonction qui dessine le rectangle
 */
function removeListener() {
	rootElement.removeEventListener("mousemove", drawSquare);
}

/**
 *
 * @param {} e
 * cette fonction dessine le rectangle grace à la position de mousedown recupérée avec la fonction getClickPosition
 * Et la position actuelle de la souris durant le mousemove
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
	rootElement.addEventListener("mouseup", removeListener, false);
}

/**
 *
 * @param {} e
 * cette fonction reçois l'évènement e, recupère l'élément sur lequel on a cliqué avec e.target
 * lance la rotation de l'élément et sauvegarde
 * dans un tableau des rectangles à supprimer.
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

function deleteSquare() {
	setTimeout(() => {
		tabForDelete.forEach((elt) => {
			rootElement.removeChild(elt);
		});
		comptBeforeDelete = 0;
		tabForDelete.splice(0, tabForDelete.length);
	}, 1000 * (tabForDelete.length - 1));
}
