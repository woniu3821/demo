<template>
  <div>
    <div class="title-bar">
      查看用户信息<a href="">查看用户管理（旧版）</a>
    </div>
    <Row class="mrt-20">
      <Form :model="searchForm" ref="searchForm" :label-width="75" label-position="right">
        <Row :gutter="15">
          <Col span="10">
          <FormItem label="搜索用户：">
            <Input v-model="searchForm.searchContent" placeholder="搜索用户名、姓名、手机号"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="15">
          <Col span="5">
          <FormItem class="big-label" label="所属部门/院系：">
            <Select v-model="searchForm.level">
              <Option v-for="(item,index) in deptList" :key="index" value="item">New York</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="5">
          <FormItem label="专业：">
            <Select v-model="searchForm.major">
            <Option v-for="(item,index) in majorList" :key="index" value="item">New York</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="5">
          <FormItem label="人员类型：">
            <Select v-model="searchForm.userType">
              <Option v-for="(item,index) in typeList" :key="index" :value="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="5">
          <FormItem label="账号状态：">
            <Select v-model="searchForm.userStatus">
              <Option v-for="(item,index) in statusList" :key="index" :value="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="4">
          <Row type="flex" justify="center" align="middle">
            <Button class="btn-r" @click="searchUserInfo" type="primary">查询</Button>
            <Button type="text" @click="resetForm">重置</Button>
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
        <Button @click="handelerBtn(1)" size="large">
          <Row class="h-center">
            <Icon size="18" type="ios-trash" />删除
          </Row>
        </Button>
        <Button @click="handelerBtn(2)" size="large">
          <Row class="h-center">
            <Icon size="18" type="md-exit" />导出
          </Row>
        </Button>
        <Button @click="handelerBtn(3)" size="large">
          <Row class="h-center">
            <Icon size="18" type="md-time" />设置状态
          </Row>
        </Button>
        <Button @click="handelerBtn(4)" size="large">
          <Row class="h-center">
            <Icon size="18" type="md-refresh" />重设密码
          </Row>
        </Button>
      </ButtonGroup>
    </Row>
    <Row>
      <Table @on-selection-change="selectList" border :columns="columns4" :data="aRealTableData"></Table>
    </Row>
    <Page v-if="pageInfo.total>0" class="mrt-20" show-total :total="pageInfo.total" :page-size="pageInfo.pageSize" show-elevator show-sizer @on-change="pageNumChange"  @on-page-size-change="pageSizeChange"/>
    <Modal @on-visible-change="modalChange" v-model="modal" width="450" :title="`请选择批量${title}的对象`">
      <RadioGroup v-model="setRadio" vertical>
        <Radio label="1">
          勾选对象
        </Radio>
        <Radio label="2">
          全部查询结果
        </Radio>
      </RadioGroup>
      <div slot="footer">
        <ButtonGroup>
          <Button @click="handelBtn" type="primary">确定</Button>
          <Button @click="modal=false">取消</Button>
        </ButtonGroup>
      </div>
    </Modal>
    <Modal @on-visible-change="modal1Change" v-model="modal1" width="400" title="设置状态">
      <RadioGroup v-model="setStatusRadio">
        <Radio label="1">
          正常
        </Radio>
        <Radio label="2">
          冻结
        </Radio>
        <Radio label="3">
          停用
        </Radio>
      </RadioGroup>
      <Form v-if="setStatusRadio==2" class="mrt-20" ref="formTime" :model="formTime" label-position="top">
        <FormItem required label="冻结时长" >
          <Row :gutter="20">
            <Col :span="8">
               <Input style="width:60%" v-model.trim.number="formTime.day" placeholder=""></Input> 天
            </Col>
            <Col :span="8">
               <Input style="width:60%" v-model.trim.number="formTime.hour" placeholder=""></Input> 小时
            </Col>
            <Col :span="8">
               <Input style="width:60%" v-model.trim.number="formTime.minute" placeholder=""></Input> 分钟
            </Col>
          </Row>
        </FormItem>
      </Form>
      <p v-if="setStatusRadio!=1" :style="setStatusRadio==3?'margin-top:20px':''" class="admininfo"> 注意：admin用户将不会被冻结</p>
      <div slot="footer">
        <ButtonGroup>
          <Button @click="setStatus" type="primary">确定</Button>
          <Button @click="modal1=false">取消</Button>
        </ButtonGroup>
      </div>
    </Modal>
    <Modal @on-visible-change="modal2Change" v-model="modal2" width="500" title="重设密码">
       <Alert type="warning" show-icon>管理员密码不会被重置</Alert>
      <Form class="mrt-20" :label-width="80" ref="formPass" :model="formPass" >
         <FormItem required label="密码策略" >
            <RadioGroup v-model="setPassRadio">
              <Radio label="1">
                固定值
              </Radio>
              <Radio label="2">
                身份证后六位
              </Radio>
            </RadioGroup>
        </FormItem>
        <FormItem required prop="pass" label="固定值" >
            <Input  v-model.trim="formPass.pass" :placeholder="setPassRadio==1?'请输入固定值密码':'身份证号码为空的账户密码，将会重置为此固定值'"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <ButtonGroup>
          <Button @click="setPass" type="primary">确定</Button>
          <Button @click="modal2=false">取消</Button>
        </ButtonGroup>
      </div>
    </Modal>
    <Modal @on-visible-change="modal3Change" v-model="modal3" width="450" title="确认删除">
      <Row type="flex" align="bottom">
        <Col offset="2" span="4">
          <Icon size="50" color="#ff9900" type="md-alert" />
        </Col>
        <Col span="18">
          您确认删除指定用户吗？<br>
          租户管理员和已激活用户不会被删除
        </Col> 
      </Row>
      <div slot="footer">
        <ButtonGroup>
          <Button @click="delBtn" type="error">确定</Button>
          <Button @click="modal3=false">取消</Button>
        </ButtonGroup>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { pageMixins, listMixins } from "@/utils/mixins.js";
