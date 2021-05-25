<template>
  <div class="goodtype-container">
    <div class="operation-top">
      <div class="right-operation">
        <el-tag effect="dark" @click="handleAdd1" class="el-icon-plus"> 新增 </el-tag>
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
      <el-table
        :data="showData"
        style="width: 100%"
        row-key="good_type_id"
        :indent="16"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="type_name" label="分类名" width="180">
        </el-table-column>
        <el-table-column label="操作">
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
            <el-button
              size="mini"
              type="danger"
              @click="handleAdd2(scope.$index, scope.row)"
              >新增</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="alert" v-if="alertFlag1">
      <div class="alert-content">
        <el-form ref="form" :model="form1" label-width="80px">
          <p style="font-weight: 550; text-align: center; margin-bottom: 50px">{{alertParent}}</p>
          <el-form-item label="分类名称">
            <el-input v-model="form1.typeName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="margin-right: 50px" @click="handleEditComplete">立即创建</el-button>
            <el-button @click="closeAlert1" style="margin-right: 80px">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="alert" v-if="alertFlag2">
      <div class="alert-content">
        <el-form ref="form" :model="form2" label-width="80px">
          <p style="font-weight: 550; text-align: center; margin-bottom: 50px">{{alertParent}}</p>
          <el-form-item label="分类名称">
            <el-input v-model="form2.typeName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="margin-right: 50px" @click="handleAdd2Complete">立即创建</el-button>
            <el-button @click="closeAlert2" style="margin-right: 80px">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
     <div class="alert" v-if="alertFlag3">
      <div class="alert-content">
        <el-form ref="form" :model="form3" label-width="80px">
          <el-form-item label="分类名称">
            <el-input v-model="form3.typeName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="margin-right: 50px" @click="handleAdd1Complete">立即创建</el-button>
            <el-button @click="closeAlert3" style="margin-right: 80px">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      row: {},
      count: 0,
      alertFlag1: false,
      alertFlag2: false,
      alertFlag3: false,
      alertParent1: '',
      alertParent2: '',
      form1: {
        typeName: ''
      },
      form2: {
        typeName: ''
      },
      form3: {
        typeName: ''
      },
      resData: [],
    };
  },
  computed: {
    showData: function () {
      return this.createTree(this.resData);
    },
  },
  mounted: function () {
    this.$ajax({
      method: "post",
      url: "api/admin/goodsTypeList",
      data: {
        token: sessionStorage.getItem("token"),
      },
    }).then((res) => {
      // console.log(res)
      this.resData = res.data.data;
      this.resData.length != 0 ? this.count = this.resData[this.resData.length-1].good_type_id :
      this.count = 0
      console.log(this.count)
      console.log(this.resData);
    });
  },
  methods: {
    /*处理成树形结构数据*/
    createTree(arr) { 
      var newTreeArr = [],
        nullObj = {},
        children = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].parent_id == 0) {
          nullObj = { ...arr[i] };
          let sonArr = this.findSon(arr[i].good_type_id, arr);
          if (sonArr.length != 0) {
            nullObj.children = sonArr;
          }
          newTreeArr[newTreeArr.length] = nullObj;
        }
      }
      console.log(newTreeArr)
      return newTreeArr;
    },
    findSon(id, arr) {
      let sonArr = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].parent_id == id) {
          let nullObj = {};
          nullObj = { ...arr[i] };
          let sonCacheArr = this.findSon(arr[i].good_type_id, arr);
          if (sonCacheArr.length != 0) {
            nullObj.children = sonCacheArr;
          }
          sonArr[sonArr.length] = nullObj;
        }
      }
      return sonArr;
    },
    /** */
    handleEdit(index, row) {
      this.row = row
      if(row.parent_id == 0){
        this.alertParent = ''
      }else{
        for(let i = 0; i < this.resData.length; i++){
          if(row.parent_id == this.resData[i].good_type_id){
            this.alertParent = this.resData[i].type_name
          }
        }
      }
      this.form1.typeName = row.type_name
      // console.log(this.form1.typeName)
      this.alertFlag1 = !this.alertFlag1
    },
    handleDelete(index, row) {
      for (let i = 0; i < this.resData.length; i++) {
        if (row.good_type_id == this.resData[i].good_type_id) {
          this.resData.splice(i, 1);
          break
        }
      }
      this.$ajax({
        method: 'post',
        url: 'api/admin/deleteGoodtype',
        data: {
          token: sessionStorage.getItem('token'),
          id: row.good_type_id,
        }
      })
    },
    handleAdd2(index, row) {
      this.row = row
      this.form2.typeName = ''
       if(row.children || row.parent_id == 0){
        this.alertParent = row.type_name
      }else{
        for(let i = 0; i < this.resData.length; i++){
          if(row.parent_id == this.resData[i].good_type_id){
            this.alertParent = this.resData[i].type_name
          }
        }
      }
      this.alertFlag2 = !this.alertFlag2
    },
    handleAdd1(){
      this.alertFlag3 = !this.alertFlag3
      this.form3.typeName = ''
    },
    closeAlert1(){
      this.alertFlag1 = !this.alertFlag1
    },
    closeAlert2(){
      this.alertFlag2 = !this.alertFlag2
    },
    closeAlert3(){
      this.alertFlag3 = !this.alertFlag3
    },
    handleEditComplete(){
      for(let i = 0; i < this.resData.length; i++){
        if(this.resData[i].good_type_id == this.row.good_type_id){
          this.resData[i].type_name = this.form1.typeName
          this.alertFlag1 = !this.alertFlag1
          break
        }
      }
      console.log(this.row.good_type_id)
      this.$ajax({
        method: 'post',
        url: 'api/admin/addGoodType',
        data: {
          token: sessionStorage.getItem("token"),
          name: this.form1.typeName,
          id: this.row.good_type_id
        }
      }).then(res => {
        console.log(res)
      })
    },
    handleAdd2Complete(){
      this.count++
      for(let i = 0; i < this.resData.length; i++){
        if(this.resData[i].good_type_id == this.row.good_type_id){
          this.resData.push({parent_id: this.row.good_type_id, type_name: this.form2.typeName, good_type_id: this.count})
          this.alertFlag2 = !this.alertFlag2
          break
        }
      }
      this.$ajax({
         method: 'post',
         url: 'api/admin/addGoodType',
         data: {
           token: sessionStorage.getItem("token"),
           name: this.form2.typeName,
           pid: this.row.good_type_id,
         }
       }).then(res => {
         console.log(res)
       })
    },
    handleAdd1Complete(){
       this.count++
       console.log(1)
       console.log(this.count)
       this.resData.push({parent_id: 0, type_name: this.form3.typeName, good_type_id: this.count})
       this.alertFlag3 = !this.alertFlag3
       this.$ajax({
         method: 'post',
         url: 'api/admin/addGoodType',
         data: {
           token: sessionStorage.getItem("token"),
           name: this.form3.typeName
         }
       }).then(res => {
         console.log(res)
       })
    }
  },
};
</script>
<style scoped>
@import "../assets/css/goodtype.css";
</style>