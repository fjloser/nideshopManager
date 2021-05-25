<template>
  <div class="goods-container">
    <div class="operation-top" style="min-width: 400px">
      <div class="right-operation">
        <el-tag effect="dark" class="el-icon-plus" @click="handleAdd">
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
      <el-table :data="showData" style="width: 100%">
        <el-table-column label="商品名" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.good_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品分类" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.type_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品图片" width="150">
          <template slot-scope="scope">
            <img :src="scope.row.img" alt="" srcset="" style="width: 100%" />
            <!-- <el-tag size="medium">{{ scope.row.img }}</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column label="商品价格(单位:元)" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
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
        </el-table-column>
      </el-table>
      <!-- <div class="pagination-box"> -->
        <el-pagination background
        @current-change="handleCurrentChange"
        layout="prev, pager, next" 
        :total="allGoods"
        :page-size="7"
        :current-page="nowNum"
        >
        </el-pagination>
      <!-- </div> -->
    </div>
    <div class="alert-add alert" v-if="alertFlag1">
      <div class="alert-content">
        <el-form
          ref="form"
          :model="form1"
          label-width="100px"
          label-position="left"
        >
          <el-form-item label="商品名">
            <el-input v-model="form1.goodName"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select
              v-model="form1.typeName"
              filterable
              placeholder="请选择"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in options"
                :key="item.good_type_id"
                :value="item.type_name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form1.price"></el-input>
          </el-form-item>
          <el-form-item label="商品详情">
            <el-input v-model="form1.title"></el-input>
          </el-form-item>
          <el-form-item label="商品规格">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>spu</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="addSpu"
                  class="add-spu"
                  >添加</el-button
                >
              </div>
              <div
                v-for="(ele, index) in form1.colour"
                :key="index"
                class="text item"
              >
                <span>规格名</span
                ><input
                  type="text"
                  placeholder="请输入规格名"
                  v-model="ele.spu_name"
                />
                <span>规格</span
                ><input
                  type="text"
                  placeholder="请输入规格"
                  v-model="ele.spu_size"
                />
              </div>
            </el-card>
          </el-form-item>
          <el-form-item label="商品可选尺寸">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>sku</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  class="add-sku"
                  @click="addSku"
                  >添加</el-button
                >
              </div>
              <div
                v-for="(ele, index) in form1.edition"
                :key="index"
                class="text item"
              >
                <div class="sku-kind">
                  <span>选项分类</span
                  ><input
                    type="text"
                    placeholder="请输入分类"
                    v-model="ele.sku_name"
                  /><span class="add-select" @click="addSkuSize(index)"
                    >添加</span
                  >
                </div>
                <div
                  class="size sku-size"
                  v-for="(ele2, index2) in ele.sku_size"
                  :key="index2"
                >
                  <input type="text" v-model="ele2.size" />
                </div>
              </div>
            </el-card>
          </el-form-item>
          <el-form-item label="商品图片">
            <el-upload
              class="upload-demo"
              action="http://api_devs.wanxikeji.cn/api/savePic"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="upLoadImg"
              :file-list="fileList"
              list-type="picture"
              :limit="1"
              name="img"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传一张jpg/png文件，且不超过500kb
              </div>
            </el-upload>
            <!-- <el-input v-model="form1.img"></el-input> -->
          </el-form-item>
          <el-form-item label="商品封面图">
            <!-- <UpLoad name="img" refname="upload" url="http://api_devs.wanxikeji.cn/api/savePic"></UpLoad> -->
            <el-upload
              action="http://api_devs.wanxikeji.cn/api/savePic"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="upLoadImgs"
              name="img"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
            <!-- <el-input v-model="form1.img"></el-input> -->
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="margin-right: 50px"
              @click="addGoodComplete"
              >立即创建</el-button
            >
            <el-button @click="close1" style="margin-right: 80px"
              >取消</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="alert-edit alert" v-if="alertFlag2">
      <div class="alert-content">
        <el-form
          ref="form"
          :model="form2"
          label-width="100px"
          label-position="left"
        >
          <el-form-item label="商品名">
            <el-input v-model="form2.goodName"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select
              v-model="form2.typeName"
              filterable
              placeholder="请选择"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in options"
                :key="item.good_type_id"
                :value="item.type_name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form2.price"></el-input>
          </el-form-item>
          <el-form-item label="商品详情">
            <el-input v-model="form2.title"></el-input>
          </el-form-item>
          <el-form-item label="商品规格">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>spu</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="addSpu"
                  class="add-spu"
                  >添加</el-button
                >
              </div>
              <div
                v-for="(ele, index) in form2.colour"
                :key="index"
                class="text item"
              >
                <span>规格名</span
                ><input
                  type="text"
                  placeholder="请输入规格名"
                  v-model="ele.spu_name"
                />
                <span>规格</span
                ><input
                  type="text"
                  placeholder="请输入规格"
                  v-model="ele.spu_size"
                />
              </div>
            </el-card>
          </el-form-item>
          <el-form-item label="商品可选尺寸">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>sku</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  class="add-sku"
                  @click="addSku"
                  >添加</el-button
                >
              </div>
              <div
                v-for="(ele, index) in form2.edition"
                :key="index"
                class="text item"
              >
                <div class="sku-kind">
                  <span>选项分类</span
                  ><input
                    type="text"
                    placeholder="请输入分类"
                    v-model="ele.sku_name"
                  /><span class="add-select" @click="addSkuSize(index)"
                    >添加</span
                  >
                </div>
                <div
                  class="size sku-size"
                  v-for="(ele2, index2) in ele.sku_size"
                  :key="index2"
                >
                  <input type="text" v-model="ele2.size" />
                </div>
              </div>
            </el-card>
          </el-form-item>
          <el-form-item label="商品图片">
            <el-upload
              class="upload-demo"
              action="http://api_devs.wanxikeji.cn/api/savePic"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="upLoadImg"
              :file-list="fileList"
              list-type="picture"
              :limit="1"
              name="img"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传一张jpg/png文件，且不超过500kb
              </div>
            </el-upload>
            <!-- <el-input v-model="form1.img"></el-input> -->
          </el-form-item>
          <el-form-item label="商品封面图">
            <!-- <UpLoad name="img" refname="upload" url="http://api_devs.wanxikeji.cn/api/savePic"></UpLoad> -->
            <el-upload
              action="http://api_devs.wanxikeji.cn/api/savePic"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="upLoadImgs"
              :file-list="fileLists"
              name="img"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
            <!-- <el-input v-model="form1.img"></el-input> -->
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="margin-right: 50px"
              @click="addGoodComplete"
              >立即创建</el-button
            >
            <el-button @click="close2" style="margin-right: 80px"
              >取消</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- <div class="alert-edit alert">
    </div> -->
  </div>
