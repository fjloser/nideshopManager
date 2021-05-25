<template>
  <div class="login">
    <div class="top-title">后台管理登录</div>
    <div class="user-name-box">
      <label for="username">用户名</label>
      <input type="text" name="username" id="username"/>
    </div>
    <div class="password-box">
      <label for="password">密码</label>
      <input type="password" name="password" id="password" />
    </div>
    <div class="submit-btn">登录</div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted: function () {
     this.$ajax({
      method: "post",
      url: "/api/admin/login",
      params: {
        name: "fjk",
        pw: "123456",
      },
    }).then((res) => {
      console.log(res)
      let token = res.data.data.token
      sessionStorage.setItem('token', token)
    });
  },
  computed: {},
  methods: {},
};
</script>
<style scoped>
@import "../assets/css/login.css";
</style>