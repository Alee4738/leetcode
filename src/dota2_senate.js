// 649. Dota2 Senate
/**
 * @param {string} senate
 * @return {string}
 */
// let predictPartyVictory = function (senate) {
//     let n = senate.length;
//     if (n <= 0) {
//         throw new Error(`senate must be non-empty ${senate}`);
//     }

//     // best strategy: ban the next coming opponent
//     // two circular linked lists (one for R, one for D), sorted by order they get to take action
//     // each list has a "current element" pointer
//     // ban until one list is empty

//     class Node {
//         constructor(position) {
//             this.position = position;
//             this.next = null;
//         }
//     }

//     let translateToParty = function (partyLetter) {
//         switch (partyLetter) {
//             case 'R': return 'Radiant'; break;
//             case 'D': return 'Dire'; break;
//             default:
//                 throw new Error(`invalid party letter ${partyLetter}`);
//         }
//     }

//     // building linked lists
//     let rEnd = null;
//     let dEnd = null;

//     for (let index = 0; index < n; index++) {
//         let partyLetter = senate[index];
//         let curr = new Node(index);

//         if (partyLetter === 'R') {
//             // add to end of list
//             if (rEnd === null) {
//                 rEnd = curr;
//             }
//             curr.next = rEnd.next;
//             rEnd.next = curr;
//             rEnd = curr;
//         } else {
//             // add to end of list
//             if (dEnd === null) {
//                 dEnd = curr;
//             }
//             curr.next = dEnd.next;
//             dEnd.next = curr;
//             dEnd = curr;
//         }
//     }

//     if (rEnd === null) {
//         return translateToParty('D');
//     } else if (dEnd === null) {
//         return translateToParty('R');
//     }

//     // make sure each list starts at the head
//     let currR = rEnd.next;
//     let prevR = rEnd;
//     let currD = dEnd.next;
//     let prevD = dEnd;

//     // start the banning loop

//     while (true) {
//         // get next senator and party
//         let nextParty, nextSenator;
//         if (currR === null) {
//             nextParty = 'D';
//             nextSenator = currD;
//         } else if (currD == null) {
//             nextParty = 'R';
//             nextSenator = currR;
//         } else {
//             if (currR.position < currD.position) {
//                 nextParty = 'R';
//                 nextSenator = currR;
//             } else {
//                 nextParty = 'D';
//                 nextSenator = currD;
//             }
//         }

//         // ban the next coming opponent
//         if (nextParty == 'R') {
//             if (prevD != currD) {
//                 currD = currD.next;
//                 prevD.next = currD;
//             } else {
//                 currD = prevD = null;
//                 return translateToParty(nextParty);
//             }
//         } else {
//             if (prevR != currR) {
//                 currR = currR.next;
//                 prevR.next = currR;
//             } else {
//                 currR = prevR = null;
//                 return translateToParty(nextParty);
//             }
//         }

//         // don't go until next round
//         nextSenator.position += n;
//     }

// };

let predictPartyVictory = function (senate) {
  let n = senate.length;
  if (n <= 0) {
    throw new Error(`senate must be non-empty ${senate}`);
  }

  // best strategy: ban the next coming opponent
  // naive: just keep going around the senate banning people

  let translateToParty = function (partyLetter) {
    switch (partyLetter) {
      case "R":
        return "Radiant";
        break;
      case "D":
        return "Dire";
        break;
      default:
        throw new Error(`invalid party letter ${partyLetter}`);
    }
  };

  let getNextOpponentPos = function (start) {
    let currSenator = senateArray[start];

    for (
      let pos = (start + 1) % senateArray.length;
      pos != start;
      pos = (pos + 1) % senateArray.length
    ) {
      let senator = senateArray[pos];
      if (currSenator != senator) {
        return pos;
      }
    }
    return null;
  };

  let senateArray = new Array(...senate);
  let currPos = 0;

  while (true) {
    let currParty = senateArray[currPos];
    let nextOpponentPos = getNextOpponentPos(currPos);

    if (currPos >= senateArray.length - 1) {
      currPos = 0;
    } else {
      currPos++;
    }

    if (nextOpponentPos === null) {
      return translateToParty(currParty);
    } else {
      // ban them
      senateArray.splice(nextOpponentPos, 1);
    }
  }
};

module.exports = predictPartyVictory;
