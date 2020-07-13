<template>
  <div class="row justify-center">
    <ValidationObserver
      ref="login"
      tag="div"
      class="col-md-8 col-sm-10 col-xs-10 fixed-center q-ml-none"
      style="max-width: 350px;"
    >
      <div class="text-center">
        <img class="q-mr-none" src="../assets/quasar-logo-full.svg" />
        <p class="q-mt-md">Inicia sesión</p>
      </div>
      <validation-provider rules="required|email" v-slot="{ errors }">
        <q-input
          v-model="email"
          type="email"
          label="Correo electrónico"
          :error="errors.length > 0"
          :error-message="errors[0]"
        />
      </validation-provider>
      <validation-provider rules="required" v-slot="{ errors }">
        <q-input
          v-model="password"
          label="Contraseña"
          :error="errors.length > 0"
          :error-message="errors[0]"
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </validation-provider>
      <q-btn
        type="submit"
        color="primary"
        class="full-width q-mt-xl"
        rounded
        label="Inicia sesión"
        @click="submitLogin"
      />
    </ValidationObserver>
  </div>
</template>

<script>
import jwt from 'jsonwebtoken'
import { mapMutations, mapActions } from 'vuex'

export default {
  name: "Login",
  data() {
    return {
      email: "j@j.com",
      password: "123",
      isPwd: true, // check para mostrar o no la contraseña
    };
  },
  methods: {
    ...mapMutations('auth', ['setIsLogged', 'setUser', 'setTokenData']),

    async submitLogin () {
      const _this = this
      this.$axios.post('api/token_generate/', {
        email: this.email,
        password: this.password
      })
      .then((response) => {
        let decoded = jwt.verify(response.data.access, process.env.SECRET_KEY)
        _this.setIsLogged(true)
        _this.setUser(decoded)
        _this.setTokenData(Object.assign(response.data, {type: decoded.token_type}))
        _this.$axios.defaults.headers.Authorization = 'Bearer ' + response.data.access
        _this.$router.push({ name: 'index'});
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.$q.notify({
            color: "red",
            message:
              "Correo electronico y/o contraseña incorrectos. Por favor verifique los campos",
            position: "top",
            actions: [{ icon: "close", color: "white" }],
            icon: "las la-exclamation-circle",
          });
        } else {
          console.log(error.response);
        }
      })
    }
  }
}


    // login() {
    //   const _this = this;
    //   this.$refs.login.validate().then((success) => {
    //     if (!success) {
    //       // No permite que el usuario continue si los campos no estan llenos
    //       return;
    //     }
    //     this.$axios.post('api/token_generate/', {
    //       email: this.email,
    //       password: this.password
    //     })
    //       .then((res) => {
    //         console.log('ok')
    //         jwt.verify(res.data.access, process.env.SIGNING_KEY, function (err, decoded) {
    //           if (err) {
    //             _this.$q.notify.create({
    //               color: 'red',
    //               message: 'Error en logueo',
    //               caption: err,
    //               position: 'bottom-right'
    //             })
    //           } else {
    //             console.log('ok 2')
    //             _this.setSessionData(Object.assign({ token: res.data.access }, decoded))
    //             _this.$router.push({name: 'index'});
    //           }
    //         })
    //       })
    //       .catch((err) => {
    //         console.log('error')
    //         if (err.response.status === 401) {
    //           this.$q.notify({
    //             color: "red",
    //             message:
    //               "Correo electronico y/o contraseña incorrectos. Por favor verifique los campos",
    //             position: "top",
    //             actions: [{ icon: "close", color: "white" }],
    //             icon: "las la-exclamation-circle",
    //           });
    //         } else {
    //           console.log(err.response);
    //         }
    //       });
    //   });
    // },

</script>
