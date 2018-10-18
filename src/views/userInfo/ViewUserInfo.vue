<template>
  <div class="userInfoBox">
      <Spin size="large" fix v-if="$store.state.loading"></Spin>
      <send-modal></send-modal>
    <div class="title-bar">
      查看用户信息<a href="https://wectest3.wisedu.com/smmp/index.html#!/20000">查看用户管理（旧版）</a>
    </div>
    <Row class="mrt-20">
      <Form @keydown.native.enter.prevent ="keyDownEvent" :model="searchForm" ref="searchForm" :label-width="75" label-position="right">
        <Row :gutter="15">
          <Col span="12">
          <FormItem label="搜索用户：" prop="searchContent">
            <Input v-model="searchForm.searchContent" placeholder="搜索用户名、姓名、手机号"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="10">
          <Col span="6">
          <FormItem :label-width="100" prop="level" label="所属部门/院系：">
            <Select v-model="searchForm.level">
              <Option v-for="(item,index) in deptList" :key="index" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="6">
          <FormItem label="专业：" prop="major">
            <Select v-model="searchForm.major">
              <Option v-for="(item,index) in majorList" :key="index" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="4">
          <FormItem label="人员类型：" prop="userType">
            <Select v-model="searchForm.userType">
              <Option v-for="(item,index) in typeList" :key="index" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="4">
          <FormItem label="账号状态：" prop="userStatus">
            <Select v-model="searchForm.userStatus">
              <Option v-for="(item,index) in statusList" :key="index" :value="item.id">{{item.name}}</Option>
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
    <Page v-if="aRealTableData.length>0" class="mrt-20" show-total :total="pageInfo.totalSize" :page-size="pageInfo.pageSize" show-elevator show-sizer @on-change="pageNumChange" @on-page-size-change="pageSizeChange" />
    <Modal v-model="modal" width="450" :title="`请选择批量${title}的对象`">
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
        <FormItem required label="冻结时长">
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
      <Form class="mrt-20" :label-width="80" ref="formPass"  :model="formPass">
        <FormItem required label="密码策略" prop="passwdModiMethod">
          <RadioGroup v-model="formPass.passwdModiMethod">
            <Radio label="1">
              固定值
            </Radio>
            <Radio label="2">
              身份证后六位
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem prop="newPassWd" :rules="[{required: true, message: '密码不能为空', trigger: 'blur'},{ type: 'string', max: 20, message: '密码不能超过80字符', trigger: 'blur' }]" label="固定值">
          <Input v-model.trim="formPass.newPassWd" :placeholder="formPass.passwdModiMethod==1?'请输入固定值密码':'身份证号码为空的账户密码，将会重置为此固定值'"></Input>
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
import { mapActions, mapMutations, mapGetters } from "vuex";
import { formatDateTime, jsonParse } from "@/utils/utils";
import {
  pageMixins,
  listMixins,
  listMixins2,
  codeMixins
} from "@/utils/mixins.js";
export default {
  mixins: [pageMixins, listMixins, listMixins2, codeMixins],
  data() {
    const _this = this;
    return {
      adminWid: "", //管理员wid
      searchForm: {
        searchContent: "", //用户名、姓名、手机号
        major: "", //专业
        userType: "", //人员类型
        level: "", //层级； 对于学生类型该字段必填，用于区分是 1.学院 、2.专业、 还是3. 班级，对于老师类型可以不传；根节点 南京理工大学层级为0
        userStatus: "" //账号状态
      },
      formTime: {
        day: 0,
        hour: 0,
        minute: 0
      },
      formPass: {
        passwdModiMethod: "1",
        adminPassWd: "",
        newPassWd: ""
      },
      freezeTime: 0, //冻结时长
      modal: false,
      modal1: false, //冻结弹窗
      modal2: false, //重置密码弹窗
      modal3: false,
      btnTag: 1, //操作标识
      tableSelectList: [], //选中的表格数据
      setRadio: "1",
      setStatusRadio: "1",
      title: "删除",
      params: {},
      aTableData: [],
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
          key: "userTypeId_DISPLAY"
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
                        this.checkSecurity()
                          .then(() => {
                            this.$router.push({
                              name: "add-user",
                              params: { tag: "编辑用户", userType }
                            });
                            this.setUserInfo(userInfo);
                          })
                          .catch(err => {
                            throw new Error(err);
                          });
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
                      click: async () => {
                        this.$router.push({
                          name: "user-info-detail",
                          params: {
                            userType,
                            isAdmin: userInfo.wid === this.adminWid
                          }
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
    },
    formTime: {
      handler: function(now) {
        var day = parseInt(now.day * 24 * 60);
        var hour = parseInt(now.hour * 60);
        var min = parseInt(now.minute);
        this.freezeTime = day + hour + min;
      },
      deep: true
    }
  },
  computed: {
    aRealTableData() {
      this.aTableData.forEach(item => {
        let status = 1;
        if (item.userStatus_DISPLAY == "冻结") {
          status = 2;
        } else if (item.userStatus_DISPLAY == "停用") {
          status = 3;
        }
        this.$set(item, "cellClassName", {
          userStatus_DISPLAY: `table-status-${status}`
        });
      });
      return this.aTableData;
    }
  },
  methods: {
    ...mapActions([
      "getUserInfo",
      "showMsg",
      "delUser",
      "exportUser",
      "setUserStatus",
      "setUserPasswd",
      "GET_ADMIN_WID"
    ]),
    keyDownEvent() {},
    ...mapMutations({
      setUserInfo: "SET_USERINFO_DETAIL"
    }),
    delBtn() {
      this.delUser(this.calcTableList())
        .then(res => {
          if (res.code == 0) {
            this.modal3 = false;
            this.showMsg({
              type: "success",
              content: "删除成功！"
            });
            this.getUser();
          } else {
            this.showMsg({
              type: "error",
              content: "删除失败！租户管理员和已激活用户不可被删除"
            });
          }
        })
        .catch(err => {
          this.modal3 = false;
          this.showMsg({
            type: "error",
            content: err || "删除失败！租户管理员和已激活用户不可被删除"
          });
        });
    },
    setPass() {
      this.$refs.formPass.validate(valid => {
        if (!valid) {
          return;
        }
        this.setUserPasswd({
          ...this.calcTableList(),
          ...this.formPass
        })
          .then(res => {
            if (res.code == 0) {
              this.modal2 = false;
              this.showMsg({
                type: "success",
                content: "重置密码成功！"
              });
              this.getUser();
            } else {
              this.showMsg({
                type: "error",
                content: "重置密码失败！管理员密码不会被重置"
              });
            }
          })
          .catch(err => {
            this.modal2 = false;
            this.showMsg({
              type: "error",
              content: err || "重置密码失败！管理员密码不会被重置"
            });
          });
      });
    },
    setStatus() {
      if (this.setStatusRadio == 2) {
        if (this.freezeTime < 1) {
          this.showMsg({
            type: "error",
            content: "请输入有效的冻结时长"
          });
          return;
        }
      }

      this.setUserStatus({
        ...this.calcTableList(),
        userStatus: this.setStatusRadio,
        freezeBeginTime: formatDateTime(),
        freezeTime: this.freezeTime
      })
        .then(res => {
          if (res.code == 0) {
            this.modal1 = false;
            this.showMsg({
              type: "success",
              content: "设置成功"
            });
            this.getUser();
          } else {
            this.showMsg({
              type: "error",
              content: "设置失败"
            });
          }
        })
        .catch(err => {
          this.modal1 = false;
          this.showMsg({
            type: "error",
            content: err || "设置失败"
          });
        });
    },
    modal1Change(value) {
      //冻结时间弹窗
      this.setStatusRadio = "1";
      this.formTime.hour = 0;
      this.formTime.minute = 0;
      this.formTime.day = 0;
      if (!value) {
        this.setRadio = "1";
      }
    },
    modal2Change(value) {
      //设置密码弹窗
      this.formPass.newPassWd = "";
      this.formPass.passwdModiMethod = "1";
      if (!value) {
        this.setRadio = "1";
      }
    },
    modal3Change(value) {
      //删除弹窗
      if (!value) {
        this.setRadio = "1";
      }
    },
    selectList(list) {
      // 选择的数据
      this.tableSelectList = list;
    },
    pageNumChange(num) {
      this.pageInfo.pageNumber = num;
      this.getUser();
    },
    pageSizeChange(size) {
      this.pageInfo.pageSize = size;
      this.getUser();
    },
    searchUserInfo() {
      //条件搜索
      this.pageInfo.pageNumber = 1;
      this.getUser();
    },
    resetForm() {
      //重置搜索
      this.$refs.searchForm.resetFields();
      this.getUser();
    },
    getUser() {
      this.tableSelectList = []; //重置选择的table
      this.getUserInfo({
        pageNumber: this.pageInfo.pageNumber,
        pageSize: this.pageInfo.pageSize,
        ...this.searchForm
      })
        .then(res => {
          if (res.code == 0) {
            this.aTableData = res.datas.rows;
            this.pageInfo.totalSize = res.datas.totalSize;
          } else {
            this.$Message.error({
              content: "获取用户失败",
              duration: 3
            });
          }
        })
        .catch(err => {
          this.$Message.error({
            content: err || "获取用户失败",
            duration: 3
          });
        });
    },
    calcTableList() {
      //计算删除数据
      let userIds = [];
      for (let { userType, wid, userWid, userId } of this.tableSelectList) {
        userIds.push({ userType, wid, userWid, userId });
      }
      let obj = {
        optType: this.setRadio,
        userIds,
        searchCondition: {
          ...this.searchForm
        }
      };
      if (this.setRadio == 1) {
        delete obj.searchCondition;
      } else {
        delete obj.userIds;
      }
      return obj;
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
      this.checkSecurity()
        .then(() => {
          this.btnTag = tag;
          this.modal = true;
        })
        .catch(err => {
          throw new Error(err);
        });
    },
    handelerToBtn() {
      //匹配对应请求
      switch (this.btnTag) {
        case 1:
          this.modal = false;
          this.modal3 = true;
          break;
        case 2:
          window.location.href =
            "wec-user-mngt/userv2/exportUser?searchCondition=" +
            encodeURIComponent(JSON.stringify(this.calcTableList()));
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
      this.checkSecurity()
        .then(() => {
          this.$router.push({
            name: "add-user",
            params: { tag: "新增用户", userType }
          });
        })
        .catch(err => {
          throw new Error(err);
        });
    }
  },
  mounted() {
    // this.$store.watch(function(state,getter){
    // console.log(state,getter)
    // },function(){});
  },
  created() {
    this.getUser();
    this.GET_ADMIN_WID()
      .then(res => {
        this.adminWid = res.datas.id;
      })
      .catch(err => {
        this.showMsg({
          type: "error",
          content: err || "获取管理员wid失败！"
        });
      });
  }
};
</script>
 <style lang="stylus">
 .admininfo
   color #FF9900
   font-size 12px
 .ivu-table
   .table-status-2
     background #f6d9d0
   .table-status-3
     background #e9eaec
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
