/**
 * 57. Insert Interval
 * Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary).
 *
 * You may assume that the intervals were initially sorted according to their start times.
 *
 * Example 1:
 *
 * Input: intervals = [new Interval(1,3),new Interval(6,9)], newInterval = new Interval(2,5)
 * Output: [new Interval(1,5),new Interval(6,9)]
 *
 * Example 2:
 *
 * Input: intervals = [new Interval(1,2),new Interval(3,5),new Interval(6,7),new Interval(8,10),new Interval(12,16)], newInterval = new Interval(4,8)
 * Output: [new Interval(1,2),new Interval(3,10),new Interval(12,16)]
 * Explanation: Because the new interval new Interval(4,8) overlaps with new Interval(3,5),new Interval(6,7),new Interval(8,10).
 */
/**
 * Definition for an interval.
 * function Interval(start, end) {
 *     this.start = start;
 *     this.end = end;
 * }
 */
function Interval(start, end) {
  this.start = start;
  this.end = end;
}

let compareIntervals = function (a, b) {
  if (a.start < b.start && a.end < b.start) {
    // no overlap: a < b
    return -1;
  } else if (a.start > b.start && a.start > b.end) {
    // no overlap: a > b
    return 1;
  } else {
    return 0;
  }
};

/**
 * @param {Interval[]} intervals
 * @param {Interval} newInterval
 * @return {Interval[]}
 */
var insert = function (intervals, newInterval) {
  if (intervals.length === 0) {
    return [newInterval];
  }

  let start = 0;
  let i = 0;
  let n = intervals.length;
  let res = [];
  while (i < n) {
    let order = compareIntervals(newInterval, intervals[i]);
    if (order < 0) {
      // does not overlap with any
      // Also found correct position
      res.push(newInterval, ...intervals.slice(i));
      break;
    } else if (order > 0) {
      // does not overlap with current interval
      // but could with future ones
      res.push(intervals[i]);

      // if we're at the end, there are no more to combine with
      if (i === n - 1) {
        res.push(newInterval);
      }
    } else {
      // overlaps
      // don't add new interval yet, as it could overlap with more
      newInterval.start = Math.min(newInterval.start, intervals[i].start);
      newInterval.end = Math.max(newInterval.end, intervals[i].end);

      // if we're at the end, there are no more to combine with
      if (i === n - 1) {
        res.push(newInterval);
      }
    }
    i++;
  }

  return res;
};

