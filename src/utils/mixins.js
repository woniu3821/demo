import { mapActions, mapMutations } from "vuex";
import { isArray, newWin } from "@/utils/utils";
export const pageMixins = {
  data() {
    return { pageInfo: { pageNumber: 1, pageSize: 10, totalSize: 0 } };
  },
  methods: {}
};
export const listMixins = {
  data() {
    return { typeList: [] };
  },
  methods: {
    ...mapActions(["getUserType"])
  },
  created() {
    this.getUserType()
      .then(res => {
        if (res.code == 0) {
          this.typeList = res.datas.rows;
        }
      })
      .catch(err => {
        this.$Message.error({
          content: err,
          duration: 3
        });
      });
  }
};
export const listMixins2 = {
  data() {
    return { deptList: [], majorList: [], typeList: [], statusList: [] };
  },
  methods: {
    ...mapActions(["getUserDept", "getUserMajor", "getUserStatus"])
  },
  created() {
    this.getUserDept()
      .then(res => {
        if (res.code == 0) {
          this.deptList = res.datas.rows;
        }
      })
      .catch(err => {
        this.$Message.error({
          content: err,
          duration: 3
        });
      });
    this.getUserMajor()
      .then(res => {
        if (res.code == 0) {
          this.majorList = res.datas.rows;
        }
      })
      .catch(err => {
        this.$Message.error({
          content: err,
          duration: 3
        });
      });
    this.getUserStatus()
      .then(res => {
        if (res.code == 0) {
          this.statusList = res.datas.rows;
        }
      })
      .catch(err => {
        this.$Message.error({
          content: err,
          duration: 3
        });
      });
  }
};

export const codeMixins = {
  methods: {
    ...mapActions([
      "GET_SECURITY",
      "GET_CODE",
      "CHECK_CODE",
      "HAS_CODE",
      "CHECK_ADMIN_PHONE"
    ]),
    async checkSecurity(...args) {
      let data = await this.GET_SECURITY();
      if (data.securityType == 0) {
        return Promise.resolve(0);
      } else {
        let data = await this.CHECK_ADMIN_PHONE();
        if (data.datas && data.datas.optCount === 1 && data.datas.id == null) {
          //没有手机号
          this.$Modal.confirm({
            title: "完善信息",
            content: "系统检测到您还没有绑定手机号，请先绑定手机号再执行此操作",
            okText: "去绑定",
            onOk: () => {
              newWin("/personCenter/bind_cellphone/index.html#!/");
            }
          });
        } else {
          this.$store.commit("userInfo/SET_PHONE", {
            show: true,
            cellPhone: data.datas.id
          });
        }
      }
    }
  }
};
