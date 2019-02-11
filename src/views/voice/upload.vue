<template>
  <div class="app-container">
    <el-upload
      ref="upload"
      :on-remove="handleRemove"
      :auto-upload="false"
      :action="doUpload"
      :on-change="beforeAvatarUpload"
      :on-success="onSuccess"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传wav或zip（将多个语音文件打包）文件，且不超过20M</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      doUpload: process.env.BASE_API + '/upload/singlefile',
      pppss: {
        srid: ''
      },
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.raw.type === 'audio/wav' || file.raw.type === 'application/x-zip-compressed'
      const isLt2M = file.size / 1024 / 1024 < 20
      if (!isJPG) {
        this.$message.error('上传语音文件只能是wav/zip格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传语音文件大小不能超过20MB!')
      }
      return isJPG && isLt2M
    },
    onSuccess(response, file, fileList) {
      console.log(response)
      this.$message.info(response)
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

