<template>
  <div class="app-container">
    <el-form
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      :model="ruleForm"
      :rules="rules"
    >
      <el-form-item label="验证码" prop="yzm">
        <el-input v-model="ruleForm.yzm"/>
      </el-form-item>
      <el-form-item label="接收号码" prop="numbers">
        <el-input type="textarea" v-model="ruleForm.numbers"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">发送</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        yzm: '',
        numbers: ''
      },
      rules: {
        yzm: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur' }
        ],
        numbers: [
          { required: true, message: '请填写接收号码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
