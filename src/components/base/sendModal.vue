<template>
    <div>
    <Modal @on-visible-change="modalChange"   v-model="phoneObj.show" width="450" title="重设密码">
      <Alert type="warning" show-icon>验证码验证成功1次后，1h内无需再次输入</Alert>
      <Form class="mrt-20" :label-width="80" ref="formPhone" :model="formPhone">
        <FormItem label="绑定手机号" prop="cellphone">
            <Row type="flex" justify="space-between">
               {{ this.phoneObj.cellPhone}} <div>(不能接收验证码）<a href="javascript:;" @click="toNew">更换绑定手机</a></div>
            </Row>
        </FormItem>
        <FormItem prop="code" :rules="[{required: true, message: '请输入验证码', trigger: 'blur'},{ type: 'string', max: 8, message: '请输入正确验证码', trigger: 'blur' }]" label="验证码">
          <Row type="flex" justify="space-between">
              <Col span="16" >
                   <Input v-model.trim="formPhone.code" placeholder="请输入验证码"></Input>
              </Col>
              <Col span="7" offset="1">
                  <Button :disabled="showTime" @click="getCode" type="primary">
                    <span v-if="!showTime">发送验证码</span>
                    <span v-else> <Time  :time="time3" :interval="1" />重发</span>
                  </Button>
              </Col>
          </Row>
         
        </FormItem>
      </Form>
      <div slot="footer">
        <ButtonGroup>
          <Button @click="sendMsg" type="primary">确定</Button>
          <Button @click="phoneObj.show=false">取消</Button>
        </ButtonGroup>
      </div>
    </Modal>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { newWin } from "@/utils/utils";
export default {
  name: "",
  data() {
    return {
      showTime: false,
      formPhone: {
        cellphone: "",
        code: ""
      },
      timer: null
    };
  },
  props: {
    // show: {
    //   type: Boolean,
    //   default: function() {
    //     return false;
    //   }
    // }
  },
  computed: {
    // ...mapState("userInfo", {
    //   phoneObj: state => state.phoneObj
    // })
    ...mapState({
      phoneObj: state => state.userInfo.phoneObj
    }),
    time3() {
      return this.showTime ? new Date().getTime() + 60 * 1000 : null;
    }
  },
  methods: {
    ...mapActions(["CHECK_CODE", "GET_CODE", "showMsg"]),
    toNew() {
      newWin("/personCenter/bind_cellphone/index.html#!/");
    },
    modalChange(value) {
      if (!value) {
        this.formPhone.code = "";
      }
    },
    getCode() {
      this.GET_CODE({ cellphone: this.phoneObj.cellPhone })
        .then(res => {
          if (res.code == 0) {
            this.showTime = !this.showTime;
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
              this.showTime = false;
            }, 59000);
            this.showMsg({
              type: "success",
              content: "已向您的绑定手机发送验证码!"
            });
          } else {
            this.showMsg({
              type: "error",
              content: "发送失败请重试！"
            });
          }
        })
        .catch(err => {
          this.showMsg({
            type: "error",
            content: err || "发送失败请重试！"
          });
        });
    },
    sendMsg() {
      this.$refs.formPhone.validate(valid => {
        if (valid) {
          this.CHECK_CODE({
            code: this.formPhone.code,
            cellphone: this.phoneObj.cellPhone
          })
            .then(res => {
              if (res.code == 0 && res.datas.optCount === 0) {
                this.phoneObj.show = false;
                this.showMsg({
                  type: "success",
                  content: "验证成功!"
                });
              } else {
                this.formPhone.code = "";
                this.showMsg({
                  type: "error",
                  content: "验证失败请重试!"
                });
              }
            })
            .catch(err => {
              this.showMsg({
                type: "error",
                content: err || "验证失败请重试！"
              });
            });
        }
      });
    }
  },
  mounted() {
    console.log(this.phoneObj);
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  }
};
</script>

<style lang="" scoped>
</style>
