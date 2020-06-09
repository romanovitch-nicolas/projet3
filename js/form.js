class Form {
   constructor() {
      this.btnReservation = document.getElementById("btnreservation");
      this.btnSubmit = document.getElementById("submit");
      this.formulaire = document.querySelector("form");
      this.initForm(this.formulaire);
   }

   initForm(formulaire) {
      // Pré-remplissage de "Nom" et "Prénom" si le formulaire à déjà été rempli
      if (localStorage.getItem("nom")) {
         nom.value = localStorage.getItem("nom");
         prenom.value = localStorage.getItem("prenom");
      }

      this.btnReservation.addEventListener("click", function() {
         // Affichage du formulaire
         formulaire.classList.remove("invisible");
         formulaire.animate([
            {transform: "translateY(-15%)", opacity: 0},
            {transform: "translateY(0)", opacity: 1}
         ], {
            duration : 250,
            iterations : 1
         });
      });

      this.btnSubmit.addEventListener("click", function() {
         // Fermeture du formulaire, et sauvegarde de "Nom" et "Prénom"
         let nom = document.getElementById("nom");
         let prenom = document.getElementById("prenom");
         if (nom.value !== "" && prenom.value !== "") {
            formulaire.classList.add("invisible");
            localStorage.setItem("nom", nom.value);
            localStorage.setItem("prenom", prenom.value);     
         };
         
         // Bordure rouge si une case n'est pas remplie
         if (nom.value === "") {
            nom.style.border = "1px solid #FF0000";
            nom.style.padding = "4px 7px";
         } else {
            nom.style.borderWidth = "2px";
            nom.style.borderStyle = "inset";
            nom.style.borderColor = "initial";
            nom.style.padding = "3px 6px";
         };

         if (prenom.value === "") {
            prenom.style.border = "1px solid #FF0000";
            prenom.style.padding = "4px 7px";
         } else {
            prenom.style.borderWidth = "2px";
            prenom.style.borderStyle = "inset";
            prenom.style.borderColor = "initial";
            prenom.style.padding = "3px 6px"; 
         };
      });
   }
}

let form = new Form;