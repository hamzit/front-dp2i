// inializing angular application
var app = angular.module("hamza", ["ngRoute"]);


// here we configure routes and loading templates in ng-View directive
app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "main.html",
  })
  .when("/admin", {
    templateUrl : "admin.html"
  })
  .when("/books", {
    templateUrl : "books.html"
  })
  .when("/feedback", {
    templateUrl : "feedback.html"
  })
  .when("/details", {
    templateUrl : "bookDetails.html"
  }).otherwise({redirectTo: '/'});
});



// here we assigne controller to its functions passing
// here we inject
// $location : for route changing
// $http ; for AJAX requests
// $rootScope : to access variables acquired by GET through all pages
app.controller('ListBooksController', ['$scope','$location','$http','$rootScope', ListBooksController]);


// ************************************************* Page Recherche *****************************************************************//

  function ListBooksController($scope,$location,$http,$rootScope) {

    // we have 3 variables  acessible by application
    // bookslist : list of all books
    // currentBook : details of selected book
    // characters : list of currentBook characters
    // $rootScope.currentBook = []
    // $rootScope.bookslist = []
    $rootScope.characters = []

// this function is responsible for loading all the books when we go to books page (ng-init)
    $scope.books = function() {

      // ajax request
      $http({
        method: 'GET',
        url: 'https://anapioficeandfire.com/api/books',
        headers: {
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
          'Content-Type': 'application/x-www-form-urlencoded'},
        }).then(function successCallback(response, status, headers, config) {
          // in case of sucess
          console.log("test books : "+response.data);

          // here we save the books gotten from the API in the scope to acess it through html pages later
          $rootScope.bookslist = response.data;

        }, function errorCallback(response, status, headers, config) {
          // in case of fail
          alert('fail 2');
          console.log(response);

        });
      };

      // here we load a specefic book by it's id when the ng-click event occurs
      $scope.loadBook = function(link) {

        // AJAX REQUEST TO GET THE SPECEFIC BOOK BY ITS URL
        $http({
          method: 'GET',
          url: link,
          headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/x-www-form-urlencoded'},
          }).then(function successCallback(response, status, headers, config) {
            // in case of sucess
            console.log("test name : "+response.data.name);
            // we save the response from API in scope
            // THE CURRENT BOOK SELECTED
            $rootScope.currentBook = response.data ;

            // HERE WE REDIRECT USER TO DETAILS PAGE
            $location.path('/details');


            // HERE WE LOAD THE CHARACTERS OF THE BOOK TO DISPLAY IN BOOK DETAILS PAGE
            $scope.loadCharacters();


          }, function errorCallback(response, status, headers, config) {
            // IN CASE OF ERROR
            alert('fail 3');
            console.log(response);

          });




        };

        // HERE WE LOOP THROUGH ALL THE POVCHARCTERS IN THE CURRENTBOOK AND SEND A GET REQUEST
        // TO THE API AND ADD THE CHARACTER TO THE SCOPE
        $scope.loadCharacters = function() {
          for(var i = 0; i < $rootScope.currentBook.povCharacters.length; i++) {
            // AJAX REQUEST
              $http({
                method: 'GET',
                url: $rootScope.currentBook.povCharacters[i],
                headers: {
                  'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                  'Content-Type': 'application/x-www-form-urlencoded'},
                }).then(function successCallback(response, status, headers, config) {
                  // SUCESS
                  console.log("test books : "+response.data.name);
                  // THE ADDING HAPPENS HERE
                  $rootScope.characters.push(response.data);

                }, function errorCallback(response, status, headers, config) {
                  // FAIPL
                  alert('fail 3');
                  console.log(response);

                });
          }


          };

      }


// THIS IS THE FUNCTION RESPONSIBLE FOR COLORING THE MENU ITEMS
function reset(id){
  // alert(id);
  $("ul li").removeClass("active");
  $("ul li:nth-child("+id+")").addClass("active");
}
