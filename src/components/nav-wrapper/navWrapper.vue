<template>
  <section class="app-con">
    <div class="app-menu" :style="{width: leftWidth}">
      <Menu style="width:100%;" theme="dark" v-show="menuExpand" :active-name="activeItem" :open-names="openedNames" @on-select="handleSelect">
        <template v-for="item in menus">
          <side-menu-item v-if="item.children && item.children.length > 0" :key="`menu-${item.key}`" :parent-item="item"></side-menu-item>
          <menu-item v-else :name="item.key" :key="`menu-${item.key}`">
            <Icon :type="item.icon" /><span>{{item.title}}</span></menu-item>
        </template>
      </Menu>
      <div class="menu-collapsed" v-show="!menuExpand">
        <template v-for="item in menus">
          <collapsed-menu v-if="item.children && item.children.length > 0" :active-name="activeItem" :is-root="true" @on-click="handleSelect" :parent-item="item" :key="`drop-menu-${item.key}`"></collapsed-menu>
          <Tooltip transfer v-else theme="light" :content="item.title" placement="right" :key="`drop-menu-${item.key}`">
            <a @click="handleSelect(item.key)" :class="['drop-menu-a', {'collapsed-active': activeItem == item.key}]" :style="{textAlign: 'center'}">
              <Icon :type="item.icon" :size="16" color="rgba(255,255,255,.7)" /></a>
          </Tooltip>
        </template>
      </div>
      <div class="menu-toggle" @click="toggleMenu">
        <Icon v-if="expand" type="ios-arrow-back" />
        <Icon v-else type="ios-arrow-forward" />
      </div>
    </div>
    <div class="app-main" :style="{marginLeft: leftWidth}">
      <div class="app-crumbs">
        <Breadcrumb>
          <BreadcrumbItem :to="bread.children ? '': bread.path" v-for="bread in breadcrumbs" :key="bread.key">
            <Icon :type="bread.icon || ''"></Icon> {{bread.title}}
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <!-- <div class="app-crumbs">
        <Breadcrumb>
          <BreadcrumbItem v-for="(item,index) in routeList" :key="index" :to="item.path">
            <Icon :type="item.meta.icon || ''"></Icon>{{item.meta.name}}
          </BreadcrumbItem>
        </Breadcrumb>
      </div> -->
      <div class="app-content">
        <div v-if="userTypeName" class="top-info">{{userTypeName}}</div>
        <!-- <keep-alive> -->
        <router-view></router-view>
        <!-- </keep-alive> -->
      </div>
    </div>
  </section>
</template>
<script type="text/ecmascript-6">
import { mapGetters, mapMutations } from "vuex";
import $ from "jquery";
export default {
  props: {
    menus: {
      type: Array,
      default: () => {
        return [];
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
  components: {},
  created() {},
  watch: {
    $route: {
      handler(route) {
        let path = route.path;
        console.log(route);
        this.setUserType(route.params.name);
        let item = getItemFromTree(this.menus, path);
        if (item) {
          this.activeItem = item.key;
        }
        function getItemFromTree(items, path) {
          let t = null;
          items.forEach(item => {
            if (item.path == path) {
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
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters(["routeList", "userTypeName"]),
    breadcrumbs() {
      // debugger
      let find = false;
      let breads = [];
      setPathItemsFromTree(this.menus, this.activeItem);

      if (find) {
        return breads;
      } else {
        return [];
      }

      function setPathItemsFromTree(menus, activeItem) {
        menus.forEach(menu => {
          if (menu.key === activeItem) {
            find = true;
            breads.push(menu);
          } else if (!find && menu.children && menu.children.length > 0) {
            breads.push(menu);
            setPathItemsFromTree(menu.children, activeItem);
            if (!find) {
              breads.pop();
            }
          }
        });
      }
    }
  },
  mounted() {},
  methods: {
    ...mapMutations({
      setUserType: "SET_USER_TYPE"
    }),
    handleSelect(key) {
      console.log("出现结果：" + key);
      let item = getItemFromTree(this.menus, key);
      // debugger
      if (item && !item.children) {
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
        background-color rgba(45, 140, 240, 0.2)
    transition width 1s
  .app-main
    transition margin-left 1s
    overflow auto
    height 100vh
    .app-crumbs
      margin 10px 20px
      height 21px
    .app-content
      min-width 900px
      background-color white
      margin 20px
      margin-right calc(260px + 100% - 100vw)
      transition margin-right 1s
      padding 20px
      box-shadow 1px 1px 5px #ccc, -1px -1px 5px #ccc
      border-radius 10px
      min-height calc(100% - 74px)
      position relative
</style>
