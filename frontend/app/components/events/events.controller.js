(function() {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.github')
    .controller('inboxGithubEventsController', inboxGithubEventsController);

  function inboxGithubEventsController($stateParams, _, session, infiniteScrollHelper, inboxProviders, PageAggregatorService, sortByDateInDescendingOrder, ELEMENTS_PER_PAGE, INBOX_GITHUB_SUPPORTED_EVENTS, INBOX_GITHUB_TYPE) {
    var self = this;

    self.account = _.find(session.getProviderAccounts(INBOX_GITHUB_TYPE), { username: $stateParams.username });
    self.isSupported = isSupported;

    self.loadMoreElements = infiniteScrollHelper(self, function() {
      if (self.aggregator) {
        return load();
      }

      return inboxProviders.getAll({
        acceptedIds: [INBOX_GITHUB_TYPE + '-' + self.account.id]
      }).then(function(providers) {
        self.aggregator = new PageAggregatorService('unifiedInboxGithubControllerAggregator', providers, {
          compare: sortByDateInDescendingOrder,
          results_per_page: ELEMENTS_PER_PAGE
        });

        return load();
      });

      function load() {
        return self.aggregator.loadNextItems().then(_.property('data'), _.constant([]));
      }
    });

    function isSupported(event) {
      return _.include(INBOX_GITHUB_SUPPORTED_EVENTS, event.type);
    }
  }
})();
