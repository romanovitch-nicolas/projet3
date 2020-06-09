class Menu {
	constructor() {
		this.menu = document.querySelector("nav");
		this.eltMenu = document.querySelectorAll("nav a");
		this.section = document.querySelectorAll("section");
		this.icon = document.getElementById("burger");
		this.initMenu(this.menu);
	}

	initMenu(menu) {
		// Correction du scroll vers les sections
		for (let i = 0; i < this.eltMenu.length; i++) {
			this.eltMenu[i].addEventListener("click", function(e) {
				e.preventDefault();
				window.scrollTo(0, this.section[i].offsetTop - 120);
			}.bind(this));
		}

		// Menu affiché/caché au resize de la page
		if (window.matchMedia("(max-width: 1024px)").matches) {
			menu.classList.add("invisible");
		};

		window.addEventListener("resize", function() {
			if (window.matchMedia("(max-width: 1024px)").matches) {
				menu.classList.add("invisible");
			} else {
				menu.classList.remove("invisible");
			}
		});

		// Affichage du menu burger
		this.icon.addEventListener("click", function() {
			menu.classList.toggle("invisible");
			menu.style.animation = "0.25s slide-in";
		});
	}
}

let menu = new Menu;