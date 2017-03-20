(function() {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.github')
    .config(function($stateProvider) {
      $stateProvider
        .state('unifiedinbox.github', {
          abstract: true,
          url: '/github/:username'
        })
        .state('unifiedinbox.github.events', {
          url: '/events',
          views: {
            'main@unifiedinbox': {
              template: '<sub-header><inbox-github-events-subheader/></sub-header><inbox-github-events/>'
            }
          }
        });
      });
})();
