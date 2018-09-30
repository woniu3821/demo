<template>
    <div>
      <div class="title-bar">
          查看用户信息<a href="">查看用户管理（旧版）</a>
      </div>
      <Row class="mart-15">
        <Form :model="searchForm" :label-width="75" label-position="left">
          <Row>
            <Col span="10">
              <FormItem label="搜索用户：">
                  <Input v-model="searchForm.value" placeholder="Enter something..."></Input>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="20">
            <Col span="5">
                  <FormItem class="big-label" label="所属部门/院系：">
                    <Select v-model="searchForm.select">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
              </Col>
              <Col span="5">
                  <FormItem label="专业：">
                    <Select v-model="searchForm.select">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
              </Col>
                        <Col span="5">
                  <FormItem label="人员类型：">
                    <Select v-model="searchForm.select">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
              </Col>
              <Col span="5">
                  <FormItem label="账号状态：">
                    <Select v-model="searchForm.select">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
              </Col>
              <Col span="4">
                <Row type="flex" justify="center" align="middle">
                  <Button type="primary">查询</Button>
                  <Button type="text">重置</Button>
                </Row>
              </Col> 
          </Row>
        </Form>
      </Row>
      <Row class="line"></Row>
      <Row type="flex" justify="space-between">
        <Dropdown>
           <Button>
              <Icon type="md-add" />
              新增用户
              <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
                <DropdownItem>新增学生</DropdownItem>
                <DropdownItem>新增教职工</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <ButtonGroup>
          <Button>删除</Button>
          <Button>导出</Button>
          <Button>设置状态</Button>
          <Button>重设密码</Button>
        </ButtonGroup>
      </Row>
    
        
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      searchForm: {
        value: "",
        select: ""
      }
    };
  },
  computed: {
    currentWeather() {
      return this.$store.state.WEATHER;
    }
  },
  methods: {
    getPM25() {},
    ...mapActions({
      switchLang: "fresh_weather"
    }),
    test() {
      this.bigger = !this.bigger;
    }
  },
  components: {}
};
</script>
 <style lang="stylus">
 .mart-15 {
   margin-top: 20px;
 }

 .line {
   border-top: 2px solid #f5f5f5;
   width: 100%;
   margin-bottom: 15px;
 }

 .big-label {
   .ivu-form-item-label {
     width: 100px !important;
   }

   .ivu-form-item-content {
     margin-left: 100px !important;
   }
 }

 .title-bar {
   font-size: 16px;
   color: #464C5B;
   font-weight: 600;

   &>a {
     font-weight: 400;
     font-style: normal;
     color: #2D8CF0;
     font-size: 13px;
     margin-left: 10px;
   }
 }
</style>
