import mongoose from "mongoose";

const DbRecipeSchema = mongoose.Schema({
    name: String,
    needOven : {
        type:Boolean,
        default:false
    },
    ingredients : [String],
    isExotic : {
        type:Boolean,
        default:false
    },
    originCountry : String,
    needSpecificTools : {
        type:Boolean,
        default:false
    }
})

const DbRecipe = mongoose.model("recipe", DbRecipeSchema);

export {DbRecipe, DbRecipeSchema}