'use strict';

/* global chai */

var expect = chai.expect;

describe('The inboxGithubEventController controller', function() {

  var INBOX_GITHUB_SUPPORTED_EVENTS, scope, $rootScope, $controller;

  beforeEach(function() {
    angular.mock.module('linagora.esn.unifiedinbox.github');
  });

  beforeEach(angular.mock.inject(function(_$rootScope_, _$controller_, _INBOX_GITHUB_SUPPORTED_EVENTS_) {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    $controller = _$controller_;
    INBOX_GITHUB_SUPPORTED_EVENTS = _INBOX_GITHUB_SUPPORTED_EVENTS_;
  }));

  function getNewController(locals) {
    var controller = $controller('inboxGithubEventController', {$scope: scope}, locals);

    scope.$digest();

    return controller;
  }

  describe('The $onInit function', function() {
    it('should set supported flag to true when event is supported', function() {
      INBOX_GITHUB_SUPPORTED_EVENTS.forEach(function(type) {
        var controller = getNewController({event: {type: type}});

        controller.$onInit();

        expect(controller.supported).to.be.true;
      });
    });

    it('should set supported flag to false when event is not supported', function() {
      INBOX_GITHUB_SUPPORTED_EVENTS.forEach(function(type) {
        var controller = getNewController({event: {type: 'not-suported' + type}});

        controller.$onInit();

        expect(controller.supported).to.be.false;
      });
    });
  });
});
