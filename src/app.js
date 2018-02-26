import "angular"
import "angular-ui-router"
import {
	ngSweetAlert2
} from 'angular-h-sweetalert';

import appTemp from "./app.jade"
import "./index"
import home from "./home"

angular.module("copyOs", ['dndLists', 'ngSanitize', 'ivh.treeview', 'ui.router', '720kb.tooltips', 'moment-picker', 'ngFileUpload', ngSweetAlert2, home])
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
