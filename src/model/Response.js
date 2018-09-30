export default class Response {
  constructor({ code = "0", datas, message = "" }) {
    this.code = code;
    this.datas = datas;
    this.message = message;
  }
  success() {
    return this.code === "0" && this.message.toLocaleUpperCase() === "SUCCESS";
  }
  errorMsg() {
    if (this.code && this.code !== "0") {
      return this.message;
    }
  }
  data() {
    return this.datas || {};
  }
}
