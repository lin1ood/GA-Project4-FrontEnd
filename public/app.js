(function() {

  angular.module('blog_app', [])
  .controller('mainController', ['$http', function($http) {

      this.message= "Hello from ANGULAR!"
      this.blogs = [];

      $http({
        method: 'GET',
        url: 'http://localhost:3000/blogs'
      }).then(function(result) {
          console.log('blogs from api: ', result);
          this.blogs = result.data;
      }.bind(this), function(error) {
          console.log(error);
      });

    }]);

}());
