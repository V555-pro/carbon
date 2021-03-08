<template>
  <div class="lorem-page">
    <div class="lorem-page-inner">
      <div class="gray-button" @click="clicked = true" v-if="!clicked">
          Grayed Out Button
        <b-icon-plus/>
      </div>
      <div class="regular-button" @click="actionClick()" v-if="clicked">
          Regular Button
        <b-icon-plus/>
      </div>
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
      },
      clicked: false
    }
  },
  methods: {
    actionClick () {
      this.$router.push({ name: 'LoremTable' })
    }
  }
}
</script>

<style lang="scss">
  .lorem-page{
    width: 100%;
    min-height: calc(100% - 81px);
    display: flex;
    align-items: center;
    justify-content: center;
    .lorem-page-inner{
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
    }
  }
</style>
