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
          <Input v-model="formItem.userId" :placeholder="type==1?'请输入教职工工号':'请输入学生学号（新生可输入考生号）'"></Input>
        </FormItem>
        <FormItem label="姓名" prop="name">
          <Input v-model="formItem.name" placeholder="姓名，1~20个汉字"></Input>
        </FormItem>
        <FormItem label="性别" prop="sexId">
          <RadioGroup v-model="formItem.sexId">
            <Radio label="1">男</Radio>
            <Radio label="2">女</Radio>
            <Radio label="0">未知</Radio>
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
          <Select v-model="formItem.deptId" placeholder="请选择所属部门/院系" filterable>
           <Option v-for="(item,index) in deptList" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem v-show="type==1" prop="majorId" label="专业" filterable>
          <Select v-model="formItem.majorId" placeholder="请选择专业">
             <Option v-for="(item,index) in majorList" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem v-show="type==1" prop="classId" label="班级" filterable>
          <Select v-model="formItem.classId" placeholder="请选择班级">
            <Option v-for="(item,index) in classList" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem v-show="type==1" prop="grade" label="入学年份">
          <DatePicker format="yyyy" @on-change="dataChange" type="year" v-model="formItem.grade" style="width:100%"  placeholder="请选择入学年份"></DatePicker>
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
      <Button size="large">取消</Button>
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
      type: this.$route.params.userType,
      formItem: {
        wid: "",
        userWid: "",
        userId: "",
        name: "",
        sexId_DISPLAY: "男",
        sexId: "1",
        stuCategoryId_DISPLAY: "",
        stuCategoryId: "",
        stuCategoryIdName: "",
        stuTypeId: "",
        grade: "", //入学年份
        stuTypeId_DISPLAY: "工", //学生类型
        majorId: "", //专业
        majorId_DISPLAY: "",
        classCode: "",
        classId: "",
        classId_DISPLAY: "", //班级
        teacherTypeId_DISPLAY: "",
        teacherTypeId: "",
        deptId_DISPLAY: "",
        deptId: "", //所属部门/院系
        ksh: "", //考生号
        deptCode: "",
        fullDeptName: "",
        fullDeptCode: "",
        position: "123",
        passWord: "",
        mobilePhone: "",
        telePhone: "",
        email: "",
        officeAddr: "",
        idNum: "",
        fullDeptWids: ""
      }
    };
  },
  props: {},
  watch: {
    // $route: function(to, form) {
    //   this.type = to.params.userType;
    // },
    "formItem.deptId": {
      handler: function(now) {
        this.formItem.majorId = "";
        this.formItem.classId = "";
        let value = now || "";
        let obj = {
          searchValue: JSON.stringify([
            { name: "deptId", value: value, builder: "equal", linkOpt: "AND" }
          ])
        };
        this.GET_USER_MAJOR_OLD(obj)
          .then(res => {
            this.majorList = res.datas.rows;
          })
          .catch(err => {
            this.showMsg({
              content: err
            });
          });
      },
      immediate: true
    },
    "formItem.majorId": {
      handler: function(now) {
        this.formItem.classId = "";
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
              content: err
            });
          });
      },
      immediate: true
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
            message: "请输入姓名（1~20个汉字）",
            trigger: "blur"
          },
          {
            message: "姓名不能超过20个汉字",
            trigger: "blur",
            pattern: /^[\u4e00-\u9fa5]{1,20}$/
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
            required: true,
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
            required: true,
            message: "请选择专业",
            trigger: "change"
          }
        ],
        classId: [
          {
            required: true,
            message: "请选择班级",
            trigger: "change"
          }
        ],
        grade: [
          {
            required: true,
            message: "请选择入学年份",
            trigger: "change"
          }
        ],
        ksh: [
          {
            required: this.formItem.stuTypeId == 1,
            message: "请输入考生号",
            trigger: "change"
          }
        ]
      };
    },
    formItem1() {
      let obj = {
        wid: "",
        userWid: "",
        userId: "123123",
        name: "姓名",
        sexId_DISPLAY: "女",
        sexId: "2",
        grade: "2018",
        stuCategoryId_DISPLAY: "本科生",
        stuCategoryId: "56",
        stuTypeId_DISPLAY: "在校生",
        stuTypeId: "2",
        ksh: "",
        deptId_DISPLAY: "信息工程学院",
        deptId: "1542",
        deptCode: "",
        majorId_DISPLAY: "计算机科学与技术(智能终端应用)",
        majorId: "1771",
        majorCode: "",
        classId_DISPLAY: "行11计算机（智能）",
        classId: "5109",
        classCode: "",
        passWord: "",
        mobilePhone: "13170220239",
        email: "cui@163.com",
        idNum: "342222199312010439"
      };
      // if (this.type == 2) {
      // }
      return obj;
    }
  },
  methods: {
    ...mapActions([
      "ADD_USER_STU",
      "showMsg",
      "GET_STU_CATEGORY",
      "GET_USER_MAJOR_OLD",
      "GET_USER_DEPT_OLD",
      "GET_USER_STU",
      "GET_CLASS_LIST"
    ]),
    dataChange(data) {
      this.formItem.grade = data;
    },
    addUser() {
      // 新增用户
      this.$refs.formItem.validate(validate => {
        if (!validate) {
          return;
        }
      });
      if (this.type == 1) {
        this.ADD_USER_STU(this.formItem)
          .then(res => {
            this.showMsg({
              content: "新增用户成功！"
            });
          })
          .catch(err => {
            this.showMsg({
              type: "error",
              content: err || "新增用户失败！"
            });
          });
      }
    }
  },
  mounted() {
    // console.log(this.$route);
    // console.log(this.userDetail);
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
    this.GET_USER_DEPT_OLD()
      .then(res => {
        this.deptList = res.datas.rows;
      })
      .catch(err => {
        this.showMsg({
          type: "error",
          content: err
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
            content: err
          });
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>
