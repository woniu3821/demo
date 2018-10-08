import { mapActions } from "vuex";
import { isArray } from "@/utils/utils";
export const pageMixins = {
  data() {
    return { pageInfo: { pageNumber: 1, pageSize: 10, total: 100 } };
  },
  methods: {}
};
export const listMixins = {
  data() {
    return { deptList: [], majorList: [], typeList: [], statusList: [] };
  },
  methods: {
    ...mapActions([
      "getUserDept",
      "getUserMajor",
      "getUserType",
      "getUserStatus"
    ])
  },
  created() {
    this.getUserDept().then(res => {
      this.deptList = isArray(res);
    });
    this.getUserMajor().then(res => {
      this.majorList = isArray(res);
    });
    this.getUserType().then(res => {
      this.typeList = isArray(res);
    });
    this.getUserStatus().then(res => {
      this.statusList = isArray(res);
    });
  }
};
