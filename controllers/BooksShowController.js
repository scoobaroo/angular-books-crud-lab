angular
  .module('libraryApp')
  .controller('BooksShowController', BooksShowController);

BooksShowController.$inject=['$http', '$routeParams', '$location'];
function BooksShowController($http, $routeParams, $location) {
    var vm = this;
    vm.newBook = {};
    $http({
      method: 'GET',
      url: 'https://super-crud.herokuapp.com/books/'+$routeParams.id
    }).then(function successCallback(json) {
      vm.book = json.data;
      console.log(vm.book);
    });
    vm.deleteBook = function (book) {
      console.log('deleting song:'+book._id);
      console.log($routeParams.id);
      $http({
        method: 'DELETE',
        url: 'https://super-crud.herokuapp.com/books/'+$routeParams.id
      }).then(function successCallback(json) {
        var index = vm.books.indexOf(book);
        vm.books.splice(index, 1);
      }, function errorCallback(response) {
        console.log('There was an error deleting the data', response);
      });
    };
    vm.editBook = function (book) {
      console.log('editing book:', vm.book._id);
      $http({
        method: 'PUT',
        url: 'https://super-crud.herokuapp.com/books/'+$routeParams.id,
        data: vm.book
      }).then(function successCallback(response) {
        vm.books.push(response.data);
        console.log(response.data);
      }, function errorCallback(response) {
        console.log('There was an error editing the data', response);
      });
    };
}
