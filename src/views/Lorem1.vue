<template>
  <div class="lorem-page">
<!--    <Header />-->
    <div class="lorem-page-inner">
      <router-link :to="{name: 'LoremTable'}" class="loremTableLink">
          Grayed Out Button
        <b-icon-plus/>
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Lorem1',
  data () {
    return {
      icon: {
        props: {
          title: {}
        },
        functional: true,
        _Ctor: {}
      }
    }
  },
  methods: {
    actionClick () {

    }
  }
}
</script>

<style lang="scss">
  .lorem-page{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 70px;
    .lorem-page-inner{
      .loremTableLink{
        padding: 20px 17px;
        background: #c6c6c6;
        color: #949494;
        text-decoration: none;
        display: flex;
        align-items: center;
        font-size: 17px;
        svg{
          margin-left: 31px;
          font-size: 21px;
        }
      }
    }
  }
</style>
