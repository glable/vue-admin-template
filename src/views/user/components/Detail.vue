<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item label="用户名(必填项)" prop="username">
              <el-input v-model="postForm.username"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="密码(必填项)" prop="password">
              <el-input v-model="postForm.password"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="验证码应用ID(必填项)" prop="yzmid">
              <el-input v-model="postForm.yzmid"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="话单通知应用ID(必填项)" prop="hdid">
              <el-input v-model="postForm.hdid"/>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-button
        v-loading="loading"
        style="margin-left: 10px;float:right;margin-right:200px;"
        type="success"
        @click="submitForm"
      >保存</el-button>
    </el-form>
  </div>
</template>

<script>
import { validateURL } from '@/utils/validate'
import { getUser } from '@/api/user'
import { addUser } from '@/api/user'
import { deleteUser } from '@/api/user'
import { editUser } from '@/api/user'

const defaultForm = {
  username: '',
  password: '',
  hdid: '',
  yzmid: ''
}

export default {
  name: 'UserDetail',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        this.$message({
          message:'密码不能小于5位',
          type: 'error'
        })
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        username: [{ validator: validateRequire }],
        password: [{ validator: validateRequire, validatePass }],
        hdid: [{ validator: validateRequire }],
        yzmid: [{ validator: validateRequire }]
      },
      tempRoute: {}
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    },
    lang() {
      return this.$store.getters.language
    }
  },
  created() {
    if (this.isEdit) {
      const username = this.$route.params && this.$route.params.username
      this.fetchData(username)
      this.postForm.isEdit = true
    } else {
      this.postForm = Object.assign({}, defaultForm)
      this.postForm.isEdit = false
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(username) {
      getUser(username).then(response => {
        this.postForm = response.data
        // Set tagsview title
        this.setTagsViewTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = this.lang === 'zh' ? '编辑用户' : 'Edit User'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.username}` })
      this.$store.dispatch('updateVisitedView', route)
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          alert(this.isEdit)
          if (!this.isEdit) {
            addUser(this.postForm).then(response => {
              this.$notify({
                title: '成功',
                message: '新增成功',
                type: 'success',
                duration: 2000
              })
              this.loading = false
              // Set tagsview title
            }).catch(err => {
              console.log(err)
            })
          } else {
            editUser(this.postForm).then(response => {
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
              this.loading = false
              // Set tagsview title
            }).catch(err => {
              console.log(err)
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (this.postForm.password.length === 0 || this.postForm.username.length === 0) {
        this.$message({
          message: '请填写必要的信息',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/mixin.scss";
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
    .editor-container {
      min-height: 500px;
      margin: 0 0 30px;
      .editor-upload-btn-container {
        text-align: right;
        margin-right: 10px;
        .editor-upload-btn {
          display: inline-block;
        }
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
}
</style>
