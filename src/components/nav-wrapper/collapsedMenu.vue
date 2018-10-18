<template>
  <Dropdown @on-click="handleClick" :placement="placement">
    <a v-if="isRoot" :class="['drop-menu-a', {'collapsed-active': selfOrChildSelected(parentItem)}]" @mouseover="handleMousemove($event, parentItem.children)">
      <Icon :size="iconSize" color="rgba(255,255,255,.7)" :type="parentItem.icon"/>
      <Icon style="color:#9CA5B2;position:absolute;top:19px;left:calc(50% + 10px);" type="ios-arrow-forward" :size="12"/>
    </a>
    <DropdownItem v-else :name="parentItem.key" :class="[{'drop-down-active': selfOrChildSelected(parentItem)}]">
        <Icon :size="iconSize" :type="parentItem.icon"/>
        {{parentItem.title}}
        <Icon type="ios-arrow-forward"></Icon>
    </DropdownItem>
    <DropdownMenu slot="list">
      <template v-for="child in parentItem.children">
        <collapsed-menu v-if="showChildren(child)" :parent-item="child" :key="`drop-${child.key}`" :active-name="activeName"></collapsed-menu>
        <DropdownItem v-else :key="`drop-${child.key}`" :name="child.key" :class="[{'drop-down-active': selfOrChildSelected(child)}]">
          <Icon :size="14" :type="child.icon"/>
          <span class="menu-title">{{child.title}}</span>
        </DropdownItem>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>
<script>
export default {
  name: "CollapsedMenu",
  props: {
    isRoot: {
      type: Boolean,
      default: false
    },
    parentItem: {
      type: Object,
      default: () => {}
    },
    activeName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      placement: "right-start"
    };
  },
  methods: {
    handleClick(key) {
      this.$emit("on-click", key);
    },
    handleMousemove(event, children) {
      const { pageY } = event;
      const height = children.length * 38;
      const isOverflow = pageY + height < window.innerHeight;
      this.placement = isOverflow ? "right-start" : "right-end";
    },
    showChildren(item) {
      return item.children && item.children.length > 0 && !item.menuLeaf;
    },
    selfOrChildSelected(parentItem) {
      if (parentItem.key === this.activeName) {
        return true;
      }
      if (
        parentItem.children &&
        parentItem.children.length > 0 &&
        checkTreeItem(parentItem.children, this.activeName)
      ) {
        return true;
      }
      return false;
      function checkTreeItem(children, activeName) {
        let flag = false;
        children.forEach(child => {
          if (child.key === activeName) {
            flag = true;
          } else if (child.children) {
            if (checkTreeItem(child.children, activeName)) {
              flag = true;
            }
          }
        });
        return flag;
      }
    }
  },
  computed: {
    textColor() {
      return "#495060";
    },
    iconSize() {
      if (this.isRoot) {
        return 16;
      } else {
        return 14;
      }
    }
  }
};
</script>
<style lang="stylus">
.menu-collapsed
  padding-top 10px
  .ivu-dropdown
    width 100%
    .ivu-dropdown-rel a
      width 100%
  .ivu-select-dropdown
    width auto
  .collapsed-active
    background-color #2d8cf0
    color white
  .drop-down-active
    color #2d8cf0
  .ivu-tooltip
    width 100%
    .ivu-tooltip-rel
      width 100%
    .ivu-tooltip-popper .ivu-tooltip-content
      .ivu-tooltip-arrow
        border-right-color #fff
      .ivu-tooltip-inner
        background #fff
        color #495060
  a.drop-menu-a
    display inline-block
    position relative
    padding 15px 15px
    width 100%
    text-align center
    color #495060
</style>
