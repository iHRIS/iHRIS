import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import '../stylus/main.styl'

Vue.use(Vuetify, {
  iconfont: 'md', 
  theme: {
    primary: '#569fd3',
    secondary: '#5f6062',
    accent: '#78496a',
    error: '#b32317',
    info: '#005595',
    success: '#8a8d35',
    warning: '#d06f1a'
  }
})
