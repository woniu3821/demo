<template>
  <div id="app">
    <nav-wrapper :menus="menus"></nav-wrapper>
  </div>
</template>

<script>
import navWrapper from "@/components/nav-wrapper/navWrapper.vue";

export default {
  data() {
    return {};
  },
  computed: {
    menus() {
      return this.$store.state.menus;
    }
  },
  methods: {},
  components: {
    navWrapper
  }
};
</script>

<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
