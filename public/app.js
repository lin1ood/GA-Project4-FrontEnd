  const app = angular.module('blog_app', []);
  app.controller('mainController', ['$http', function($http) {

      this.message= "Hello from ANGULAR!"
      this.blogs = [];
      this.URL = 'http://localhost:3000';
      // this.URL = 'https://gizmo-blogger-backend.herokuapp.com';
      this.formData = {};
      const controller = this;

      // localStorage.clear('token');


      //read all the Blogs -- /blogs GET index
      //anyone can do this!!!
      this.getBlogs = function (){
        $http({
          method: 'GET',
          url: this.URL + '/blogs'
          // url: this.herokuURL
        }).then(function(result) {
            console.log('blogs from api: ', result);
            this.blogs = result.data;
            // this.logout();
        }.bind(this), function(error) {
            console.log(error);
        });
      }

      // Login User to get JWT Token for
      // post - update - delete
      this.login = function(userPass) {
        console.log('The userPass.username & userPass.password ' + userPass.username + ' : ' + userPass.password)
        this.userPass = userPass;
        $http({
            method: 'POST',
            url: this.URL + '/users/login',
            data: { username: userPass.username, password: userPass.password },
          }).then(function(response) {
            console.log(response);
            this.user = response.data.user;
            localStorage.setItem('token', JSON.stringify(response.data.token));
          }.bind(this));
      }

      this.register = function(userPass) {
        console.log('The userPass.username & userPass.password ' + userPass.username + ' : ' + userPass.password)
        this.userPass = userPass;
        $http({
            method: 'POST',
            url: this.URL + '/users',
            data: { username: userPass.username, password: userPass.password },
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
      //     url: this.URL + '/users',
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
          url: this.URL + '/blogs',
          data: this.formData,
          headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
          }
        }).then(function(response){
          console.log(response);
          this.blogs.unshift(response.data);
        }.bind(this), function(error) {
          console.log(error);
      });

      }

      this.deleteBlog = function(blog){
        console.log('this is my blog id', blog.id);
        $http({
          method: 'DELETE',
          url: this.URL + '/blogs/' + blog.id,
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

      this.showBlogger = function (user_id) {
          console.log("showBlogger clicked for user ", user_id);
          $http({
            method: 'GET',
            url: this.URL + '/blogs/' + user_id,
            headers: {
              Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            }
          }).then(function(response){
              console.log(response.data)
              this.blogs = response.data;
            }.bind(this), function(error) {
                console.log(error);
            });
      };


      // show the index of all the blogs on the initial page
      this.getBlogs();
    }]);
