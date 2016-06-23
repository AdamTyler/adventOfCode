/*********************

--- Day 5: Doesn't He Have Intern-Elves For This? ---

Santa needs help figuring out which strings in his text file are naughty or nice.

A nice string is one with all of the following properties:

It contains at least three vowels (aeiou only), like aei, xazegov, or aeiouaeiouaeiou.
It contains at least one letter that appears twice in a row, like xx, abcdde (dd),
or aabbccdd (aa, bb, cc, or dd).
It does not contain the strings ab, cd, pq, or xy, even if they are part of one of the
other requirements.
For example:

ugknbfddgicrmopn is nice because it has at least three vowels (u...i...o...), a double letter
(...dd...), and none of the disallowed substrings.
aaa is nice because it has at least three vowels and a double letter, even though the letters
used by different rules overlap.
jchzalrnumimnmhp is naughty because it has no double letter.
haegwjzuvuyypxyu is naughty because it contains the string xy.
dvszwmarrgswjxmb is naughty because it contains only one vowel.
How many strings are nice?

--- Part Two ---

Realizing the error of his ways, Santa has switched to a better model of determining whether a
string is naughty or nice. None of the old rules apply, as they are all clearly ridiculous.

Now, a nice string is one with all of the following properties:

It contains a pair of any two letters that appears at least twice in the string without
overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but it overlaps).
It contains at least one letter which repeats with exactly one letter between them, like xyx,
abcdefeghi (efe), or even aaa.
For example:

qjhvhtzxzqqjkmpb is nice because is has a pair that appears twice (qj) and a letter that
repeats with exactly one letter between them (zxz).
xxyxx is nice because it has a pair that appears twice and a letter that repeats with one between,
even though the letters used by each rule overlap.
uurcxstgmygtbstg is naughty because it has a pair (tg) but no repeat with a single letter between
them.
ieodomkazucvgmuy is naughty because it has a repeating letter with one between (odo), but no pair
that appears twice.
How many strings are nice under these new rules?

***************/

var fs = require('fs');
var readline = require('readline');
var niceStrings = 0;
var niceStrings2 = 0;
var lineReader = readline.createInterface({
  input: fs.createReadStream('./inputs/day5.txt'),
});

// ----- Part 1 Functions -----
var checkVowels = function(line) {

  var numVowels = 0;
  var vowels = ['a','e','i','o','u'];
  for(var i =0, max = line.length; i < max; i++) {
    if(vowels.indexOf(line[i]) !== -1) {
      numVowels++;
    }
  }
  if(numVowels >= 3) {
    return true;
  } else {
    return false;
  }
};

var checkTwice = function(line) {

  for(var i =0, max = line.length; i < max; i++) {
    // prevent checking undefined char past end of string
    if(i !== max - 1) {
      if(line[i] === line[i + 1]) {
        return true;
      }
    }
  }
  return false;
};

var badStrings = function(line) {
  var bads = ['ab', 'cd', 'pq', 'xy'];
  for(var i =0, max = bads.length; i < max; i++) {
    if(line.indexOf(bads[i]) !== -1) {
      return true;
    }
  }
  return false;
};

// ----- Part 2 Functions -----
var twoTwice = function(line) {
  for(var i = 0, max = line.length; i < max; i++) {
    var checkFor = line[i] + line[i+1];
    for(var j = i+2; j < max; j++) {
      if((line[j] + line[j+1]) === checkFor) {
        return true;
      }
    }
  }
};

var oneBetween = function(line) {
  for(var i = 0, max = line.length; i < max; i++) {
    if(line[i] === line[i+2]) {
      return true;
    }
  }
};

lineReader.on('line', function(line) {
  // Part 1
  if(checkVowels(line) && checkTwice(line) && !badStrings(line)) {
    niceStrings += 1;
  }
  // Part 2
  if(twoTwice(line) && oneBetween(line)) {
    niceStrings2 += 1;
  }
});

lineReader.on('close', function() {
  console.log('There are ' + niceStrings + ' nice strings in Part1');
  console.log('There are ' + niceStrings2 + ' nice strings in Part2');
})
