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

  var size = n || 3;
  var solution = [];

  // initializes your piece
  var zero = function (num) {
    var zeros = [];
    while (num--) { zeros[num] = 0; }
    return zeros; 
  };
  
  var pieces = zero(size);
  pieces = pieces.map( function (ele, index) {
    var piece = zero(size);
    piece[index] = 1;
    return piece;
  });

  return pieces;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //debugger;
  var size = n || 3;
  var solution = [];

  // initializes your piece
  var zero = function (num) {
    var zeros = [];
    while (num--) { zeros[num] = 0; }
    return zeros; 
  };
  
  var pieces = zero(size);
  pieces = pieces.map( function (ele, index) {
    var piece = zero(size);
    piece[index] = 1;
    return piece;
  });
    
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
  buildBoard(n, []);
  var solutionCount = solution.length; 

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
/*
  if (n === 0) {
    return [];
  }
  var board, numPieces;
  for (var startRow = 0; startRow < n; startRow++) {
    for (var startCol = 0; startCol < n; startCol++) {
      board = new Board({ 'n': n });
      board.toggle(startRow, startCol);
      console.log(board);
      for (var row = 0; row < n; row++) {
        for (var col = 0; col < n; col++) {
          if (!board.hasAnyQueenConflictsOn(row, col)) {
            console.log('add piece!');
            board.toggle(row, col);
          }
        }
      }
      numPieces = _.reduce(board.rows(), function(memo, row) {
        return memo + _.reduce(row, function(memo, col) {
          return memo + col;
        }, 0);
      }, 0);
      if (numPieces === n) {
        console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
        return board.rows();
      }
    }  
  }
*/
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
