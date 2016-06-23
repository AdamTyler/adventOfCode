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


***************/

var fs = require('fs');
var readline = require('readline');
var niceStrings = 0;
var lineReader = readline.createInterface({
  input: fs.createReadStream('./inputs/day5.txt'),
});

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

lineReader.on('line', function(line) {

  if(checkVowels(line) && checkTwice(line) && !badStrings(line)) {
    niceStrings += 1;
  }
});

lineReader.on('close', function() {
  console.log('There are ' + niceStrings + ' nice strings');
})
