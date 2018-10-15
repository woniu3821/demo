<template>
  <div>
    <div class="title-bar">
    {{$route.params.tag}}（{{userTypeName}}）
    </div>
    <Row>
      <Col span="10">
      <Form :model="formItem" :label-width="100" ref="formItem" :rules="ruleInline">
        <title-bar title="基本信息"></title-bar>
        <FormItem label="用户名" prop="userId">
          <Input v-model="formItem.userId" :placeholder="type==2?'请输入教职工工号':'请输入学生学号（新生可输入考生号）'"></Input>
        </FormItem>
        <FormItem label="姓名" prop="name">
          <Input v-model="formItem.name" placeholder="姓名，1~20个汉字"></Input>
        </FormItem>
        <FormItem label="性别" prop="sexId">
          <RadioGroup v-model="formItem.sexId">
            <Radio v-for="(item,index) in sexList" :key="index" :label="item.id" >{{item.name}}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="人员类型" prop="stuTypeId">
          <Select v-model="formItem.stuTypeId" placeholder="请选择人员类型" filterable>
           <Option v-for="(item,index) in typeList" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem v-show="type==1" prop="stuCategoryIdName" label="培养层次">
          <Select v-model="formItem.stuCategoryIdName" placeholder="请选择培养层次" filterable>
            <Option v-for="(item,index) in stuCategoryList" :key="index" :value="`${item.id},${item.name}`">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="所属部门/院系" prop="deptId">
          <Select v-model="formItem.deptId" @on-change="changeDeptId" placeholder="请选择所属部门/院系" filterable>
           <Option v-for="(item,index) in deptList" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem v-show="type==1" prop="majorId" label="专业" >
          <Select v-model="formItem.majorId"  @on-change="changeMajorId" placeholder="请选择专业" filterable>
             <Option v-for="(item,index) in majorList" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem v-show="type==1" prop="classId" label="班级" >
          <Select v-model="formItem.classId" placeholder="请选择班级" filterable>
            <Option v-for="(item,index) in classList" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem v-show="type==1" prop="grade" label="入学年份">
          <DatePicker format="yyyy" @on-change="dataChange" type="year" :value="formItem.grade" style="width:100%"  placeholder="请选择入学年份"></DatePicker>
        </FormItem>
        <FormItem v-show="type==2" prop="position" label="职务">
          <Input v-model="formItem.position" placeholder="请输入职务"></Input>
        </FormItem>
        <FormItem v-show="type==1" prop="ksh" label="考生号">
          <Input v-model="formItem.ksh" placeholder="请输入考生号"></Input>
        </FormItem>
        <FormItem label="证件号码"  prop="idNum">
          <Input v-model="formItem.idNum" placeholder="请输入证件号码"></Input>
        </FormItem>
        <title-bar title="账号信息"></title-bar>
        <FormItem label="账号状态">
          正常
        </FormItem>
        <FormItem label="手机号" prop="mobilePhone">
          <Input v-model.number="formItem.mobilePhone" placeholder="请输入手机号"></Input>
        </FormItem>
        <FormItem v-show="type==2" prop='telePhone' label="座机">
          <Input v-model="formItem.telePhone" placeholder="请输入座机号码"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="formItem.email" type="email" placeholder="请输入邮箱"></Input>
        </FormItem>
        <FormItem v-show="type==2" prop="officeAddr" label="办公地点">
          <Input v-model="formItem.officeAddr" placeholder="请输入办公地点"></Input>
        </FormItem>
      </Form>
      </Col>
    </Row>
    <Row class="line"></Row>
    <Row>
      <Button size="large" class="btn-r" @click="addUser" type="primary">确认</Button>
      <Button size="large" @click="cancelBtn">取消</Button>
    </Row>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
