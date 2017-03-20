(function() {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.github')
    .run(runBlock);

  function runBlock(session, inboxGithubEventProvider, inboxConfig, inboxProviders) {
      // inboxConfig('github').then(function(config) {
      //   if (config) {
      //     session.getGithubAccounts().forEach(function(account) {
      //       inboxProviders.add(inboxGithubProvider('github', account.id));
      //     });
      //   }
      // });
      session.ready.then(function(session) {
        session.getProviderAccounts('github').forEach(function(account) {
          inboxProviders.add(inboxGithubEventProvider(account));
        });
      });
  }

})();
