import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketio from 'vue-socket.io';
import io from 'socket.io-client';  

const socket = io('http://localhost:3000');

//Vue.use(VueSocketio, 'http://localhost:8080');


Vue.config.productionTip = false

// const options = { path: '/my-app/' }; //Options object to pass into SocketIO

// Vue.use(new VueSocketIO({
//     debug: true,
//     connection: SocketIO('#', options), //options object is Optional
//     vuex: {
//       store,
//       actionPrefix: "SOCKET_",
//       mutationPrefix: "SOCKET_"
//     }
//   })
// );


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