// import { listMixins } from "@/utils/mixins.js";
export default {
  name: "add-user",
  // mixins: [listMixins],
  data() {
    return {
      majorList: [], //专业
      deptList: [], //部门/学院
      typeList: [], //人员类型
      classList: [], //班级
      stuCategoryList: [], //培养层次
      sexList: [], //性别
      type: this.$route.params.userType,
      formItem: {
        wid: "",
        userWid: "",
        userId: "",
        name: "",
        sexId_DISPLAY: "",
        sexId: "1",
        stuCategoryId_DISPLAY: "",
        stuCategoryId: "",
        stuCategoryIdName: "",
        grade: "", //入学年份
        stuTypeId: "",
        stuTypeId_DISPLAY: "", //学生类型
        majorId: "", //专业
        majorId_DISPLAY: "",
        classCode: "",
        classId: "",
        classId_DISPLAY: "", //班级
        teacherTypeId_DISPLAY: "",
        teacherTypeId: "",
        deptId: "", //所属部门/院系
        deptId_DISPLAY: "",
        ksh: "", //考生号
        deptCode: "",
        fullDeptName: "",
        fullDeptCode: "",
        position: "",
        passWord: "",
        mobilePhone: "",
        telePhone: "",
        email: "",
        officeAddr: "",
        idNum: "",
        fullDeptWids: "",
        type: this.$route.params.userType
      }
    };
  },
  props: {},
  watch: {
    // $route: function(to, form) {
    //   this.type = to.params.userType;
    // },
    "formItem.stuTypeId": {
      handler: function(now) {
        this.formItem.teacherTypeId = now;
      },
      immediate: true
    },
    "formItem.majorId": {
      handler: function(now) {}
    },
    "formItem.stuCategoryIdName": function(now) {
      if (now) {
        let name = now.split(",");
        this.formItem.stuCategoryId = name[0];
        this.formItem.stuCategoryId_DISPLAY = name[1];
      }
    }
  },
  computed: {
    ...mapGetters(["userTypeName"]),
    ...mapState(["userDetail"]),
    ruleInline() {
      return {
        userId: [
          {
            required: true,
            message:
              this.type == 1
                ? "请输入学生学号（新生可输入考生号）"
                : "请输入教职工工号",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入姓名（1~40个字符）",
            trigger: "blur"
          },
          {
            type: "string",
            message: "姓名不能超过40个字符",
            trigger: "blur",
            max: 40
          }
        ],
        sexId: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change"
          }
        ],
        stuTypeId: [
          {
            required: true,
            message: "请选择人员类型",
            trigger: "change"
          }
        ],
        stuCategoryIdName: [
          {
            required: this.type == 1,
            message: "请选择培养层次",
            trigger: "change"
          }
        ],
        deptId: [
          {
            required: true,
            message: this.type == 1 ? "请选择院系" : "请选择部门",
            trigger: "change"
          }
        ],
        majorId: [
          {
            required: this.type == 1,
            message: "请选择专业",
            trigger: "change"
          }
        ],
        classId: [
          {
            required: this.type == 1,
            message: "请选择班级",
            trigger: "change"
          }
        ],
        grade: [
          {
            required: this.type == 1,
            message: "请选择入学年份",
            trigger: "change"
          }
        ],
        ksh: [
          {
            required: this.formItem.stuTypeId == 1,
            message: "请输入考生号",
            trigger: "blur"
          },
          {
            message: "请输入正确的考生号",
            trigger: "blur",
            pattern: /^\d{1,80}$/
          }
        ],
        email: [
          { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" }
        ],
        mobilePhone: [
          {
            message: "请输入正确的手机号",
            trigger: "blur",
            pattern: /^1[3456789]\d{9}$/
          }
        ],
        telePhone: [
          {
            message: "请输入正确的座机",
            trigger: "blur",
            pattern: /^\d{5,12}$/
          }
        ]
      };
    }
  },
  methods: {
    ...mapActions([
      "ADD_USER",
      "showMsg",
      "GET_STU_CATEGORY",
      "GET_USER_MAJOR_OLD",
      "GET_USER_DEPT_OLD",
      "GET_USER_STU",
      "GET_CLASS_LIST",
      "GET_USER_DEPT_TEACH",
      "GET_USER_TEACH",
      "GET_USER_SEX"
    ]),
    cancelBtn() {
      this.$Modal.confirm({
        title: "取消",
        content: "刚刚进行的操作将不生效，确认取消吗？",
        onOk: () => {
          this.$router.push("/viewUserInfo");
        }
      });
    },
    changeDeptId(now) {
      if (this.type == 2) {
        return;
      }
      this.formItem.majorId = "";
      this.formItem.classId = "";
      let value = now || "";
      this.getMajorList(value);
    },
    getMajorList(value) {
      let obj = {
        searchValue: JSON.stringify([
          { name: "deptId", value: value, builder: "equal", linkOpt: "AND" }
        ])
      };
      this.GET_USER_MAJOR_OLD(obj)
        .then(res => {
          this.majorList = res.datas.rows;
          if (this.$route.params.tag == "编辑用户" && this.userDetail.majorId) {
            this.getClassList(this.userDetail.majorId);
          }
        })
        .catch(err => {
          this.showMsg({
            type: "error",
            content: err
          });
        });
    },
    changeMajorId(value) {
      this.formItem.classId = "";
      this.getClassList(value);
    },
    getClassList(now) {
      let value = now || "";
      let obj = {
        searchValue: JSON.stringify([
          { name: "majorId", value: value, builder: "equal", linkOpt: "AND" }
        ])
      };
      this.GET_CLASS_LIST(obj)
        .then(res => {
          this.classList = res.datas.rows;
        })
        .catch(err => {
          this.showMsg({
            type: "error",
            content: err || "获取班级列表失败！"
          });
        });
    },
    dataChange(data) {
      this.formItem.grade = data;
    },
    addUser() {
      // 新增用户
      this.$refs.formItem.validate(validate => {
        if (validate) {
          this.ADD_USER(this.formItem)
            .then(res => {
              this.showMsg({
                content:
                  this.$route.params.tag == "编辑用户"
                    ? "成功编辑用户！"
                    : "成功新增用户"
              });
              this.$router.push("/viewUserInfo");
            })
            .catch(err => {
              this.showMsg({
                type: "error",
                content:
                  err ||
                  (this.$route.params.tag == "编辑用户"
                    ? "编辑用户失败！"
                    : "新增用户失败！")
              });
            });
        }
      });
    }
  },
  mounted() {
    if (this.$route.params.tag == "编辑用户") {
      this.formItem = Object.assign({}, this.formItem, this.userDetail);
      this.formItem.stuCategoryIdName = `${this.userDetail.stuCategoryId},${
        this.userDetail.stuCategoryId_DISPLAY
      }`;
    }
  },
  created() {
    this.GET_STU_CATEGORY()
      .then(res => {
        this.stuCategoryList = res.datas.rows;
      })
      .catch(err => {
        this.showMsg({
          type: "error",
          content: err || "获取培养层次失败！"
        });
      });
    this.GET_USER_SEX()
      .then(res => {
        this.sexList = res.datas.rows;
      })
      .catch(err => {
        this.showMsg({
          type: "error",
          content: err || "获取性别失败！"
        });
      });

    if (this.type == 1) {
      this.GET_USER_STU()
        .then(res => {
          this.typeList = res.datas.rows;
        })
        .catch(err => {
          this.showMsg({
            type: "error",
            content: err || "获取学生类型失败！"
          });
        });
      this.GET_USER_DEPT_OLD()
        .then(res => {
          this.deptList = res.datas.rows;
          if (this.$route.params.tag == "编辑用户") {
            this.getMajorList(this.userDetail.deptId);
          }
        })
        .catch(err => {
          this.showMsg({
            type: "error",
            content: err || "获取院系失败！"
          });
        });
    } else {
      this.GET_USER_TEACH()
        .then(res => {
          //获取老师类型
          this.typeList = res.datas.rows;
        })
        .catch(err => {
          this.showMsg({
            type: "error",
            content: err || "获取老师类型失败！"
          });
        });
      this.GET_USER_DEPT_TEACH()
        .then(res => {
          //获取老师部门
          this.deptList = res.datas.rows;
        })
        .catch(err => {
          this.showMsg({
            type: "error",
            content: err || "获取老师部门失败！"
          });
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>
