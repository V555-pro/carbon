<template>
  <cv-header aria-label="Carbon header">
    <cv-header-menu-button aria-label="Header menu" aria-controls="side-nav" />
    <cv-header-name href="javascript:void(0)" prefix="" style="color: white">
      Visor Finance
    </cv-header-name>
    <cv-header-nav aria-label="Carbon nav">
      <cv-header-menu-item href="javascript:void(0)">
        Address Whitelist
      </cv-header-menu-item>
      <cv-header-menu-item href="javascript:void(0)">
        Mint Visor NFT
      </cv-header-menu-item>
    </cv-header-nav>
    <template v-slot:header-global>
      <cv-header-global-action aria-label="Notification" @click="actionNotification" aria-controls="user-panel">
        <Notification20 />
      </cv-header-global-action>
      <cv-header-global-action aria-label="User avatar" @click="actionUserAvatar" aria-controls="user-panel">
        <UserAvatar20 />
      </cv-header-global-action>
      <cv-header-global-action
        aria-label="App switcher"
        aria-controls="switcher-panel"
        @click="actionAppSwitcher">
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
  name: 'AddressHeader',
  props: {
    msg: String
  },
  components: {
    Notification20,
    UserAvatar20,
    AppSwitcher20
  },
  methods: {
    actionUserAvatar () {
    },
    actionAppSwitcher () {
    },
    actionNotification () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.bx--header {
  background-color: #171717;
  border-bottom: none;
}
</style>
