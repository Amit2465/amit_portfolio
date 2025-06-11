import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Bot, User } from 'lucide-react';

type Player = 'X' | 'O' | null;

interface Move {
  position: number;
  player: Player;
  moveNumber: number;
}

const TicTacToe = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | null>(null);
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const [moveHistory, setMoveHistory] = useState<Move[]>([]);
  const [moveCounter, setMoveCounter] = useState(0);
  const [blockedCells, setBlockedCells] = useState<{position: number, player: Player}[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [gameMode, setGameMode] = useState<'bot' | 'human'>('bot');
  const [cellKeys, setCellKeys] = useState<number[]>(Array(9).fill(0)); // For selective refresh

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  useEffect(() => {
    checkWinner();
  }, [board]);

  useEffect(() => {
    if (currentPlayer === 'O' && !winner && gameMode === 'bot' && !isThinking) {
      console.log('🤖 Bot turn detected, starting move...');
      setIsThinking(true);
      
      const timer = setTimeout(() => {
        makeBotMove();
        setIsThinking(false);
      }, 2000); // 2 seconds delay as requested
      
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, winner, gameMode]);

  const refreshCell = (index: number) => {
    setCellKeys(prev => {
      const newKeys = [...prev];
      newKeys[index] = newKeys[index] + 1;
      return newKeys;
    });
  };

  const checkWinner = () => {
    // Check for actual wins only - NO TIE CHECKING
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setWinningLine(combination);
        setBlockedCells([]); // Clear blocks when someone wins
        return;
      }
    }
    
    // NO TIE CONDITION - Game continues indefinitely until someone wins
    // With move history system, there are always available moves
  };

  const makeBotMove = () => {
    console.log('🤖 Making bot move...');
    
    const availableCells = board.map((cell, index) => 
      cell === null && !blockedCells.some(blocked => blocked.position === index) ? index : null
    ).filter(val => val !== null) as number[];
    
    console.log('🎯 Available cells for bot:', availableCells);
    
    if (availableCells.length === 0) {
      console.log('❌ No available cells for bot');
      return;
    }

    let bestMove = getBestMove(availableCells);
    
    if (bestMove !== -1) {
      console.log(`🎯 Bot choosing cell ${bestMove + 1}`);
      handleCellClick(bestMove, true);
    } else {
      console.log('❌ Bot could not find a valid move');
    }
  };

  const getBestMove = (availableCells: number[]): number => {
    // 1. Try to win
    for (const cell of availableCells) {
      const testBoard = [...board];
      testBoard[cell] = 'O';
      if (checkWinningMove(testBoard, 'O')) {
        return cell;
      }
    }

    // 2. Block player from winning
    for (const cell of availableCells) {
      const testBoard = [...board];
      testBoard[cell] = 'X';
      if (checkWinningMove(testBoard, 'X')) {
        return cell;
      }
    }

    // 3. Take center if available
    if (availableCells.includes(4)) {
      return 4;
    }

    // 4. Take corners
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(corner => availableCells.includes(corner));
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    // 5. Take any available edge
    return availableCells[Math.floor(Math.random() * availableCells.length)];
  };

  const checkWinningMove = (testBoard: Player[], player: Player): boolean => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (testBoard[a] === player && testBoard[b] === player && testBoard[c] === player) {
        return true;
      }
    }
    return false;
  };

  const handleCellClick = (index: number, isBotMove = false) => {
    console.log(`🎯 Cell ${index + 1} clicked by ${isBotMove ? 'bot' : 'human'}`);
    
    // Check if cell is occupied or blocked
    const isBlocked = blockedCells.some(blocked => blocked.position === index);
    
    if (board[index] || winner || isBlocked) {
      console.log('❌ Cell click blocked:', { 
        hasValue: !!board[index], 
        gameOver: !!winner, 
        isBlocked 
      });
      return;
    }
    
    // Prevent human from playing when it's bot's turn
    if (!isBotMove && currentPlayer === 'O' && gameMode === 'bot') {
      console.log('❌ Human tried to play on bot turn');
      return;
    }

    // STEP 1: FIRST BLOCK TILES (if needed)
    let newBoard = [...board];
    let newMoveHistory = [...moveHistory];
    let newBlockedCells = [...blockedCells];

    // Unblock any currently blocked cells (make them empty)
    if (blockedCells.length > 0) {
      console.log('🔓 STEP 1: Unblocking cells and making them empty...');
      
      // Make blocked cells empty and refresh them
      blockedCells.forEach(blocked => {
        newBoard[blocked.position] = null;
        refreshCell(blocked.position); // Refresh only the unblocked cell
        console.log(`🔓 Cell ${blocked.position + 1} is now EMPTY`);
      });
      
      // Remove the moves from history that were blocked
      newMoveHistory = newMoveHistory.filter(move => 
        !blockedCells.some(blocked => blocked.position === move.position)
      );
      
      newBlockedCells = []; // Clear all blocks
    }

    // Check if we need to block the oldest move after this new move
    const newMove: Move = {
      position: index,
      player: currentPlayer,
      moveNumber: moveCounter + 1
    };

    const updatedMoveHistory = [...newMoveHistory, newMove];
    
    // Add the new move to the board
    newBoard[index] = currentPlayer;

    // Check active moves after adding the new move
    const activeMoves = updatedMoveHistory.filter(move => 
      newBoard[move.position] !== null
    );
    
    console.log('📊 Active moves after new move:', activeMoves.length);
    
    // If we have 6 active moves, block the oldest one
    if (activeMoves.length >= 6) {
      const oldestMove = activeMoves[0]; // First move in history is oldest
      
      console.log(`🚫 STEP 1: Blocking oldest move: Player ${oldestMove.player} at cell ${oldestMove.position + 1}`);
      
      // Add to blocked cells (showing transparent symbol)
      newBlockedCells = [{
        position: oldestMove.position,
        player: oldestMove.player
      }];
      
      // Refresh only the cell that gets blocked
      refreshCell(oldestMove.position);
    }

    console.log(`✅ STEP 2: Move made: Player ${currentPlayer} at cell ${index + 1}`);

    // Update all states
    setBoard(newBoard);
    setMoveHistory(updatedMoveHistory);
    setMoveCounter(moveCounter + 1);
    setBlockedCells(newBlockedCells);
    
    // Refresh only the cell that was clicked
    refreshCell(index);
    
    // Change player
    const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
    setCurrentPlayer(nextPlayer);
    
    console.log(`🔄 Turn changed to: ${nextPlayer}`);
  };

  const resetGame = () => {
    console.log('🔄 Game reset');
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine([]);
    setMoveHistory([]);
    setMoveCounter(0);
    setBlockedCells([]);
    setIsThinking(false);
    setCellKeys(Array(9).fill(0)); // Reset all cell keys
  };

  const getStatusMessage = () => {
    if (winner) {
      if (gameMode === 'bot') {
        return winner === 'X' ? "You win! 🎉" : "Bot wins! 🤖";
      }
      return `Player ${winner} wins!`;
    }
    if (isThinking) return "Bot is thinking... (2s)";
    if (gameMode === 'bot') {
      return currentPlayer === 'X' ? "Your turn" : "Bot's turn";
    }
    return `Player ${currentPlayer}'s turn`;
  };

  const getCellContent = (index: number) => {
    const cell = board[index];
    const blockedCell = blockedCells.find(blocked => blocked.position === index);
    const isWinning = winningLine.includes(index);
    
    return (
      <motion.button
        key={`${index}-${cellKeys[index]}`} // Only refresh when this specific cell's key changes
        whileHover={{ scale: cell || blockedCell ? 1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleCellClick(index)}
        className={`
          w-16 h-16 bg-white border-2 border-gray-300 rounded-lg text-xl font-bold
          flex items-center justify-center transition-all duration-200 relative
          ${isWinning ? 'bg-green-200 border-green-400' : ''}
          ${blockedCell ? 'bg-orange-100 border-orange-300 cursor-not-allowed' : ''}
          ${cell || blockedCell ? 'cursor-default' : 'hover:bg-gray-50 cursor-pointer'}
          ${cell === 'X' ? 'text-blue-600' : 'text-red-600'}
        `}
        disabled={!!cell || !!winner || !!blockedCell || (currentPlayer === 'O' && gameMode === 'bot')}
      >
        {/* Show actual cell value */}
        {cell && (
          <motion.span
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 300 }}
          >
            {cell}
          </motion.span>
        )}
        
        {/* Show blocked cell with MORE VISIBLE transparent symbol */}
        {blockedCell && !cell && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.span
              className={`text-4xl font-bold opacity-60 ${
                blockedCell.player === 'X' ? 'text-blue-600' : 'text-red-600'
              }`}
              animate={{ 
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity
              }}
            >
              {blockedCell.player}
            </motion.span>
            <motion.div
              className="absolute bottom-1 right-1 text-orange-600 text-xs font-bold"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              🚫
            </motion.div>
          </motion.div>
        )}
      </motion.button>
    );
  };

  const getAvailableCells = () => {
    return board.filter((cell, index) => 
      cell === null && !blockedCells.some(blocked => blocked.position === index)
    ).length;
  };

  const getActiveMoves = () => {
    return board.filter(cell => cell !== null).length;
  };

  const getNextToBlock = () => {
    const activeMoves = moveHistory.filter(move => 
      board[move.position] !== null && 
      !blockedCells.some(blocked => blocked.position === move.position)
    );
    
    if (activeMoves.length >= 5) {
      const nextToBlock = activeMoves[0];
      const playerName = gameMode === 'bot' 
        ? (nextToBlock.player === 'X' ? 'Your' : 'Bot\'s')
        : `Player ${nextToBlock.player}'s`;
      return `Next to block: ${playerName} move (Cell ${nextToBlock.position + 1})`;
    }
    return '';
  };

  return (
    <div className="h-full bg-gradient-to-br from-red-50 to-pink-50 p-4 pt-16">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Tic Tac Toe</h2>
        
        {/* Game Mode Toggle */}
        <div className="flex justify-center gap-2 mb-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setGameMode('bot');
              resetGame();
            }}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs transition-all ${
              gameMode === 'bot' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Bot size={12} />
            vs Bot
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setGameMode('human');
              resetGame();
            }}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs transition-all ${
              gameMode === 'human' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <User size={12} />
            vs Human
          </motion.button>
        </div>

        <div className="flex items-center justify-center gap-2">
          <p className="text-sm font-medium text-gray-600">{getStatusMessage()}</p>
          {isThinking && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto mb-4">
        {board.map((_, index) => getCellContent(index))}
      </div>

      {/* Game Info */}
      <div className="text-center mb-4">
        <p className="text-xs text-gray-500">
          Active: {getActiveMoves()} | Available: {getAvailableCells()} | Blocked: {blockedCells.length}
        </p>
        
        {/* Show next move to be blocked */}
        {getNextToBlock() && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-orange-600 mt-1"
          >
            ⚠️ {getNextToBlock()}
          </motion.p>
        )}
        
        {blockedCells.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 p-2 bg-orange-50 rounded-lg border border-orange-200"
          >
            <p className="text-xs text-orange-700 font-medium">
              🚫 {blockedCells.length} cell(s) blocked - will be EMPTY after next move
            </p>
            <p className="text-xs text-orange-600">
              Blocked: {blockedCells.map(blocked => `Cell ${blocked.position + 1} (${blocked.player})`).join(', ')}
            </p>
          </motion.div>
        )}
        
        {/* Show ideal state info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200"
        >
          <p className="text-xs text-blue-700 font-medium">
            🎯 Target: 6 Active + 1 Blocked + 2 Empty = 9 Total (No Ties!)
          </p>
        </motion.div>
      </div>

      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetGame}
          className="flex items-center gap-2 mx-auto px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm"
        >
          <RotateCcw size={14} />
          New Game
        </motion.button>
      </div>

      {winner && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200">
            <p className="text-sm font-semibold text-gray-800">
              {gameMode === 'bot' ? 
                 (winner === 'X' ? '🎉 You Win!' : '🤖 Bot Wins!') :
                 `🎉 Player ${winner} Wins!`
              }
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TicTacToe;