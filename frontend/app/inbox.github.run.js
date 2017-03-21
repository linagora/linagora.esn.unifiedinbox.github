(function() {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.github')
    .run(runBlock);

  function runBlock(session, inboxGithubEventProvider, inboxProviders, INBOX_GITHUB_TYPE) {
    session.ready.then(function(session) {
      session.getProviderAccounts(INBOX_GITHUB_TYPE).forEach(function(account) {
        inboxProviders.add(inboxGithubEventProvider(account));
      });
    });
  }
})();
