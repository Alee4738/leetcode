CC=g++
flags='--std=c++14'


div_two_ints.out: src/div_two_ints.cpp
	$(CC) $^ $(flags) -o $@
