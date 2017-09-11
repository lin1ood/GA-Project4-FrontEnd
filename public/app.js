  const app = angular.module('blog_app', []);
  app.controller('mainController', ['$http', function($http) {

      this.message= "Hello from ANGULAR!"
      this.blogs = [];
      this.herokuURL = 'https://gizmo-blogger-backend.herokuapp.com/blogs';
      this.formData = {};
      this.controller = this;
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
        console.log('this is my blog id', blog.id);
        $http({
          method: 'DELETE',
          url: 'http://localhost:3000/blogs/' + blog.id
        }).then(
          function(response){

          },
          function (error){
            console.log(error);
          }

        );
            this.controller.getBlogs();
      }
      this.getBlogs();
    }]);
