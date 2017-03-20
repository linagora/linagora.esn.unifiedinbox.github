(function() {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.github')
    .component('inboxGithubEventsSubheader', inboxGithubEventsSubheader());

  function inboxGithubEventsSubheader() {
    return {
      controller: 'inboxGithubEventsSubheaderController',
      controllerAs: 'ctrl',
      templateUrl: '/unifiedinbox.github/app/components/events/subheader/events-subheader.html'
    };
  }
})();
