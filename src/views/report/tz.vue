<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom:5px;">
      <span>报表类型:</span>
      <el-select v-model="listQuery.tjlx" clearable class="filter-item" style="width: 130px">
        <el-option
          v-for="item in lxOptions"
          :key="item.key"
          :label="item.display_name"
          :value="item.key"
        />
      </el-select>
      <span>报表日期:</span>
      <el-date-picker
        v-model="listQuery.startTime"
        :picker-options="pickerOptions0"
        type="date"
        value-format="yyyyMMdd"
        placeholder="选择日期"
        style="width: 150px;"
      />
      <span>--</span>
      <el-date-picker
        v-model="listQuery.endTime"
        :picker-options="pickerOptions1"
        type="date"
        value-format="yyyyMMdd"
        placeholder="选择日期"
        style="width: 150px;"
      />
      <el-button
        :loading="listLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ '查询' }}</el-button>
      <el-button
        :loading="downLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >{{ '导出' }}</el-button>
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
      <el-table-column align="center" label="报表日期" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.tjrq }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="客户名称">
        <span>{{ '南京乾璟通网络科技有限公司' }}</span>
      </el-table-column>
      <el-table-column width="180px" align="center" label="总数量">
        <template slot-scope="scope">
          <span>{{ scope.row.zsl }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="应答量">
        <template slot-scope="scope">
          <span>{{ scope.row.ydl }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="合计费用（元）">
        <template slot-scope="scope">
          <span>{{ scope.row.zfy }}</span>
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
import { fetchList } from '@/api/report'
import { parseTime } from '@/utils/index'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const lxOptions = [
  { key: '1', display_name: '日报' },
  { key: '2', display_name: '月报' }
]
export default {
  name: 'ReportYzmList',
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
      lxOptions,
      total: 0,
      listLoading: true,
      downLoading: false,
      listQuery: {
        calltype: '14',
        pageNum: 1,
        pageSize: 10,
        caller: '',
        called: '',
        durationConditon: '',
        startTime: '',
        endTime: ''
      },
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.listQuery.endTime !== '') {
            return time.getTime() > Date.now() || parseTime(time.getTime(), '{y}{m}{d}') > this.listQuery.endTime
          } else {
            return time.getTime() > Date.now()
          }
        }
      },
      pickerOptions1: {
        disabledDate(time) {
          // if (this.listQuery.startTime !== '') {
          //   return time.getTime() > Date.now() || parseTime(time.getTime(), '{y}{m}{d}') < this.listQuery.startTime
          // } else {
          return time.getTime() > Date.now()
          // }
        }
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
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    },
    handleDownload() {
      window.open(process.env.BASE_API + '/bill/report?calltype=' + this.listQuery.calltype +
        '&endTime=' + this.listQuery.endTime +
        '&startTime=' + this.listQuery.startTime, '_blank')
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
