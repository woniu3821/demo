<template>
  <Submenu :name="`${parentItem.key}`">
    <template slot="title">
      <Icon :type="parentItem.icon || ''"/>
      <span>{{ parentItem.title }}</span>
    </template>
    <template v-for="item in parentItem.children">
      <side-menu-item v-if="item.children && item.children.length > 0 && !item.menuLeaf" :key="`menu-${item.key}`" :parent-item="item"></side-menu-item>
      <menu-item v-else :name="item.key" :key="`menu-${item.key}`"><Icon :type="item.icon || ''"/><span>{{ item.title }}</span></menu-item>
    </template>
  </Submenu>
</template>
<script>
export default {
  name: "SideMenuItem",
  methods: {},
  props: {
    parentItem: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
<style>
</style>
