/*
Given an integer array with even length, where different numbers in this array represent different kinds of candies. Each number means one candy of the corresponding kind. You need to distribute these candies equally in number to brother and sister. Return the maximum number of kinds of candies the sister could gain.

Example 1:

Input: candies = [1,1,2,2,3,3]
Output: 3
Explanation:
There are three different kinds of candies (1, 2 and 3), and two candies for each kind.
Optimal distribution: The sister has candies [1,2,3] and the brother has candies [1,2,3], too. 
The sister has three different kinds of candies. 

Example 2:

Input: candies = [1,1,2,3]
Output: 2
Explanation: For example, the sister has candies [2,3] and the brother has candies [1,1]. 
The sister has two different kinds of candies, the brother has only one kind of candies. 
*/
/**
 * @param {number[]} candies
 * @return {number}
 */
var distributeCandies = function (candies) {
  let sis = {};
  let num_bro = 0; // num candies bro has

  // sister takes new candy first
  // if brother didn't get enough, give him only what sis owes
  candies.map((type) => {
    if (!sis[type]) {
      sis[type] = 1;
    } else {
      num_bro++;
    }
  });

  let num_sis = Object.keys(sis).length;
  if (num_sis > num_bro) {
    // share
    num_sis = Math.floor((num_sis + num_bro) / 2);
  }
  return num_sis;
};
