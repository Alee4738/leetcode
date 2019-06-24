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
        self._blacklist = set()
    
    def add(self, element):
        """Add an element to this EqualSet
        
        If element is in the blacklist raise UnsatisfiableException
        """
        if element in self._blacklist:
            print('Failed to add ' + str(element) + ' to ' + str(self) + ', because it\'s in the blacklist', file=sys.stderr)
            raise UnsatisfiableException
        else:
            super().add(element)
    
    def merge(self, other):
        """Merge with another EqualSet, combining blacklists
        
        If these EqualSets cannot be combined due to blacklists, raise UnsatisfiableException
        """
        if self.isdisjoint(other._blacklist) and self._blacklist.isdisjoint(other):
           self.update(other)   # combine elements
           self._blacklist.update(other._blacklist)   # combine blacklists
        else:
            print('Failed to merge ' + str(self) + ' with ' + str(other) + ' due to blacklists', file=sys.stderr)
            raise UnsatisfiableException
    
    def blacklist_add(self, element):
        """Add an element to this EqualSet's blacklist
        
        If element is in the EqualSet raise UnsatisfiableException
        """
        if element not in self:
            self._blacklist.add(element)
        else:
            raise UnsatisfiableException

    def __repr__(self):
        return '%s(set(%s), blacklist: %s)' % (self.__class__.__name__, 
                                    list(self),
                                    self._blacklist)
    

def equationsPossible(equations: List[str]) -> bool:
    equal_set_of = {}   # map str to EqualSet

    try:
        for eqn in equations:
            left, right = eqn[0], eqn[3]
            esl = equal_set_of.setdefault(left, EqualSet())
            if len(esl) == 0:
                esl.add(left)
            esr = equal_set_of.setdefault(right, EqualSet())
            if len(esr) == 0:
                esr.add(right)
            
            
            if eqn[1] == '=':   # equal equation    
                esl.merge(esr)
                for element in esr:
                    equal_set_of[element] = esl
            
            else:   # not equal equation
                esl.blacklist_add(right)
                esr.blacklist_add(left)
    
    except UnsatisfiableException:
        return False
    
    return True


class TestEquationsPossible(unittest.TestCase):
    def test_equal_only(self):
        eqns = ['a==b', 'c==d', 'a==c']
        self.assertTrue(equationsPossible(eqns))
    
    def test_regular(self):
        self.assertFalse(equationsPossible([
            'a!=a'
        ]))
        self.assertFalse(equationsPossible([
            'a==a', 'b==c', 'c==d', 'b!=d'
        ]))

    def test_leetcode(self):
        self.assertFalse(equationsPossible([
            "a==b", "b!=a"
        ]))
        self.assertTrue(equationsPossible([
            "b==a","a==b"
        ]))
        self.assertTrue(equationsPossible([
            "a==b","b==c","a==c"
        ]))
        self.assertFalse(equationsPossible([
            "a==b","b!=c","c==a"
        ]))
        self.assertTrue(equationsPossible([
            "c==c","b==d","x!=z"
        ]))


"""
class TestEqualSet(unittest.TestCase):

    def setUp(self):
        self.no_blacklist = EqualSet()
        self.no_456 = EqualSet()
        self.no_456.blacklist_add(4)
        self.no_456.blacklist_add(5)
        self.no_456.blacklist_add(6)

    def test_add(self):
        self.no_blacklist.add(1)
        self.no_blacklist.add(2)
        self.assertIn(1, self.no_blacklist)
        self.assertIn(2, self.no_blacklist)
        self.no_blacklist.pop()
        self.no_blacklist.pop()
        self.assertEqual(len(self.no_blacklist), 0)

        # without exception
        self.no_456.add(1)
        self.no_456.add(2)
        self.assertIn(1, self.no_456)
        self.assertIn(2, self.no_456)

        # with exception
        self.assertRaises(UnsatisfiableException, lambda: self.no_456.add(4))
        self.assertRaises(UnsatisfiableException, lambda: self.no_456.add(5))

    def test_merge(self):
        self.no_456.add(1)
        self.no_456.add(2)
        self.no_blacklist.merge(self.no_456)
        self.assertRaises(UnsatisfiableException, lambda: self.no_blacklist.add(4))
        self.assertRaises(UnsatisfiableException, lambda: self.no_blacklist.add(5))
        self.assertIn(1, self.no_blacklist)
        self.assertIn(2, self.no_blacklist)
"""


if __name__ == "__main__":
    unittest.main()
