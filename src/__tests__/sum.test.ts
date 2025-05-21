import { sumTest } from "./sumTest";

describe('sumTest', ()=>{
    it('adds two numbers', ()=>{
        expect(sumTest(2,3)).toBe(5);
    })
})