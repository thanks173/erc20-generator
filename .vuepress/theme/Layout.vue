<template>
  <div class="page-wrapper">
    <site-header :page="page"></site-header>
    <transition name="fade" mode="out-in">
      <component v-if="page" :is="page" :key="page"></component>
    </transition>
  </div>
</template>
<script>
  import SiteHeader from './Header.vue';

  export default {
    components: {
      SiteHeader,
    },
    computed: {
      page () {
        return this.$page.frontmatter.component || null;
      },
    },
  };
</script>
<style src="../scss/main.scss" lang="scss"></style>
