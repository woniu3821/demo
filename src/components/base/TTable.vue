
<script>
export default {
  name: "t-table",
  //   functional: true,
  props: {
    //传参的接口
    columns: {
      type: Array,
      default: function() {
        return [];
      }
    },
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    stripe: {
      type: Boolean,
      default: false
    }
  },
  data() {
    //返回的数据
    return {
      currentColumns: [],
      currentData: []
    };
  },
  render: function(h) {
    //在这里构造DOM
    var _this = this;

    //构造表格的头部标题
    var ths = [];
    this.currentColumns.forEach(col => {
      ths.push(h("th", col.title));
    });

    //构造表格的内容
    var trs = [];
    this.currentData.forEach((row, index) => {
      var tds = [];
      _this.currentColumns.forEach(cell => {
        tds.push(h("td", row[cell.key]));
      });
      if (index % 2 == 0) {
        trs.push(
          h(
            "tr",
            {
              class: {
                trStyle: _this.stripe
              }
            },
            [tds[index]]
          )
        );
      } else {
        trs.push(h("tr", [ths[index]]));
      }
    });

    //返回整体的表格系统
    return h("table", [h("thead", [h("tr", ths)]), h("tbody", trs)]);
  },
  methods: {
    makeColumns() {
      //初始化数据columns，并且增加一个属性 _sortTpye是为了之后能通过它去设置a标签的css属性
      this.currentColumns = this.columns.map(col => {
        col._sortType = "normal";
        //col._index = index;
        return col;
      });
    },
    makeData() {
      //初始化数据data
      this.currentData = this.data.map(row => {
        //row._index = index;
        return row;
      });
    }
  },
  mounted() {
    //初始化数据
    this.makeColumns();
    this.makeData();
  }
};
</script>

<style lang="stylus" scoped>

table
  font-size 12px
  margin-bottom 24px
  border-collapse collapse
  border-spacing 0
  empty-cells show
  border 1px solid #e9e9e9
  width 100%
table tbody tr:hover
  background #ebf7ff
table tr.trStyle
  background #f7f7f7d8
table th
  font 30px
  background #f7f7f7d8
  color #5c6b77
  font-weight 600
  white-space nowrap
table th, table td
  padding 5px 16px
  border 1px solid #e9e9e9
  text-align left
  height 48px
table th a
  display inline-block
  margin 0 4px
  cursor pointer
table th a.on
  color red
table th a:hover
  color #3399ff
</style>
