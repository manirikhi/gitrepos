/**
 * github services CRUD ajax calls
 */

  "use strict";
        
    app.service('githubService', ['$http', function ($http){
        	this.getIssues = function(){
        		return $http.get('https://api.github.com/repos/twbs/bootstrap/issues');
        	};
			this.getComments = function(url){
        		return $http.get(url);
        	};
         }]);           
