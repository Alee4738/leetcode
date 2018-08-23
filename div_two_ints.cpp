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
  bool dividend_int_min = false;
  if (dividend == INT_MIN) {
    if (divisor == -1) return INT_MAX;
    if (divisor == 1) return INT_MIN;
    if (divisor == INT_MIN) return 1;
    
    // temporarily change to int_max (subtracting a 1 for now)
    dividend_int_min = true;
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

  // Naive soln: subtract until 0 or negative
  int quotient = 0;
  while (dividend >= divisor)
  {
    dividend -= divisor;
    quotient++;
  }

  // edge case: int_min
  if (dividend_int_min) {
    dividend = dividend + 1; // add the 1 back
    if (dividend >= divisor) {
      dividend -= divisor;
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
  test.push_back(make_pair(0x8000'0000, -1));
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

