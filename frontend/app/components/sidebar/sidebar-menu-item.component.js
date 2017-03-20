(function() {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.github')
    .component('inboxGithubSidebarMenuItem', inboxGithubSidebarMenuItem());

  function inboxGithubSidebarMenuItem() {
    return {
      bindings: {
        account: '='
      },
      controllerAs: 'ctrl',
      templateUrl: '/unifiedinbox.github/app/components/sidebar/sidebar-menu-item.html'
    };
  }
})();
