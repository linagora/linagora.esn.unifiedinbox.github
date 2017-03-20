(function() {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.github')
    .controller('inboxGithubSidebarMenuController', inboxGithubSidebarMenuController);

  function inboxGithubSidebarMenuController(session) {
    var self = this;

    self.$onInit = $onInit;

    function $onInit() {
      self.accounts = session.getProviderAccounts('github');
    }
  }
})();
