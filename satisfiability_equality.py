"""
990. Satisfiability of Equality Equations
Medium

Given an array equations of strings that represent relationships between variables, each string equations[i] has length 4 and takes one of two different forms: "a==b" or "a!=b".  Here, a and b are lowercase letters (not necessarily different) that represent one-letter variable names.

Return true if and only if it is possible to assign integers to variable names so as to satisfy all the given equations.

 

Example 1:

Input: ["a==b","b!=a"]
Output: false
Explanation: If we assign say, a = 1 and b = 1, then the first equation is satisfied, but not the second.  There is no way to assign the variables to satisfy both equations.

Example 2:

Input: ["b==a","a==b"]
Output: true
Explanation: We could assign a = 1 and b = 1 to satisfy both equations.

Example 3:

Input: ["a==b","b==c","a==c"]
Output: true

Example 4:

Input: ["a==b","b!=c","c==a"]
Output: false

Example 5:

Input: ["c==c","b==d","x!=z"]
Output: true

 

Note:

    1 <= equations.length <= 500
    equations[i].length == 4
    equations[i][0] and equations[i][3] are lowercase letters
    equations[i][1] is either '=' or '!'
    equations[i][2] is '='

"""
import sys
import unittest
from typing import *


class UnsatisfiableException(Exception):
    pass

class EqualSet(set):
    """Set of equal elements that remembers symbols it cannot add in a "blacklist"

    If a symbol in this EqualSet's blacklist is added, raise UnsatisfiableException
    """
    def __init__(self):
        super().__init__()
        self.blacklist = set()
    def add(self, element):
        """Add an element to this EqualSet
        
        If element is in the blacklist raise UnsatisfiableException
        """
        if element in self.blacklist:
            print('Failed to add ' + str(element) + ' to EqualSet ' + str(self) + ', because it\'s in the blacklist', file=sys.stderr)
            raise UnsatisfiableException
        else:
            super().add(element)
    def merge(self, other):
        """Merge with another EqualSet, combining blacklists
        
        If these EqualSets cannot be combined due to blacklists, raise UnsatisfiableException
        """
        if self.isdisjoint(other.blacklist) and self.isdisjoint(other):
           self.update(other)
        else:
            print('Failed to merge EqualSet ' + str(self) + ' with EqualSet ' + str(other) + ' due to blacklists', file=sys.stderr)
            raise UnsatisfiableException
    def __repr__(self):
        return '%s(set(%s), blacklist: %s)' % (self.__class__.__name__, 
                                    list(self),
                                    self.blacklist)
    

def equationsPossible(equations: List[str]) -> bool:
    return False


"""TODO: test EqualSet"""

class TestEqualSet(unittest.TestCase):

    def test_add(self):
        self.assertEqual('foo'.upper(), 'FOO')

if __name__ == "__main__":
    unittest.main()
