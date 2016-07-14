(function() {
  'use strict';

  angular
    .module('fc.paging', [])
    .directive('wanMaterialPaging', WanMaterialPagingDirective);

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
        '<div class="paging">',
        '<a class="paging__link paging__link--first" aria-label="First" ng-click="vm.gotoFirst()">{{ vm.first }}</a>',
        '<a class="paging__link paging__link--previous" aria-label="Previous" ng-click="vm.getoPre()" ng-show="vm.index - 1 >= 0">...</a>',
        '<a class="paging__link" aria-label="Go to page {{i+1}}" ng-repeat="i in vm.stepInfo"',
        ' ng-click="vm.goto(vm.index + i)" ng-show="vm.page[vm.index + i]" ',
        ' ng-class="{true: \'md-primary\', false: \'\'}[vm.page[vm.index + i] === currentPage]">',
        ' {{ vm.page[vm.index + i] }}',
        '</a>',
        '<a class="paging__link paging__link--next" aria-label="Next" ng-click="vm.getoNext()" ng-show="vm.index + vm.step < wmpTotal">...</a>',
        '<a class="paging__link paging__link--last" aria-label="Last" ng-click="vm.gotoLast()">{{ vm.last }}</a>',
        '</div>'
      ].join('')
    };
  }

  var	Controller = ['$scope', function ($scope) {
    var vm = this;

    vm.first = '<<';
    vm.last = '>>';
    vm.index = 0;
    vm.step = $scope.step;

    vm.goto = function(index) {
      $scope.currentPage = vm.page[index];
    };

    vm.getoPre = function() {
      $scope.currentPage = vm.index;
      vm.index -= vm.step;
    };

    vm.getoNext = function() {
      vm.index += vm.step;
      $scope.currentPage = vm.index + 1;
    };

    vm.gotoFirst = function() {
      vm.index = 0;
      $scope.currentPage = 1;
    };

    vm.gotoLast = function() {
      vm.index = parseInt($scope.wmpTotal / vm.step) * vm.step;
      vm.index === $scope.wmpTotal ? vm.index = vm.index - vm.step : '';
      $scope.currentPage = $scope.wmpTotal;
    };

    $scope.$watch('currentPage', function() {
      $scope.gotoPage();
    });

    $scope.$watch('wmpTotal', function() {
      vm.init();
    });

    vm.init = function() {
      vm.stepInfo = (function() {
        var i, result = [];
        for (i = 0; i < vm.step; i++) {
          result.push(i)
        }
        return result;
      })();

      vm.page = (function() {
        var i, result = [];
        for (i = 1; i <= $scope.wmpTotal; i++) {
          result.push(i);
        }
        return result;
      })();
    };
  }];
})();
