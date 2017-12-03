
app.controller('CreatePiao', ['$scope','$http','Piao', function($scope, $http, Piao){

  $scope.uploadingPiao = {
    "idNum": "请填写票号",
    "bank": "ICBC",
    "type": "dianpiao",
    "amount": 8888,
    "endDate": "1970-01-18T11:55:31.965Z",
    "addDate": "1970-01-18T11:55:15.668Z"
  };


  $scope.piaotypes = ['dianpiao','guogu'];
  $scope.piaotype = $scope.piaotypes[1];

  $scope.save = function() {


    if ( $scope.myfile !== null) {
      console.log("with pictures"+console.dir($scope.myfile));

      Piao.createPhoto({
        "idNum": $scope.uploadingPiao.idNum,
        "bank": $scope.uploadingPiao.bank,
        "type": $scope.uploadingPiao.type,
        "amount": $scope.uploadingPiao.amount,
        "endDate": $scope.uploadingPiao.endDate,
        "addDate": $scope.uploadingPiao.addDate,
        "setHeaderPhoto": true
      }, $scope.myfile);
    }else{
      Piao.create({
        "idNum": $scope.uploadingPiao.idNum,
        "bank": $scope.uploadingPiao.bank,
        "type": $scope.uploadingPiao.type,
        "amount": $scope.uploadingPiao.amount,
        "endDate": $scope.uploadingPiao.endDate,
        "addDate": $scope.uploadingPiao.addDate
      });
    }
  };

  // About the date directive
  $scope.today= function(){

    $scope.uploadingPiao.addDate = new Date();
    $scope.uploadingPiao.endDate = new Date();
  };

  $scope.clear = function(){
    $scope.uploadingPiao.addDate = null;
    $scope.uploadingPiao.endDate = null;
    $scope.uploadingPiao.bank = null;
    $scope.uploadingPiao.idNum = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
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