// Extern import
import { expect } from "chai";
// Intern import
import { getTextWithKeyWord } from "../src/keywordManager.js";

describe('test Keyword Manager', () => {
    it('my_keYwOrd_HeLLo is converted to MY_KEYWORD_HELLO', () => {
        expect(getTextWithKeyWord('my_keYwOrd_HeLLo')).to.equal("MY_KEYWORD_HELLO");
    });
    it('mykeywordissocool is converted to MYKEYWORDISSOCOOL', () => {
        expect(getTextWithKeyWord('mykeywordissocool')).to.equal("MYKEYWORDISSOCOOL");
    });
});