import menuTemp from "./menu.jade"
import menuCtrl from "./menu.controller"
export default angular.module('app.navigation', [])
  .component('navigationBox', {
    template: menuTemp,
    controller: menuCtrl,
    bingdings: {
      menuData: '<'
    },
    controllerAs: 'vm'
  })
.name