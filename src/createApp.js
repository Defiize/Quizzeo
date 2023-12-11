import express from "express"
import { initializeFfManager } from "./featureFlag.js"
import { tagRecipeDifficulty } from "./difficultyTagger.js"
import { getCountriesData } from "./countriesData.js"
import { DbRecipe } from "./DbRecipe.js"
import stringSimilarity from "string-similarity" 
const isEnabled = await initializeFfManager()

// let DbRecipe = null

// export function setDbRecipe(_DbRecipe){
//     DbRecipe = _DbRecipe
// }

export async function createApp() {
    const app = express()
    app.use(express.urlencoded({ extended: true }))

    app.set("view engine", "ejs")
    app.set("views", "C:/Travail/cordonbleu-maalsi22-main/src/views")

    app.get("/home", async (req, res) => {
        let recipes = await DbRecipe.find()
        recipes = recipes.map((recipe) => ({
            _id:recipe._id,
            name:recipe.name,
            difficulty: tagRecipeDifficulty(recipe)
        }))
        const showLoginButton = await isEnabled('login_button')
        res.render("home", { recipes , showLoginButton })
    })
    app.post("/recipe", async (req, res) => {
        const recipe = req.body
        const dbRecipe = new DbRecipe(recipe)
        await dbRecipe.save()
        res.redirect("/home")
    })

        // Fonction pour générer une question "drapeau vers pays" et recevoir la réponse de l'utilisateur
    app.get("/quiz", async (req, res) => {
        const countriesData = await getCountriesData(); // Récupérer les données des pays depuis l'API

        // Choix aléatoire d'un pays
        const randomIndex = Math.floor(Math.random() * countriesData.length);
        const country = countriesData[randomIndex];
        const countryName = country.name.common;
        const flagURL = country.flags.png;

        // Afficher la question (le drapeau) à l'utilisateur
        res.render("quiz", { flagURL, countryName });
    });

    // Endpoint pour recevoir la réponse de l'utilisateur via POST
    app.post("/quiz", (req, res) => {// Récupérer la réponse de l'utilisateur depuis le corps de la requête
        const userAnswer = req.body.answer;
        const response = req.body.countryName
        // Comparer la réponse de l'utilisateur avec la réponse attendue (par exemple, countryName obtenue lors de la génération de la question)
        // Vous pouvez implémenter votre logique de comparaison ici
        // Par exemple, vérifier si userAnswer correspond à countryName

        // En fonction du résultat de la comparaison, envoyer une réponse appropriée à l'utilisateur
        if (userAnswer === response) {
            res.send("Correct! </br> <a href='/quiz'>Retourner au quiz</a>");

        } else {
            res.send(`Incorrect! Try again. </br> DEBUG: [User Answer: ${userAnswer}, Response: ${response}] </br> <a href='/quiz'>Retourner au quiz</a>`); // Si la réponse est incorrecte, affiche un lien de redirection vers /quiz
        }
    });


    return app
}
