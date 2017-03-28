(function() {
  'use strict';

  angular.module('linagora.esn.unifiedinbox')

    .run(function($q, inboxPlugins, _, INBOX_GITHUB_TYPE) {
      inboxPlugins.add({
        type: INBOX_GITHUB_TYPE,
        contextSupportsAttachments: _.constant($q.when(false)),
        resolveContextName: function(account) {
          return $q.when('@' + account);
        },
        getEmptyContextTemplateUrl: _.constant($q.when('/unifiedinbox.github/app/services/plugin/github-plugin-empty-message.html'))
      });
    });

})();
