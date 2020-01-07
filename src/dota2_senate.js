// 649. Dota2 Senate
/**
 * @param {string} senate
 * @return {string}
 */
let predictPartyVictory = function (senate) {
    let n = senate.length;
    if (n <= 0) {
        throw new Error(`senate must be non-empty ${senate}`);
    }

    // best strategy: ban the next coming opponent
    // two circular linked lists (one for R, one for D), sorted by order they get to take action
    // each list has a "current element" pointer
    // ban until one list is empty

    class Node {
        constructor(position) {
            this.position = position;
            this.next = null;
        }
    }

    // building linked lists
    let rEnd = null;
    let dEnd = null;

    for (let index = 0; index < n; index++) {
        let partyLetter = senate[index];
        let curr = new Node(index);

        if (partyLetter === 'R') {
            // add to end of list
            if (rEnd === null) {
                rEnd = curr;
            }
            curr.next = rEnd.next;
            rEnd.next = curr;
            rEnd = curr;
        } else {
            // add to end of list
            if (dEnd === null) {
                dEnd = curr;
            }
            curr.next = dEnd.next;
            dEnd.next = curr;
            dEnd = curr;
        }
    }

    // make sure each list starts at the head
    let currR = rEnd.next;
    let prevR = rEnd;
    let currD = dEnd.next;
    let prevD = dEnd;

    // start the banning loop

    while (true) {
        // get next senator and party
        let nextParty, nextSenator;
        if (currR === null) {
            nextParty = 'D';
            nextSenator = currD;
        } else if (currD == null) {
            nextParty = 'R';
            nextSenator = currR;
        } else {
            if (currR.position < currD.position) {
                nextParty = 'R';
                nextSenator = currR;
            } else {
                nextParty = 'D';
                nextSenator = currD;
            }
        }

        // ban the next coming opponent
        if (nextParty == 'R') {
            if (prevD != currD) {
                currD = currD.next;
                prevD.next = currD;
            } else {
                currD = prevD = null;
                return nextParty;
            }
        } else {
            if (prevR != currR) {
                currR = currR.next;
                prevR.next = currR;
            } else {
                currR = prevR = null;
                return nextParty;
            }
        }

        // don't go until next round
        nextSenator.position += n;
    }

};

module.exports = predictPartyVictory;
