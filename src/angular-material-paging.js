(function() {
  'use strict';

  angular
    .module('fc.paging', [])
    .directive('wanMaterialPaging', WanMaterialPagingDirective);

  /**
   * @ngInject
   */
  function WanMaterialPagingDirective() {
    return {
      restrict: 'EA',
      scope: {
        wmpTotal: '=',
        position: '@',
        gotoPage: '&',
        step: '=',
        currentPage: '='
      },
      controller: Controller,
      controllerAs: 'vm',
      template: [
        '<div layout="row" class="wan-material-paging" layout-align="{{ position }}">',
        '<md-button class="md-raised md-primary wmp-button" ng-click="vm.gotoFirst()">{{ vm.first }}</md-button>',
        '<md-button class="md-raised wmp-button" ng-repeat="i in vm.stepInfo"',
        ' ng-click="vm.goto(vm.index + i)" ng-show="vm.page[vm.index + i]" ',
        ' ng-class="{true: \'md-primary\', false: \'\'}[vm.page[vm.index + i] === currentPage]">',
        ' {{ vm.page[vm.index + i] }}',
        '</md-button>',
        '<md-button class="md-raised md-primary wmp-button" ng-click="vm.gotoLast()">{{ vm.last }}</md-button>',
        '</div>'
      ].join('')
    };
  }

  /**
   * @ngInject
   */
  function Controller($scope) {
    var vm = this;

    vm.first = '<<';
    vm.last = '>>';
    vm.index = 0;
    vm.step = $scope.step;

    vm.goto = function(index) {
      var page = vm.page[index];
      if (page === '...' && index === vm.index) {
        $scope.currentPage = vm.page[index - 1];
        vm.index -= vm.step;
      } else if (page === '...' && index === vm.index + vm.step) {
        $scope.currentPage = vm.page[index + 1];
        vm.index += vm.step;
      } else {
        $scope.currentPage = page;
      }
    };

    vm.gotoFirst = function(){
      vm.index = 0;
      $scope.currentPage = 1;
    };

    vm.gotoLast = function(){
      var index = parseInt(vm.realyTotal / vm.step) * vm.step;
      $scope.currentPage = $scope.wmpTotal;
      index !== vm.realyTotal ? vm.index = index : null;
    };

    $scope.$watch('currentPage', function() {
      $scope.gotoPage();
    });

    $scope.$watch('wmpTotal', function() {
      vm.init();
    });

    vm.init = function() {
      vm.realyTotal = $scope.wmpTotal;
      vm.stepInfo = (function() {
        var i, result = [];
        for (i = 0; i <= vm.step; i++) {
          result.push(i)
        }
        return result;
      })();
      vm.page = (function() {
        var i = 0, result = [];
        for (i = 0; i < $scope.wmpTotal; i++) {
          if (i === vm.step || i % (vm.step - 1) === 1 && i > vm.step) {
            if ($scope.wmpTotal - i !== 1) {
              result.push('...');
              vm.realyTotal++;
            }
          }
          result.push(i + 1);
        }
        return result;
      })();
    };
  }

})();
