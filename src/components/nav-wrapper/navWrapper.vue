<template>
  <section class="app-con">
    <div class="app-menu" :style="{width: leftWidth}">
      <Menu style="width:100%;" theme="dark" v-show="menuExpand" :active-name="activeItem" :open-names="openedNames" @on-select="handleSelect">
        <template v-for="item in menus">
          <side-menu-item v-if="item.children && item.children.length > 0 && !item.menuLeaf" :key="`menu-${item.key}`" :parent-item="item"></side-menu-item>
          <menu-item v-else :name="item.key" :key="`menu-${item.key}`"><Icon :type="item.icon"/><span>{{item.title}}</span></menu-item>
        </template>
      </Menu>
      <div class="menu-collapsed" v-show="!menuExpand">
        <template v-for="item in menus">
          <collapsed-menu v-if="item.children && item.children.length > 0 && !item.menuLeaf" :active-name="activeItem" :is-root="true" @on-click="handleSelect" :parent-item="item" :key="`drop-menu-${item.key}`"></collapsed-menu>
          <Tooltip transfer v-else theme="light" :content="item.title" placement="right" :key="`drop-menu-${item.key}`">
            <a @click="handleSelect(item.key)" :class="['drop-menu-a', {'collapsed-active': activeItem == item.key}]" :style="{textAlign: 'center'}"><Icon :type="item.icon" :size="16" color="rgba(255,255,255,.7)" /></a>
          </Tooltip>
        </template>
      </div>
      <div class="menu-toggle" @click="toggleMenu">
          <Icon v-if="expand" type="ios-arrow-back" />
          <Icon v-else type="ios-arrow-forward"/>
      </div>
    </div>
    <div class="app-main" :style="{marginLeft: leftWidth}">
      <div class="app-crumbs">
        <Breadcrumb>
          <BreadcrumbItem :to="(!bread.children || bread.menuLeaf ) ? bread.path: ''" v-for="bread in breadcrumbs" :key="bread.key">
            <Icon style="vertical-align:-0.125ex;" :type="bread.icon || ''"></Icon> <span>{{bread.title}}</span>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="app-content">
        <router-view></router-view>
      </div>
    </div>
  </section>
</template>
<script type="text/ecmascript-6">
import SideMenuItem from "./sideMenuItem.vue";
import CollapsedMenu from "./collapsedMenu.vue";
import $ from "jquery";
// 用法：
// <nav-wrapper default-path='/demo' :menus="menus"></nav-wrapper>
//  menus = [
//       {
//         key: '01',
//         title: '演示',
//         path: '/',
//         icon: 'ios-cog-outline',
//         children: [
//           {
//             key: '0101',
//             title: '演示1',
//             path: '/1',
//             icon: 'ios-cog-outline',
//             children: [
//               {
//                 key: '010101', title: '演示11', path: '/demo', icon: 'ios-cog-outline',
//                 menuLeaf: true, // 有内部节点的节点，需加此属性
//                 children: [
//                   { key: '01010101', title: '演示111', path: '/demooo', icon: 'ios-cog-outline', inner: true },  // 内部节点，不会显示在菜单中
//                   { key: '01010102', title: '演示112', path: '/demo/*/demo', icon: 'ios-cog-outline', inner: true } // 内部节点，不会显示在菜单中
//                 ]
//               },
//               { key: '010102', title: '演示12', path: '/12', icon: 'ios-cog-outline',
//               menuLeaf: true, // 有内部节点的节点，需加此属性
//               children: [
//                 { key: '01010201', title: '演示121', path: '/12222', icon: 'ios-cog-outline', inner: true }, // 内部节点，不会显示在菜单中
//                 { key: '01010202', title: '演示122', path: '/1222/*/word', icon: 'ios-cog-outline', inner: true } // 内部节点，不会显示在菜单中
//               ]
//             }
//             ]
//           },
//           {
//             key: '0102',
//             title: '演示2',
//             path: '/2',
//             icon: 'ios-cog-outline',
//             children: [
//               { key: '010201', title: '演示21', path: '/21', icon: 'ios-cog-outline' },
//               { key: '010202', title: '演示22', path: '/22', icon: 'ios-cog-outline' }
//             ]
//           }
//         ]
//       },
//       { key: '02', title: '关于', path: '/about', icon: 'ios-cog-outline' }
//     ]

