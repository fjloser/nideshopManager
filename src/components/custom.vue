<template>
  <div class="custom-container">
    <div class="operation-top">
      <div class="right-operation">
        <el-tag effect="dark" @click="handleAdd1" class="el-icon-plus">
          新增
        </el-tag>
        <el-tag type="success" effect="dark" class="el-icon-edit-outline">
          修改
        </el-tag>
        <el-tag type="danger" effect="dark" class="el-icon-close">
          删除
        </el-tag>
        <el-tag type="success" effect="dark" class="el-icon-download">
          导出
        </el-tag>
      </div>
    </div>
    <div class="content-box">
      <el-table :data="tableData" style="width: 100%">
        <!-- <el-table-column label="用户名" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    mounted: function(){
        this.$ajax({
            method: 'post',
            url: 'api/admin/userList',
            data: {
                token: sessionStorage.getItem('token'),
                page: 1,
                size: 5,
            }
        }).then( res => {
            console.log(res)
        })
    }
};
</script>
<style scoped>
@import "../assets/css/custom.css";
</style>