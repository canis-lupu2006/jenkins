/**
 * FICHIER : test/test.js
 * Rôle : Vérifier que la logique du panier et des prix fonctionne.
 */

// Simulation d'un environnement minimal pour éviter les erreurs liées au navigateur (DOM)
global.window = {};
global.document = {
    getElementById: () => ({ 
        classList: { add: () => {}, remove: () => {}, toggle: () => {} },
        innerText: "" 
    }),
    querySelectorAll: () => []
};

// Fonction de secours pour updateUI qui est appelée dans shop.js
global.updateUI = () => { 
    // console.log("   [Système] Simulation de mise à jour de l'interface"); 
};

// IMPORTATION : On remonte d'un dossier pour trouver shop.js
const { productsData, addToCart, removeFromCart } = require('../shop.js');

// On initialise un panier vide pour le test
let { cart } = require('../shop.js');

console.log("===========================================");
console.log("   TESTS AUTOMATISÉS : LA TABLÉE TOGOLAISE ");
console.log("===========================================");

// --- TEST 1 : Vérification du catalogue ---
function testCatalogue() {
    console.log("Test 1: Vérification du nombre de plats...");
    if (productsData.length >= 9) {
        console.log("✅ Succès : " + productsData.length + " plats trouvés dans le menu.");
    } else {
        console.error("❌ Erreur : Il manque des plats dans le catalogue !");
        process.exit(1);
    }
}

// --- TEST 2 : Ajout au panier ---
function testAjoutPanier() {
    console.log("Test 2: Ajout d'un Fufu Sauce Graine (ID: 1)...");
    
    addToCart(1); 
    
    // On vérifie le contenu du panier via l'objet exporté
    const cartActuel = require('../shop.js').cart;
    const fufu = cartActuel.find(item => item.id === 1);
    
    if (fufu && fufu.qty === 1) {
        console.log("✅ Succès : Le Fufu a bien été ajouté au panier.");
    } else {
        console.error("❌ Erreur : Le produit n'a pas été ajouté correctement.");
        process.exit(1);
    }
}

// --- TEST 3 : Vérification du prix Total ---
function testTotal() {
    console.log("Test 3: Vérification du calcul du total en FCFA...");
    
    const cartActuel = require('../shop.js').cart;
    const total = cartActuel.reduce((acc, item) => acc + (item.price * item.qty), 0);
    
    // Le Fufu coûte 2500 FCFA
    if (total === 2500) {
        console.log("✅ Succès : Le total est correct (2500 FCFA).");
    } else {
        console.error("❌ Erreur : Mauvais calcul du total ! Reçu : " + total);
        process.exit(1);
    }
}

// LANCEMENT DE LA SUITE DE TESTS
try {
    testCatalogue();
    testAjoutPanier();
    testTotal();
    console.log("===========================================");
    console.log("      RÉSULTAT : TOUT EST PARFAIT 🇹🇬      ");
    console.log("===========================================");
} catch (error) {
    console.error("💥 TEST ÉCHOUÉ : " + error);
    process.exit(1);
}