</template>
<script>
import UpLoad from "./upLoad";
export default {
  components: { UpLoad },
  data() {
    return {
      goodInfo: "",
      alertFlag1: false,
      alertFlag2: false,
      resData: [],
      nowNum: 1,
      allGoods: 0,
      goodTypeName: "",
      row: "",
      form1: {
        goodName: "",
        typeName: "",
        img: "",
        imgs: [],
        price: "",
        title: "",
        colour: [],
        edition: [],
      },
      form2: {
        goodName: "",
        typeName: "",
        img: "",
        imgs: [],
        price: "",
        title: "",
        colour: [],
        edition: [],
      },
      fileList: [],
      fileLists: [],
      options: [],
      value: "",
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  computed: {
    showData: function () {
      return this.addType(this.resData);
    },
  },
  mounted: function () {
    this.$ajax({
      method: "post",
      url: "api/admin/goodList",
      data: {
        token: sessionStorage.getItem("token"),
        page: this.nowNum,
        size: 7,
      },
    }).then((res) => {
      // console.log(res)
      this.resData = res.data.data.data;
      this.allGoods = res.data.data.count;
      console.log(res);
      this.$ajax({
        method: "post",
        url: "api/admin/goodsTypeList",
        data: {
          token: sessionStorage.getItem("token"),
        },
      }).then((res) => {
        this.goodTypeName = res.data.data;
        this.options = this.recoredType(this.goodTypeName);
        console.log(this.goodTypeName);
      });
    });
  },
  methods: {
    /*get TypeName*/
    getTypeName(id) {
      for (let i = 0; i < this.goodTypeName.length; i++) {
        if (this.goodTypeName[i].good_type_id == id) {
          return this.goodTypeName[i].type_name;
        }
      }
    },
    /*计算typename */
    addType(resData) {
      for (let i = 0; i < resData.length; i++) {
        for (let j = 0; j < this.goodTypeName.length; j++) {
          if (resData[i].type_id == this.goodTypeName[j].good_type_id) {
            resData[i].type_name = this.goodTypeName[j].type_name;
          }
        }
      }
      return JSON.parse(JSON.stringify(resData));
    },
    recoredType(goodtype) {
      var arr = [];
      for (let i = 0; i < goodtype.length; i++) {
        if (!this.isSon(goodtype[i], goodtype)) {
          arr.push(goodtype[i]);
        }
      }
      return arr;
    },
    isSon(data, dataArr) {
      for (let i = 0; i < dataArr.length; i++) {
        if (data.good_type_id == dataArr[i].parent_id) {
          return true;
        }
      }
      return false;
    },
    /*按钮操作*/
    handleEdit(index, row) {
      this.form1.goodName = "";
      this.form1.typeName = "";
      this.form1.img = "";
      this.form1.imgs = [];
      this.fileList = [];
      this.fileLists = [];
      this.form1.price = "";
      this.form1.title = "";
      this.form1.colour = [];
      this.form1.edition = [];
      this.$ajax({
        method: "post",
        url: "api/admin/goodInfo",
        data: {
          token: sessionStorage.getItem("token"),
          good_id: row.good_id,
        },
      }).then((res) => {
        this.goodInfo = res.data.data;
        var typeName = this.getTypeName(this.goodInfo.type_id);
        this.form2.goodName = this.goodInfo.good_name;
        this.form2.typeName = typeName;
        this.form2.img = this.goodInfo.img;
        this.fileList.push({ name: "图片一", url: this.goodInfo.img });
        var imgsArr = JSON.parse(this.goodInfo.info[0].imgs);
        console.log(typeof imgsArr);
        // console.log(JSON.parse(goodInfo.info[0].imgs))
        for (let i = 0; i < imgsArr.length; i++) {
          this.fileLists.push({ name: "图片" + i + 1, url: imgsArr[i] });
        }
        // this.form2.imgs = JSON;
        this.form2.price = this.goodInfo.price;
        this.form2.title = JSON.parse(this.goodInfo.info[0].info);
        console.log(JSON.parse(JSON.parse(this.goodInfo.info[0].colour)));
        this.form2.colour = JSON.parse(
          JSON.parse(this.goodInfo.info[0].colour)
        );
        this.form2.edition = JSON.parse(
          JSON.parse(this.goodInfo.info[0].edition)
        );
        console.log(this.goodInfo);
      });
      this.alertFlag2 = !this.alertFlag2;
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$ajax({
        method: "post",
        url: "api/admin/deleteGood",
        data: {
          token: sessionStorage.getItem("token"),
          good_id: row.good_id,
        },
      }).then((res) => {
        this.$ajax({
          method: "post",
          url: "api/admin/goodList",
          data: {
            token: sessionStorage.getItem("token"),
            page: this.nowNum,
            size: 7,
          },
        }).then((res) => {
          this.resData = res.data.data.data;
          this.allGoods = res.data.data.count;
        });
      });
    },
    handleAdd() {
      this.form1.goodName = "";
      this.form1.typeName = "";
      this.form1.img = "";
      this.form1.imgs = [];
      this.fileList = [];
      this.fileLists = [];
      this.form1.price = "";
      this.form1.title = "";
      this.form1.colour = [];
      this.form1.edition = [];
      this.alertFlag1 = !this.alertFlag1;
    },
    /*图片上传*/
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(1);
      console.log(file);
    },
    handlePictureCardPreview(file) {
      console.log(file.url);
      this.dialogImageUrl = file.url;
      console.log(this.dialogImageUrl);
      this.dialogVisible = true;
    },
    upLoadImg(response, file, fileList) {
      console.log(response);
      console.log(fileList);
      this.form1.img = "http://api_devs.wanxikeji.cn/" + response.data;
    },
    upLoadImgs(response, file, fileList) {
      console.log(response);
      console.log(fileList);
      this.form1.imgs.push("http://api_devs.wanxikeji.cn/" + response.data);
    },
    close1() {
      this.alertFlag1 = !this.alertFlag1;
    },
    close2() {
      console.log("推出2");
      this.alertFlag2 = !this.alertFlag2;
    },
    selectType(dropdown) {
      console.log(dropdown);
    },

    /*spu */
    addSpu() {
      console.log(1);
      var obj = { spu_name: "", spu_size: "" };
      this.form1.colour.push(obj);
    },
    addSku() {
      var obj = { sku_name: "", sku_size: [] };
      this.form1.edition.push(obj);
      console.log(this.form1);
    },
    addSkuSize(index) {
      var obj = { size: "" };
      this.form1.edition[index].sku_size.push(obj);
      console.log(this.form1);
    },
    /*add goods detail */
    getTypeId(name) {
      for (let i = 0; i < this.goodTypeName.length; i++) {
        if (this.goodTypeName[i].type_name == name) {
          return {
            good_type_id: this.goodTypeName[i].good_type_id,
            parent_id: this.goodTypeName[i].parent_id,
          };
        }
      }
    },
    editGoodComplete() {
      this.$ajax({
        method: "post",
        url: "api/admin/addModifyGood",
        data: {
          token: sessionStorage.getItem("token"),
          good_name: this.form2.goodName,
          type_id: this.goodInfo.type_id,
          type_parent_id: this.goodInfo.type_parent_id,
          price: this.form2.price,
          img: this.fileList[0],
          imgs: this.fileLists,
          info: this.form2.title,
          colour: JSON.stringify(this.form2.colour),
          edition: JSON.stringify(this.form2.edition),
          good_id: this.goodInfo.good_id,
        },
      }).then((res) => {
        this.alertFlag2 = !this.alertFlag2;
        this.$ajax({
          method: "post",
          url: "api/admin/goodList",
          data: {
            token: sessionStorage.getItem("token"),
            page: this.nowNum,
            size: 7,
          },
        }).then((res) => {
          this.resData = res.data.data.data;
          this.allGoods = res.data.data.count;
        });
      });
    },
    addGoodComplete() {
      console.log(this.form1);
      console.log(this.fileList);
      console.log(this.fileLists);
      var typeMes = this.getTypeId(this.form1.typeName);
      var good_type_id = typeMes.good_type_id;
      var parent_id = typeMes.parent_id;
      this.alertFlag1 = !this.alertFlag1;
      this.$ajax({
        method: "post",
        url: "api/admin/addModifyGood",
        data: {
          token: sessionStorage.getItem("token"),
          good_name: this.form1.goodName,
          type_id: good_type_id,
          type_parent_id: parent_id,
          price: this.form1.price,
          img: this.form1.img,
          imgs: this.form1.imgs,
          info: this.form1.title,
          colour: JSON.stringify(this.form1.colour),
          edition: JSON.stringify(this.form1.edition),
        },
      }).then((res) => {
        this.$ajax({
          method: "post",
          url: "api/admin/goodList",
          data: {
            token: sessionStorage.getItem("token"),
            page: this.nowNum,
            size: 7,
          },
        }).then((res) => {
          this.resData = res.data.data.data;
          this.allGoods = res.data.data.count;
        });
      });
    },
    /*分页*/
    handleCurrentChange(val){
      this.nowNum = val;
      this.$ajax({
        method: 'post',
        url: "api/admin/goodList",
        data: {
          token: sessionStorage.getItem('token'),
          page: this.nowNum,
          size: 7
        }
      }).then(res => {
        this.resData = res.data.data.data;
        this.allGoods = res.data.data.count;
      })
    }
  },
};
</script>
<style scoped>
@import "../assets/css/goods.css";
.add-spu {
  width: 70px;
  height: 30px;
  background: orangered;
  color: white;
}
.add-sku {
  width: 70px;
  height: 30px;
  background: orangered;
  color: white;
  border-radius: 5px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
.text.item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.text.item > span {
  margin-right: 15px;
}
.text.item > span:nth-of-type(2) {
  margin-left: 15px;
}
.text.item > input {
  height: 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.add-select {
  float: right;
  width: 50px;
  height: 30px;
  margin-top: 5px;
  background: orangered;
  color: white;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  cursor: pointer;
}
.size.sku-size > input {
  height: 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.sku-kind {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.sku-kind > span {
  margin-right: 15px;
}
.sku-kind > input {
  height: 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.pagination-box{
  position: relative;
}
.el-pagination {
  margin-top: 30px;
  text-align: center;
}
</style>