export default {
  mixins: [pageMixins, listMixins],
  data() {
    return {
      searchForm: {
        searchContent: "", //用户名、姓名、手机号
        major: "", //专业
        userType: "", //人员类型
        level: 0, //层级； 对于学生类型该字段必填，用于区分是 1.学院 、2.专业、 还是3. 班级，对于老师类型可以不传；根节点 南京理工大学层级为0
        userStatus: "" //账号状态
      },
      formTime: {
        day: 0,
        hour: 0,
        minute: 0
      },
      formPass: {
        pass: ""
      },
      modal1: false,
      modal2: false,
      modal3: false,
      btnTag: 1, //操作标识
      tableSelectList: [], //选中的表格数据
      setRadio: "1",
      setStatusRadio: "1",
      setPassRadio: "1",
      title: "删除",
      modal: false,
      columns4: [
        {
          type: "selection",
          width: 50,
          align: "center"
        },
        {
          title: "用户名",
          key: "userId"
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "性别",
          key: "sexId_DISPLAY"
        },
        {
          title: "人员类型",
          render: (h, params) => {
            let type = params.row.userType == 1 ? "学生" : "教职工";

            return h("div", `${type}(${status})`);
          }
        },
        {
          title: "所属部门/院系",
          key: "deptId_DISPLAY"
        },
        {
          title: "手机号",
          key: "mobilePhone"
        },
        {
          title: "账号状态",
          key: "userStatus_DISPLAY"
          // render: (h, params) => {
          //   let status = params.row.userStatus_DISPLAY;
          //   let tag = "正常";
          //   if (status == 1) {
          //     tag = "冻结";
          //   }
          //   if (status == 2) {
          //     tag = "停用";
          //   }
          //   return h("div", tag);
          // }
        },
        {
          fixed: "right",
          title: "操作",
          align: "center",
          width: 130,
          render: (h, params) => {
            let userInfo = params.row;
            let userType = params.row.userType;
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
                    class: "hasSplit",
                    on: {
                      click: () => {
                        this.$router.push({
                          name: "add-user",
                          params: { tag: "编辑用户", userType }
                        });
                        this.setUserInfo(userInfo);
                      }
                    }
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
                          name: "user-info-detail",
                          params: { userType }
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
      params: {},
      aTableData: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03",
          userType: 1,
          userStatus_DISPLAY: "正常"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          userType: 1,
          userStatus_DISPLAY: "冻结"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          userStatus_DISPLAY: "停用",
          userType: 2
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          userStatus_DISPLAY: "停用",
          userType: 2
        }
      ]
    };
  },
  watch: {
    btnTag: function(now) {
      switch (now) {
        case 1:
          this.title = "删除";
          break;
        case 2:
          this.title = "导出";
          break;
        case 3:
          this.title = "设置状态";
          break;
        case 4:
          this.title = "重设密码";
          break;
        default:
          break;
      }
    }
  },
  computed: {
    currentWeather() {
      return this.$store.state.WEATHER;
    },
    aRealTableData() {
      this.aTableData.forEach(item => {
        let status = 0;
        if (item.userStatus_DISPLAY == "冻结") {
          status = 1;
        } else if (item.userStatus_DISPLAY == "停用") {
          status = 2;
        }
        this.$set(item, "cellClassName", {
          userStatus_DISPLAY: `table-status-${status}`
        });
      });
      return this.aTableData;
    }
  },
  methods: {
    delBtn() {
      this.delUser();
    },
    setPass() {
      this.setUserPasswd();
    },
    setStatus() {
      if (this.setStatusRadio == 2) {
        if (
          this.formTime.day < 1 &&
          this.formTime.hour < 1 &&
          this.formTime.minute < 1
        ) {
          this.showMsg({
            type: "error",
            content: "请输入有效的冻结时长"
          });
          return;
        }
      }
      this.setUserStatus();
    },
    modalChange() {
      this.setRadio = "1";
    },
    modal1Change(value) {
      //冻结时间弹窗
      if (!value) {
        this.setStatusRadio = "1";
        this.$refs["formTime"].resetFields();
      }
    },
    modal2Change(value) {
      //设置密码弹窗
      if (!value) {
        this.setPassRadio = "1";
        this.$refs["formPass"].resetFields();
      }
    },
    modal3Change() {
      //删除弹窗
    },
    selectList(list) {
      // 选择的数据
      this.tableSelectList = list;
    },
    pageNumChange(num) {
      this.params.pageNumber = num;
      this.getUser();
    },
    pageSizeChange(size) {
      this.params.pageSize = size;
      this.getUser();
    },
    searchUserInfo() {
      //条件搜索
      this.pageInfo.pageNumber = 1;
      this.getUser();
    },
    resetForm() {
      //重置搜索
      this.$refs["searchForm"].resetFields();
      this.getUser();
    },
    getUser() {
      this.getUserInfo({ ...this.pageInfo, ...this.searchForm })
        .then
        // res => {}
        ();
    },
    handelBtn() {
      // 确认操作
      if (this.setRadio == 1) {
        if (this.tableSelectList.length == 0) {
          this.showMsg({
            type: "error",
            content: "请选择至少一条数据项"
          });
        } else {
          this.handelerToBtn();
        }
      } else {
        if (this.aTableData.length == 0) {
          this.showMsg({
            type: "error",
            content: "当前查询条件结果为空！"
          });
        } else {
          this.handelerToBtn();
        }
      }
    },
    handelerBtn(tag) {
      this.btnTag = tag;
      this.modal = true;
    },
    handelerToBtn() {
      //匹配对应请求
      switch (this.btnTag) {
        case 1:
          this.modal = false;
          this.modal3 = true;

          break;
        case 2:
          this.exportUser();
          break;
        case 3:
          this.modal = false;
          this.modal1 = true;
          break;
        case 4:
          this.modal = false;
          this.modal2 = true;
          break;
        default:
          break;
      }
    },
    toAdd(userType) {
      this.$router.push({
        name: "add-user",
        params: { tag: "新增用户", userType }
      });
    },
    ...mapActions([
      "getUserInfo",
      "showMsg",
      "delUser",
      "exportUser",
      "setUserStatus",
      "setUserPasswd"
    ]),
    ...mapMutations({
      setUserInfo: "SET_USERINFO_DETAIL"
    })
  },
  created() {
    this.getUser();
  }
};
</script>
 <style lang="stylus">
 .admininfo
   color #FF9900
   font-size 12px
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
