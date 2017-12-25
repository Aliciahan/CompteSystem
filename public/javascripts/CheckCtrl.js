angular.module('frontapp').controller('CheckCtrl',['$scope','auth', '$http','Piao', function($scope,auth, $http, Piao){

  $scope.result = [];
  $scope.piaos = Piao.piaos;

  $scope.check = function(){
    $scope.result=[];
    var i = 0;
    var end = $scope.piaos.length;
    function f(){
      checkOnePiao($scope.piaos[i].idNum);
      i++;
      if(i < end) setTimeout(f,6000);
    }
    f();
      // var promise = new Promise(function(resolve){
      //   console.log('Treating the Piao:'+item.idNum);
      //   resolve();
      // }).then(sleep(2000)).then(function(){
      //   checkOnePiao(item.idNum);
      // });
  };


  function sleep(delay){
    return function(){
      return new Promise(function(resolve,reject){
        setTimeout(resolve,delay);
      });
    }
  }


  var checkOnePiao = function(piaoID){
    $http.get("../piao/check?idNum="+piaoID).then(function(res){
      if(res.data.toString()){
        if(res.data.toString() === "errserver"){
          $scope.result.push(
            {
              "piaoid" : piaoID,
              "info": "服务端出现问题, 请联系管理员",
              "status": "yellow"
            })
        }else{
          $scope.result.push(
            {
              "piaoid" : piaoID,
              "info": "http://rmfygg.court.gov.cn/psca/lgnot/bulletin/"+piaoID+"_0_0.html",
              "status": "red"

            })
        }
      }else {
        $scope.result.push(
          {
            "piaoid" : piaoID,
            "info": "基本没有问题, 没有找到相关判决书或公示催告",
            "status": "green"

          })
      }
    })
  }

}]);