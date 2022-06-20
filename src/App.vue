<template>
  <div
    class="min-h-screen w-screen p-5 bg-gradient-to-tr from-quiche-purple to-quiche-red"
  >

    <q-navbar :is-open="state.navbarIsOpen" @is-open="changeNavbarState">
      <q-navbar-content>
        <q-menu class="menu" row-on-desktop>
          <q-menu-item :isActive="routeName === 'home'">
            <router-link :to="{ name: 'home' }">Accueil</router-link>
          </q-menu-item>
          <q-menu-item :isActive="routeName === 'tournamentHistory'">
            <router-link :to="{ name: 'tournamentHistory'}">Historique</router-link>
          </q-menu-item>
          <q-menu-item :isActive="routeName === 'faq'">
            <router-link :to="{ name: 'faq' }">FAQ</router-link>
          </q-menu-item>
        </q-menu>
      </q-navbar-content>
    </q-navbar>
    <q-button class="navBarButton" @click="changeNavbarState()">
      Menu
    </q-button>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
import { computed, reactive } from "vue";

const route = useRoute();

const state = reactive({
  navbarIsOpen: false,
  selectedIndex: null,
});

const changeNavbarState = (newValue = null) => {
  state.navbarIsOpen = newValue ?? !state.navbarIsOpen;
};

const routeName = computed(() => {
  return route.name;
})
</script>

<style scoped>
.menu {
  @apply justify-around;
  background-color: transparent;
}

@media screen(md) {
  .navBarButton {
    @apply opacity-0 pointer-events-none;
  }
}
</style>
