import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'

export default async ({ Vue }) => {
  Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule])
  })

  for (const [rule, validation] of Object.entries(rules)) {
    extend(rule, {
      ...validation
    })
  }

  extend('required', {
    message: 'Este campo es requerido'
  })
  extend('email', {
    message: 'Por favor ingrese un formato de correo válido'
  })

  Vue.component('ValidationProvider', ValidationProvider)
  Vue.component('ValidationObserver', ValidationObserver)
}
