angular
  .module('libraryApp')
  .controller('BooksIndexController', BooksIndexController);

BooksIndexController.$inject=['$http'];
function BooksIndexController( $http ) {
  var vm = this;
  $http({
    method: 'GET',
    url: 'https://super-crud.herokuapp.com/books'
  }).then(function successCallback(response) {
    console.log('successful GET',response.data);
    console.log(response.data.books);
    vm.books = response.data.books;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });
  vm.createBook = function () {
    console.log('creating book', vm.newBook);
    $http({
      method: 'POST',
      url: 'https://super-crud.herokuapp.com/books',
      data: vm.newBook
    }).then(function successCallback(response) {
      vm.books.push(response.data);
      console.log(response);
      console.log(response.data);
    }, function errorCallback(response) {
      console.log('There was an error posting the data', response);
    });
  };
  vm.editBook = function (book) {
    console.log('editing book:', vm.book);
    $http({
      method: 'PUT',
      url: 'https://super-crud.herokuapp.com/books/'+book._id,
      data: {  author: vm.book.author,
                title: vm.book.title,
                releaseDate: vm.book.releaseDate,
                image: vm.book.image}
    }).then(function successCallback(response) {
      vm.books.push(response.data);
      console.log(response.data);
    }, function errorCallback(response) {
      console.log('There was an error editing the data', response);
    });
  };
  vm.deleteBook = function (book) {
    $http({
      method: 'DELETE',
      url: 'https://super-crud.herokuapp.com/books/'+ book._id
    }).then(function successCallback(json) {
      var index = vm.books.indexOf(book);
      vm.books.splice(index, 1);
      console.log(json);
      }, function errorCallback(response) {
      console.log('There was an error deleting the data', response);
    });
  };
}
