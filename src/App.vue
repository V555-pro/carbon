<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default {
  name: 'App',
  components: { Header, Footer },
  computed: {
    currentRouteName() {
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

.gray-button,
.regular-button {
  padding: 20px 17px;
  background: #c6c6c6;
  color: #949494;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: 17px;
  cursor: pointer;
  svg {
    margin-left: 31px;
    font-size: 21px;
  }
}
.regular-button {
  background-color: #d3fb67;
  color: #161616;
}
.bx--inline-loading {
  justify-content: center;
  .bx--inline-loading__animation {
    width: 2.5rem;
    height: 2.5rem;
    .bx--loading {
      width: 2.5rem;
      height: 2.5rem;
      .bx--loading__svg {
        stroke: #d3fb67;
        .bx--loading__background {
          stroke: rgb(57, 57, 57);
          stroke-dashoffset: -22;
        }
        .bx--loading__stroke {
          stroke: unset;
          stroke-dashoffset: 160;
          stroke-width: 8;
        }
      }
    }
  }
}
.bx--btn--primary {
  background-color: #d3fb67 !important;
  color: #161616 !important;
}
</style>
