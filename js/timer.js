class Timer {
	constructor() {
		this.btnSubmit = document.getElementById("submit");
		this.textTimer = document.getElementById("reservation");
		this.nomStation = document.getElementById("nomstation");
		this.nom = document.getElementById("nom");
		this.prenom = document.getElementById("prenom");
		this.initTimer();
	}

	countdown() {
		// Timer
		if (this.minutes == 0 && this.secondes == 0) {
			clearInterval(this.timerAuto);
			this.textTimer.innerHTML = "Vous n'avez pas de réservation.";
			sessionStorage.clear();
		} else {
			if (this.secondes == 0) {
			this.secondes = 59;
			this.minutes--;
			} else {
				this.secondes--;
			}
			this.textTimer.innerHTML = '<i class="fas fa-check"></i> <strong>' + this.prenomActuel + " " + this.nomActuel + '</strong>,  votre vélo est reservé à <strong>' + this.nomStationActuel
			+ "</strong> pour <strong>" + this.minutes + " min " + this.secondes + " s</strong>.";
			sessionStorage.setItem("nomStation", this.nomStationActuel);
			sessionStorage.setItem("minutes", this.minutes);
			sessionStorage.setItem("secondes", this.secondes);
			sessionStorage.setItem("nom", this.nomActuel);
			sessionStorage.setItem("prenom", this.prenomActuel);
		}
	}

	playTimer() {
		// Lancement du timer si le formulaire est rempli
		if (this.nom.value !== "" && this.prenom.value !== "") {
			clearInterval(this.timerAuto);
			this.minutes = 20;
			this.secondes = 0;
			this.nomStationActuel = this.nomStation.textContent;
			this.nomActuel = this.nom.value;
			this.prenomActuel = this.prenom.value;
			this.timerAuto = setInterval(this.countdown.bind(this), 1000);
			this.textTimer.innerHTML = '<i class="fas fa-check"></i> Réservation effectuée.';
			window.scrollTo(0, document.body.scrollHeight);
		}
	}

	initTimer() {
		// Reprise du timer en cas d'actualisation
		if (sessionStorage.getItem("nomStation")) {
			this.nomStationActuel = sessionStorage.getItem("nomStation");
			this.minutes = sessionStorage.getItem("minutes");
			this.secondes = sessionStorage.getItem("secondes");
			this.nomActuel = sessionStorage.getItem("nom");
			this.prenomActuel = sessionStorage.getItem("prenom");
			this.timerAuto = setInterval(this.countdown.bind(this), 1000);
		}
		this.btnSubmit.addEventListener("click", this.playTimer.bind(this));
	}
}

let timer = new Timer;