// Jasmine test cases
describe("insert intervals function", () => {
  let s0; // size 0
  let s1; // size 1
  let s5; // size 5

  beforeEach(() => {
    s0 = [];
    s1 = [new Interval(5, 7)];
    s5 = [
      new Interval(1, 3),
      new Interval(5, 8),
      new Interval(10, 11),
      new Interval(20, 30),
      new Interval(32, 34),
    ];
  });

  it("inserts interval on empty array", () => {
    expect(insert(s0.slice(), new Interval(2, 5))).toEqual([
      new Interval(2, 5),
    ]);
  });

  it("inserts non-overlapping interval at beginning", () => {
    expect(insert(s1.slice(), new Interval(1, 3))).toEqual([
      new Interval(1, 3),
      new Interval(5, 7),
    ]);

    expect(insert(s5.slice(), new Interval(-5, 0))).toEqual([
      new Interval(-5, 0),
      new Interval(1, 3),
      new Interval(5, 8),
      new Interval(10, 11),
      new Interval(20, 30),
      new Interval(32, 34),
    ]);
  });

  it("inserts non-overlapping interval at middle", () => {
    expect(insert(s5.slice(), new Interval(4, 4))).toEqual([
      new Interval(1, 3),
      new Interval(4, 4),
      new Interval(5, 8),
      new Interval(10, 11),
      new Interval(20, 30),
      new Interval(32, 34),
    ]);

    expect(insert(s5.slice(), new Interval(12, 15))).toEqual([
      new Interval(1, 3),
      new Interval(5, 8),
      new Interval(10, 11),
      new Interval(12, 15),
      new Interval(20, 30),
      new Interval(32, 34),
    ]);
  });

  it("inserts non-overlapping interval at end", () => {
    expect(insert(s1.slice(), new Interval(40, 41))).toEqual([
      new Interval(5, 7),
      new Interval(40, 41),
    ]);

    expect(insert(s5.slice(), new Interval(40, 41))).toEqual([
      new Interval(1, 3),
      new Interval(5, 8),
      new Interval(10, 11),
      new Interval(20, 30),
      new Interval(32, 34),
      new Interval(40, 41),
    ]);
  });

  it("inserts overlapping interval over 1 interval, new one skewed left", () => {
    // clearly overlapping
    expect(insert(s1.slice(), new Interval(4, 6))).toEqual([
      new Interval(4, 7),
    ]);

    expect(insert(s5.slice(), new Interval(15, 21))).toEqual([
      new Interval(1, 3),
      new Interval(5, 8),
      new Interval(10, 11),
      new Interval(15, 30),
      new Interval(32, 34),
    ]);

    // overlapping by a single number (edge case)
    expect(insert(s1.slice(), new Interval(4, 5))).toEqual([
      new Interval(4, 7),
    ]);

    expect(insert(s5.slice(), new Interval(15, 20))).toEqual([
      new Interval(1, 3),
      new Interval(5, 8),
      new Interval(10, 11),
      new Interval(15, 30),
      new Interval(32, 34),
    ]);
  });

  it("inserts overlapping interval over 1 interval, new one skewed right", () => {
    // clearly overlapping
    expect(insert(s5.slice(), new Interval(21, 34))).toEqual([
      new Interval(1, 3),
      new Interval(5, 8),
      new Interval(10, 11),
      new Interval(20, 34),
    ]);

    // overlapping by a single number (edge case)
    expect(insert(s5.slice(), new Interval(30, 34))).toEqual([
      new Interval(1, 3),
      new Interval(5, 8),
      new Interval(10, 11),
      new Interval(20, 34),
    ]);
  });

  it("inserts overlapping interval over 1 interval, new one fully enclosed by existing one", () => {
    // new one bigger than old one
    expect(insert(s5.slice(), new Interval(22, 25))).toEqual([
      new Interval(1, 3),
      new Interval(5, 8),
      new Interval(10, 11),
      new Interval(20, 30),
      new Interval(32, 34),
    ]);

    // new one equal to old one
    expect(insert(s5.slice(), new Interval(20, 30))).toEqual([
      new Interval(1, 3),
      new Interval(5, 8),
      new Interval(10, 11),
      new Interval(20, 30),
      new Interval(32, 34),
    ]);
  });

  it("inserts overlapping interval over 1 interval, new one fully encloses an existing one", () => {
    expect(insert(s5.slice(), new Interval(18, 31))).toEqual([
      new Interval(1, 3),
      new Interval(5, 8),
      new Interval(10, 11),
      new Interval(18, 31),
      new Interval(32, 34),
    ]);
  });

  it("inserts overlapping interval over 2 intervals, in between two", () => {
    // clearly in between
    expect(insert(s5.slice(), new Interval(28, 33))).toEqual([
      new Interval(1, 3),
      new Interval(5, 8),
      new Interval(10, 11),
      new Interval(20, 34),
    ]);

    // overlaps on edges
    expect(insert(s5.slice(), new Interval(30, 32))).toEqual([
      new Interval(1, 3),
      new Interval(5, 8),
      new Interval(10, 11),
      new Interval(20, 34),
    ]);
  });

  it("inserts overlapping interval over multiple intervals", () => {
    // clearly in between
    expect(insert(s5.slice(), new Interval(2, 25))).toEqual([
      new Interval(1, 30),
      new Interval(32, 34),
    ]);

    // overlaps exactly on inner edges
    expect(insert(s5.slice(), new Interval(3, 20))).toEqual([
      new Interval(1, 30),
      new Interval(32, 34),
    ]);

    // overlaps exactly on outer edges
    expect(insert(s5.slice(), new Interval(1, 30))).toEqual([
      new Interval(1, 30),
      new Interval(32, 34),
    ]);

    // fully encloses all 3 intervals
    expect(insert(s5.slice(), new Interval(-3, 31))).toEqual([
      new Interval(-3, 31),
      new Interval(32, 34),
    ]);
  });
});
