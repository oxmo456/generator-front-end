angular.module("<%= _.slugify(angularjs.appName) %>").run(function(){
    console.log("<%= _.slugify(angularjs.appName) %> running");
});