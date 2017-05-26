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
  var size = n;
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
  if (n === 0) {
    return [];
  }
  var board, numPieces;
  var solutionBoard = new Board ({ 'n': n });
  
  for (var startRow = 0; startRow < n; startRow++) {
    for (var startCol = 0; startCol < n; startCol++) {
      board = new Board({'n': n});
      board.togglePiece(startRow, startCol);
      for (var row = 0; row < n; row++) {
        for (var col = 0; col < n; col++) {
          if (startRow !== row && startCol !== col) {
            board.togglePiece(row, col);
            if (board.hasAnyQueenConflictsOn(row, col)) {
              board.togglePiece(row, col);
            }
          }
        }
      }
      numPieces = _.reduce(board.rows(), function(memo, row) {
        return memo + _.reduce(row, function(memo, col) {
          return memo + col;
        }, 0);
      }, 0);
      if (numPieces === n) {
        solutionBoard = board;
        console.log('Single solution for ' + n + ' queens:', JSON.stringify(solutionBoard));
        return solutionBoard.rows();
      } 
    }  
  }

  // no proper solution case
  return solutionBoard.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  solutionCount = 0;
  var board = new Board ({'n': n});  

  if (n === 2 || n === 3) {
    return solutionCount;
  }

  var checker = function(row) {
    if (row === n) {
      solutionCount++;
    } else {
      for (var i = 0; i < n; i++) { // each column per row
        board.togglePiece(row, i);
        if (!board.hasAnyQueensConflicts()) {
          checker(row + 1);
        }
        board.togglePiece(row, i);
      }
    }
  };

  checker(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
