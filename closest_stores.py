"""
Given two List[int] representing locations of stores and houses on a number line

Return List[int] where return[i] is the location of the closest store to houses[i]

Assume:
* M and N are integers in range [1...1000]
* each element of the lists stores, houses are integers in range [0...1,000,000]
"""


def closest_stores(stores, houses):
    ret = []
    for house_loc in houses:
        best_store = (-1, 1000001)  # format: store location, distance from house location; initially placeholder
        for store_loc in stores:
            dist = abs(store_loc - house_loc)
            if dist < best_store[1]:
                best_store = (store_loc, dist)
        ret.append(best_store[0])

    return ret
