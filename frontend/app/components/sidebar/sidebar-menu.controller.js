(function() {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.github')
    .controller('inboxGithubSidebarMenuController', inboxGithubSidebarMenuController);

  function inboxGithubSidebarMenuController(session, inboxConfig, INBOX_GITHUB_CONFIG_RECEIVED_EVENTS, INBOX_GITHUB_TYPE) {
    var self = this;

    self.$onInit = $onInit;

    function $onInit() {
      inboxConfig(INBOX_GITHUB_CONFIG_RECEIVED_EVENTS).then(function(enabled) {
        self.accounts = enabled ? session.getProviderAccounts(INBOX_GITHUB_TYPE) : [];
      });
    }
  }
})();
