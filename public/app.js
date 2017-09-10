  const app = angular.module('blog_app', []);
  app.controller('mainController', ['$http', function($http) {

      this.message= "Hello from ANGULAR!"
      this.blogs = [];
      this.herokuURL = 'https://gizmo-blogger-backend.herokuapp.com/blogs';
      this.formData = {};

      this.getBlogs = function (){
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
      }
      this.processForm = () => {
        console.log('process form is running');
        console.log('here is the form data: ', this.formData);
        $http({
          method: 'POST',
          url: 'http://localhost:3000/blogs',
          data: this.formData
        }).then(response => {
          console.log(response);
          this.blogs.unshift(response.data);
        })
        .catch(err=> console.log(err));
      }
      this.deleteBlog = function(blog){
        $http({
          method: 'DELETE',
          url: 'http://localhost:3000/blogs' + blog._id
        }).then(
          function(response){
            conroller.getBlogs();
          },
          function (error){
            console.log(error);
          }
        );
      }
      this.getBlogs();
    }]);
