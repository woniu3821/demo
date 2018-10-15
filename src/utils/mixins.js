import { mapActions } from "vuex";
import { isArray } from "@/utils/utils";
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

export const codeMixins = {};
