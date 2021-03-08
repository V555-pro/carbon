<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

export default {
  name: 'App',
  components: { Header, Footer },
  computed: {
    currentRouteName () {
      return this.$route.name
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #161616;
  width: 100%;
  height: 100vh;
  padding-top: 48px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.gray-button, .regular-button{
  padding: 20px 17px;
  background: #c6c6c6;
  color: #949494;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: 17px;
  cursor: pointer;
  svg{
    margin-left: 31px;
    font-size: 21px;
  }
}
.regular-button {
  background-color: #D3FB67;
  color: #161616;
}
</style>
