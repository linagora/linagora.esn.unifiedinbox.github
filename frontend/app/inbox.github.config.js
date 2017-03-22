(function() {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.github')
    .config(configBlock);

  function configBlock(dynamicDirectiveServiceProvider) {
    dynamicDirectiveServiceProvider.addInjection('inbox-sidebar', new dynamicDirectiveServiceProvider.DynamicDirective(true, 'inbox-github-sidebar-menu'));
  }
})();
