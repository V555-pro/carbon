<template>
  <cv-header aria-label="Carbon header">
    <cv-header-menu-button aria-label="Header menu" aria-controls="side-nav" />
    <cv-skip-to-content href="#main-content">
      Skip to content
    </cv-skip-to-content>
    <cv-header-name
      href="javascript:void(0)"
      prefix=""
      @click.prevent="goHome()"
    >
      <img src="@/assets/Logo.svg" class="logo" />
    </cv-header-name>
    <cv-header-nav aria-label="Carbon nav">
      <cv-header-menu-item href="javascript:void(0)">
        Lorem Ipsum Delore
      </cv-header-menu-item>
      <cv-header-menu-item href="javascript:void(0)">
        Lorem Ipsum
      </cv-header-menu-item>
    </cv-header-nav>
    <template v-slot:header-global>
      <template>
        <cv-header-global-action
          aria-label="Notification"
          aria-controls="user-panel"
        >
          <Notification20 />
        </cv-header-global-action>
      </template>
      <cv-header-global-action
        aria-label="User avatar"
        aria-controls="user-panel"
        @click="login"
      >
        <UserAvatar20 />
      </cv-header-global-action>
      <cv-header-global-action
        aria-label="App switcher"
        aria-controls="switcher-panel"
      >
        <AppSwitcher20 />
      </cv-header-global-action>
    </template>
  </cv-header>
</template>

<script>
import Notification20 from '@carbon/icons-vue/es/notification/20'
import UserAvatar20 from '@carbon/icons-vue/es/user--avatar/20'
import AppSwitcher20 from '@carbon/icons-vue/es/app-switcher/20'

export default {
  name: 'Header',
  components: {
    Notification20,
    UserAvatar20,
    AppSwitcher20
  },
  computed: {
    currentRouteName() {
      return this.$route.name
    }
  },
  methods: {
    login() {
      this.$store.commit('login')
    },
    goHome() {
      if (this.currentRouteName !== 'Home') {
        this.$router.push({ name: 'Home' })
      }
    }
  }
}
</script>

<style lang="scss">
.cv-header.bx--header {
  background-color: #0c0c0c;
  border-bottom: none;
}
.bx--header__action {
  &:focus {
    border-color: transparent !important;
  }
}
.cv-header-name,
.cv-header-nav,
.bx--header__menu-bar,
.cv-header-menu-item,
a.bx--header__menu-item {
  &:focus {
    border-color: transparent !important;
    outline: none;
  }
}
.cv-header-name {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}
.logo {
  height: 100%;
}
</style>
