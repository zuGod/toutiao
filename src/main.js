import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import 'amfe-flexible' //引入flexible.js -> 设置根标签字体大小（移动端适配）
import './utils/dayjs'

import { Loading, Divider, Search, Popup, PullRefresh, List, Tab, Tabs, Tag, Dialog, NavBar, Form, Field, Button, Toast, CountDown, Tabbar, TabbarItem, Icon, Image as VanImage, Grid, GridItem, Cell, CellGroup } from 'vant';

Vue.use(Loading);
Vue.use(Divider);
Vue.use(Search);
Vue.use(Popup);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Tag);
Vue.use(Dialog);

Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(VanImage);
Vue.use(Icon);

Vue.use(CountDown);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Toast);
Vue.use(Button);
Vue.use(Form);
Vue.use(Field);

Vue.use(NavBar);

Vue.prototype.formatWord = function (val) {
  return val.replace(/\n/g, '<br>')
},

  Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
