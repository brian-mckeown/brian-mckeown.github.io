let app = angular.module("portfolioApp", []);

app.controller("mainController", function($scope, $http) {
  const githubURL = 'https://api.github.com';
  const githubUser = 'bmck2006';
  const linkedInUser = 'bmckeown2011';
  $scope.githubProfileUrl = 'https://www.github.com/' + githubUser;
  $scope.linkedInUrl = 'https://www.linkedin.com/in/' + linkedInUser;
  $scope.stackOverflowUrl = 'https://stackoverflow.com/users/5834929/' + githubUser;
  $scope.name = "Brian McKeown";
  $scope.email = "bmckeown2011@gmail.com";
  $scope.slogan = "Programmer - Problem Solver - Learner";
  $scope.projectInfo = "My hobby and some professional projects are all hosted on Github. Only projects that have been configured as public are shown. I have many other private projects as well. The content below is displayed on this page via Github API integration. Click the links for each project to learn more!";
  $scope.aboutInfo1 = "Hi, I'm Brian! I'm a professional, full stack Software Engineer with experience in developing information systems. The purpose of this site is to present some of the projects I have worked on in the past, or am currently working on. You can learn more about my experience and background by clicking the LinkedIn button below!";
  $scope.aboutInfo2 = "Outside of working on software, you'll find me hanging out with my wife and our two dogs. I enjoy music, flying drones, outdoor adventures, mountain biking, snowboarding, and of course, coding.";

  
  $scope.cards = [];

    $scope.frontendSkills = ['AngularJS','HTML5','CSS3','Javascript','JSX','React','EJS','ES6','Bootstrap'].sort();
    $scope.backendSkills = ['NodeJS','Spring-Boot','ExpressJS','Java','C-Sharp','Python'].sort();
    $scope.dbSkills = ['PostgreSQL','MySQL','mongoDB','SQL','Hibernate'].sort();
    $scope.integrationSkills = ['JSON','REST API'].sort();
    $scope.devtoolSkills = ['npm','Gradle','Maven','Git','Github','Bitbucket','Trello','Jira','Android Studio','Visual Studio Code','Eclipse','IntelliJ IDEA','Postman'].sort();
    $scope.sysadminSkills = ['Tomcat','PM2','okta','Bash'].sort();
    $scope.lowcodeSkills = ['Zoho','Pega'].sort();
    $scope.osSkills = ['Android','Raspbian','MacOS','Windows','Ubuntu','CentOS','Linux Mint','Linux', 'Debian'].sort();


    $scope.getYear = function() {
      const d = new Date();
      return d.getFullYear();
    }

  $scope.getPropertyName = function (language) {
    console.log("test function: " + language);
  }
  var getRequest = function(i) {
    $http({
    method: 'GET',
    url: $scope.cards[i].languages_url
  }).then(function (response) {
    if (Object.keys(response.data).length > 0) {
      $scope.cards[i].languages_obj = response.data;
      var languageArray = [];
      for (const property in $scope.cards[i].languages_obj) {
        languageArray.push(property);
        $scope.cards[i].languages_array = languageArray;
      }
  } else {
    $scope.cards[i].languages_array = [];
  }
  },function (error){
    console.log('Error: ' + error);
    alert('Github Public API Limit Reached. Some or All Projects may not be displayed. Use the Github button to view projects. Or, try again in an hour.\nError:' + error);
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
  alert('Github Public API Limit Reached. Some or All Projects may not be displayed. Use the Github button to view projects. Or, try again in an hour.\nError:' + error);
 });


});