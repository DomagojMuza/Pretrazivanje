var assert = require('chai').assert
const search = require('../index');

describe('Nesto kao google search', function () {
    it('Search je funkcija', function () {
        search()
       });
    it("Search vraca listu rijeci", function () {
       let rez = search()
       assert.isArray(rez)
    })
   });