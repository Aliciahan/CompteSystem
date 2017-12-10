
app.controller('CreatePiao', ['$scope','$http','Piao','$uibModal', function($scope, $http, Piao, $uibModal){

  $scope.piaos = Piao.piaos;

  $scope.isEmpty = function(){
    return !(Piao.piaos.length >0);
  };

  $scope.uploadingPiao = {
    "idNum": "请填写票号",
    "bank": "ICBC",
    "type": "dianpiao",
    "amount": 8888,
    "endDate": "1970-01-18T11:55:31.965Z",
    "addDate": "1970-01-18T11:55:15.668Z",
    "isSold": false,
    "soldDate": "1970-01-18T11:55:15.668Z"
  };


  $scope.piaotypes = ['dianpiao','guogu'];
  $scope.piaotype = $scope.piaotypes[1];

  $scope.save = function() {


    if ($scope.myfile) {
      console.log("with pictures"+console.dir($scope.myfile));
      Piao.createPhoto({
        "idNum": $scope.uploadingPiao.idNum,
        "bank": $scope.uploadingPiao.bank,
        "type": $scope.uploadingPiao.type,
        "amount": $scope.uploadingPiao.amount,
        "endDate": $scope.uploadingPiao.endDate,
        "addDate": $scope.uploadingPiao.addDate,
        "setHeaderPhoto": true,
        "isSold": $scope.uploadingPiao.isSold,
        "soldDate": $scope.uploadingPiao.soldDate

      }, $scope.myfile)
    }else{
      Piao.create({
        "idNum": $scope.uploadingPiao.idNum,
        "bank": $scope.uploadingPiao.bank,
        "type": $scope.uploadingPiao.type,
        "amount": $scope.uploadingPiao.amount,
        "endDate": $scope.uploadingPiao.endDate,
        "addDate": $scope.uploadingPiao.addDate,
        "isSold": $scope.uploadingPiao.isSold,
        "soldDate": $scope.uploadingPiao.soldDate
      });
    }

  };

  $scope.setSold = function(){
    $scope.uploadingPiao.isSold = true;
  };

  $scope.cancelSold = function(){
    $scope.uploadingPiao.isSold = false;
  };


//pop up

  $scope.open = function (size, parentSelector) {
    var parentElem = parentSelector ?
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      size: 'lg',
      appendTo: parentElem,
      resolve: {
        Promise: ['Piao', function (Piao) {
          return Piao.piaos;
        }]
      }
    });

  };


  // About the date directive
  $scope.today= function(){

    $scope.uploadingPiao.addDate = new Date();
    $scope.uploadingPiao.endDate = new Date();
    $scope.uploadingPiao.soldDate = new Date();
  };

  $scope.clear = function(){
    $scope.uploadingPiao.addDate = null;
    $scope.uploadingPiao.endDate = null;
    $scope.uploadingPiao.soldDate = null;
    $scope.uploadingPiao.bank = null;
    $scope.uploadingPiao.idNum = null;
    $scope.myfile= null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: null,//disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.open3 = function() {
    $scope.popup3.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[1];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  $scope.popup3 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);

  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }

}]);