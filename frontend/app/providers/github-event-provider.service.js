(function() {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.github')
    .factory('inboxGithubEventProvider', inboxGithubEventProvider);

  function inboxGithubEventProvider($q, newProvider, inboxGithubApiEventsService, ELEMENTS_PER_REQUEST, INBOX_GITHUB_NAME, INBOX_GITHUB_TYPE, PROVIDER_TYPES) {

    return function(account) {
      return newProvider({
        id: INBOX_GITHUB_TYPE,
        account: account.username,
        types: [INBOX_GITHUB_TYPE, PROVIDER_TYPES.SOCIAL],
        name: INBOX_GITHUB_NAME,
        fetch: function() {
          var githubEvents = new inboxGithubApiEventsService(account);

          return function() {
            return githubEvents.fetchEvents(ELEMENTS_PER_REQUEST)
              .then(function(events) {
                events.forEach(function(event) {
                  event.date = new Date(event.created_at);
                });

                return events;
              });
          };
        },
        buildFetchContext: function(options) {
          return options && options.quickFilter ? $q.reject('Github does not support server-side filtering') : $q.when();
        },
        templateUrl: '/unifiedinbox.github/app/providers/github-event-provider'
      });
    };
  }
})();
