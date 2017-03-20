(function() {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.github')
    .controller('inboxGithubEventsSubheaderController', inboxGithubEventsSubheaderController);

  function inboxGithubEventsSubheaderController($stateParams) {
    var self = this;

    self.username = $stateParams.username;
  }
})();
