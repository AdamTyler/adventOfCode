/*****************
--- Day 11: Corporate Policy ---

Santa's previous password expired, and he needs help choosing a new one.

To help him remember his new password after the old one expires, Santa has devised a method of
coming up with a password based on the previous one. Corporate policy dictates that passwords
ust be exactly eight lowercase letters (for security reasons), so he finds his new password by
incrementing his old password string repeatedly until it is valid.

Incrementing is just like counting with numbers: xx, xy, xz, ya, yb, and so on. Increase the
rightmost letter one step; if it was z, it wraps around to a, and repeat with the next letter
to the left until one doesn't wrap around.

Unfortunately for Santa, a new Security-Elf recently started, and he has imposed some additional
password requirements:

Passwords must include one increasing straight of at least three letters, like abc, bcd, cde, and
so on, up to xyz. They cannot skip letters; abd doesn't count.
Passwords may not contain the letters i, o, or l, as these letters can be mistaken for other
characters and are therefore confusing.
Passwords must contain at least two different, non-overlapping pairs of letters, like aa, bb, or zz.
For example:

hijklmmn meets the first requirement (because it contains the straight hij) but fails the second
requirement requirement (because it contains i and l).
abbceffg meets the third requirement (because it repeats bb and ff) but fails the first requirement.
abbcegjk fails the third requirement, because it only has one double letter (bb).
The next password after abcdefgh is abcdffaa.
The next password after ghijklmn is ghjaabcc, because you eventually skip all the passwords that
start with ghi..., since i is not allowed.
Given Santa's current password (your puzzle input), what should his next password be?
************/

var input = 'hepxcrrq';

function setCharAt (str, index, char) {

  return str.substr(0,index) + char + str.substr(index + 1);
}

function incrementPass (password, place) {

  if (place < 0) {
    return password;
  }
  if (password.charAt(place) === 'z') {
    password = setCharAt(password, place, 'a');
    return incrementPass(password, place - 1);
  } else {
    var newChar = String.fromCharCode(password.charCodeAt(place) + 1);
    password = setCharAt(password, place, newChar);
    //
    return password;
  }
}

// Passwords must include one increasing straight of at least three letters
function threeInc (str) {

  for (var i = 0; i < str.length - 2; i++) {
    if ((str.charCodeAt(i) + 1 === str.charCodeAt(i+1)) &&
        (str.charCodeAt(i+1) + 1 === str.charCodeAt(i+2))) {
      return true;
    }
  }
  return false;
}

// Passwords may not contain the letters i, o, or l
function containBad (str) {

  return str.match(/[iol]/g);
}

// Passwords must contain at least two different, non-overlapping pairs of letters
function hasPairs (str) {

  var numPairs = 0;
  for (var i = 0; i < str.length - 1; i++) {
    if (str[i] == str[i+1]) {
      numPairs += 1;
      i += 1;
    }
  }
  if(numPairs >= 2) {
    return true;
  }
  return false;
}

function validatePass (pass) {

  if(threeInc(pass) && !containBad(pass) && hasPairs(pass)) {
    return true;
  }
  return false;
}

function runIt() {
  do {
    input = incrementPass(input, input.length - 1);
  } while(!validatePass(input));
  console.log('Password is:',input);
}

runIt();
