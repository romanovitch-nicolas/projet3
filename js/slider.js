class Slider {
	constructor() {
		this.images = document.querySelectorAll(".slide");
		this.bulles = document.querySelectorAll(".bulle");
		this.boutonDroite = document.getElementById("boutondroite");
		this.boutonGauche = document.getElementById("boutongauche");
		this.boutonPause = document.getElementById("pause");
		this.boutonPlay = document.getElementById("play");
		this.index = 0;
		this.slideAuto;
		this.reset();
		this.initControls();
	};

	reset() {
	// Vérification de l'index pour avoir un slider infini
		if (this.index === this.images.length) {
			this.index = 0;
		} else if (this.index === -1) {
			this.index = this.images.length - 1;
		};
		this.affichage();
	};

	affichage() {
	// Affichage d'une seule image et de sa pagination
		for (let i = 0; i < this.images.length; i++) {
			this.images[i].classList.add("invisible");
			this.bulles[i].style.backgroundColor = "#808080";
		};		
		this.images[this.index].classList.remove("invisible");
		this.images[this.index].style.animation = "0.4s opacity";
		this.bulles[this.index].style.backgroundColor = "#FFF";
	};

	initControls() {
	// Initialisation des différents contrôles
		this.slideAuto = setInterval(this.slideSuivante.bind(this), 5000);
		this.boutonDroite.addEventListener("click", this.slideSuivante.bind(this));
		this.boutonGauche.addEventListener("click", this.slidePrecedente.bind(this));
		this.boutonPlay.addEventListener("click", this.play.bind(this));
		this.boutonPause.addEventListener("click", this.pause.bind(this));
		document.addEventListener("keydown", this.clavier.bind(this));
		// Clic sur les bulles de pagination
		for (let i = 0; i < this.bulles.length; i++) {
			this.bulles[i].addEventListener("click", function() {
				this.index = i;
				this.reset();
			}.bind(this));
		};
	};

	slideSuivante() {
	// Slide suivante
		this.index++;
		this.reset();
	};

	slidePrecedente() {
	// Slide précédente
		this.index--;
		this.reset();
	};

	clavier(e) {
	// Gestion des flèches gauche et droite du clavier
		if (e.key === "ArrowLeft") {
			this.slidePrecedente();
		} else if (e.key === "ArrowRight") {
			this.slideSuivante();
		};
	};

	pause() {
	// Gestion du bouton "pause"
		this.boutonPause.classList.add("invisible");
		this.boutonPlay.classList.remove("invisible");
		clearInterval(this.slideAuto);
	};

	play() {
	// Gestion du bouton "play"
		this.boutonPlay.classList.add("invisible");
		this.boutonPause.classList.remove("invisible");
		this.slideAuto = setInterval(this.slideSuivante.bind(this), 5000);
	};
};

let slider = new Slider;