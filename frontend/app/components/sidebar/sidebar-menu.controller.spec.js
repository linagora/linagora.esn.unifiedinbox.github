'use strict';

/* global chai, sinon */

var expect = chai.expect;

describe('The inboxGithubSidebarMenuController controller', function() {

  var inboxConfig, session, enabled, scope, $rootScope, $q, $controller, INBOX_GITHUB_TYPE, INBOX_GITHUB_CONFIG_RECEIVED_EVENTS;

  beforeEach(function() {
    session = {
      getProviderAccounts: sinon.spy()
    };

    enabled = true;

    inboxConfig = sinon.spy(function() {
      return $q.when(enabled);
    });
  });

  beforeEach(function() {
    module('linagora.esn.unifiedinbox.github', function($provide) {
      $provide.value('session', session);
      $provide.value('inboxConfig', inboxConfig);
    });
  });

  beforeEach(angular.mock.inject(function(_$rootScope_, _$controller_, _$q_, _INBOX_GITHUB_TYPE_, _INBOX_GITHUB_CONFIG_RECEIVED_EVENTS_) {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    $controller = _$controller_;
    $q = _$q_;
    INBOX_GITHUB_TYPE = _INBOX_GITHUB_TYPE_;
    INBOX_GITHUB_CONFIG_RECEIVED_EVENTS = _INBOX_GITHUB_CONFIG_RECEIVED_EVENTS_;
  }));

  function getNewController(locals) {
    var controller = $controller('inboxGithubSidebarMenuController', {$scope: scope}, locals);

    scope.$digest();

    return controller;
  }

  describe('The $onInit function', function() {
    it('should not set accounts if github.received_events is not enabled', function() {
      var controller = getNewController();

      session.getProviderAccounts = sinon.spy();
      enabled = false;

      controller.$onInit();
      $rootScope.$digest();

      expect(controller.accounts).to.deep.equal([]);
      expect(session.getProviderAccounts).to.not.have.been.called;
      expect(inboxConfig).to.have.been.calledWith(INBOX_GITHUB_CONFIG_RECEIVED_EVENTS);
    });

    it('should set accounts from session', function() {
      var accounts = [{id: '1'}, {id: '2'}];
      var controller = getNewController();

      session.getProviderAccounts = sinon.spy(function() {
        return accounts;
      });

      controller.$onInit();
      $rootScope.$digest();

      expect(controller.accounts).to.deep.equal(accounts);
      expect(session.getProviderAccounts).to.have.been.calledWith(INBOX_GITHUB_TYPE);
      expect(inboxConfig).to.have.been.calledWith(INBOX_GITHUB_CONFIG_RECEIVED_EVENTS);
    });
  });
});
