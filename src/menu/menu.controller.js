export default class menuCtrl {
  constructor($state) {
    'ngInject'
    Object.assign(this, {$state})
    this.menuData = [
      {name: "Home", href: "home", type: 1, child: []},
      {name: "Campaign", href: "campaign", type: 1},
      {name: "Subscription", href: "subscription", type: 1}
    ]

  }
  /**
   * 菜单选中状态
   * @param {*} item 
   * $state.includes(stateOrName,params,options)
   *    stateOrName:字符串(必填). 是一个状态的名字.
   */
  menuChecked(item) {
      //$state.includes方法用于判断当前激活状态是否是指定的状态或者是指定状态的子状态.
      if(this.$state.includes(item.href)) {
          return true
      }
  }

  

}