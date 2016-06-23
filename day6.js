/****************

--- Day 6: Probably a Fire Hazard ---

Because your neighbors keep defeating you in the holiday house decorating contest year after year,
you've decided to deploy one million lights in a 1000x1000 grid.

Furthermore, because you've been especially nice this year, Santa has mailed you instructions
on how to display the ideal lighting configuration.

Lights in your grid are numbered from 0 to 999 in each direction; the lights at each corner are
at 0,0, 0,999, 999,999, and 999,0. The instructions include whether to turn on, turn off,
r toggle various inclusive ranges given as coordinate pairs. Each coordinate pair represents
opposite corners of a rectangle, inclusive; a coordinate pair like 0,0 through 2,2 therefore
refers to 9 lights in a 3x3 square. The lights all start turned off.

To defeat your neighbors this year, all you have to do is set up your lights by doing
the instructions Santa sent you in order.

For example:

turn on 0,0 through 999,999 would turn on (or leave on) every light.
toggle 0,0 through 999,0 would toggle the first line of 1000 lights, turning off the ones that
were on, and turning on the ones that were off.
turn off 499,499 through 500,500 would turn off (or leave off) the middle four lights.
After following the instructions, how many lights are lit?


--- Part Two ---

You just finish implementing your winning light pattern when you realize you mistranslated Santa's
message from Ancient Nordic Elvish.

The light grid you bought actually has individual brightness controls; each light can have a
brightness of zero or more. The lights all start at zero.

The phrase turn on actually means that you should increase the brightness of those lights by 1.

The phrase turn off actually means that you should decrease the brightness of those lights by 1,
to a minimum of zero.

The phrase toggle actually means that you should increase the brightness of those lights by 2.

What is the total brightness of all lights combined after following Santa's instructions?

For example:

turn on 0,0 through 0,0 would increase the total brightness by 1.
toggle 0,0 through 999,999 would increase the total brightness by 2000000.

****************/

var fs = require('fs');
var readline = require('readline');
var width = 1000, height = 1000;
var grid = [];
var lineReader = readline.createInterface({
  input: fs.createReadStream('./inputs/day6.txt')
});

// create lights array
function createGrid(cb) {
  for(var i = 0; i < height; i++) {
    grid[i] = [];
    for(var j = 0; j < width; j++) {
      grid[i][j] = 0;
    }
  }
  cb();
}

var turn = function(type, start, finish, part) {
  var vals1 = {'on': 1, 'off': 0};
  var vals2 = {'on': 1, 'off': -1};
  start = start.split(',').map(function (x) {
    return parseInt(x, 10);
  });
  finish = finish.split(',').map(function (x) {
    return parseInt(x, 10);
  });

  for(var i = start[0]; i <= finish[0]; i++) {
    for(var j = start[1]; j <= finish[1]; j++) {
      if(part === 1) {
        grid[i][j] = vals1[type];
      } else {
        grid[i][j] += vals2[type];
        if (grid[i][j] < 0) { grid[i][j] = 0; }
      }
    }
  }
};

var toggle = function(start, finish, part) {
  start = start.split(',').map(function (x) {
    return parseInt(x, 10);
  });
  finish = finish.split(',').map(function (x) {
    return parseInt(x, 10);
  });

  for(var i = start[0]; i <= finish[0]; i++) {
    for(var j = start[1]; j <= finish[1]; j++) {
      if(part === 1) {
        grid[i][j] ^= 1;
      } else {
        grid[i][j] += 2;
      }
    }
  }
};

var main = function() {
  // define with part we are solving
  var part = 2;
  lineReader.on('line', function(line) {
    line = line.split(' ');
    var type = line[0];
    if(type === 'turn') {
      turn(line[1], line[2], line[4], part);
    } else {
      toggle(line[1], line[3], part);
    }
  });

  lineReader.on('close', function() {
    var numLit = 0;
    for(var i = 0; i < height; i++) {
      for(var j = 0; j < width; j++) {
        numLit += grid[i][j];
      }
    }
    console.log('lights lit:', numLit);
  });
};

createGrid(main);
