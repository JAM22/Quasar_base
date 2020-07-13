<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import jwt from "jsonwebtoken";
export default {
  name: 'App',
  created () {
    const _this = this
    if (this.$store.getters['auth/checkIsLogged']) {
      this.$axios.defaults.headers.Authorization = 'Bearer ' + this.$store.getters['auth/getTokenData'].access
      this.$axios.interceptors.response.use(function (response) {
        return response
      }, function (error) {
        if (error.response.status === 401) {
          const originalRequest = error.config
          // Refrescar Token
          try {
            this.$axios.post('api/token_refresh/', {refresh:  this.$store['auth/getTokenData'].refresh})
            .then((response) => {
              console.log('refresh token funcionando')
              let decoded = jwt.verify(response.data.access, process.env.SECRET_KEY)
              _this.setIsLogged(true)
              _this.setUser(decoded)
              _this.setTokenData(Object.assign(response.data, {type: decoded.token_type}))
              _this.$axios.defaults.headers.Authorization = 'Bearer ' + response.data.access
              _this.$axios(originalRequest)
            })
            .catch((error) => {
              this.$q.notify({
                color: "yellow",
                message:
                  "Tu sesión ha expirado, por favor inicia sesión nuevamente.",
                position: "top",
                actions: [{ icon: "close", color: "white" }],
                icon: "las la-exclamation-circle",
              });

              _this.setIsLogged(false)
              _this.setUser({})
              _this.setTokenData({})
              _this.$axios.defaults.headers.Authorization = null
              _this.$router.push({ name: 'login', query: { redirect: _this.$route.fullPath } })
            })
          }
          catch (e) {
            this.$q.notify({
              color: "yellow",
              message:
                "Tu sesión ha expirado, por favor inicia sesión nuevamente.",
              position: "top",
              actions: [{ icon: "close", color: "white" }],
              icon: "las la-exclamation-circle",
            });

            _this.setIsLogged(false)
            _this.setUser({})
            _this.setTokenData({})
            _this.$axios.defaults.headers.Authorization = null
            _this.$router.push({ name: 'login', query: { redirect: _this.$route.fullPath } })
          }
        } else if (error.response.status === 403) {
          _this.$router.push({name: 'error403'})
        } else if (error.response.status === 500) {
          const config = {
            color: 'red',
            message: error.response.data.message,
            caption: error.response.config.url,
            position: 'bottom'
          }
          if (process.env.DEV) {
            config.caption = error.response.config.url
          }
          _this.$q.notify(config)
        }
        return Promise.reject(error)
      })
    }
  },
  methods: {
    ...mapMutations('auth', ['setIsLogged', 'setUser', 'setTokenData', 'setPermission'])
  }
}
</script>
