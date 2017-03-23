(function() {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.github')
    .factory('inboxGithubApiEventsService', inboxGithubApiEventsService);

  function inboxGithubApiEventsService($q, inboxGithubApiService) {

    function GithubEvents(account) {
      this.account = account;
      this.githubApiClient = new inboxGithubApiService(this.account);
      this.page = 1;
      this.end = false;
      this.events = [];
    }

    GithubEvents.prototype.fetchEvents = function(size) {
      var self = this;

      return get();

      function get() {
        if (self.end) {
          return $q.when([]);
        }

        return self.githubApiClient.getReceivedEvents(self.page).then(function(result) {
          var links = inboxGithubApiService.parseLink(result.headers('Link'));

          self.end = !links.last;
          if (!self.end) {
            self.page++;
          }

          Array.prototype.push.apply(self.events, result.data);

          if (self.end || result.data.length === 0 || self.events.length >= size) {
            var out = _chunk(self.events);

            self.events = out[1] || [];

            return out[0];
          }

          return get();
        });
      }

      function _chunk(arr) {
        var result = [];

        for (var i = 0; i < arr.length; i += size) {
          if (typeof arr.slice === 'function') {
            result.push(arr.slice(i, size + i));
          } else {
            result.push(arr.subarray(i, size + i));
          }
        }

        return result;
      }
    };

    return GithubEvents;
  }

})();
