// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      var wasFoundOnce = false;
      
      for (let pos = 0; pos < this.rows().length; pos++) {
        if (row[pos] === 1 && wasFoundOnce) {
          return true;
        } else if (row[pos] === 1) {
          wasFoundOnce = true;
        }     
      }
      return false; 
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var hasConflict = false;
      // loop through all rows and call hasRowConflictAt(row);      

      for (let row = 0; row < this.rows().length; row++) {
        if (this.hasRowConflictAt(row)) {
          hasConflict = true;
        }        
      }

      return hasConflict; 

    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var wasFoundOnce = false;
      var that = this;
      var initial = [0, colIndex];
      var length = this.rows().length;

      var checkNextCol = function(row, col, repeatExists = false) {
        if (row < length && col < length) {
          if (that.rows()[row][col] === 1) {
            if (wasFoundOnce) {
              repeatExists = true;
            }
            wasFoundOnce = true;
          }
          repeatExists = checkNextCol(row + 1, col, repeatExists);
        }
        return repeatExists;
      };

      return checkNextCol(...initial);
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //
      var hasConflict = false;
      for (let col = 0; col < this.rows().length; col++) {
        if (this.hasColConflictAt(col)) {
          hasConflict = true;
        }
      }
      return hasConflict; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //debugger;
      var wasFoundOnce = false;
      var length = this.rows().length;
      var that = this;
      var checkNextDiag = function(row, col, repeatExists = false) {
        //only execute when col and row are within array bounds
        if (col < length && row < length) {
          if (that.rows()[row][col] === 1) {
            if (wasFoundOnce) {
              repeatExists = true;
            }
            wasFoundOnce = true;
          }
          repeatExists = checkNextDiag(row + 1, col + 1, repeatExists);
        }
        return repeatExists;
      };
      //conditional to call checkNextDiag() in proper row/col
      var initial = [];
      if (majorDiagonalColumnIndexAtFirstRow >= 0) {
        initial = [0, majorDiagonalColumnIndexAtFirstRow];
      } else {
        initial = [-majorDiagonalColumnIndexAtFirstRow, 0];
      }
      return checkNextDiag(...initial);
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // set up hasConflict variable
      var hasConflict = false;
      // loop through all row indices except the last one
      var length = this.rows().length;
      for (let pos = -length; pos < length; pos++) {
        if (this.hasMajorDiagonalConflictAt(pos)) {
          hasConflict = true;
        }
      }
      return hasConflict;     
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(index) {
      var initial = [];
      var wasFoundOnce = false;
      var length = this.rows().length;
      var that = this;

      // determine position outside
      if (index < length - 1) {
        initial = [0, index];
      } else {
        initial = [index - length + 1, length - 1];
      }

      var checkNextDiag = function(row, col, repeatExists = false) {
        //first, check to see if its out of bounds
        if (row < length && col < length) {
          if (that.rows()[row][col] === 1) {
            if (wasFoundOnce) {
              repeatExists = true;
            }
            wasFoundOnce = true;
          }
          repeatExists = checkNextDiag(row + 1, col - 1, repeatExists);
        }

        return repeatExists;
      };

      return checkNextDiag(...initial);
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // initialize hasconflict
      var hasConflict = false;

      var length = this.rows().length;
      for (let pos = 0; pos < (length - 1) * 2; pos++) {
        if (this.hasMinorDiagonalConflictAt(pos)) {
          hasConflict = true;
        }
      }

      return hasConflict;  
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
