export default class menuCtrl {
  constructor($state) {
    'ngInject'
    Object.assign(this, {$state})
    this.menuData = [
      {name: "Home", href: "home", type: 1, child: []},
      {name: "Subscription", href: "subscription", type: 1}
    ]
  }

}