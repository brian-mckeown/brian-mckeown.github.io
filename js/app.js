let app = angular.module("portfolioApp", []);

app.controller("mainController", function($scope, $http) {
  const githubURL = 'https://api.github.com';
  const githubUser = 'bmck2006';
  const linkedInUser = 'bmckeown2011';
  $scope.githubProfileUrl = 'https://www.github.com/' + githubUser;
  $scope.linkedInUrl = 'https://www.linkedin.com/in/' + linkedInUser;
  $scope.name = "Brian McKeown";
  $scope.slogan = "Programmer - Problem Solver - Learner";
  $scope.projectInfo = "My hobby and some professional projects are all hosted on Github. The content below is displayed on this page via Github API integration. Click the links for each project to learn more!";
  $scope.aboutInfo1 = "My name is Brian and I am a programmer, problem solver, and life-long learner. The purpose of this site is to present some of the projects I have worked on in the past, or am currently working on. You can learn more about my experience and background by clicking the LinkedIn button below!";
  $scope.aboutInfo2 = "Outside of work and study, you'll find me hanging out with my wife and our two dogs. I enjoy music, outdoor adventures, mountain biking, snowboarding, and of course, coding.";

  $scope.cards = [];

  $scope.getPropertyName = function (language) {
    console.log("test function: " + language);
  }
  var getRequest = function(i) {
    $http({
    method: 'GET',
    url: $scope.cards[i].languages_url
  }).then(function (response) {
    console.log("Entered then - loop #:" + i);
    console.log("Object.keys(response.data).length = " + Object.keys(response.data).length);
    if (Object.keys(response.data).length > 0) {
      console.log("Object.keys(response.data).length > 0 is TRUE");
      $scope.cards[i].languages_obj = response.data;
      console.log("response.data = " + response.data);
      console.log("attempting to set.");
      console.log("$scope.cards["+i+"].languages_obj = " + $scope.cards[i].languages_obj);
      var languageArray = [];
      console.log("language Array initiated as blank: " + languageArray);
      for (const property in $scope.cards[i].languages_obj) {
        languageArray.push(property);
        console.log("language Array push. i="+i+" array: " + languageArray);
        $scope.cards[i].languages_array = languageArray;
        console.log("Language Array " + i + ": " + $scope.cards[i].languages_array);
      }
  } else {
    console.log("Object.keys(response.data).length > 0 is FALSE");
    $scope.cards[i].languages_array = [];
    console.log("Language Array " + i + ": " + $scope.cards[i].languages_array);
  }
  },function (error){
    console.log('Error: ' + error);
   });
  }

  //get all github repos.
  $http({
    method: 'GET',
    url: githubURL + '/users/' + githubUser + '/repos'
  }).then(function (response){
    $scope.cards = response.data;
    console.log(response.data);
    
    for (var i = 0; i < $scope.cards.length; i++) {
      getRequest(i);
    }


 },function (error){
  console.log('Error: ' + error);
 });


});