import Vue from 'vue'
import Vuetify, {VLayout, VTextField} from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md' || 'fa5',
  components: {VLayout, VTextField}
})
