/*
You have k lists of sorted integers in ascending order. Find the smallest range that includes at least one number from each of the k lists.

We define the range [a,b] is smaller than range [c,d] if b-a < d-c or a < c if b-a == d-c.

Example 1:

Input:[[4,10,15,24,26], [0,9,12,20], [5,18,22,30]]
Output: [20,24]
Explanation: 
List 1: [4, 10, 15, 24,26], 24 is in range [20,24].
List 2: [0, 9, 12, 20], 20 is in range [20,24].
List 3: [5, 18, 22, 30], 22 is in range [20,24].

Note:

    The given list may contain duplicates, so ascending order means >= here.
    1 <= k <= 3500
    -105 <= value of elements <= 105.
    For Java users, please note that the input type has been changed to List<List<Integer>>. And after you reset the code template, you'll see this point.
*/
/**
 * @param {number[][]} nums
 * @return {number[]}
 */

let search = function(list, target) {
  // @param list a list of numbers sorted in ascending order
  // @param target the number to find
  // @return the smallest range (inclusive) of elements in list that includes target. If none exists, null
  
  // target is outside range of list
  if (target < list[0] || target > list[list.length-1]) {
    return null;
  }

  let exactMatch = [target, target];

  // binary search
  let helper = function(start, end) {
    // error check
    if (end < start) {
      throw("Dead");
    }

    // list[start] <= target <= list[end]
    if (list[start] === target || list[end] === target) {
      return exactMatch;
    }

    let len = end - start + 1;
    if (len === 2) {
      return [list[start], list[end]];
    } else {
      let mid = Math.floor((start + end + 1)/2);
      if (list[mid] === target) {
        return exactMatch;
      } else if (list[mid] < target) {
        return helper(mid, end);
      } else {
        return helper(start, mid);
      }
    }
  }
  return helper(0, list.length-1);
}

let hasMemberInRange = function(list, low, high) {
  // @param list a list of numbers sorted in ascending order
  // @return a member of the list in range [low,high] inclusive. If no such member exists, null
  
  // check for completely separate cases
  let llow = list[0];
  let lhigh = list[list.length - 1];
  if (high < llow || lhigh < low) {
    return null;
  }

  // at this point, they somehow overlap
  if (low < llow && high > lhigh) {
    // entire list in range
    return llow;
  }

  let lower_bound = search(list, low);
  if (lower_bound === null) {
    // low < llow and high <= lhigh, so llow is in range
    return true;
  } else {
    // low >= llow, so need to check upper bound for low
    if (lower_bound[1] <= high) {
      return lower_bound[1];
    } else {
      return null;
    }
  }
}

// flatten an array
const flatten = function(arr, result = []) {
  for (let i = 0, length = arr.length; i < length; i++) {
    const value = arr[i];
    if (Array.isArray(value)) {
      flatten(value, result);
    } else {
      result.push(value);
    }
  }
  return result;
};

var smallestRange = function(nums) {
  // smallest range must at least include max(min of each list) and min(max of each list)
  // let min = Infinity;
  // let max = -Infinity;
  // nums.map(list => {
  //   min = Math.min(min, list[0]);
  //   max = Math.max(max, list[list.length - 1]);
  // });

  // // mark lists still needed to be covered by range
  // let left_to_cover = {};
  // nums.map((list, i) => {
  //   if (hasMemberInRange(list, min, max) === null) {
  //     left_to_cover[i] = true;
  //   }
  // });

  // console.log(left_to_cover);


  // distasteful O((kn)^2) solution, time limit exceeded
  let combined = flatten(nums).sort((f, s) => f-s);
  
  let ret = [combined[0], combined[combined.length-1]];
  let length = ret[1] - ret[0];
  // console.log("orignal ret: " + ret.toString());
  // console.log("original length: " + length.toString());

  for (let i = 0; i < combined.length; i++) {
    let start = combined[i];

    for (let j = i; j < combined.length; j++) {
      let end = combined[j];

      // console.log(start + " and " + end);

      // consider range [i,j]
      if (end - start < length) {
        // console.log("got through");

        let hasOneFromEach = true;
        nums.map(list => {
          if (hasOneFromEach && hasMemberInRange(list, start, end) === null) {
            // console.log(list.toString() + " messed it up for this range");
            hasOneFromEach = false;
          }
        });
      
        if (hasOneFromEach) {
          ret = [start, end];
          length = end - start;
          // console.log("changed ret to: " + ret.toString());
          // console.log("changed length to: " + length.toString());
        }
      }
    }
  }
  // console.log(combined);
  // console.log(ret);
  // console.log();
  return ret;
};

