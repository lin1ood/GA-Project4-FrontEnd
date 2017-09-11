  const app = angular.module('blog_app', []);
  app.controller('mainController', ['$http', function($http) {

      this.message= "Hello from ANGULAR!"
      this.blogs = [];
      this.herokuURL = 'https://gizmo-blogger-backend.herokuapp.com/blogs';
      this.formData = {};
      const controller = this;
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

      // Login User to get JWT Token for
      // post - update - dlete
      this.login = function(userPass) {
        console.log('The userPass.username & userPass.password ' + userPass.username + ' : ' + userPass.password)
        this.userPass = userPass;
        $http({
            method: 'POST',
            url: this.url + '/users/login',
            data: { username: this.userPass.username, password: this.userPass.password },
          }).then(function(response) {
            console.log(response);
            this.user = response.data.user;
            localStorage.setItem('token', JSON.stringify(response.data.token));
          }.bind(this));
      }

      // List the users as an Index
      // only logged in users see the users index
      // this.users = function() {
      //   console.log('/USERS called')
      //   $http({
      //     method: 'GET',
      //     url: this.url + '/users',
      //     headers: {
      //       Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      //     }
      //   }).then(function(response) {
      //       console.log('users from api: ', response);
      //       if (response.data.status == 401) {
      //         this.error = "Unauthorized";
      //       } else {
      //         this.users = response.data.user;
      //       }
      //   }.bind(this), function(error) {
      //       console.log('GET /users ERROR ' + error);
      //   }.bind(this));
      // }

      //Logout current user and delete JWT Token
      this.logout = function() {
        localStorage.clear('token');
        location.reload();
      }


      this.processForm = () => {
        console.log('process form is running');
        console.log('here is the form data: ', this.formData);
        $http({
          method: 'POST',
          url: 'http://localhost:3000/blogs',
          data: this.formData,
          headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
          }
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
          url: 'http://localhost:3000/blogs/' + blog,
          headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
          }
        }).then(
          function(response){
            controller.getBlogs();
          },
          function (){
          }

        );
        // this.controller.getBlogs();
      }
      this.getBlogs();
    }]);
