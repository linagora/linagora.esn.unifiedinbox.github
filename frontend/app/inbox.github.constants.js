(function() {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.github')
    .constant('INBOX_GITHUB_NAME', 'Github')
    .constant('INBOX_GITHUB_TYPE', 'github')
    .constant('INBOX_GITHUB_SUPPORTED_EVENTS', [
      'CreateEvent',
      'ForkEvent',
      'IssueCommentEvent',
      'PublicEvent',
      'PullRequestReviewCommentEvent',
      'PushEvent',
      'WatchEvent'
    ]);
})();
