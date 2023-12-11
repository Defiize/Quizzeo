import { createApp } from "../src/createApp.js";
import request from "supertest"
import { JSDOM } from "jsdom"
import { expect } from "chai";
import sinon from "sinon";
import { DbRecipe } from "../src/DbRecipe.js";

describe('Add new recipe', async () => {

    it('the homepage contains a form to add a recipe', (done) => {
        const find = sinon.stub(DbRecipe, 'find')
        const recipe = {
            _id: "654321",
            name: "Chili con carne",
            originCountry: "Mexico",
            needOven: false,
            ingredients: ["chili", "carne"],
            isExotic: true,
            needSpecificTools: true
        }
        find.returns([recipe])
        createApp().then((app) => {
            request(app)
                .get('/home')
                .end(function (err, res) {
                    if (err) throw err;
                    const { window: { document } } = new JSDOM(res.text);
                    const form = document.querySelector(".addRecipe > form")
                    expect(form).to.be.ok
                    find.restore()
                    done()
                });
        })
    });
    it('the form adds a new recipe', (done) => {
        createApp().then((app) => {
            const save = sinon.stub(DbRecipe.prototype, 'save')
            const find = sinon.stub(DbRecipe, 'find')
            const recipe = {
                _id: "654321",
                name: "Chili con carne",
                originCountry: "Mexico",
                needOven: false,
                ingredients: ["chili", "carne"],
                isExotic: true,
                needSpecificTools: true
            }
            find.returns([recipe])

            request(app).get('/home')
                .end(function (err, res) {
                    if (err) throw err;
                    const { window: { document } } = new JSDOM(res.text);
                    const recipes = document.querySelectorAll(".popularRecipes li")
                    expect(recipes).to.be.ok
                    const nbRecipes = recipes.length
                    const newRecipe = {
                        name: "purée",
                        originCountry: "France",
                        needOven: false,
                        ingredients: ["patates", "lait"],
                        isExotic: false,
                        needSpecificTools: true
                    }
                    find.returns([recipe, { ...newRecipe, _id: "7654321" }])
                    request(app).post('/recipe', newRecipe)
                        .expect(302)
                        .expect('Location', '/home')
                        .end((err, res) => {
                            request(app).get('/home')
                                .end(function (err, res) {
                                    if (err) throw err;
                                    const { window: { document } } = new JSDOM(res.text);
                                    const newRecipes = document.querySelectorAll(".popularRecipes li")
                                    expect(newRecipes).to.be.ok
                                    const nbNewRecipes = newRecipes.length
                                    expect(nbNewRecipes).to.equal(nbRecipes + 1)
                                    save.restore()
                                    find.restore()
                                    done()
                                });
                        })

                });
        })
    });
});