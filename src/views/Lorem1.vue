<template>
  <div class="lorem-page">
    <div class="lorem-page-inner">
      <div v-if="!clicked" class="gray-button" @click="clicked = true">
        Grayed Out Button
        <b-icon-plus />
      </div>
      <div v-if="clicked" class="regular-button" @click="actionClick()">
        Regular Button
        <b-icon-plus />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Lorem1',
  data() {
    return {
      clicked: false
    }
  },
  methods: {
    actionClick() {
      this.$router.push({ name: 'LoremTable' })
    }
  }
}
</script>

<style lang="scss">
.lorem-page {
  width: 100%;
  min-height: calc(100% - 81px);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
