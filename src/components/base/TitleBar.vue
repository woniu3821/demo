<template>
  <div class="nav-title-bar">
    <i></i>{{title}}
  </div>
</template>

<script>
export default {
  name: "title-bar",
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: () => {
        return "标题";
      },
      required: true
    }
  }
};
</script>

<style lang="stylus" scoped>
.nav-title-bar
  font-size 12px
  color rgb(101, 113, 128)
  display flex
  align-items center
  margin 10px 0
  &>i
    display block
    width 5px
    height 12px
    background #488cf0
    margin-right 4px
</style>
