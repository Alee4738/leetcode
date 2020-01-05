"""
A - List[int], rows of student heights

Students come one after the other: A[0], then A[1], then ... A[N-1]

For the ith student, if there is a row for which each student in the row is taller than A[i],
then the student will stand in one of such rows.
Otherwise, the student will create a new row.

Find the minimum number of rows created

Assume:
* N is an integer in range [1...1000]
* each element of A is integer in range [1...10,000]
"""


def min_num_rows(A):
    # keep track of the minimum height of each row
    # for each A[i], choose the row with minimum height closest to A[i]
    # so you don't "waste" a row
    rows = [[A[0]]]
    min_heights = [A[0]]

    for i in range(1, len(A)):
        best_row = (-1, 10001)  # index, minimum height; initial value is a placeholder
        for j in range(len(min_heights)):
            if A[i] < min_heights[j] < best_row[1]:
                best_row = (j, min_heights[j])
        if best_row[0] == -1:  # none match, make new row
            rows.append([A[i]])
            min_heights.append(A[i])
        else:
            # insert into the best row
            rows[best_row[0]].append(A[i])
            min_heights[best_row[0]] = A[i]

    return len(rows)


