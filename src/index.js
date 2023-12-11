import mongoose from "mongoose";
import { createApp } from "./createApp.js";
import { initializeFfManager} from "./featureFlag.js";
import { DbRecipe } from "./DbRecipe.js"

const isEnabled = await initializeFfManager()

if (isEnabled('login_button')) {
    console.log("show login!");
}

const app = await createApp()

await mongoose.connect("mongodb://localhost:27017/cordonbleu")
app.listen(8080)