let app = angular.module("portfolioApp", []);

app.controller("mainController", function($scope, $http) {
  $scope.name = "Brian McKeown";
  $scope.slogan = "Programmer - Problem Solver - Learner";
});