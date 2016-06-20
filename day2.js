/***********
--- Day 2: I Was Told There Would Be No Math ---

The elves are running low on wrapping paper, and so they need to submit an order for more. They
have a list of the dimensions (length l, width w, and height h) of each present, and only want to
order exactly as much as they need.

Fortunately, every present is a box (a perfect right rectangular prism), which makes calculating
the required wrapping paper for each gift a little easier: find the surface area of the box, which
is 2*l*w + 2*w*h + 2*h*l. The elves also need a little extra paper for each present: the area of
the smallest side.

For example:

A present with dimensions 2x3x4 requires 2*6 + 2*12 + 2*8 = 52 square feet of wrapping paper plus 6
square feet of slack, for a total of 58 square feet.
A present with dimensions 1x1x10 requires 2*1 + 2*10 + 2*10 = 42 square feet of wrapping paper
plus 1 square foot of slack, for a total of 43 square feet.
All numbers in the elves' list are in feet. How many total square feet of wrapping paper
should they order?

*******/

var fs = require('fs');
var readline = require('readline');
var sqftPaper = 0;

function getSurfaceArea(l, w, h) {
  return 2*l*w + 2*w*h + 2*h*l;
}

var lineReader = readline.createInterface({
  input: fs.createReadStream('./inputs/day2.txt'),
});

lineReader.on('line', function(line) {
  var dims = line.split('x');
  var length = parseInt(dims[0]);
  var width = parseInt(dims[1]);
  var height = parseInt(dims[2]);
  var smallest = Math.min(length*width, length*height, width*height);

  sqftPaper += getSurfaceArea(length, width, height) + smallest;
});

lineReader.on('close', function() {
  console.log('The elves need ' + sqftPaper + ' sqft of paper');
});
