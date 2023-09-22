const express = require('express');
const { canadianTeams, eastCoastUsaTeams } = require('./model/team.js');
const app = express();

// In-memory database to store game results
const gameResults = [];

app.get('/api/game-results/:date', (req, res) => {
    const date = new Date(req.params.date);
  
    const resultsForDate = gameResults.filter((result) => {
      return (
        result.date.toDateString() === date.toDateString() &&
        (canadianTeams.includes(result.homeTeam) || eastCoastUsaTeams.includes(result.homeTeam))
      );
    });
  
    res.json(resultsForDate);
});

app.get('/api/team-results/:teamName', (req, res) => {
  const teamName = req.params.teamName;

  const teamResults = gameResults
    .filter((result) =>
      (result.homeTeam === teamName || result.awayTeam === teamName) &&
      result.periods >= 3
    )
    .slice(-5)
    .map((result) => {
      return {
        homeTeam: result.homeTeam,
        awayTeam: result.awayTeam,
        resultAfterThirdPeriod: `${result.homeScore} - ${result.awayScore}`,
        date: result.date,
      };
    });

  res.json(teamResults);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});