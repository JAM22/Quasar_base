import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

export default function ({ store, router }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  // Revisa que cada ruta que posea meta: requiresAuth, sea redireccionada a login si no se encuentra el usuario
  Router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters['auth/checkIsLogged']) {
        // Chequea permisos
        if (to.meta.permission) {
          if (store.getters['auth/getPermissions'].includes(to.meta.permission)) {
            next()
          } else {
            next({
              name: 'error403'
            })
          }
        } else {
          next()
        }
      } else {
        next({
          name: 'login',
          query: { redirect: to.fullPath }
        })
      }
    } else {
      if (store.getters['auth/checkIsLogged']) {
        next({
          name: 'index'
        })
      } else {
        next()
      }
    }
  })

  // Cambia el titulo de cada pagina por el title encontrado en el meta de cada route
  Router.beforeEach((to, from, next) => {
    // This goes through the matched routes from last to first, finding the closest route with a title.
    // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

    // If a route with a title was found, set the document (page) title to that value.
    if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

    // Skip rendering meta tags if there are none.
    if(!nearestWithMeta) return next();

    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map(tagDef => {
      const tag = document.createElement('meta');

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute('data-vue-router-controlled', '');

      return tag;
    })
      // Add the meta tags to the document head.
      .forEach(tag => document.head.appendChild(tag));

    next();
  });

  return Router
}
