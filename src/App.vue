<template>
  <div id="app">
    <nav-wrapper :menus="menus"></nav-wrapper>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {},
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
</style>
