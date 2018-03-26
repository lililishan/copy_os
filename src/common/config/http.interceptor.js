export default angular.module('http-interceptor', [])


  .factory('rmosInterceptor', (localStorageService, $q, $location, $injector, $rootScope) => {
    'ngInject'
    let loginUrl = './#!/default'
    return {
      request(config) {

        let token = localStorageService.get('token')
        token && (config.headers.token = token)

        let urlPrefix
        if (location.hostname.indexOf('addnewer.com') > -1 && location.hostname !== 'reachmaxos.addnewer.com' && location.hostname !== 'reachmaxos.sandbox.addnewer.com') {
          urlPrefix = '/rmosapi'
        } else {
          urlPrefix = '/api'
        }
        // ajax文件不加rap
        if (config.url.substr(0, 5) !== '/rap/' && config.url.substr(0, 5) !== 'saiku' && config.url.indexOf('.') == -1) {
          config.url = urlPrefix + config.url
        }
        // console.log(config.url)
        return config || $q.when(config)
      },
      // 可选，拦截失败的请求
      requestError(rejection) {
        // 对失败的请求进行处理
        // ...
        return $q.reject(rejection)
      },

      //可选，拦截成功的响应
      response(response) {
        if(response.data.code){
          console.log('oooooooooooooo')
          console.log(JSON.stringify(response.data))
        }
        // 非法访问 转向登录页
        if (response.data.code === 1) {
          localStorageService.remove('token')
          localStorageService.remove('expire_time')
          const arr = location.href.split('?')
          let url = arr.length == 2 ? (response.data.data + '?host=' + location.origin + '&' + arr[1]) : response.data.data
          url = url.replace('#!/default', '')
          window.location.replace(url)
        }
        //没有权限
        if (response.data.code === 3) {
          $injector.get('alertTips').show('没有权限', 'error')
          return $q.reject(response)
          //window.location.replace(response.data.data)

          // const fromClickOrg = localStorage.getItem('cOrg')
          // localStorage.removeItem('cOrg')
          // if (fromClickOrg) {
          //   window.location.replace(response.data.data.replace('login', 'person'))
          // } else {
          //   window.location.replace(response.data.data)
          // }
          
        }

        //系统维护升级中
        if (response.data.code === 8) {
            let stateService = $injector.get('$state');
            stateService.go('system');
        }

        if (response.data.code === 50001) {
          $injector.get('alertTips').show(response.data.msg, 'error')
          return $q.reject(response)
        }

        if (angular.isString(response.data)) {
          return response
        }
        return response.data || $q.when(response.data)
      },

      // 可选，拦截失败的响应
      responseError(rejection) {

        // if(rejection.status==400){
        //   $injector.get('alertTips').show(rejection.data.msg,'error')
        // }
        // loading.hide()
        // 对失败的响应进行处理
        // ...
        return $q.reject(rejection)
      },
    }
  })

  .config(($httpProvider) => {
    $httpProvider.interceptors.push('rmosInterceptor')
  })
  .name