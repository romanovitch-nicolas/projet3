class Map {
	constructor() {
		this.map = L.map('map').setView([48.6897, 6.17399], 14);
		this.layer = L.tileLayer('http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			minZoom: 13
			}).addTo(this.map);
		this.loadApi(this.map);
	}

	loadApi(map) {
		// Récupération de l'API JCDecaux
		ajaxGet('https://api.jcdecaux.com/vls/v1/stations?contract=Nancy&apiKey=b85d09b310ff710e3fd3fe9716d87abd26abcd45', function (reponse) {
			let stations = JSON.parse(reponse);
			stations.forEach(function (station) {
				// 2 marqueurs différents
				let imageLink;
				if (station.available_bikes > 0 && station.status === "OPEN") {
					imageLink = "marqueur_vert";
				} else {
					imageLink = "marqueur_orange";
				};

				let icone = L.icon({
					iconUrl: `images/${imageLink}.png`,
					iconSize: [33, 50],
					iconAnchor: [17, 50],
					popupAnchor: [0, -50]
				});

				// Affichage des marqueurs
				let marqueur = L.marker([station.position.lat, station.position.lng], {icon: icone}).addTo(map);

				// Affichage des détails de la station
				marqueur.addEventListener("click", function() {
					let nomStation = document.getElementById("nomstation");
					nomStation.innerHTML = station.name;
					// Homogénéisation des noms de stations
					nomStation.innerHTML = nomStation.innerHTML.replace(" (CB)", "").replace(/(\d{5} - )/, "");

					let adresseStation = document.getElementById("adressestation");
					adresseStation.innerHTML = station.address;

					let statutStation = document.getElementById("statutstation");
					if (station.status === "OPEN") {
						statutStation.innerHTML = "Station OUVERTE";
						statutStation.style.color = "#1E9116";
					} else {
						statutStation.innerHTML = "Station FERMEE";
						statutStation.style.color = "#DE1F12";
					};

					let veloStation = document.getElementById("velostation");
					veloStation.innerHTML = "Nombre de vélos disponibles : " + station.available_bikes;

					let placeStation = document.getElementById("placestation");
					placeStation.innerHTML = "Nombre de places disponibles : " + station.available_bike_stands;

					let btnReservation = document.getElementById("btnreservation");
					let noReservation = document.getElementById("noreservation");
					if (station.available_bikes > 0 && station.status === "OPEN") {
						btnReservation.classList.remove("invisible");
						noReservation.innerHTML = "";
					} else {
						btnReservation.classList.add("invisible");
						noReservation.innerHTML = "Cette station est fermée, ou n'a plus de vélos disponibles.";
					};

					let infoStation = document.getElementById("infostation");
					infoStation.animate([
						{transform: "translateY(-15%)", opacity: 0},
						{transform: "translateY(0)", opacity: 1}
					], {
						duration : 250,
						iterations : 1
					});

					// Fermeture du formulaire en cas de clic sur un autre marqueur
					let formulaire = document.querySelector("form");
					if (formulaire.className !== "invisible") {
						formulaire.classList.add("invisible");
					};
				});
			});
		});
	}
}

let carte = new Map;