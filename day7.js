/************************
--- Day 7: Some Assembly Required ---

This year, Santa brought little Bobby Tables a set of wires and bitwise logic gates! Unfortunately,
little Bobby is a little under the recommended age range, and he needs help assembling the circuit.

Each wire has an identifier (some lowercase letters) and can carry a 16-bit signal
(a number from 0 to 65535). A signal is provided to each wire by a gate, another wire, or some
specific value. Each wire can only get a signal from one source, but can provide its signal to
multiple destinations. A gate provides no signal until all of its inputs have a signal.

The included instructions booklet describes how to connect the parts together: x AND y -> z means
to connect wires x and y to an AND gate, and then connect its output to wire z.

For example:

123 -> x means that the signal 123 is provided to wire x.
x AND y -> z means that the bitwise AND of wire x and wire y is provided to wire z.
p LSHIFT 2 -> q means that the value from wire p is left-shifted by 2 and then provided to wire q.
NOT e -> f means that the bitwise complement of the value from wire e is provided to wire f.
Other possible gates include OR (bitwise OR) and RSHIFT (right-shift). If, for some reason, you'd
like to emulate the circuit instead, almost all programming languages (for example, C, JavaScript,
or Python) provide operators for these gates.

For example, here is a simple circuit:

123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i
After it is run, these are the signals on the wires:

d: 72
e: 507
f: 492
g: 114
h: 65412
i: 65079
x: 123
y: 456
In little Bobby's kit's instructions booklet (provided as your puzzle input), what signal
is ultimately provided to wire a?

--- Part Two ---

Now, take the signal you got on wire a, override wire b to that signal, and
reset the other wires (including wire a). What new signal is ultimately
provided to wire a?

******************/

var fs = require('fs');
var readline = require('readline');

var signals = {};
var done = false;

var lineReader = readline.createInterface({
  input: fs.createReadStream('./inputs/day7.txt')
});

lineReader.on('line', function(line) {
  var data = line.split(' ');
  var equasion = line.split(' -> ');
  // first go, fill object with equasions
  signals[equasion[1]] = equasion[0];

});

function handleAND(k) {
  var arr = signals[k].split(' ');
  // resolve variables
  // if either isn't a number move on, else set it
  if ( (isNaN(signals[arr[0]]) && isNaN(arr[0])) || (isNaN(signals[arr[2]]) && isNaN(arr[2])) ) {
    return false;
  } else {
    var one, two;
    if(isNaN(arr[0])) {
      one = signals[arr[0]];
    } else {
      one = parseInt(arr[0]);
    }
    if(isNaN(arr[2])) {
      two = signals[arr[2]];
    } else {
      two = parseInt(arr[2]);
    }
    signals[k] = one & two;
  }
  return true;
}

function handleNOT(k) {
  var arr = signals[k].split(' ');
  // resolve variables
  // if either isn't a number move on, else set it
  if (isNaN(signals[arr[1]])) {
    return false;
  } else {
    signals[k] = ~signals[arr[1]];
  }
  return true;
}

function handleOR(k) {
  var arr = signals[k].split(' ');
  // resolve variables
  // if either isn't a number move on, else set it
  if (isNaN(signals[arr[0]]) || isNaN(signals[arr[2]])) {
    return false;
  } else {
    signals[k] = signals[arr[0]] | signals[arr[2]];
  }
  return true;
}

function handleLSHIFT(k) {
  var arr = signals[k].split(' ');
  // resolve variables
  // if either isn't a number move on, else set it
  if (isNaN(signals[arr[0]])) {
    return false;
  } else {
    signals[k] = parseInt(signals[arr[0]]) << parseInt(arr[2]);
  }

  return true;
}

function handleRSHIFT(k) {
  var arr = signals[k].split(' ');
  // resolve variables
  // if either isn't a number move on, else set it
  if (isNaN(signals[arr[0]])) {
    return false;
  } else {
    signals[k] = parseInt(signals[arr[0]]) >> parseInt(arr[2]);
  }

  return true;
}

function handleAssign(k) {
  var arr = signals[k].split(' ');
  if (isNaN(signals[arr[0]])) {
    return false;
  } else {
    signals[k] = signals[arr[0]];
  }

  return true;
}

// k is the entry we are trying to resolve
function findSignal() {
  done = true;
  for (var k in signals) {
    if (isNaN(signals[k])) {
      done = false;
      if (signals[k].indexOf('AND') !== -1) {
        handleAND(k);
      } else if (signals[k].indexOf('NOT') !== -1) {
        handleNOT(k);
      } else if (signals[k].indexOf('OR') !== -1) {
        handleOR(k);
      } else if (signals[k].indexOf('LSHIFT') !== -1) {
        handleLSHIFT(k);
      } else if (signals[k].indexOf('RSHIFT') !== -1) {
        handleRSHIFT(k);
      } else {
        handleAssign(k);
      }
    }
  }
}

lineReader.on('close', function() {
  // signals is filled
  // save off fresh signals
  var savedSignals = {};
  for (var i in signals) {
    if(signals.hasOwnProperty(i)) {
      savedSignals[i] = signals[i];
    }
  }
  // run part 1
  while(!done) {
    findSignal();
  }
  console.log('PART 1 signal A: ' + signals.a);
  var savedA = signals.a;
  signals = savedSignals;
  signals.b = savedA;
  done = false;
  // run part 2 with new b value
  while(!done) {
    findSignal();
  }
  console.log('PART 2 signal A: ' + signals.a);
});
