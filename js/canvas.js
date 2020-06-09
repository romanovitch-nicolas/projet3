class Canvas {
	constructor() {
		this.canvas = document.querySelector("canvas");
		this.btnClear = document.getElementById("clear");
		this.btnSubmit = document.getElementById("submit");
		this.ctx = this.canvas.getContext("2d");
		this.ctx.lineJoin = "round";
		this.ctx.strokeStyle = "#000";
		this.ctx.lineWidth = 4;
		this.posX = [];
		this.posY = [];
		this.drag = [];
		this.initControls();
	}

	initControls() {
	// Initialisation des différents contrôles
		// Récupération de la position du curseur, et lancement de la fonction "draw"
		this.canvas.addEventListener("mousedown", function(e) {
			this.paint = true;
			this.pushPos(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop);
			this.draw();
		}.bind(this));

		// Tant que le clic est enfoncé, récupération de chaque position du curseur, et lancement de la fonction "draw"
		this.canvas.addEventListener("mousemove", function(e) {
			if (this.paint) {
				this.pushPos(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop, true);
				this.draw();
			}
		}.bind(this));

		// La fonction "draw" s'arrête si le clic est relaché, ou si le curseur sort du canvas
		this.canvas.addEventListener("mouseup", function() {this.paint = false;}.bind(this));
		this.canvas.addEventListener("mouseleave", function() {this.paint = false;}.bind(this));

		// Au clic sur "Effacer" ou sur "Valider", si le formulaire est complet, lancement de la fonction "clear"
		this.btnClear.addEventListener("click", this.clear.bind(this));
		this.btnSubmit.addEventListener("click", function() {
			let nom = document.getElementById("nom");
			let prenom = document.getElementById("prenom");
			if (nom.value !== "" && prenom.value !== "") {
				this.clear();
			}
		}.bind(this));

		// Gestion des événements mobiles
		this.canvas.addEventListener("touchstart", function (e) {
			this.paint = true;
			let touch = e.touches[0];
			this.pushPos(touch.pageX - this.canvas.offsetLeft, touch.pageY - this.canvas.offsetTop);
			this.draw();
			// Empêche le scroll
			e.preventDefault();
		}.bind(this));
		this.canvas.addEventListener("touchend", function (e) {this.paint = false}.bind(this));
		this.canvas.addEventListener("touchmove", function (e) {
			if (this.paint) {
				let touch = e.touches[0];
				this.pushPos(touch.pageX - this.canvas.offsetLeft, touch.pageY - this.canvas.offsetTop, true);
				this.draw();
			}
		}.bind(this));
	};

	pushPos(x, y, drag) {
	// Place la position du curseur dans des tableaux, et affiche le bouton "Valider" si il y a un dessin
		this.posX.push(x);
		this.posY.push(y);
		this.drag.push(drag);

		if (this.posX.length > 5) {
			this.btnSubmit.style.visibility = "visible";
		};
	};

	draw() {
	// Pour chaque position du curseur, un point est dessiné
		for (let i = 0; i < this.posX.length; i++) {
			this.ctx.beginPath();
			if (this.drag[i] === true) {
				this.ctx.moveTo(this.posX[i-1], this.posY[i-1]);
			} else {
				this.ctx.moveTo(this.posX[i]-1, this.posY[i]);
			}
			this.ctx.lineTo(this.posX[i], this.posY[i]);
			this.ctx.closePath();
			this.ctx.stroke();
		};
	};

	clear() {
	// Clear le canvas, et cache le bouton "Valider"
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
   		this.posX = [];
   		this.posY = [];
   		this.drag = [];
   		
   		if (this.btnSubmit.style.visibility !== "hidden") {
           	this.btnSubmit.style.visibility = "hidden";
           };
	};
};

let signature = new Canvas;