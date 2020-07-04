/*
  Find the kth largest element in an unsorted array
 */
let split = function (A, start = 0, end = -1) {
  // split the region [start,end) of array A by the pivot, defined by A[start]
  // and return an index k, the index of the pivot, such that
  // A[start], A[start+1], ... A[k-1] < A[k] <= A[k+1], A[k+2], ... A[end-1]

  // @param A an array
  // @param start the start index, pivot is at A[start]
  // @param end index just passed the end of where you want to look
  //    -1 if you want the entire array, otherwise start <= end
  //    if start === end, the region you're considering is empty
  // @return k an index of A where A[k] is the pivot. If index cannot be returned, -1

  // param check
  if (end < 0) {
    end = A.length;
  }
  if (
    start >= end ||
    A.length === 0 ||
    start < 0 ||
    start > A.length ||
    end - 1 < 0 ||
    end - 1 > A.length
  ) {
    // console.log('s: ' + start + ', e: ' + end);
    return -1;
  }

  let pivot = A[start];
  let i = start + 1;
  let j = end - 1;

  while (i < j) {
    if (A[i] < pivot) {
      i++;
    } else if (A[j] >= pivot) {
      j--;
    } else {
      // A[i] >= pivot and A[j] < pivot
      // swap A[i], A[j]
      let tmp = A[i];
      A[i] = A[j];
      A[j] = tmp;

      i++;
      j--;
    }
  }

  // console.log(i);
  // console.log(j);
  // console.log(A);

  // put pivot in correct place, the first A[i] < pivot
  let pos = i;
  while (pos >= start) {
    if (A[pos] < pivot) {
      let pivot_tmp = A[start];
      A[start] = A[pos];
      A[pos] = pivot_tmp;

      return pos;
    }
    pos--;
  }

  return pos + 1;
};

let verify_split = function (A, pivot_pos, start = 0, end = -1) {
  if (end < 0) {
    end = A.length;
  }

  let pivot = A[pivot_pos];
  console.log("pivot: " + pivot);
  // before pivot
  for (let i = start; i < pivot_pos; i++) {
    if (A[i] > pivot) {
      console.log("A[i]: " + A[i] + " > pivot");
      return false;
    }
  }
  // after pivot
  for (let j = end - 1; j > pivot_pos; j--) {
    if (A[j] < pivot) {
      console.log("A[j]: " + A[j] + " < pivot");
      return false;
    }
  }
  return true;
};

let kth_largest_element = function (A, k) {
  if (k <= 0 || k > A.length) {
    throw "k out of bounds";
  }

  let arr = A.slice();
  let start = 0;
  let end = A.length;
  let target = A.length - k; // if array is sorted in ascending order, A[target] is the element
  let pivot_idx;

  while (true) {
    pivot_idx = split(arr, start, end);
    if (target === pivot_idx) {
      return arr[pivot_idx];
    } else if (target > pivot_idx) {
      start = pivot_idx + 1;
    } else {
      end = pivot_idx;
    }
  }
};

// Jasmine test cases
describe("kth largest element", () => {
  let a_empty; // size 0
  let a_single; // size 1
  let a_distinct; // distinct numbers
  let a_dups; // contains duplicates

  beforeEach(() => {
    a_empty = [];
    a_single = [5];
    a_distinct = [5, 10, 1, 3, -5, 6, 7]; // size 7
    a_dups = [5, 5, 5, 1, 10, 2, 9, 9, 3]; // size 9
  });

  it("handles empty array", () => {
    let ret = [];
    for (let i = a_empty.length; i >= 1; i--) {
      ret.push(kth_largest_element(a_empty, i));
    }

    let answer = a_empty.slice().sort((a, b) => a - b);

    expect(ret).toEqual(answer);
  });

  it("handles single element array", () => {
    let ret = [];
    for (let i = a_single.length; i >= 1; i--) {
      ret.push(kth_largest_element(a_single, i));
    }

    let answer = a_single.slice().sort((a, b) => a - b);

    expect(ret).toEqual(answer);
  });

  it("handles distinct element array", () => {
    let ret = [];
    for (let i = a_distinct.length; i >= 1; i--) {
      ret.push(kth_largest_element(a_distinct, i));
    }

    let answer = a_distinct.slice().sort((a, b) => a - b);

    expect(ret).toEqual(answer);
  });

  it("handles duplicate element array", () => {
    let ret = [];
    for (let i = a_dups.length; i >= 1; i--) {
      ret.push(kth_largest_element(a_dups, i));
    }

    let answer = a_dups.slice().sort((a, b) => a - b);

    expect(ret).toEqual(answer);
  });
});
