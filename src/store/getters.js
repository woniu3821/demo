const getters = {
  userDetail(state) {
    return state.userDetail;
  },
  userTypeName(state) {
    if (state.userType !== undefined) {
      return state.userType == 1 ? "学生" : "教职工";
    }
    return state.userType;
  }
};
export default getters;
