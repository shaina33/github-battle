var axios = require('axios');

// currently, no authentication
// could add client_id and client_secret query params to increase API rate limit
function getProfile (username) {
  return axios.get('https://api.github.com/users/' + username)
              .then(function (user) {
                return user.data;
              })
}
function getRepos (username) {
  return axios.get('https://api.github.com/users/' + username + '/repos' + '?per_page=100')
}
function getStarCount (repos) {
  return repos.data.reduce(function(count, repo){
    return count + repo.stargazers_count;
  }, 0);
}
function calculateScore (profile, repos) {
  var followers = profile.followers;
  var totalStars = getStarCount(repos);
  return (followers * 3) + totalStars;
}
function handleError (error) {
  console.warn(error);
  return null;
}
function getUserData (player) {
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then(function(data) {
    var profile = data[0];
    var repos = data[1];
    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  })
}
function sortPlayers (players) {
  return players.sort(function(a,b) {
    return b.score - a.score;
  })
}

module.exports = {
// battle takes an array of username strings
// battle returns a sorted array of 2 player objects
// each object contains profile and score properties
// first player is the winner
  battle: function (players) {
    return axios.all(players.map(getUserData))
                .then(sortPlayers)
                .catch(handleError)
  },
  fetchPopularRepos: function (language) {
      var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');
      return axios.get(encodedURI).then(function (response) {
          return response.data.items;
      })
  }
}
