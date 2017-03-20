'use strict';

/* global chai, sinon */

var expect = chai.expect;

describe('The inboxGithubSidebarMenuController controller', function() {

  var session, scope, $rootScope, $controller;

  beforeEach(function() {
    session = {
      getProviderAccounts: sinon.spy()
    };
  });

  beforeEach(function() {
    module('linagora.esn.unifiedinbox.github', function($provide) {
      $provide.value('session', session);
    });
  });

  beforeEach(angular.mock.inject(function(_$rootScope_, _$controller_) {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    $controller = _$controller_;
  }));

  function getNewController(locals) {
    var controller = $controller('inboxGithubSidebarMenuController', {$scope: scope}, locals);

    scope.$digest();

    return controller;
  }

  describe('The $onInit function', function() {
    it('should set accounts from session', function() {
      var accounts = [{id: '1'}, {id: '2'}];
      var controller = getNewController();

      session.getProviderAccounts = sinon.spy(function() {
        return accounts;
      });

      controller.$onInit();

      expect(controller.accounts).to.deep.equal(accounts);
      expect(session.getProviderAccounts).to.have.been.calledWith('github');
    });
  });
});
