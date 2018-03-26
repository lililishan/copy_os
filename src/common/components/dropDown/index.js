import "./style"
const template_aa = `
      <div class="{{$ctrl.iclass}}" ng-class="[{active:$ctrl.isshow},{disabled:$ctrl.optDisable}]" ng-click="$ctrl.open()"> 
        <i class="iconFont icon-view-moment" ng-if="$ctrl.overView"></i>
        <label class="se-label" ng-bind="$ctrl.text"></label>
        <div class="search" ng-show="$ctrl.isshow && $ctrl.isSearch">
            <input class="input" type="text" placeholder="输入要搜索的内容"  ng-model="search" />
        </div>
        <i class="iconFont icon-drop-down" ng-class="{active:$ctrl.isshow}"></i>
        <ul class="se-item ng-hide">
          <li class="once" ng-if="!$ctrl.isSearch" ng-repeat="item in $ctrl.optionsInfo" data-id="item[$ctrl.itemKey]"  ng-click="$ctrl.selected($index)" title='{{item[$ctrl.itemName]}}' ng-class="{b:item.status === 2 && $ctrl.isBold}"> {{item[$ctrl.itemName]}} </li>
          <li class="once" ng-if="$ctrl.isSearch" ng-repeat="item in $ctrl.optionsInfo | filter:search" data-id="item[$ctrl.itemKey]"  ng-click="$ctrl.seachSelected(item)" title='{{item[$ctrl.itemName]}}'> {{item[$ctrl.itemName]}} </li>
        </ul>
      </div>`
const template = `
      <div>
        <i class="iconFont icon-view-moment" ng-if="$ctrl.overView"></i>
        <label class="se-label" ng-bind="$ctrl.text"></label>
        <div class="search" ng-show="$ctrl.isshow && $ctrl.isSearch">
            <input class="input" type="text" placeholder="输入要搜索的内容"  ng-model="search" />
        </div>
        <i class="iconFont icon-drop-down" ng-class="{active:$ctrl.isshow}"></i>
        <ul class="se-item ng-hide">
          <li class="once" ng-if="!$ctrl.isSearch" ng-repeat="item in $ctrl.optionsInfo" data-id="item[$ctrl.itemKey]"  ng-click="$ctrl.selected($index)" title='{{item[$ctrl.itemName]}}' ng-class="{b:item.status === 2 && $ctrl.isBold}"> {{item[$ctrl.itemName]}} </li>
          <li class="once" ng-if="$ctrl.isSearch" ng-repeat="item in $ctrl.optionsInfo | filter:search" data-id="item[$ctrl.itemKey]"  ng-click="$ctrl.seachSelected(item)" title='{{item[$ctrl.itemName]}}'> {{item[$ctrl.itemName]}} </li>
        </ul>
      </div>
      `
export default angular.module('app.common.dropDown', [])
  .component('dropDown', {
    template,
    
  })
.name