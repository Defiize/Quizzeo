// Extern import
import { expect } from "chai";
import { JSDOM } from "jsdom"
import request from "supertest"

// Intern import
import { createApp } from "../src/createApp.js";

describe('Pages tests', async () => {
    
    it('homepage displays recipes', async () => {
        const app = await createApp()
        request(app)
            .get('/home')
            .end(function (err, res) {
                if (err) throw err;
                const {window:{document}} = new JSDOM(res.text);
                const title = document.querySelector("h1")
                expect(title).to.be.ok
                expect(title.textContent).to.eql("Bienvenue sur Cordon-bleu!")
            });
    });
});