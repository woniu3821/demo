<template>
  <div>
    <div class="title-bar">
    {{$route.params.tag}}（{{userTypeName}}）
    </div>
    <Row>
      <Col span="10">
      <Form :model="formItem" :label-width="90">
        <title-bar title="基本信息"></title-bar>
        <FormItem label="用户名">
          <Input v-model="formItem.input" placeholder="请输入教职工工号"></Input>
        </FormItem>
        <FormItem label="姓名">
          <Input v-model="formItem.input" placeholder="姓名，1~20个汉字"></Input>
        </FormItem>
        <FormItem label="性别">
          <RadioGroup v-model="formItem.radio">
            <Radio label="male">男</Radio>
            <Radio label="female">女</Radio>
            <Radio label="female">未知</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="人员类型">
          <Select v-model="formItem.select" placeholder="请选择人员类型">
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
        <FormItem label="所属部门/院系">
          <Select v-model="formItem.select" placeholder="请选择所属部门/院系">
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
        <FormItem v-if="type==2" label="职务">
          <Input v-model="formItem.input" placeholder="请输入职务"></Input>
        </FormItem>
        <FormItem v-if="type==1" label="考生号">
          <Input v-model="formItem.input" placeholder="请输入考生号"></Input>
        </FormItem>
        <FormItem label="证件号码">
          <Input v-model="formItem.input" placeholder="请输入证件号码"></Input>
        </FormItem>
        <title-bar title="账号信息"></title-bar>
        <FormItem label="账号状态">
          正常
        </FormItem>
        <FormItem label="手机号">
          <Input v-model.number="formItem.mobile" placeholder="请输入手机号"></Input>
        </FormItem>
        <FormItem v-if="type==2" label="座机">
          <Input v-model="formItem.input" placeholder="请输入座机号码"></Input>
        </FormItem>
        <FormItem label="邮箱">
          <Input v-model="formItem.input" type="email" placeholder="请输入邮箱"></Input>
        </FormItem>
        <FormItem v-if="type==2" label="办公地点">
          <Input v-model="formItem.input" placeholder="请输入办公地点"></Input>
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
        input: "",
        select: "",
        radio: "male",
        mobile: ""
      }
    };
  },
  props: {},
  computed: {
    ...mapGetters(["userTypeName"]),
    ...mapState(["userDetail"])
  },
  mounted() {
    console.log(this.$route);
    console.log(this.userDetail);
  }
};
</script>

<style lang="stylus" scoped>
</style>
