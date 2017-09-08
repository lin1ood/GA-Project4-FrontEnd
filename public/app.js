(function() {

  angular.module('blog_app', [])
  .controller('mainController', ['$http', function($http) {

      this.message= "Hello from ANGULAR!"
      this.blogs = [];
      this.herokuURL = 'https://gizmo-blogger-backend.herokuapp.com/blogs'

      $http({
        method: 'GET',
        url: 'http://localhost:3000/blogs'
        // url: this.herokuURL
      }).then(function(result) {
          console.log('blogs from api: ', result);
          this.blogs = result.data;
      }.bind(this), function(error) {
          console.log(error);
      });

    }]);

}());
