/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {

  /*
  var solution = undefined; //fixme
  var rounds = n || 3; // remaining decisions -- change back to 8 later
  // INITIALIZE: create an array of first-row permutations
  startingArrray = [];
  for (let i = 0; i < n; i++) {
  */

  

  // create next row permutations based on column and row conflicts

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //debugger;
  var size = n || 3;
  var solution = [];
  //TODO: Adjust pieces dynamically based on n

  var pieces = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  var buildBoard = function (size, built) { 
    if (size === 0) {
      solution.push(built);
    } else {
      pieces.forEach( function(ele) {
        // first round needs to concatenate all pieces?
        var builtStr = built.map(JSON.stringify);
        if (!builtStr.includes(JSON.stringify(ele))) {
          buildBoard(size - 1, built.concat([ele]));
        }
        
      });
    }
  };
  buildBoard(3, []);
  console.log(solution);
  var solutionCount = solution.length; 

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
