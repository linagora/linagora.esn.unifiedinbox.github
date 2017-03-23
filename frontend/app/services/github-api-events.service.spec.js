'use strict';

/* global chai, sinon */

var expect = chai.expect;

describe('The inboxGithubApiEventsService service', function() {
  var $q, $rootScope, account, size, inboxGithubApiEventsService, inboxGithubApiService, getReceivedEventsSpyResult;

  beforeEach(function() {
    inboxGithubApiService = function() {};
    inboxGithubApiService.prototype.getReceivedEvents = sinon.spy(function() {
      return getReceivedEventsSpyResult;
    });
    inboxGithubApiService.parseLink = sinon.spy();
  });

  beforeEach(function() {
    module('linagora.esn.unifiedinbox.github', function($provide) {
      $provide.value('inboxGithubApiService', inboxGithubApiService);
    });
  });

  beforeEach(angular.mock.inject(function(_$httpBackend_, _$q_, _$rootScope_, _inboxGithubApiEventsService_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    inboxGithubApiEventsService = _inboxGithubApiEventsService_;
  }));

  beforeEach(function() {
    size = 50;
    account = {
      username: 'chamerling',
      token: '123456789'
    };
  });

  describe('The fetchEvents function', function() {
    it('should resolve with empty array when at the end', function(done) {
      var githubEvents = new inboxGithubApiEventsService(account);

      githubEvents.end = true;

      githubEvents.fetchEvents(size).then(function(result) {
        expect(result).to.deep.equal([]);
        done();
      }, done);
      $rootScope.$digest();
    });

    it('should fetch events from github until size is not reached', function(done) {
      var events = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      var links = {last: 'https://api.github.com/user/264403/repos?page=10&per_page=10'};

      inboxGithubApiService.parseLink = sinon.spy(function() {
        return links;
      });
      getReceivedEventsSpyResult = $q.when({
        data: events,
        headers: function() {
          return links;
        }
      });

      var githubEvents = new inboxGithubApiEventsService(account);

      githubEvents.fetchEvents(size).then(function(result) {
        expect(result.length).to.equal(size);
        expect(inboxGithubApiService.parseLink.callCount).to.equal(5);
        expect(githubEvents.page).to.equal(6);
        expect(githubEvents.end).to.be.false;
        expect(githubEvents.events).to.deep.equal([]);
        done();
      }, done);
      $rootScope.$digest();
    });

    it('should fetch events from github and return them if less than requested events are available', function(done) {
      var pages = 2;
      var events = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      var links = {last: 'https://api.github.com/user/264403/repos?page=10&per_page=10'};

      inboxGithubApiService.parseLink = sinon.stub();
      inboxGithubApiService.parseLink.returns(links);
      inboxGithubApiService.parseLink.onCall(pages).returns({});
      getReceivedEventsSpyResult = $q.when({
        data: events,
        headers: function() {
          return links;
        }
      });

      var githubEvents = new inboxGithubApiEventsService(account);

      githubEvents.fetchEvents(size).then(function(result) {
        expect(result.length).to.equal(events.length * (pages + 1));
        expect(inboxGithubApiService.parseLink.callCount).to.equal(pages + 1);
        expect(githubEvents.page).to.equal(pages + 1);
        expect(githubEvents.end).to.be.true;
        expect(githubEvents.events).to.deep.equal([]);
        done();
      }, done);
      $rootScope.$digest();
    });

    it('should fetch events from github until size, return array, cache remaining events for next call', function(done) {
      size = 5;
      var pages = 2;
      var events = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      var links = {last: 'https://api.github.com/user/264403/repos?page=10&per_page=10'};

      inboxGithubApiService.parseLink = sinon.stub();
      inboxGithubApiService.parseLink.returns(links);
      inboxGithubApiService.parseLink.onCall(pages).returns({});
      getReceivedEventsSpyResult = $q.when({
        data: events,
        headers: function() {
          return links;
        }
      });

      var githubEvents = new inboxGithubApiEventsService(account);

      githubEvents.fetchEvents(size).then(function(result) {
        expect(result).to.deep.equal([0, 1, 2, 3, 4]);
        expect(inboxGithubApiService.parseLink.callCount).to.equal(1);
        expect(githubEvents.page).to.equal(2);
        expect(githubEvents.end).to.be.false;
        expect(githubEvents.events).to.deep.equal([5, 6, 7, 8, 9]);
        done();
      }, done);
      $rootScope.$digest();
    });

    it('should fetch events from github until size, and continue to fetch on next call', function(done) {
      size = 5;
      var pages = 2;
      var events = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      var links = {last: 'https://api.github.com/user/264403/repos?page=10&per_page=10'};

      inboxGithubApiService.parseLink = sinon.stub();
      inboxGithubApiService.parseLink.returns(links);
      inboxGithubApiService.parseLink.onCall(pages).returns({});
      getReceivedEventsSpyResult = $q.when({
        data: events,
        headers: function() {
          return links;
        }
      });

      var githubEvents = new inboxGithubApiEventsService(account);

      githubEvents.fetchEvents(size).then(function(result) {
        expect(result).to.deep.equal([0, 1, 2, 3, 4]);
        expect(inboxGithubApiService.parseLink.callCount).to.equal(1);
        expect(githubEvents.page).to.equal(2);
        expect(githubEvents.end).to.be.false;
        expect(githubEvents.events).to.deep.equal([5, 6, 7, 8, 9]);
        done();
      }, done);
      $rootScope.$digest();
    });
  });
});
