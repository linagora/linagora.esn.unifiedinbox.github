'use strict';

/* global chai */

var expect = chai.expect;

describe('The inboxGithubEventsSubheaderController controller', function() {

  var $stateParams, scope, $rootScope, $controller;

  beforeEach(function() {
    $stateParams = {};
  });

  beforeEach(function() {
    module('linagora.esn.unifiedinbox.github', function($provide) {
      $provide.value('$stateParams', $stateParams);
    });
  });

  beforeEach(angular.mock.inject(function(_$rootScope_, _$controller_) {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    $controller = _$controller_;
  }));

  function getNewController(locals) {
    var controller = $controller('inboxGithubEventsSubheaderController', {$scope: scope}, locals);

    scope.$digest();

    return controller;
  }

  it('should set the username from $stateParams', function() {
    $stateParams.username = 'chamerling';

    var controller = getNewController();

    expect(controller.username).to.deep.equal($stateParams.username);
  });
});
