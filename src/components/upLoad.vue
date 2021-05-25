<template>
  <div class="uplode">
    <file-upload
      class="subBtn"
      :input-id="inputid"
      :name="name"
      :multiple="multiple"
      :ref="refname"
      :post-action="url"
      @input-file="inputFile"
      　　v-model="files"
      >上传图片</file-upload
    >
  </div>
</template>

<script>
import FileUpload from "vue-upload-component";
export default {
  props: ["name", "inputid", "multiple", "refname", "url"],
  data() {
    return {
      files: [],
      returenData:[]
    };
  },
  components: {
    FileUpload,
  },
  methods: {
    inputFile(newFile, oldFile) {
      if (newFile && !oldFile) {
        // 添加文件
        this.files.push(newFile.file);
      }
      if (newFile && oldFile) {
        // 上传错误
        if (newFile.error !== oldFile.error) {
          this.$message({
            message: newFile.error,
            type: "error",
          });
        }
        // 上传成功
        if (newFile.success !== oldFile.success) {
          if (newFile.success) {
            let res = newFile.response;
            if (res.code == 2000) {
              this.returenData.push(this.url + res.data)
              this.$emit("returnImage", this.returenData);
            }
            this.$refs[this.refname].remove(newFile);
          }
        }
      } // 自动上传
      if (
        Boolean(newFile) !== Boolean(oldFile) ||
        oldFile.error !== newFile.error
      ) {
        if (!this.$refs[this.refname].active) {
          this.$refs[this.refname].active = true;
        }
      }
    },
  },
};
</script>

<style scoped>
.subBtn {
  width: 150px;
  padding: 10px 15px;
  text-align: center;
  border-radius: 5px;
  background: #41b9fe;
  color: #fff;
  cursor: pointer;
}
</style>