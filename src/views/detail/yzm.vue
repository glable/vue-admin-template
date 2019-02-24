<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom:5px;">
      <span>主叫号码:</span>
      <el-input
        v-model="listQuery.caller"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <span>拨打号码:</span>
      <el-input
        v-model="listQuery.called"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <span>呼叫时长:</span>
      <el-select
        v-model="listQuery.durationConditon"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in durationOptions"
          :key="item.key"
          :label="item.display_name"
          :value="item.key"
        />
      </el-select>
      <span>呼叫时间:</span>
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
      <el-table-column align="center" label="客户名称">
        <template slot-scope="scope">
          <span>{{ '南京乾璟通网络科技有限公司' }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="主叫号码">
        <template slot-scope="scope">
          <span>{{ scope.row.caller }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="拨打号码">
        <template slot-scope="scope">
          <span>{{ scope.row.called }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="呼叫时间">
        <template slot-scope="scope">
          <span>{{ scope.row.calltime }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="呼叫时长">
        <template slot-scope="scope">
          <span>{{ scope.row.duration }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="呼叫结果">
        <template slot-scope="scope">
          <span>{{ '正常挂机' }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="计费(元)">
        <template slot-scope="scope">
          <span>{{ scope.row.cost }}</span>
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
import { fetchList } from '@/api/bill'
import { parseTime } from '@/utils/index'

import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const durationOptions = [
  { key: 'is not null ', display_name: '全部' },
  { key: '=0 ', display_name: '等于0' },
  { key: ' between 0 and 10 ', display_name: '0s到10s' },
  { key: ' between 11 and 30 ', display_name: '11s到30s' },
  { key: ' >30 ', display_name: '大于30s' }
]
export default {
  name: 'BillList',
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
      durationOptions,
      total: 0,
      listLoading: true,
      downLoading: false,
      listQuery: {
        calltype: '13',
        pageNum: 1,
        pageSize: 10,
        caller: '',
        called: '',
        durationConditon: '',
        startTime: parseTime(Date.now()-7*24*60*60*1000, '{y}{m}{d}'),
        endTime: parseTime(Date.now(), '{y}{m}{d}')
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
      window.open(process.env.BASE_API + '/bill/excel?caller=' + this.listQuery.caller + '&called=' + this.listQuery.called +
        '&endTime=' + this.listQuery.endTime + '&durationConditon=' + this.listQuery.durationConditon +
        '&startTime=' + this.listQuery.startTime + '&calltype=' + this.listQuery.calltype, '_blank')
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
