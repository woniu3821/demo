<template>
  <div class="custom-bread-crumb">
    <Breadcrumb :style="{fontSize: `${fontSize}px`}">
      <BreadcrumbItem v-for="item in list" :to="item.to" :key="`bread-crumb-${item.name}`">
        <Icon style="margin-right: 4px;" :type="item.icon || ''" />
        {{ ((item.meta && item.meta.title) || item.name) }}
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>
<script>
export default {
  name: "customBreadCrumb",
  components: {},
  props: {
    list: {
      type: Array,
      default: () => []
    },
    fontSize: {
      type: Number,
      default: 14
    },
    showIcon: {
      type: Boolean,
      default: false
    }
  },
  methods: {}
};
</script>
<style lang="stylus">
.custom-bread-crumb
  display inline-block
  vertical-align top
</style>
