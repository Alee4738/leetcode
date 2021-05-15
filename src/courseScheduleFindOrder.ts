function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const childCourses: Array<Set<number>> = [];
  for (let i = 0; i < numCourses; i++) {
    childCourses.push(new Set());
  }

  for (const [courseBeingBlocked, prereq] of prerequisites) {
    childCourses[prereq].add(courseBeingBlocked);
  }

  const reverseCourseOrder: number[] = [];
  const coursesTaken: Set<number> = new Set();

  function doit(course: number, path: Set<number>): boolean {
    if (coursesTaken.has(course)) {
      return true;
    }

    if (path.has(course)) {
      return false;
    }

    if (childCourses[course].size === 0) {
      reverseCourseOrder.push(course);
      coursesTaken.add(course);
      return true;
    }

    path.add(course);
    for (const child of childCourses[course]) {
      if (!doit(child, path)) {
        path.delete(course);
        return false;
      }
    }
    path.delete(course);
    reverseCourseOrder.push(course);
    coursesTaken.add(course);
    return true;
  }

  for (let i = 0; i < numCourses; i++) {
    if (!doit(i, new Set<number>())) {
      return [];
    }
  }

  return reverseCourseOrder.reverse();
}

/*
2
[[1,0]]
4
[[1,0],[2,0],[3,1],[3,2]]
1
[]
2
[[0,1],[1,0]]
*/

/*
Valid orders, but not the only ones for those inputs
[0,1]
[0,1,2,3]
[0]
[]
*/
