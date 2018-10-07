<template>
  <div>
    <div class="title-bar">
      查看用户信息<a href="">查看用户管理（旧版）</a>
    </div>
    <Row class="mrt-20">
      <Form :model="searchForm" :label-width="75" label-position="right">
        <Row :gutter="15">
          <Col span="10">
          <FormItem label="搜索用户：">
            <Input v-model="searchForm.value" placeholder="Enter something..."></Input>
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="15">
          <Col span="5">
          <FormItem class="big-label" label="所属部门/院系：">
            <Select v-model="searchForm.select">
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="5">
          <FormItem label="专业：">
            <Select v-model="searchForm.select">
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="5">
          <FormItem label="人员类型：">
            <Select v-model="searchForm.select">
              <Option v-for="(item,index) in aPersonTYpe" :key="index" :value="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="5">
          <FormItem label="账号状态：">
            <Select v-model="searchForm.select">
              <Option v-for="(item,index) in aAccountStatus" :key="index" :value="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="4">
          <Row type="flex" justify="center" align="middle">
            <Button type="primary">查询</Button>
            <Button type="text">重置</Button>
          </Row>
          </Col>
        </Row>
      </Form>
    </Row>
    <Row class="line"></Row>
    <Row type="flex" class="mrb-15" justify="space-between">
      <Dropdown @on-click="toAdd">
        <Button>
          <Icon type="md-add" />
          新增用户
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="1">新增学生</DropdownItem>
          <DropdownItem name="2">新增教职工</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <ButtonGroup>
        <Button @click="deleteBtn" size="large">
          <Row class="h-center">
            <Icon size="18" type="ios-trash" />删除
          </Row>
        </Button>
        <Button size="large">
          <Row class="h-center">
            <Icon size="18" type="md-exit" />导出
          </Row>
        </Button>
        <Button size="large">
          <Row class="h-center">
            <Icon size="18" type="md-time" />设置状态
          </Row>
        </Button>
        <Button size="large">
          <Row class="h-center">
            <Icon size="18" type="md-refresh" />重设密码
          </Row>
        </Button>
      </ButtonGroup>
    </Row>
    <Row>
      <Table border ref="selection" :columns="columns4" :data="aRealTableData"></Table>
    </Row>
    <Modal v-model="modal" width="450" title="请选择批量删除的对象">
      <RadioGroup v-model="setValue" vertical>
        <Radio label="apple">
          勾选对象
        </Radio>
        <Radio label="android">
          全部查询结果
        </Radio>
      </RadioGroup>
      <div slot="footer">
        <ButtonGroup>
          <Button type="primary">确定</Button>
          <Button>取消</Button>
        </ButtonGroup>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      setValue: "",
      modal: false,
      aPersonTYpe: [
        //人员类型
        {
          value: 1,
          label: "教职工（正式）"
        },
        {
          value: 2,
          label: "教职工（外聘）"
        },
        {
          value: 3,
          label: "学生（新生）"
        },
        {
          value: 4,
          label: "学生（在校）"
        },
        {
          value: 5,
          label: "学生（校友）"
        }
      ],
      aAccountStatus: [
        //账号状态
        {
          value: 1,
          label: "正常"
        },
        {
          value: 2,
          label: "冻结"
        },
        {
          value: 3,
          label: "停用"
        }
      ],
      columns4: [
        {
          type: "selection",
          width: 50,
          align: "center"
        },
        {
          title: "用户名",
          key: "name"
        },
        {
          title: "姓名",
          key: "age"
        },
        {
          title: "性别",
          key: "address"
        },
        {
          title: "人员",
          key: "address"
        },
        {
          title: "人员类型",
          key: "address"
        },
        {
          title: "所属部门/院系",
          key: "address"
        },
        {
          title: "手机号",
          key: "address"
        },
        {
          title: "账号状态",
          key: "status",
          render: (h, params) => {
            let row = params.row;
            let status = row.status;
            let tag = "正常";
            if (status == 1) {
              tag = "冻结";
            }
            if (status == 2) {
              tag = "停用";
            }
            return h("div", tag);
          }
        },
        {
          fixed: "right",
          title: "操作",
          align: "center",
          width: 130,
          render: (h, params) => {
            let userInfo = params.row;
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer"
                }
              },
              [
                h(
                  "div",
                  {
                    style: {
                      color: "#2D8CF0"
                    },
                    class: "hasSplit"
                  },
                  "编辑"
                ),
                h(
                  "div",
                  {
                    style: {
                      color: "#2D8CF0"
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          name: "user-info-detail"
                          // params:{name:}
                        });
                        this.setUserInfo(userInfo);
                      }
                    }
                  },
                  "查看详情"
                )
              ]
            );
          }
        }
      ],
      aTableData: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03",
          status: 0
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          status: 1
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          status: 2
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          status: 0
        }
      ],
      searchForm: {
        value: "",
        select: ""
      }
    };
  },
  computed: {
    currentWeather() {
      return this.$store.state.WEATHER;
    },
    aRealTableData() {
      this.aTableData.forEach(item => {
        this.$set(item, "cellClassName", {
          status: `table-status-${item.status}`
        });
      });
      return this.aTableData;
    }
  },
  methods: {
    deleteBtn() {
      this.modal = true;
    },
    toAdd(name) {
      this.$router.push({
        name: "add-user",
        params: { name }
      });
    },
    ...mapActions({
      switchLang: "DEMO_FRESH_WEATHER"
    }),
    ...mapMutations({
      setUserInfo: "SET_USERINFO_DETAIL"
    }),
    test() {
      this.bigger = !this.bigger;
    }
  },
  components: {}
};
</script>
 <style lang="stylus">
 .ivu-table
   .table-status-1
     background #f6d9d0
   .table-status-2
     background #e9eaec
 .big-label
   .ivu-form-item-label
     width 100px !important
   .ivu-form-item-content
     margin-left 100px !important
 .title-bar
   font-size 16px
   color #464C5B
   font-weight 600
   &>a
     font-weight 400
     font-style normal
     color #2D8CF0
     font-size 13px
     margin-left 10px
</style>
