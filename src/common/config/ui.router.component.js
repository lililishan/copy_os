export default angular
  .module('ui.router.components', ['ui.router'])
  .config(($stateProvider) => {
      $stateProvider.decorator('component', (stateDef, parent) => {
          if (stateDef.component) {
              setStateDef(stateDef)
          }

          if (stateDef.views) {
              for (const view in stateDef.views) {
                  if (stateDef.views[view].component) {
                      setStateDef(stateDef.views[view])
                  }
              }
          }

          return stateDef.component
      })
  })
  .name

function args2Array(_args) {
    return Array.prototype.slice.call(_args)
}

function bindResolves() {
    const injectNames = controller.$inject = ['$scope'].concat(args2Array(arguments))

    function controller($scope) {
        const injectValues = args2Array(arguments)
        for (let i = 1; i < injectValues.length; i++) {
            $scope[injectNames[i]] = injectValues[i]
        }
    }

    return controller
}

function getCompInputs($injector, componentName) {
    return $injector.get(`${componentName}Directive`).map(directive => Object.keys(directive.bindToController)).reduce(unnestR, [])
}

function unnestR(acc, array) {
    return acc.concat(array)
}

function setStateDef(stateDef) {
    stateDef.controllerProvider = function ($injector) {
        return bindResolves(...getCompInputs($injector, stateDef.component))
    }
    stateDef.controllerProvider.$inject = ['$injector']

    stateDef.templateProvider = function ($injector) {
        const attrs = getCompInputs($injector, stateDef.component).map(key => `${kebobString(key)}="${key}"`).join(' ')

        const kebobName = kebobString(stateDef.component)

        return `<${kebobName} ${attrs}></${kebobName}>`
    }
    stateDef.templateProvider.$inject = ['$injector']
}

function kebobString(str) {
    return str.replace(/([A-Z])/g, $1 => `-${$1.toLowerCase()}`)
}
