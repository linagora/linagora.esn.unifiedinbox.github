(function() {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.github')
    .component('inboxGithubSidebarMenu', inboxGithubSidebarMenu());

  function inboxGithubSidebarMenu() {
    return {
      controller: 'inboxGithubSidebarMenuController',
      controllerAs: 'ctrl',
      templateUrl: '/unifiedinbox.github/app/components/sidebar/sidebar-menu.html'
    };
  }
})();
