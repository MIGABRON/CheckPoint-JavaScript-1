// 1. Récupération de tous les éléments nécessaires depuis le HTML
var plusBtns = document.getElementsByClassName("fa-plus-circle");
var minusBtns = document.getElementsByClassName("fa-minus-circle");
var deleteBtns = document.getElementsByClassName("fa-trash-alt");
var likeBtns = document.getElementsByClassName("fa-heart");

// Fonction pour calculer et mettre à jour le prix total
function updateTotal() {
    var totalTag = document.querySelector(".total");
    var cardBodies = document.getElementsByClassName("card-body");
    var total = 0;

    // On parcourt les blocs de produits pour additionner (Prix unitaire * Quantité)
    // Note: On commence à i = 1 car le premier .card-body contient le total, 
    // et les suivants contiennent les vrais produits.
    for (var i = 1; i < cardBodies.length; i++) {
        var cardBody = cardBodies[i];
        
        // Récupérer le prix unitaire (ex: "100 $") et le transformer en nombre
        var unitPriceTag = cardBody.getElementsByClassName("unit-price")[0];
        var unitPrice = parseFloat(unitPriceTag.innerText); // Enlève le "$" et convertit en nombre

        // Récupérer la quantité
        var quantityTag = cardBody.getElementsByClassName("quantity")[0];
        var quantity = parseInt(quantityTag.innerText);

        // Ajouter au total général
        total = total + (unitPrice * quantity);
    }

    // Afficher le nouveau total dans l'élément HTML
    totalTag.innerText = total + " $";
}

// 2. Gestion des boutons PLUS (+)
for (var i = 0; i < plusBtns.length; i++) {
    plusBtns[i].addEventListener("click", function(event) {
        // Trouver l'élément quantité associé à ce bouton précis
        var container = event.target.parentElement; // la div qui contient le + et le -
        var quantityTag = container.getElementsByClassName("quantity")[0];
        
        var quantity = parseInt(quantityTag.innerText);
        quantity++; // Incrémenter
        quantityTag.innerText = quantity;

        updateTotal(); // Mettre à jour le total
    });
}

// 3. Gestion des boutons MOINS (-)
for (var i = 0; i < minusBtns.length; i++) {
    minusBtns[i].addEventListener("click", function(event) {
        var container = event.target.parentElement;
        var quantityTag = container.getElementsByClassName("quantity")[0];
        
        var quantity = parseInt(quantityTag.innerText);
        if (quantity > 0) {
            quantity--; // Décrémenter seulement si c'est supérieur à 0
            quantityTag.innerText = quantity;

            updateTotal(); // Mettre à jour le total
        }
    });
}

// 4. Gestion de la suppression d'un article (Poubelle)
for (var i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", function(event) {
        // Remonter jusqu'au conteneur principal du produit (.card-body externe) pour le supprimer entièrement
        var productCardBody = event.target.closest(".card-body");
        
        // Mettre la quantité à 0 avant de supprimer pour que le total se déduise correctement
        var quantityTag = productCardBody.getElementsByClassName("quantity")[0];
        if(quantityTag) {
            quantityTag.innerText = 0;
            updateTotal();
        }

        // Supprimer l'élément du DOM
        productCardBody.remove();
    });
}

// 5. Gestion du bouton "J'aime" (Cœur)
for (var i = 0; i < likeBtns.length; i++) {
    likeBtns[i].addEventListener("click", function(event) {
        // Changer la couleur du cœur au clic (bascule entre rouge et la couleur par défaut)
        var heart = event.target;
        
        // Vérifie si le cœur est déjà rouge, sinon le met en rouge
        if (heart.style.color === "red") {
            heart.style.color = ""; // Revient à la couleur initiale
        } else {
            heart.style.color = "red"; // Devient rouge
        }
    });
}
