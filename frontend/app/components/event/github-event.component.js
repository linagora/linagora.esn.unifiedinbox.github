(function() {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.github')
    .component('inboxGithubEvent', inboxGithubEvent());

  function inboxGithubEvent() {
    return {
      bindings: {
        event: '='
      },
      controllerAs: 'ctrl',
      templateUrl: '/unifiedinbox.github/app/components/event/github-event.html'
    };
  }
})();
