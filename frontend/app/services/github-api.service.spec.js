'use strict';

/* global chai */

var expect = chai.expect;

describe('The inboxGithubApiService factory', function() {
  var $httpBackend, inboxGithubApiService, githubApi, account;

  beforeEach(function() {
    angular.mock.module('linagora.esn.unifiedinbox.github');
  });

  beforeEach(angular.mock.inject(function(_$httpBackend_, _inboxGithubApiService_) {
    $httpBackend = _$httpBackend_;
    inboxGithubApiService = _inboxGithubApiService_;
  }));

  beforeEach(function() {
    account = {
      username: 'chamerling',
      token: '123456789'
    };
    githubApi = new inboxGithubApiService(account);
  });

  describe('The parseLink static function', function() {
    it('should parse the input link correctly', function() {
      var next = 'https://api.github.com/user/264403/repos?page=3&per_page=30';
      var previous = 'https://api.github.com/user/264403/repos?page=1&per_page=30';
      var last = 'https://api.github.com/user/264403/repos?page=5&per_page=30';

      var linkHeader =
        '<' + next + '>; rel="next", ' +
        '<' + previous + '>; rel="prev", ' +
        '<' + last + '>; rel="last"';

      var links = inboxGithubApiService.parseLink(linkHeader);

      expect(links.next).to.equal(next);
      expect(links.prev).to.equal(previous);
      expect(links.last).to.equal(last);
    });
  });

  describe('The getReceivedEvents function', function() {
    it('should call the right endpoint with rigth parameters', function() {
      var responseData = { key: 'value' };
      var page = 2;

      $httpBackend.expectGET('https://api.github.com/users/' + account.username + '/received_events?page=' + page, undefined, {
        Authorization: 'token ' + account.token,
        Accept: 'application/vnd.github.v3.json',
        'User-Agent': '@linagora'
      }).respond(200, responseData);
      githubApi.getReceivedEvents(page);
      $httpBackend.flush();
    });
  });
});
