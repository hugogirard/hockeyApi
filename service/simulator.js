

class simulator {

    constructor() { 
      this.gameResults = [];
    }

    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    simulateGameResult(date, canadianTeams, eastCoastUsaTeams) {

      // Check if games for this date have already been simulated
      if (this.gameResults[date]) {
        return this.gameResults[date];
      }

      const numGames = Math.min(10, Math.floor(Math.random() * 10) + 1); // Random number of games (1 to 10)
      const maxGoals = 10;

      // Shuffle the team arrays to ensure randomness
      this.shuffleArray(canadianTeams);
      this.shuffleArray(eastCoastUsaTeams);

      const results = [];

      for (let i = 0; i < numGames; i++) {
        const homeTeam = canadianTeams[i % canadianTeams.length];
        const awayTeam = eastCoastUsaTeams[i % eastCoastUsaTeams.length];

        const periods = Math.min(3, Math.floor(Math.random() * 3) + 1); // Random number of periods (1 to 3)
        const homeTeamScore = [];
        const awayTeamScore = [];

        for (let period = 1; period <= periods; period++) {
          const homeGoals = Math.floor(Math.random() * (maxGoals + 1)); // Random goals for home team (0 to maxGoals)
          const awayGoals = Math.floor(Math.random() * (maxGoals + 1)); // Random goals for away team (0 to maxGoals)

          homeTeamScore.push(homeGoals);
          awayTeamScore.push(awayGoals);
        }

        const finalHomeScore = homeTeamScore.reduce((acc, score) => acc + score, 0);
        const finalAwayScore = awayTeamScore.reduce((acc, score) => acc + score, 0);

        const gameResult = {
          homeTeam,
          awayTeam,
          homeTeamScore,
          awayTeamScore,
          finalHomeScore,
          finalAwayScore,
        };

        results.push(gameResult);
      }

      // Store the game results in the database
      this.gameResults[date] = results;

      return results;
    }
}

module.exports = () => new simulator();