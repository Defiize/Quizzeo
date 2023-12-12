// Extern import
import express from "express"
import stringSimilarity from "string-similarity" 

// Intern import
import { DbRecipe } from "./DbRecipe.js"
import { getCountriesData } from "./countriesData.js"
import { initializeFfManager } from "./featureFlag.js"
import { tagRecipeDifficulty } from "./difficultyTagger.js"



const isEnabled = await initializeFfManager()

// let DbRecipe = null

// export function setDbRecipe(_DbRecipe){
//     DbRecipe = _DbRecipe
// }

export async function createApp() {
    const app = express()
    app.use(express.urlencoded({ extended: true }))

    app.set("view engine", "ejs")
    app.set("views", "./src/views")

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

        // Function to generate a "flag to country" question and receive the user's answer
    app.get("/quiz", async (req, res) => {
        const countriesData = await getCountriesData(); // Récupérer les données des pays depuis l'API

        // Random country
        const randomIndex = Math.floor(Math.random() * countriesData.length);
        const country = countriesData[randomIndex];
        const countryName = country.name.common;
        const flagURL = country.flags.png;

        // Display the question
        res.render("quiz", { flagURL, countryName });
    });

    app.post("/quiz", (req, res) => {
        const userAnswer = req.body.answer;
        const response = req.body.countryName

        // Based on the comparison result, send an appropriate response to the user
        if (userAnswer === response) {
            res.send("Correct! </br> <a href='/quiz'>Retourner au quiz</a>");

        } else {
            res.send(`Incorrect! Try again. </br> DEBUG: [User Answer: ${userAnswer}, Response: ${response}] </br> <a href='/quiz'>Retourner au quiz</a>`); // Si la réponse est incorrecte, affiche un lien de redirection vers /quiz
        }
    });


    return app
}
