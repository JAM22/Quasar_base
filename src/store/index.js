import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import SecureLS from 'secure-ls'
import auth from './auth'

const ls = new SecureLS({
  encodingType: 'rabbit',
  encryptionSecret: process.env.SECRET_KEY_LS
})

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: {
    getItem: (key) => {
      try {
        return ls.get(key)
      }
      catch {
        return ls.remove(key)
      }
    },
    setItem: (key, value) => ls.set(key, value),
    removeItem: (key) => ls.remove(key)
  },
  key: 'quasar_soluciones_app',
})

export default function () {
  return new Vuex.Store({
    modules: {
      auth
    },
    plugins: [vuexLocal.plugin],
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })
}
