#include <iostream>
#include <vector>
#include <utility>
#include <string>

using namespace std;

#define INT_MIN 0x8000'0000
#define INT_MAX 0x7fff'ffff

int divide(int dividend, int divisor) {
  if (dividend == 0) return 0;

  // use bitwise operators to calculate sign
  // 0 positive, 1 negative
  int sign = ((dividend ^ divisor) >> 31) & 1; 


  // get rid of most int_min cases
  bool dividend_int_min = (dividend == INT_MIN);
  if (dividend_int_min) {
    switch (divisor)
    {
      case -1: return INT_MAX;
      case 1: return INT_MIN;
      case INT_MIN: return 1;
    }
    
    // temporarily change to int_max (subtracting a 1 for now)
    dividend = INT_MAX;
  }
  if (divisor == INT_MIN) return 0;


  // change dividend and divisor both to positive
  if ((dividend >> 31) & 1 == 1) {
    dividend = ~dividend + 1;
  }
  if ((divisor >> 31) & 1 == 1) {
    divisor = ~divisor + 1;
  }

  // easy case: 0
  if (divisor > dividend) return 0;


  // MAIN ALGORITHM

  // initialize remainder and quotient
  int quotient = 0;
  int rem = 0;
  int count = 0;
  
  // default: drop down a digit into remainder.
  // If possible, divide it
  while (count < 32)
  {
    // update remainder with next digit
    rem = (rem << 1) | ((dividend >> 31) & 1);

    // update quotient
    quotient = quotient << 1;

    // divisor goes into remainder exactly once
    // update quotient and remainder
    if (rem >= divisor)
    {
      quotient = quotient | 1;
      rem = rem - divisor;
    }

    // update dividend for next digit
    dividend = dividend << 1;

    count++;
  }



  // edge case: int_min
  if (dividend_int_min) {
    rem = rem + 1; // add the 1 back
    if (rem >= divisor) {
      quotient++;
    }
  }

  // Apply negative (if any) using sign
  if (sign == 1) {
    quotient = ~quotient + 1;
  }

  return quotient;
}

int main()
{
  vector<pair<int, int>> test;
  test.push_back(make_pair(0, 1));
  test.push_back(make_pair(INT_MIN, -1));
  test.push_back(make_pair(3, 2));
  test.push_back(make_pair(10, 2));
  test.push_back(make_pair(10, 3));
  test.push_back(make_pair(10, 4));
  test.push_back(make_pair(3, 6));
  test.push_back(make_pair(INT_MIN, INT_MIN));
  test.push_back(make_pair(INT_MIN, INT_MAX));
  test.push_back(make_pair(INT_MIN, 1));
  test.push_back(make_pair(INT_MIN, -1));
  test.push_back(make_pair(INT_MIN, 2));
  test.push_back(make_pair(INT_MIN, -2));
  test.push_back(make_pair(INT_MAX, INT_MIN));
  test.push_back(make_pair(INT_MAX, INT_MAX));
  test.push_back(make_pair(INT_MAX, 1));
  test.push_back(make_pair(INT_MAX, -1));
  test.push_back(make_pair(INT_MAX, 2));
  test.push_back(make_pair(INT_MAX, -2));

  for (int i = 0; i < test.size(); i++)
  {
    cout << 
      "divide(" << to_string(test[i].first) << "," + to_string(test[i].second) << ") -> "
      << divide(test[i].first, test[i].second)
      << endl;
  }
}

