<template>
  <div>
    <div class="title-bar">
    {{$route.params.tag}}（{{userTypeName}}）
    </div>
    <Row>
      <Col span="10">
      <Form :model="formItem" :label-width="90">
        <title-bar title="基本信息"></title-bar>
        <FormItem label="用户名" prop="userId">
          <Input v-model="formItem.userId" placeholder="请输入教职工工号"></Input>
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
        <FormItem label="人员类型" prop="teacherTypeId">
          <Select v-model="formItem.teacherTypeId" placeholder="请选择人员类型">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem v-if="type==1" label="培养层次">
          <Select v-model="formItem.select" placeholder="请选择培养层次">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="所属部门/院系" prop="deptId">
          <Select v-model="formItem.deptId" placeholder="请选择所属部门/院系">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem v-if="type==1" label="专业">
          <Select v-model="formItem.select" placeholder="请选择专业">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem v-if="type==1" label="班级">
          <Select v-model="formItem.select" placeholder="请选择班级">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem v-if="type==1" label="入学年份">
          <Select v-model="formItem.select" placeholder="请选择入学年份">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem v-if="type==2" prop="position" label="职务">
          <Input v-model="formItem.position" placeholder="请输入职务"></Input>
        </FormItem>
        <FormItem v-if="type==1" label="考生号">
          <Input v-model="formItem.input" placeholder="请输入考生号"></Input>
        </FormItem>
        <FormItem label="证件号码" prop="idNum">
          <Input v-model="formItem.idNum" placeholder="请输入证件号码"></Input>
        </FormItem>
        <title-bar title="账号信息"></title-bar>
        <FormItem label="账号状态">
          正常
        </FormItem>
        <FormItem label="手机号" prop="mobilePhone">
          <Input v-model.number="formItem.mobilePhone" placeholder="请输入手机号"></Input>
        </FormItem>
        <FormItem v-if="type==2" prop='telePhone' label="座机">
          <Input v-model="formItem.telePhone" placeholder="请输入座机号码"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="formItem.email" type="email" placeholder="请输入邮箱"></Input>
        </FormItem>
        <FormItem v-if="type==2" prop="officeAddr" label="办公地点">
          <Input v-model="formItem.officeAddr" placeholder="请输入办公地点"></Input>
        </FormItem>
      </Form>
      </Col>
    </Row>
    <Row class="line"></Row>
    <Row>
      <Button size="large" class="btn-r" type="primary">确认</Button>
      <Button size="large">取消</Button>
    </Row>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "add-user",
  data() {
    return {
      type: this.$route.params.userType,
      formItem: {
        wid: "",
        userWid: "",
        userId: "",
        name: "",
        sexId_DISPLAY: "男",
        sexId: "1",
        teacherTypeId_DISPLAY: "外聘教职工",
        teacherTypeId: "4",
        deptId_DISPLAY: "文学系",
        deptId: "1541",
        deptCode: "",
        fullDeptName: "",
        fullDeptCode: "",
        position: "123",
        passWord: "",
        mobilePhone: "123",
        telePhone: "123",
        email: "123@163.com",
        officeAddr: "123",
        idNum: "123",
        fullDeptWids: "1541"
      }
    };
  },
  props: {},
  computed: {
    ...mapGetters(["userTypeName"]),
    ...mapState(["userDetail"]),
    formItem1() {
      let obj = {
        wid: "",
        userWid: "",
        userId: "1",
        name: "",
        sexId_DISPLAY: "女",
        sexId: "2",
        grade: "2018",
        stuCategoryId_DISPLAY: "研究生",
        stuCategoryId: "58",
        stuTypeId_DISPLAY: "在校生",
        stuTypeId: "2",
        ksh: "",
        deptId_DISPLAY: "食品科学学院",
        deptId: "1594",
        deptCode: "",
        majorId_DISPLAY: "生物科学(生物检疫)",
        majorId: "1769",
        majorCode: "",
        classId_DISPLAY: "行11生物（检疫）",
        classId: "5107",
        classCode: "",
        passWord: "",
        mobilePhone: "131",
        email: "123@qq.com",
        idNum: "123456"
      };
      // if (this.type == 2) {
      // }
      return obj;
    }
  },
  mounted() {
    console.log(this.$route);
    console.log(this.userDetail);
  }
};
</script>

<style lang="stylus" scoped>
</style>
