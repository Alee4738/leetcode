function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  function findOrderHelper(
    courseNum: number,
    prereqAdjList: Array<Set<number>>,
    path: Set<number>,
    cache: number[][]
  ): number[] {
    if (cache[courseNum]) {
      // could be empty array (meaning order is impossible) or the actual order of courses to take this course
      return cache[courseNum];
    }

    const prereqs: Set<number> = prereqAdjList[courseNum];
    if (prereqs.size === 0) {
      return (cache[courseNum] = [courseNum]);
    }

    if (path.has(courseNum)) {
      return (cache[courseNum] = []);
    }

    let courseOrder = [];
    const coursesTaken = new Set<number>();
    path.add(courseNum);
    for (const prereq of prereqs) {
      if (coursesTaken.has(prereq)) {
        continue;
      }

      const prereqOrder = findOrderHelper(prereq, prereqAdjList, path, cache);
      if (prereqOrder.length === 0) {
        courseOrder = [];
        break;
      }

      for (const course of prereqOrder) {
        if (!coursesTaken.has(course)) {
          courseOrder.push(course);
          coursesTaken.add(course);
        }
      }
    }
    path.delete(courseNum);
    if (courseOrder.length > 0) {
      courseOrder.push(courseNum);
    }
    return (cache[courseNum] = courseOrder);
  }

  const prereqAdjList: Array<Set<number>> = [];
  for (let i = 0; i < numCourses; i++) {
    prereqAdjList.push(new Set<number>());
  }
  for (const [course, prereq] of prerequisites) {
    prereqAdjList[course].add(prereq);
  }

  const cache: number[][] = [];

  // Invent a new course that has all actual courses as prerequisites
  // for (let i = 0; i < numCourses; i++) {
  //     prereqAdjList[numCourses].add(i);
  // }

  for (let i = 0; i < numCourses; i++) {
    if (
      findOrderHelper(i, prereqAdjList, new Set<number>(), cache).length === 0
    ) {
      return [];
    }
  }

  const courseOrder = [];
  const coursesTaken = new Set<number>();
  let nextCourse = 0;
  while (nextCourse < numCourses) {
    // take the courses needed to take nextCourse, add them to order
    for (const course of cache[nextCourse]) {
      if (!coursesTaken.has(course)) {
        courseOrder.push(course);
        coursesTaken.add(course);
      }
    }

    while (coursesTaken.has(nextCourse)) {
      nextCourse++;
    }
  }
  return courseOrder;
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
