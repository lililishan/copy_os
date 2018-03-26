import listTemp from './list.jade'
import listCtrl from "./list.controller"


export default angular.module('app.subscription', [])
  .config(($stateProvider) => {
    'ngInject'
    $stateProvider.state('subscription', {
      parent: 'app',
      url: '/subscription',
      template: listTemp,
      controller: listCtrl
      // component: 'list'
    })
  })  
  // .component('list', {
  //   template: listTemp,
  //   controller: listCtrl
  // })
  .name