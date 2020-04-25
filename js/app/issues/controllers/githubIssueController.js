/**
 * Github Issue Controller 
 */
app
.controller(
		"GithubIssueController",
		['$scope','$rootScope','githubService','NgTableParams','$location','localStorageService','$filter',
		function($scope, $rootScope,githubService,NgTableParams,$location,localStorageService,$filter) {
		//initilize the issue details from localstorage
		$rootScope.issue = 	localStorageService.get('issue');
		$rootScope.comments = 	localStorageService.get('comments');
		
		//On click of issue row, this function will display details page
		$scope.issueDeatils = function(issue){
			$scope.path = '/issue/'+issue.number;
			$location.path('/issue/'+issue.number);
			$rootScope.issue = issue;
			$scope.listComments(issue.comments_url);
			localStorageService.set('issue',issue);
		};
		
		$scope.listComments = function(url){
			githubService.getComments(url).then(function(data) {
								$rootScope.comments = data.data;
								localStorageService.set('comments',data.data);
							});
		};
		
		$scope.goToMainPage = function(){
			$scope.path = '/issuesList';
			$location.path('/issuesList');
		};
		
		// ngTable parameter initilization with data.	
		$scope.tableParams = new NgTableParams({
		page: 1,            // show first page
		count: 10,          // count per page
		filter: {
					//name: 'M'       // initial filter
				},
				sorting: {
					number: 'desc'     // initial sorting
				}
		}, {
			getData: function(params) {
		// ajax request to api
		return githubService.getIssues()
				.then(
						function(data) {
							var filteredData = params.filter() ?
                                $filter('filter')(data.data, params.filter()) :
                                data.data;
							var orderedData = params.sorting() ?
                                $filter('orderBy')(filteredData, params.orderBy()) :
                                data.data;
							params.total(orderedData.length)	
							var offset = params.page() > 1 ? (params
													.page() - 1)
													* params.count()
													: 0;
							return orderedData.slice(offset,params.count()+offset);
						});
				}
		}
		);
} ]);