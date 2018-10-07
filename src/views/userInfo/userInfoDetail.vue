<template>
  <div>
    <div class="title-bar">
      用户详情
    </div>
    <Row>
      <title-bar title="基本信息"></title-bar>
      <table border="0" cellspacing="1" cellpadding="0" class="thin">
        <tr>
          <th>用户名</th>
          <td>$100</td>
          <th>姓名</th>
          <td>$100</td>
          <th>性别</th>
          <td>$100</td>
        </tr>
        <tr>
          <th>人员类型</th>
          <td>$100</td>
          <th>所属部门/院系</th>
          <td>$100</td>
          <th>职务</th>
          <td>$100</td>
        </tr>
        <tr>
          <th>证件号码</th>
          <td>$100</td>
          <th></th>
          <td></td>
          <th></th>
          <td></td>
        </tr>
      </table>
      <title-bar title="账号信息"></title-bar>
      <table border="0" cellspacing="1" cellpadding="0" class="thin">
        <tr>
          <th>账号状态</th>
          <td>$100</td>
          <th>手机号</th>
          <td>$100</td>
          <th>座机</th>
          <td>$100</td>
        </tr>
        <tr>
          <th>邮箱</th>
          <td>$100</td>
          <th>办公地点</th>
          <td>$100</td>
          <th></th>
          <td></td>
        </tr>
      </table>
      <!-- <t-table :columns="columns" :data="data" stripe>12321</t-table> -->
    </Row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      aBasicDetail: [],
      columns: [
        {
          title: "用户名",
          key: "name"
        },
        {
          title: "姓名",
          key: "age",
          sortTable: true
        },
        {
          title: "性别",
          key: "birthday",
          sortTable: true
        },
        {
          title: "地址",
          key: "adress"
        }
      ],
      data: [
        {
          name: "黄凯",
          age: 11,
          birthday: "1999-02-14",
          adress: "湖北武汉洪山区"
        },
        {
          name: "儿童团",
          age: 20,
          birthday: "1996-02-14",
          adress: "湖北黄冈第一中学"
        },
        {
          name: "斗鱼",
          age: 5,
          birthday: "1994-02-14",
          adress: "广东省深圳腾讯总部"
        },
        {
          name: "爱仕达",
          age: 85,
          birthday: "2000-02-14",
          adress: "山西省朔州市"
        },
        {
          name: "三大",
          age: 26,
          birthday: "2004-02-14",
          adress: "湖北武汉汉阳区"
        }
      ]
    };
  },
  computed: {
    // ...mapState(["userDetail"]),
    ...mapGetters(["userDetail"])
  },
  methods: {
    getPM25() {},
    // ...mapActions({
    //   switchLang: "fresh_weather"
    // }),
    test() {
      this.bigger = !this.bigger;
    }
  },
  mounted() {}
};
</script>
 <style lang="stylus">
 .thin
   background #e8eaec
   width 100%
   td, th
     background #FFFFFF
     min-width 0
     height 48px
     box-sizing border-box
     text-align left
     text-overflow ellipsis
     vertical-align middle
     padding-left 18px
     padding-right 18px
     overflow hidden
     white-space normal
     word-break break-all
   th
     background
</style>
