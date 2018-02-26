import "angular"
import "angular-ui-router"
import {
	ngSweetAlert2
} from 'angular-h-sweetalert';

import appTemp from "./app.jade"
import "./index"
import common from "./common"
import menu from "./menu"
import home from "./home"
import subscription from "./subscription"

angular.module("copyOs", ['dndLists', 'ngSanitize', 'ivh.treeview', 'ui.router', '720kb.tooltips', 'moment-picker', 'ngFileUpload', ngSweetAlert2, common, menu, home, subscription])
  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject'
    $stateProvider.state('app', {
      abstract: true,
      template: appTemp,
      controller: function() {
        'ngInject'
        console.log("test")
        // this.menuData = menuData
      },
      controllerAs: 'vm',

    })
    $urlRouterProvider.when('', '/app')
  })
  .config(($qProvider) => {
		'ngInject'

		$qProvider.errorOnUnhandledRejections(false)
	})
