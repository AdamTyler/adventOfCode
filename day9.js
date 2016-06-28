/******************
--- Day 9: All in a Single Night ---

Every year, Santa manages to deliver all of his presents in a single night.

This year, however, he has some new locations to visit; his elves have provided him the distances
between every pair of locations. He can start and end at any two (different) locations he wants,
but he must visit each location exactly once. What is the shortest distance he can travel to
achieve this?

For example, given the following distances:

London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141
The possible routes are therefore:

Dublin -> London -> Belfast = 982
London -> Dublin -> Belfast = 605
London -> Belfast -> Dublin = 659
Dublin -> Belfast -> London = 659
Belfast -> Dublin -> London = 605
Belfast -> London -> Dublin = 982
The shortest of these is London -> Dublin -> Belfast = 605, and so the answer is 605 in this
example.

What is the distance of the shortest route?

****************/

var fs = require('fs');
var readline = require('readline');

var lineReader = readline.createInterface({
  input: fs.createReadStream('./inputs/day9.txt')
});

var cities = [];
var distances = {};

lineReader.on('line', function(line) {
  var match = line.match(/^(\w+) to (\w+) = (\d+)/);
  if (match) {
    if(cities.indexOf(match[1]) === -1) { cities.push(match[1]); }
    if(cities.indexOf(match[2]) === -1) { cities.push(match[2]); }
    distances[match[1]] = distances[match[1]] || {};
    distances[match[1]][match[2]] = parseInt(match[3]);
    distances[match[2]] = distances[match[2]] || {};
    distances[match[2]][match[1]] = parseInt(match[3]);
  }
});

function perms(input) {
  var permArr = [];
  var usedChars = [];
  return (function main() {
    for (var i = 0; i < input.length; i++) {
      var ch = input.splice(i, 1)[0];
      usedChars.push(ch);
      if (input.length === 0) {
        permArr.push(usedChars.slice());
      }
      main();
      input.splice(i, 0, ch);
      usedChars.pop();
    }
    return permArr;
  })();
}

lineReader.on('close', function() {
  var max = -1;
  var min = Number.MAX_VALUE;

  var cityPerms = perms(cities);
  for (var i = 0; i < cityPerms.length; i++) {
    var thisTry = cityPerms[i];
    var total = 0;

    for (var j = 0; j < thisTry.length - 1; j++) {
      total += distances[thisTry[j]][thisTry[j+1]];
    }

    if (total < min) {
      min = total;
    }
  }
  console.log('Shortest distance is:', min);
});
