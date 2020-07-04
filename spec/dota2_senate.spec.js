let predictPartyVictory = require("../src/dota2_senate");

describe("predictPartyVictory", () => {
  it("R", () => {
    //arrange
    let senate = "R";

    //act
    let actualWinner = predictPartyVictory(senate);

    //assert
    let expectedWinner = "Radiant";
    expect(actualWinner).toBe(expectedWinner);
  });

  it("D", () => {
    //arrange
    let senate = "D";

    //act
    let actualWinner = predictPartyVictory(senate);

    //assert
    let expectedWinner = "Dire";
    expect(actualWinner).toBe(expectedWinner);
  });

  it("RD", () => {
    //arrange
    let senate = "RD";

    //act
    let actualWinner = predictPartyVictory(senate);

    //assert
    let expectedWinner = "Radiant";
    expect(actualWinner).toBe(expectedWinner);
  });

  it("RDD", () => {
    //arrange
    let senate = "RDD";

    //act
    let actualWinner = predictPartyVictory(senate);

    //assert
    let expectedWinner = "Dire";
    expect(actualWinner).toBe(expectedWinner);
  });

  it("RDDRRDR over after a single round", () => {
    //arrange
    let senate = "RDDRRDR";

    //act
    let actualWinner = predictPartyVictory(senate);

    //assert
    let expectedWinner = "Radiant";
    expect(actualWinner).toBe(expectedWinner);
  });

  it("RDDRDRRD goes for multiple rounds", () => {
    //arrange
    let senate = "RDDRDRRD";

    //act
    let actualWinner = predictPartyVictory(senate);

    //assert
    let expectedWinner = "Radiant";
    expect(actualWinner).toBe(expectedWinner);
  });

  it("DDRRR leetcode returns D", () => {
    //arrange
    let senate = "DDRRR";

    //act
    let actualWinner = predictPartyVictory(senate);

    //assert
    let expectedWinner = "Dire";
    expect(actualWinner).toBe(expectedWinner);
  });
});
