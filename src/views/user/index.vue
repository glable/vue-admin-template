<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom:5px;">
      <span>用户名:</span>
      <el-input
        v-model="listQuery.username"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        :loading="listLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ '查询' }}</el-button>
      <router-link :to="'/user/add/'" style="float:right;margin-right:30px;">
        <el-button type="primary" size="small" icon="el-icon-plus">新增</el-button>
      </router-link>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          <span>{{ scope.$index+1 + (listQuery.pageNum-1)*listQuery.pageSize }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="语音验证码ID" width="400">
        <template slot-scope="scope">
          <span>{{ scope.row.yzmid }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="通知话单ID" width="400">
        <template slot-scope="scope">
          <span>{{ scope.row.hdid }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <router-link :to="'/user/edit/'+scope.row.username">
            <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          </router-link>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-delete"
            @click="handleDelete(scope.row.username)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.pageNum"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { fetchList } from '@/api/user'
import { deleteUser } from '@/api/user'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'UserList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      downLoading: false,
      listQuery: {
        username: '',
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    handleDelete(username) {
      if (username == 'admin') {
        this.$message({
          message: '管理员账户【admin】不能删除！',
          type: 'error'
        })
        return
      } else {
        deleteUser(username).then(response => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
          this.listLoading = false
        })
      }

    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
