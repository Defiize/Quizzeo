// Extern import
import { expect } from "chai";
import mongoose from "mongoose";

// Intern import
import { DbRecipe } from "../src/DbRecipe.js";


describe('test Db Recipe', () => {
    beforeEach(async () => {
        await mongoose.connect("mongodb://localhost:27017/cordonbleu",{connectTimeoutMS:1000})
    })
    it('Should create a recipe in db', async () => {
        const dbRecipe = new DbRecipe({
            name : "Mi-goreng",
            needOven : true,
            ingredients : ["rice","egg","spices"],
            isExotic : true,
            originCountry : "Indonesia",
            needSpecificTools : true
        })
        await dbRecipe.save()
        const recipes = await DbRecipe.find()
        expect(recipes.length).to.be.greaterThanOrEqual(1)
    });
    // afterEach(async () => {
    //     return DbRecipe.deleteMany({})
    // })
});