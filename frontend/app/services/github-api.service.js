(function() {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.github')
    .factory('inboxGithubApiService', inboxGithubApiService);

  function inboxGithubApiService($http) {

    function GithubApi(account) {
      this.account = account;
    }

    GithubApi.parseLink = function(link) {
      var parts = link.split(',');
      var links = {};

      for (var i = 0; i < parts.length; i++) {
        var section = parts[i].split(';');

        if (section.length === 2) {
          var url = section[0].replace(/<(.*)>/, '$1').trim();
          var name = section[1].replace(/rel="(.*)"/, '$1').trim();

          links[name] = url;
        }
      }

      return links;
    };

    GithubApi.prototype.getReceivedEvents = function(page) {
      return $http.get('https://api.github.com/users/' + this.account.username + '/received_events',
        {
          params: {
            page: page
          },
          headers: {
            Authorization: 'token ' + this.account.token,
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': '@linagora'
          }
      });
    };

    return GithubApi;
  }
})();
