(function() {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.github')
    .run(runBlock);

  function runBlock(session, inboxGithubEventProvider, inboxConfig, inboxProviders, INBOX_GITHUB_CONFIG_RECEIVED_EVENTS, INBOX_GITHUB_TYPE) {
    inboxConfig(INBOX_GITHUB_CONFIG_RECEIVED_EVENTS).then(function(enabled) {
      if (enabled) {
        session.getProviderAccounts(INBOX_GITHUB_TYPE).forEach(function(account) {
          inboxProviders.add(inboxGithubEventProvider(account));
        });
      }
    });
  }
})();
