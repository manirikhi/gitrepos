/**
 * App configurations
 */
	'use strict';
	var app = angular.module('app', ['ngRoute','ngTable','LocalStorageModule']);

app.config(function($routeProvider) {
		var routeConfig = {
			controller: 'GithubIssueController',
			templateUrl: 'index.html'
		};
		var issueDetailsConfig = {
			controller: 'GithubIssueController',
			templateUrl: 'issues.html'
		};
		$routeProvider
			.when('/issuesList', routeConfig)
			.when('/issue/:id', issueDetailsConfig)
			.otherwise({
				redirectTo: '/issuesList'
			});
	}); // closes app.config()