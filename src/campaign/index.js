
import listHtml from "./list.jade"
export default angular.module('app.campaign', [])
  .config(($stateProvider) => {
    'ngInject'
    $stateProvider.state('campaign', {
      parent: 'app',
      url: '/campaign',
      template: listHtml
    })
  })
.name