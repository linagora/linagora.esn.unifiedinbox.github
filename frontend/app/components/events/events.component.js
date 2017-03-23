(function() {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.github')
    .component('inboxGithubEvents', inboxGithubEvents());

  function inboxGithubEvents() {
    return {
      controller: 'inboxGithubEventsController',
      controllerAs: 'ctrl',
      templateUrl: '/unifiedinbox.github/app/components/events/events.html'
    };
  }
})();
