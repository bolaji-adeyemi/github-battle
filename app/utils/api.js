var axios = require('axios');

var id = 'Iv1.92a89375064aab84';
var sec = '507b2ffdc3489bb6721cc085ba8892a85dd9dbf1';
var params = '?client_id=' + id + '&client_secret=' + sec;
//21314571a7c814ab7e0f0c9c8df520500ecd2aeb
function getProfile(username) {
    return axios.get('https://api.github.com/users/' + username + params)
        .then(function (user) {
            return user.data;
        });
}

function getRepos(username) {
    return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100')
}

function getStarCount(repos) {
    return repos.data.reduce(function (count, repo) {
        return count + repo.stargazers_count;
    }, 0);

}
function calculateScore(profile, repos) {
    var followers = profile.followers;
    var totalStars = getStarCount(repos);

    return (followers * 3) + totalStars;
}

function handleError(error) {
    console.warn(error);
    return null;
}
function getUserData(player) {
    return axios.all([
        getProfile(player),
        getRepos(player)
    ]).then(function (data) {
        var profile = data[0];
        var repos = data[1];

        return {
            profile: profile,
            score: calculateScore(profile, repos)
        }

    })
}
function sortPlayers(players) {
    return players.sort(function (a, b) {
        return b.score - a.score;
    });
}
/*getProfile('bolaji-adeyemi')
 .then(function (data) {

 })*/

module.exports = {
    battle: function (players) {
        return axios.all(players.map(getUserData))
            .then(sortPlayers)
            .catch(handleError)
    },
    fetchPopularRepos: function (language) {
        var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');

        return axios.get(encodedURI)
            .then(function (response) {
                return response.data.items;
            });

    }
}