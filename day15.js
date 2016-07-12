/****************
-- Day 15: Science for Hungry People ---

Today, you set out on the task of perfecting your milk-dunking cookie recipe. All you have to do is
find the right balance of ingredients.

Your recipe leaves room for exactly 100 teaspoons of ingredients. You make a list of the remaining
ingredients you could use to finish the recipe (your puzzle input) and their properties per
teaspoon:

capacity (how well it helps the cookie absorb milk)
durability (how well it keeps the cookie intact when full of milk)
flavor (how tasty it makes the cookie)
texture (how it improves the feel of the cookie)
calories (how many calories it adds to the cookie)
You can only measure ingredients in whole-teaspoon amounts accurately, and you have to be accurate
so you can reproduce your results in the future. The total score of a cookie can be found by adding
up each of the properties (negative totals become 0) and then multiplying together everything
except calories.

For instance, suppose you have these two ingredients:

Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3
Then, choosing to use 44 teaspoons of butterscotch and 56 teaspoons of cinnamon (because the
amounts of each ingredient must add up to 100) would result in a cookie with the following
properties:

A capacity of 44*-1 + 56*2 = 68
A durability of 44*-2 + 56*3 = 80
A flavor of 44*6 + 56*-2 = 152
A texture of 44*3 + 56*-1 = 76
Multiplying these together (68 * 80 * 152 * 76, ignoring calories for now) results in a total
score of 62842880, which happens to be the best score possible given these ingredients. If any
properties had produced a negative total, it would have instead become zero, causing the whole
score to multiply to zero.

Given the ingredients in your kitchen and their properties, what is the total score of the
highest-scoring cookie you can make?

--- Part Two ---

Your cookie recipe becomes wildly popular! Someone asks if you can make another recipe that has
exactly 500 calories per cookie (so they can use it as a meal replacement). Keep the rest of your
award-winning process the same (100 teaspoons, same ingredients, same scoring system).

For example, given the ingredients above, if you had instead selected 40 teaspoons of butterscotch
and 60 teaspoons of cinnamon (which still adds to 100), the total calorie count would be
40*8 + 60*3 = 500. The total score would go down, though: only 57600000, the best you can do in
such trying circumstances.

Given the ingredients in your kitchen and their properties, what is the total score of the
highest-scoring cookie you can make with a calorie total of 500?

*************/

var regex = /(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/;
var fs = require('fs');
var ingredients = [];
var data = fs.readFileSync('./inputs/day15.txt').toString().trim().split('\n');

for(var i = 0; i < data.length; i++) {
  var matches = data[i].match(regex);
  var tempObj = {};
  tempObj.name = matches[1];
  tempObj.capacity = parseInt(matches[2]);
  tempObj.durability = parseInt(matches[3]);
  tempObj.flavor = parseInt(matches[4]);
  tempObj.texture = parseInt(matches[5]);
  tempObj.calories = parseInt(matches[6]);
  ingredients[i] = tempObj;
}

var t1, t2, t3, t4;
var capacity = 0;
var durability = 0;
var flavor = 0;
var texture = 0;
var calories = 0;
var recipe = [];
var score = 0;
var maxScore = 0;

for (t1 = 1; t1 <= 100; t1++) {
  for (t2 = 1; t2 <= 100 - t1; t2++) {
    for (t3 = 1; t3 <= 100 - t1 - t2; t3++) {
      t4 = 100 - t1 - t2 - t3;
      capacity =   t1 * ingredients[0].capacity + t2 * ingredients[1].capacity +
                   t3 * ingredients[2].capacity + t4 * ingredients[3].capacity;
      durability = t1 * ingredients[0].durability + t2 * ingredients[1].durability +
                   t3 * ingredients[2].durability + t4 * ingredients[3].durability;
      flavor =     t1 * ingredients[0].flavor + t2 * ingredients[1].flavor +
                   t3 * ingredients[2].flavor + t4 * ingredients[3].flavor;
      texture =    t1 * ingredients[0].texture + t2 * ingredients[1].texture +
                   t3 * ingredients[2].texture + t4 * ingredients[3].texture;
      calories =    t1 * ingredients[0].calories + t2 * ingredients[1].calories +
                   t3 * ingredients[2].calories + t4 * ingredients[3].calories;
      if (calories !== 500) { continue; }
      if (capacity <= 0 || durability <= 0 || flavor <= 0 || texture <= 0) {
        score = 0;
      } else {
        score = capacity * durability * flavor * texture;
      }
      if (score > maxScore) {
        maxScore = score;
        recipe = [t1,t2,t3,t4];
      }
    }
  }
}

console.log('Max scoring for a cookie is: ', maxScore, recipe);
