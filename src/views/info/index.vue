<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="主账户名称">
        <template slot-scope="scope">{{ scope.row.friendlyName }}</template>
      </el-table-column>
      <el-table-column label="主账户类型" width="95" align="center">
        <template slot-scope="scope">{{ scope.row.type ==0 ?"试用":"已注册" }}</template>
      </el-table-column>
      <el-table-column label="主账户状态" width="110" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 1">激活</span>
          <span v-else-if="scope.row.status === 2">暂停</span>
          <span v-else-if="scope.row.status === 3">关闭</span>
          <span v-else>未激活</span>
        </template>
      </el-table-column>
      <el-table-column label="主账户余额" width="160" align="center">
        <template slot-scope="scope">{{ scope.row.balance }}</template>
      </el-table-column>
      <el-table-column label="创建时间" width="160" align="center">
        <template slot-scope="scope">{{ scope.row.dateCreated }}</template>
      </el-table-column>
      <el-table-column label="更新时间" width="160" align="center">
        <template slot-scope="scope">{{ scope.row.dateUpdated }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/account'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>
