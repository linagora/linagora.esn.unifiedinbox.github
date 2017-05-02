'use strict';

/* global _: false */

describe('The inboxGithubEventProvider service', function() {
  var $rootScope, inboxGithubEventProvider;

  beforeEach(function() {
    module('linagora.esn.unifiedinbox.github', function($provide) {
      $provide.value('newProvider', _.identity);
      $provide.constant('ELEMENTS_PER_REQUEST', 30);
      $provide.constant('PROVIDER_TYPES', {});
    });
  });

  beforeEach(inject(function(_$rootScope_, _inboxGithubEventProvider_) {
    $rootScope = _$rootScope_;
    inboxGithubEventProvider = _inboxGithubEventProvider_;
  }));

  describe('The buildFetchContext function', function() {

    var provider;

    beforeEach(function() {
      provider = inboxGithubEventProvider('@github');
    });

    it('should resolve when no options are given', function(done) {
      provider.buildFetchContext().then(done);
      $rootScope.$digest();
    });

    it('should resolve when quickFilter is not defined', function(done) {
      provider.buildFetchContext({}).then(done);
      $rootScope.$digest();
    });

    it('should reject if quickFilter is defined', function(done) {
      provider.buildFetchContext({quickFilter: 'filter'}).catch(function() {
        done();
      });
      $rootScope.$digest();
    });

  });

});
