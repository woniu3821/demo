<template>
    <div>
        <div class="image">
            <img src="../assets/move.png">
        </div>
        <div>{{currentWeather}}</div>
        <div class="language bh-mt-32">
            <Button @click="switchLang">测试异步方法</Button>
        </div>
          <Button @click="test">测试</Button>
        <div class="big" :style="{height: bigger ? '800px' : 'auto'}"></div>
        <Row>
          <Col span="4">1111</Col>
          <Col span="20">3333</Col>
        </Row>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      bigger: false
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
<style>
</style>