export default {
  props: {
    menus: {
      type: Array,
      default: function() {
        return [];
      }
    },
    defaultPath: {
      type: String,
      default: function() {
        return "";
      }
    }
  },
  data: function() {
    return {
      activeItem: "",
      expand: true,
      menuExpand: true,
      leftWidth: "240px",
      openedNames: []
    };
  },
  components: {
    SideMenuItem,
    CollapsedMenu
  },
  created() {},
  watch: {
    $route: {
      handler(route) {
        this.setActiveItem(route);
      },
      immediate: true
    },
    menus(newVal, oldVal) {
      if (this.defaultPath && newVal.length && newVal.length > 0) {
        this.goDefault();
        this.$nextTick(() => {
          this.setActiveItem(this.$route);
        });
      }
    }
  },
  computed: {
    breadcrumbs() {
      // debugger
      let path = this.$route.path;
      if (!path || this.menus.length < 1) {
        return [];
      }
      let item = this.getItemFromTreeByPath(this.menus, this.$route.path);
      if (!item) {
        return [];
      }
      let breads = this.getPathItemsFromTree(this.menus, item.key);
      // console.log('breads:')
      // console.log(breads)
      return breads;
    }
  },
  methods: {
    handleSelect(key) {
      // console.log("出现结果：" + key)
      let item = getItemFromTree(this.menus, key);
      // debugger
      if (item && (!item.children || item.menuLeaf)) {
        this.$router.push(item.path);
        this.activeItem = item.key;
      }

      function getItemFromTree(items, key) {
        let t = null;
        items.forEach(item => {
          if (item.key == key) {
            t = item;
          } else if (item.children && item.children.length > 0) {
            let res = getItemFromTree(item.children, key);
            if (res) {
              t = res;
            }
          }
        });
        return t;
      }
    },
    toggleMenu() {
      this.expand = !this.expand;
      if (this.expand) {
        setTimeout(() => {
          this.menuExpand = this.expand;
        }, 500);
        this.leftWidth = "240px";
        $(".app-content").css("marginRight", "calc(260px + 100% - 100vw)");
      } else {
        this.menuExpand = false;
        this.leftWidth = "60px";
        $(".app-content").css("marginRight", "calc(80px + 100% - 100vw)");
      }
    },
    goDefault() {
      if (this.defaultPath && this.$route.path == "/") {
        this.$nextTick(() => {
          this.$router.push(this.defaultPath);
        });
      }
    },
    getPathItemsFromTree(tree, itemKey) {
      let find = false;
      let pathItems = [];
      setPathItemsFromTree(tree, itemKey);
      return find ? pathItems : [];

      function setPathItemsFromTree(menus, activeItem) {
        menus.forEach(menu => {
          if (menu.key === activeItem) {
            find = true;
            pathItems.push(menu);
          } else if (!find && menu.children && menu.children.length > 0) {
            pathItems.push(menu);
            setPathItemsFromTree(menu.children, activeItem);
            if (!find) {
              pathItems.pop();
            }
          }
        });
      }
    },
    setActiveItem(route) {
      // debugger
      // console.log('设置activeItem:')
      // 查找activeItem，给menu, collapsedMenu用以展示当前项，需要找出匹配的内部导航的【叶子父级节点】的key
      let path = route.path;
      if (!path || this.menus.length < 1) {
        return;
      }
      let item = this.getItemFromTreeByPath(this.menus, path);
      if (item && item.inner) {
        let parents = this.getPathItemsFromTree(this.menus, item.key);
        for (var i = parents.length - 1; i > -1; i--) {
          if (parents[i].menuLeaf === true) {
            item = parents[i];
            break;
          }
        }
      }
      // console.log(item)
      // debugger
      if (item) {
        // console.log(item.key)
        this.activeItem = item.key;
      }
    },
    getItemFromTreeByPath(menus, path) {
      let item = getItemFromTree(menus, path);
      return item;

      function getItemFromTree(items, path) {
        let t = null;
        items.forEach(item => {
          if (camparePath(path, item.path)) {
            t = item;
          } else if (item.children && item.children.length > 0) {
            let res = getItemFromTree(item.children, path);
            if (res) {
              t = res;
            }
          }
        });
        return t;
      }
      function camparePath(path, pathTemplate) {
        if (path == pathTemplate) {
          return true;
        }
        if (pathTemplate.indexOf("*") > -1) {
          let pathArr = path.split("/");
          let tmpArr = pathTemplate.split("/");
          if (pathArr.length != tmpArr.length) {
            return false;
          }
          let matched = true;
          tmpArr.forEach((tmp, index) => {
            if (tmp != "*") {
              matched = matched && tmp == pathArr[index];
            }
          });
          return matched;
        }
        return false;
      }
    }
  },
  mounted() {
    if (this.defaultPath && this.menus.length && this.menus.length > 0) {
      this.goDefault();
    }
  }
};
</script>
<style lang="stylus">
body
  overflow hidden
#app
  overflow hidden
.app-con
  background-color #f2f5fa
  overflow hidden
  .app-menu
    position fixed
    height 100vh
    background-color #515a6e
    .ivu-menu-item
      white-space nowrap
    .menu-toggle
      position absolute
      bottom 20px
      height 40px
      width 100%
      text-align center
      color white
      cursor pointer
      line-height 40px
      &:hover
        background-color #496488
    transition width 1s
  .app-main
    transition margin-left 1s
    overflow auto
    height 100vh
    .app-crumbs
      margin 8px 20px
      height 21px
      .ivu-breadcrumb
        color #9EA7B4
    .app-content
      min-width 900px
      background-color white
      margin 0 20px 20px 20px
      margin-right calc(260px + 100% - 100vw)
      transition margin-right 1s
      padding 20px
      border 1px solid #E9EAEC
      border-radius 4px
      box-shadow 1px 1px 10px 0 rgba(0, 0, 0, 0.1), -1px -1px 10px 0 rgba(0, 0, 0, 0.1)
      min-height calc(100% - 60px)
</style>
