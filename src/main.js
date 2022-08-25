import Vue from 'vue'
import App from './App.vue'

//引入VueRouter
import VueRouter from 'vue-router'
//引入路由器
import router from './router'
// 引入样式
// import './assets/less/index.less'
import './assets/less/index.less'
//引入store
import store from './store/index'

import http from 'axios'
import '../api/mock'

import { Button,
  Row,
  container,
  aside,
  header,
  main,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Card,
  Col,
  Table,
  TableColumn,
  breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Input,
  Select,
  Switch,
  DatePicker,
  Dialog,
  Option,
  Pagination,
  MessageBox,
  Message



} from 'element-ui';

Vue.use(Button)
Vue.use(Row)
Vue.use(container)
Vue.use(aside)
Vue.use(header)
Vue.use(main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Card)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)

Vue.config.productionTip = false

//应用插件
Vue.use(VueRouter) 

Vue.prototype.$http=http
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

// 导航守卫
// router.beforeEach((to, from, next) => {
//   store.commit('getToken')
//   const token = store.state.user.token
//   if (!token && to.name !== 'LoginIndex') {
//     next({ name: 'LoginIndex' })
//   } else if (token && to.name === 'LoginIndex') {
//     next({ name: 'MyHome' })
//   }else {
//     next()
//   }
// })
router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.user.token
  if (!token && to.name !== 'LoginIndex') {
    next({ name: 'LoginIndex' })
  }else if (token && to.name === 'LoginIndex') {
    next({ name: 'HomeIndex' })
  }else {
    next()
  }
})



new Vue({ 
  store, 
  router:router,
  render: h => h(App),
  created(){
    store.commit('addMenu',router)
  }
}).$mount('#app');
