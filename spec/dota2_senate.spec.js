let predictPartyVictory = require('../src/dota2_senate');

describe('predictPartyVictory', () => {
    it('RD', () => {
        //arrange
        let senate = 'RD';

        //act
        let actualWinner = predictPartyVictory(senate);

        //assert
        let expectedWinner = 'R';
        expect(actualWinner).toBe(expectedWinner);
    });

    it('RDD', () => {
        //arrange
        let senate = 'RDD';

        //act
        let actualWinner = predictPartyVictory(senate);

        //assert
        let expectedWinner = 'D';
        expect(actualWinner).toBe(expectedWinner);
    });

    it('RDDRRDR over after a single round', () => {
        //arrange
        let senate = 'RDDRRDR';

        //act
        let actualWinner = predictPartyVictory(senate);

        //assert
        let expectedWinner = 'R';
        expect(actualWinner).toBe(expectedWinner);
    });

    it('RDDRDRRD goes for multiple rounds', () => {
        //arrange
        let senate = 'RDDRDRRD';

        //act
        let actualWinner = predictPartyVictory(senate);

        //assert
        let expectedWinner = 'R';
        expect(actualWinner).toBe(expectedWinner);
    });
});

