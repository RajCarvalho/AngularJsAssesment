

var app = angular.module("myapp", ["ngRoute"]);

//var ass1;
var arr = [];
if(localStorage.user_list)
{
arr=JSON.parse(localStorage.user_list)
}

ass1=localStorage.isLoggedIn;
//console.log("value"+ass1)


app.config(function ($routeProvider) {
       $routeProvider.when('/home', {
        templateUrl: "/view/home.html",
        resolve: ["authService", function (authService) {
            return authService.checkUserStatus();
        }]
      })
    .when('/', {
        templateUrl: "/view/loginPage.html",
        controller: "loginController"
      })
    .when('/user', {
        templateUrl: "/view/user.html",
        controller: 'userController',
        resolve: ["authService", function (authService) {
            return authService.checkUserStatus();
          }]
       })

     .when('/userList', {
        templateUrl: "/view/userList.html",
        controller: "userListController",
        resolve: ["authService", function (authService) {
            return authService.checkUserStatus();
        }]
     })
    .when('/logout', {
        controller:"logoutController",
        redirectTo: '/'
      })
    .otherwise({
        redirectTo: '/'
      })
});


app.controller("logoutController",function($scope)
{

})


app.controller("userController", function ($scope, authService, $location) {

    $scope.save = function () 
    {

      $scope.userList=
      {
          uname:$scope.uname,
          pass:$scope.pass,
          email:$scope.email,
          category:$scope.category,
          gender:$scope.gender,
          location:$scope.location

      }


      arr.push($scope.userList);
    

     localStorage.user_list= JSON.stringify(arr);



        $location.path('/userList');
    }
})

app.controller("userListController", function ($scope) {

var arr2=JSON.parse(localStorage.user_list);
    console.log("previous length"+arr2.length);
$scope.arr3=arr2;

 $scope.delete=function(a)
 {
    //console.log(a);
    arr2.splice(a,1); 
    localStorage.user_list=JSON.stringify(arr2);

    var arr = JSON.parse(localStorage.user_list);
    console.log("length after deleting"+arr.length);

 }
})


app.factory("authService", function ($location) {
    return {


        'checkUserStatus': function () {
            if (!localStorage.isLoggedIn || localStorage.isLoggedIn == false) {
                $location.path('/');
                         return false;
            }
            return true;
        }
    }
})


app.controller("mainController",function($scope,$rootScope)
{   

    localStorage.isLoggedIn==true;
    console.log("auth bef brodcasted "+localStorage.isLoggedIn);
    $rootScope.$on("sendTomain",function(event,args)
     {
    $scope.auth=args;
  console.log("auth value brodcasted "+$scope.auth);
  
     })


    $scope.logout=function()
    {
        
        localStorage.isLoggedIn=false;
        $scope.auth = false;
    }  
});

app.controller("loginController", function ($scope, $location,$rootScope) {

    $scope.login = function () {

        if ($scope.authform.uname == "admin" && $scope.authform.pwd == "admin") {


            $location.path('/home')

         localStorage.isLoggedIn = true;
         
         
        }
        else {
            alert("please enter valid Username and password")
            localStorage.isLoggedIn = false;

        }

        //console.log("value"+ass1)
        $scope.assign=localStorage.isLoggedIn;
    
          $rootScope.$broadcast("sendTomain",$scope.assign) ;

    };
});