(function() {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.github')
    .controller('inboxGithubEventController', inboxGithubEventController);

  function inboxGithubEventController(_, INBOX_GITHUB_SUPPORTED_EVENTS) {
    var self = this;

    self.$onInit = $onInit;

    function $onInit() {
      self.supported = _.include(INBOX_GITHUB_SUPPORTED_EVENTS, self.event.type);
    }

  }
})();
