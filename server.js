const express = require('express');
const { canadianTeams, eastCoastUsaTeams } = require('./model/team.js');
const simulatorService = require('./service/simulator.js')();
const app = express();

// In-memory database to store game results
const gameResults = [];

app.get('/api/game-results/:date', (req, res) => {

  const requestedDate = req.params.date;

  const gameResult = simulatorService.simulateGameResult(requestedDate,canadianTeams,eastCoastUsaTeams);

  res.json(gameResult);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});