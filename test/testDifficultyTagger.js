import { expect } from "chai";
import { tagRecipeDifficulty } from "../src/difficultyTagger.js";

describe('test Difficulty Tagger', () => {

    it('pates carbo are easy', () => {
        const patesCarbo = {
            needOven : false,
            ingredients : ["pasta","carbo"],
            isExotic : false,
            originCountry : "Italy",
            needSpecificTools : false
        }
        expect(tagRecipeDifficulty(patesCarbo)).to.equal("easy");
    });

    it('pates carbo are medium', () => {
        const patesCarboGratin = {
            needOven : true,
            ingredients : ["pasta","carbo"],
            isExotic : false,
            originCountry : "Italy",
            needSpecificTools : false
        }
        expect(tagRecipeDifficulty(patesCarboGratin)).to.equal("medium");
    });

    it('pates mango are medium', () => {
        const patesMango = {
            needOven : false,
            ingredients : ["pasta","mango"],
            isExotic : true,
            originCountry : "Italy",
            needSpecificTools : false
        }
        expect(tagRecipeDifficulty(patesMango)).to.equal("medium");
    });

    it('purée is medium ', () => {
        const puree = {
            needOven : false,
            ingredients : ["potatos","butter"],
            isExotic : false,
            originCountry : "France",
            needSpecificTools : true,
            instructions : "press potatos in the potato-presser"
        }
        expect(tagRecipeDifficulty(puree)).to.equal("medium");
    });

    it('migoreng is hard', () => {
        const puree = {
            needOven : true,
            ingredients : ["rice","egg","spicces"],
            isExotic : true,
            originCountry : "Indonesia",
            needSpecificTools : true
        }
        expect(tagRecipeDifficulty(puree)).to.equal("hard");
    });
});