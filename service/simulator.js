

class simulator {

    simulateGameResult(homeTeam, awayTeam) {

        const homeScore = Math.floor(Math.random() * 6);
        const awayScore = Math.floor(Math.random() * 6);
        const periods = Math.floor(Math.random() * 3) + 1; // 1 to 3 periods
      
        const gameResult = {
          homeTeam,
          awayTeam,
          homeScore,
          awayScore,
          periods,
          date: new Date(),
        };
      
        gameResults.push(gameResult);
      
        return gameResult;
    }
}

module.exports = () => new simulator();