<template>
    <div class="footer">
      <div class="footer-description">Lorem Ipsum</div>
      <div class="footer-social-links">
        <a href="#">
          <LogoTwitter20/>
        </a>
        <a href="#">
          <LogoGithub20/>
        </a>
      </div>
    </div>
</template>

<script>
import LogoGithub20 from '@carbon/icons-vue/es/logo--github/20'
import LogoTwitter20 from '@carbon/icons-vue/es/logo--twitter/20'
export default {
  name: 'Footer',
  components: {
    LogoGithub20,
    LogoTwitter20
  }
}
</script>

<style scoped lang="scss">
  .footer{
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 8000;
    display: flex;
    align-items: center;
    height: 5rem;
    background-color: #161616;
    border-bottom: 1px solid #393939;
    color: white;
    padding: 40px;
    .footer-social-links{
      margin-left: auto;
      a{
        color: white;
        margin-left: 8px;
      }
    }
  }
</style>
