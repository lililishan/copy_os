import homeTemp from "./home.jade"
export default angular.module('app.home', [])
  .config(($stateProvider) => {
    'ngInject'
    $stateProvider.state("home", {
      parent: 'app',
      url: '/app',
      template: homeTemp,
      
    })
  })
  .name