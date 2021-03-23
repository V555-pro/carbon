<template>
  <div class="footer">
    <div class="footer-description">
      Lorem Ipsum
    </div>
    <div class="footer-social-links">
      <a href="#">
        <LogoMedium20 />
      </a>
      <a href="#">
        <LogoTwitter20 />
      </a>
      <a href="#">
        <LogoGithub20 />
      </a>
    </div>
  </div>
</template>

<script>
import LogoGithub20 from '@carbon/icons-vue/es/logo--github/20'
import LogoTwitter20 from '@carbon/icons-vue/es/logo--twitter/20'
import LogoMedium20 from '@carbon/icons-vue/es/logo--medium/20'
export default {
  name: 'Footer',
  components: {
    LogoGithub20,
    LogoTwitter20,
    LogoMedium20
  }
}
</script>

<style scoped lang="scss">
.footer {
  z-index: 8000;
  display: flex;
  align-items: center;
  height: 5rem;
  background-color: #0c0c0c;
  color: white;
  padding: 40px;
  .footer-social-links {
    margin-left: auto;
    a {
      color: white;
      margin-left: 8px;
    }
  }
}
</style>
