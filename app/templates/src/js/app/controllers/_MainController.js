angular.module("<%= _.slugify(angularjs.appName) %>").controller("MainController", function ($scope) {

    $scope.helloWorld = "Hello World from : <%= _.slugify(projectName) %>"

});