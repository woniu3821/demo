<template>
  <div>
    <div class="title-bar">
      用户详情
    </div>
    <Row>
      <title-bar title="基本信息"></title-bar>
      <table border="0" cellspacing="1" cellpadding="0" class="thin">
        <tr>
          <th class="th">用户名</th>
          <td>{{userDetail.userId}}</td>
          <th class="th">姓名</th>
          <td>{{userDetail.name}}</td>
          <th class="th">性别</th>
          <td>{{userDetail.sexId_DISPLAY}}</td>
        </tr>
        <tr>
          <th class="th">人员类型</th>
          <td>{{userDetail.userTypeId_DISPLAY}}</td>
          <th class="th">{{type==1?'培养层次':'所属部门/院系'}}</th>
          <td>{{type==2?userDetail.deptId_DISPLAY:userDetail.stuCategoryId_DISPLAY}}</td>
          <th class="th">{{type==2?'职务':''}}</th>
          <td >{{type==2?userDetail.position:''}}</td>
        </tr>
        <tr v-if="type==1">
          <th class="th">所属部门/院系</th>
          <td>{{userDetail.deptId_DISPLAY}}</td>
          <th class="th">专业</th>
          <td>{{userDetail.majorId_DISPLAY}}</td>
          <th class="th">班级</th>
          <td>{{userDetail.classId_DISPLAY}}</td>
        </tr>
        <tr v-if="type==2">
          <th class="th">证件号码</th>
          <td>{{userDetail.idNum}}</td>
          <th class="th"></th>
          <td></td>
          <th class="th"></th>
          <td></td>
        </tr>
        <tr v-if="type==1">
          <th class="th">入学年份</th>
          <td>{{userDetail.grade}}</td>
          <th class="th">考生号</th>
          <td>{{userDetail.ksh}}</td>
          <th class="th">证件号码</th>
          <td>{{userDetail.idNum}}</td>
        </tr>
      </table>
      <title-bar title="账号信息"></title-bar>
      <table border="0" cellspacing="1" cellpadding="0" class="thin">
        <tr>
          <th class="th">账号状态</th>
          <td>{{userDetail.userStatus_DISPLAY}}</td>
          <th class="th">手机号</th>
         
          <td>{{userDetail.mobilePhone}}</td>
           <template v-if="type==2">
          <th class="th">座机</th>
          <td>{{userDetail.telePhone}}</td>
          </template>
          <template v-else>
            <th class="th">邮箱</th>
            <td>{{userDetail.email}}</td>
          </template>
        </tr>
        <tr v-if="type==2">
          <th class="th">邮箱</th>
          <td>{{userDetail.email}}</td>
          <th class="th">办公地点</th>
          <td>{{userDetail.officeAddr}}</td>
          <th class="th"></th>
          <td></td>
        </tr>
      </table>
    </Row>
    <Row class="fixb">
        <Button size="large" :to="{name: 'add-user',params: { tag: '编辑用户', userType:type }}" class="btn-r" type="primary">编辑</Button>
        <Button size="large" @click="modal2=true">重设密码</Button>
    </Row>
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
        <FormItem prop="mobile"  label="手机号">
          <Input v-model.trim="formPass.mobilePhone" placeholder="请输入手机号"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <ButtonGroup>
          <Button @click="setPass" type="primary">确定</Button>
          <Button @click="modal2=false">取消</Button>
        </ButtonGroup>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      modal2: false,
      formPass: {
        passwdModiMethod: "1",
        adminPassWd: "",
        newPassWd: "",
        mobilePhone: ""
      },
      type: this.$route.params.userType //1 学生 2教职工
    };
  },
  computed: {
    // ...mapState(["userDetail"]),
    ...mapGetters(["userDetail"])
  },
  watch: {
    "userDetail.mobilePhone": function(now) {
      this.formPass.mobilePhone = now;
    }
  },
  methods: {
    setPass() {},
    modal2Change() {},
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
   td, .th
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
   .th
     background #f8f8f8
     width 120px
 .fixb
   position absolute !important
   bottom 20px
</style>
