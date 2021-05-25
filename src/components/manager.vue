<template>
  <div class="manager-container">
    <div class="aside-nav">
      <div class="title">京东</div>
      <div class="admin-box">
        <img
          src="../assets/img/profile.jpg"
          alt=""
          style="width: 50px; height: 50px; border-radius: 50%"
        />
        <div class="admin-status-box">
          <p>admin</p>
          <div class="admin-status">
            <i class="iconfont icon-nodeNormal"><span>在线</span></i>
            <i class="iconfont icon-tuichu"><span>注销</span></i>
          </div>
        </div>
      </div>
      <el-row class="tac">
        <el-col :span="24">
          <el-menu
            default-active="custom"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="rgba(15,41,80,1)"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-goods"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="goodType">
                  <template slot="title">
                    <i class="el-icon-box"></i>
                    <span>商品分类管理</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="goods">
                  <i class="el-icon-shopping-bag-1"></i>
                  <span>商品详情管理</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="banner">
              <i class="el-icon-folder-add"></i>
              <span slot="title">轮播管理</span>
            </el-menu-item>
            <el-menu-item index="custom">
              <i class="el-icon-s-order"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
            <el-menu-item index="ordersList">
              <i class="el-icon-shopping-cart-full"></i>
              <span slot="title">订单管理</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="right-content">
      <div class="operation-top"></div>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      date: "banner",
    };
  },
  mounted: function () {
    // console.log(1);
    // this.$ajax({
    //   method: "post",
    //   url: "/api/admin/login",
    //   params: {
    //     name: "120",
    //     pw: "123456",
    //   },
    // }).then((res) => {
    //   console.log(res);
    // });
  },
  computed: {},

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style scoped>
@import "../assets/css/manager.css";
.el-menu {
  border: 0;
}
</style>