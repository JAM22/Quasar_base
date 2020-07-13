<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8" height-hint="64">
      <q-toolbar class="GNL__toolbar">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
          class="q-mr-sm"
        />

        <q-toolbar-title v-if="$q.screen.gt.xs" shrink class="row items-center no-wrap">
          <img src="https://cdn.quasar.dev/img/layout-gallery/logo-google.svg">
          <span class="q-ml-sm">Soluciones</span>
        </q-toolbar-title>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <span>usuario</span>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-white"
      :width="250"
    >
      <q-scroll-area class="fit">
        <q-list padding class="text-grey-8">
          <q-item class="GNL__drawer-item" v-ripple v-for="link in links" :key="link.text" clickable
                  :to="{ name: link.url }" active
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item class="GNL__drawer-item" clickable active>
            <q-item-section avatar>
              <q-icon name="las la-door-open" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Salir</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  import { fasGlobeAmericas, fasFlask } from '@quasar/extras/fontawesome-v5'

  export default {
    name: 'GoogleNewsLayout',

    data () {
      return {
        leftDrawerOpen: false,
        links: [
          { icon: 'las la-home', text: 'Inicio', url: 'index' },
          { icon: 'las la-users-cog', text: 'Usuarios', url: 'user' },
        ]
      }
    },

    methods: {
    }
  }
</script>

<style lang="sass">
  .GNL

    &__toolbar
      height: 64px

    &__toolbar-input
      width: 55%

    &__drawer-item
      line-height: 24px
      border-radius: 0 24px 24px 0
      margin-right: 12px

      .q-item__section--avatar
        .q-icon
          color: #5f6368

      .q-item__label
        color: #3c4043
        letter-spacing: .01785714em
        font-size: .875rem
        font-weight: 500
        line-height: 1.25rem

    &__drawer-footer-link
      color: inherit
      text-decoration: none
      font-weight: 500
      font-size: .75rem

      &:hover
        color: #000
</style>
