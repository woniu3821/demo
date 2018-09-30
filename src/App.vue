<template>
  <div id="app">
    <nav-wrapper :menus="menus"></nav-wrapper>
  </div>
</template>

<script>
import navWrapper from "@/components/nav-wrapper/navWrapper.vue";
import { mapState } from "vuex";

export default {
  components: {
    navWrapper
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["menus"])
  },
  methods: {},
  mounted() {},
  created() {}
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