/*
let search = function(list, target) {
  // @param list a list of numbers sorted in ascending order
  // @param target the number to find
  // @return the smallest range (inclusive) of elements in list that includes target. If none exists, null
  
  // target is outside range of list
  if (target < list[0] || target > list[list.length-1]) {
    return null;
  }

  let exactMatch = [target, target];

  // binary search
  let helper = function(start, end) {
    // error check
    if (end < start) {
      throw("Dead");
    }

    // list[start] <= target <= list[end]
    if (list[start] === target || list[end] === target) {
      return exactMatch;
    }

    let len = end - start + 1;
    if (len === 2) {
      return [list[start], list[end]];
    } else {
      let mid = Math.floor((start + end + 1)/2);
      if (list[mid] === target) {
        return exactMatch;
      } else if (list[mid] < target) {
        return helper(mid, end);
      } else {
        return helper(start, mid);
      }
    }
  }
  return helper(0, list.length-1);
}

let hasMemberInRange = function(list, low, high) {
  // @param list a list of numbers sorted in ascending order
  // @return a member of the list in range [low,high] inclusive. If no such member exists, null
  
  // check for completely separate cases
  let llow = list[0];
  let lhigh = list[list.length - 1];
  if (high < llow || lhigh < low) {
    return null;
  }

  // at this point, they somehow overlap
  if (low < llow && high > lhigh) {
    // entire list in range
    return llow;
  }

  let lower_bound = search(list, low);
  if (lower_bound === null) {
    // low < llow and high <= lhigh, so llow is in range
    return true;
  } else {
    // low >= llow, so need to check upper bound for low
    if (lower_bound[1] <= high) {
      return lower_bound[1];
    } else {
      return null;
    }
  }
}

// flatten an array
const flatten = function(arr, result = []) {
  for (let i = 0, length = arr.length; i < length; i++) {
    const value = arr[i];
    if (Array.isArray(value)) {
      flatten(value, result);
    } else {
      result.push(value);
    }
  }
  return result;
};

var smallestRange = function(nums) {
  // distasteful O((kn)^2) solution, time limit exceeded
  let combined = flatten(nums).sort((f, s) => f-s);
  
  let ret = [combined[0], combined[combined.length-1]];
  let length = ret[1] - ret[0];
  // console.log("orignal ret: " + ret.toString());
  // console.log("original length: " + length.toString());

  for (let i = 0; i < combined.length; i++) {
    let start = combined[i];

    for (let j = i; j < combined.length; j++) {
      let end = combined[j];

      // console.log(start + " and " + end);

      // consider range [i,j]
      if (end - start < length) {
        // console.log("got through");

        let hasOneFromEach = true;
        nums.map(list => {
          if (hasOneFromEach && hasMemberInRange(list, start, end) === null) {
            // console.log(list.toString() + " messed it up for this range");
            hasOneFromEach = false;
          }
        });
      
        if (hasOneFromEach) {
          ret = [start, end];
          length = end - start;
          // console.log("changed ret to: " + ret.toString());
          // console.log("changed length to: " + length.toString());
        }
      }
    }
  }
  // console.log(combined);
  // console.log(ret);
  // console.log();
  return ret;
};
 */

// jasmine test cases
describe('smallestRange', () => {
  it('can switch ranges as it is given more lists', () => {
    expect(smallestRange([[22,32], [31,32], [25]]))
    .toEqual([25,32]);
  });

  it('handles single element arrays', () => {
    expect(smallestRange([[1]]))
    .toEqual([1,1]);

    expect(smallestRange([[1], [5], [2]]))
    .toEqual([1,5]);
  });

  it('handles two-element arrays', () => {
    expect(smallestRange([[1,8], [5,6], [2,9]]))
    .toEqual([6,9]);

    expect(smallestRange([[1,9], [2,10]]))
    .toEqual([1,2]);
  });

  it('handles some leetcode test cases', () => {
    expect(smallestRange([
      [11,38,83,84,84,85,88,89,89,92],
      [28,61,89],
      [52,77,79,80,81],
      [21,25,26,26,26,27],
      [9,83,85,90],
      [84,85,87],
      [26,68,70,71],
      [36,40,41,42,45],
      [-34,21],
      [-28,-28,-23,1,13,21,28,37,37,38],
      [-74,1,2,22,33,35,43,45],
      [54,96,98,98,99],
      [43,54,60,65,71,75],
      [43,46],
      [50,50,58,67,69],
      [7,14,15],
      [78,80,89,89,90],
      [35,47,63,69,77,92,94]
    ])).toEqual([15,84]);
  });
});

xdescribe('search', () => {
  it('handles exact matches with distinct', () => {
    expect(search([2,3,7,10,19,20,25], 20))
    .toEqual([20,20]);
    expect(search([2,3,7,10,19,20,25], 2))
    .toEqual([2,2]);
    expect(search([2,3,7,10,19,20,25], 25))
    .toEqual([25,25]);
  });

  it('handles exact matches with duplicates', () => {
    expect(search([2,3,7,10,19,20,20,25], 20))
    .toEqual([20,20]);
  });

  it('handles non-exact matches with distinct', () => {
    expect(search([2,3,7,10,19,20,25], 4))
    .toEqual([3,7]);
  });

  it('handles non-exact matches with duplicates', () => {
    expect(search([2,3,3,3,7,10,19,20,20,25], 4))
    .toEqual([3,7]);
  });

  it('handles 1-length lists', () => {
    expect(search([5], 2)).toEqual(null);
    expect(search([5], 20)).toEqual(null);
    expect(search([5], 5)).toEqual([5,5]);
  });

  it('handles 2-length lists', () => {
    expect(search([5,10], 2)).toEqual(null);
    expect(search([5,10], 20)).toEqual(null);
    expect(search([5,10], 5)).toEqual([5,5]);
    expect(search([5,10], 10)).toEqual([10,10]);
    expect(search([5,10], 7)).toEqual([5,10]);
  });
});