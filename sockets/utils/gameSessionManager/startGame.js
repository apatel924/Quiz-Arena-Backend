const GameSession = require('../../../models/GameSession');
const generateRoundsForCategory = require('./generateRounds');
const startRound = require('./startRound');

const startGame = async (category, players, io) => {
  const rounds = await generateRoundsForCategory(category);

  console.log('🚀  startGame triggered');

  let gameSession = new GameSession({
    category: category,
    players: players.map((playerSocketId) => {
      return {
        socketId: playerSocketId.socketId,
        id: playerSocketId.userId,
        name: playerSocketId.name,
        score: 0,
      };
    }),
    rounds: rounds,
    startTime: new Date(),
  });

  await gameSession.save();

  players.forEach((playerSocketId) => {
    io.to(playerSocketId.socketId).emit('game_start', { category });
  });

  // Start the first round
  startRound(gameSession._id, 1, players, io);
};

module.exports = startGame;
