<template>
    <div class="table_ord">
        <el-table class="main_table" :data="tableData" :span-method="colspanHandle" style="width: 100%">
            <el-table-column v-if="selection" type="selection" width="55" class="table_row">
            </el-table-column>
            <el-table-column v-for="(item,index) in heads" :key="index" :label="item.label" :width="item.width">
                <template slot-scope="scope">
                    <div v-if="index==0" class="table_row">
                        <div class="table_header">
                            <slot name="tableHeader" :info="scope.row">
                                <span class="item">2018-06-02</span>
                                <span class="item">订单号：
                                    <span class="order" @click="detail_handle">FZX0000000000</span>
                                </span>
                                <span class="item">客户姓名：李霞</span>
                                <span class="item">手机号：18525822155852</span>
                                <div style="float:right;margin-right:20px;">
                                    <el-button v-if="status!=10" size="small" icon="el-icon-delete">关闭</el-button>
                                </div>
                            </slot>
                        </div>

                        <table class="custable">
                            <tr v-for="(rowitem,idx) in scope.row.data" :key="idx">
                                <td v-for="(sitem,i) in heads[0].subHeads" :key="i" :width="sitem.width">

                                    <div v-if="sitem.type == 'pro'">

                                    </div>

                                    <div v-else-if="sitem.type == 'proInfo'">
                                        <div class="imgBox">
                                            <img v-if="rowitem.imgUrl" :src="rowitem.imgUrl" :alt="rowitem.itemname">
                                            <img v-else :src="tempimg" :alt="rowitem.itemname">
                                            <div style="display:inline-block;margin-left:10px;">
                                                <div>{{rowitem.itemcode}}</div>
                                                <div>{{rowitem.itemname}} {{rowitem.spec}}</div>
                                                <div>{{rowitem.uBrand}} {{rowitem.uModle}}</div>
                                                <div>{{rowitem.uSeries}} {{rowitem.uMquality}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else-if="sitem.type=='salunitmsr'">
                                        {{rowitem[sitem.labelName]}} {{rowitem[sitem.labelName]?rowitem.salunitmsr:''}}
                                    </div>
                                    <div v-else-if="sitem.type=='orderPending'">
                                        <div class="shenqing">
                                            申请数量：{{rowitem.quantity}} {{rowitem.salunitmsr}}
                                        </div>
                                        <div class="chuli">
                                            处理数量：{{rowitem.quantityProcessed}} {{rowitem.salunitmsr}}
                                        </div>
                                        <div class="zuofei">
                                            作废数量：{{rowitem.quantityCancel}} {{rowitem.salunitmsr}}
                                        </div>
                                    </div>
                                    <div v-else-if="sitem.type=='quantity'">{{rowitem.quantity}} {{rowitem.salunitmsr}}</div>
                                    <div v-else>
                                        <template v-if="sitem.isUpd">
                                            <el-input type="number" style="margin:0 10px; width:200px" v-model="rowitem[sitem.labelName]" @blur="quantity_blur_handle(rowitem,sitem.labelName)">
                                                <template slot="append">{{rowitem.salunitmsr}}</template>
                                            </el-input>
                                        </template>
                                        <template v-else>
                                            {{rowitem[sitem.labelName]}}
                                        </template>
                                    </div>

                                </td>
                            </tr>
                        </table>

                        <div style="text-align: left;background: #F5F5F5;">
                            <slot name="tableFooter" :info="scope.row">
                            </slot>
                        </div>

                    </div>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
import temp from "~/assets/images/temp.jpg";
export default {
  props: {
    heads: {
      type: Array,
      default: function() {
        return [];
      }
    },
    tableData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    status: {
      type: Number,
      default: 0
    },
    //是否显示表格多选
    selection: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tempimg: temp
      // hasTableHeaderSlot: true
    };
  },
  methods: {
    quantity_blur_handle(row, name) {
      if (parseFloat(row[name]) < 0) row[name] = 0;
      else row[name] = parseFloat(row[name]).toFixed(3) * 1;
    },
    colspanHandle({ row, column, rowIndex, columnIndex }) {
      // return { rowspan: 1, colspan: this.heads.length };
      if (this.selection) {
        if (columnIndex === 0) {
          return { rowspan: 1, colspan: 1 };
        } else if (columnIndex === 1) {
          return { rowspan: 1, colspan: this.heads.length };
        }
      } else {
        return { rowspan: 1, colspan: this.heads.length };
      }
    },
    detail_handle() {
      this.$router.push({ path: "/ma/ord/1" });
    }
  },
  beforeMount() {
    // this.hasTableHeaderSlot = !!this.$slots.tableHeader
  }
};
</script>
<style>
.table_ord .el-table::before {
  height: 0;
}
.table_ord .el-table th {
  background-color: #f5f5f5;
}
.table_ord .main_table {
  border: 0;
}
.table_ord .table_row .el-table__header-wrapper {
  display: none;
}
.table_ord .el-table td {
  border: 0;
  text-align: center;
}
.table_ord .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #fff;
}
</style>

<style scoped>
.table_row {
  min-height: 100px;
  margin: 0 -10px;
}

.table_row .table_header {
  min-height: 45px;
  line-height: 43px;
  background-color: #f5f5f5;
  border-top: 1px solid #e5e5e5;
  border-left: 1px solid #e5e5e5;
  border-right: 1px solid #e5e5e5;
  /*   margin: 0 -10px; */
  text-align: left;
}
.table_row .table_header .item {
  margin-left: 20px;
}
.table_row .table_header .order {
  color: #409eff;
  cursor: pointer;
}
.table_row .el-table__header-wrapper {
  display: none;
}
.table_ord .custable {
  width: 100%;
  border: 1px solid #e5e5e5;
  border-collapse: collapse;
}
.table_ord .custable td {
  border: 1px solid #e5e5e5;
}
.table_ord .table_form {
  width: 100%;
  margin-top: 10px;
}
.table_ord .table_form .table_form_item {
  display: inline-block;
  margin-right: 20px;
}
.table_ord .imgBox {
  padding-left: 10px;
  text-align: left;
}
.table_ord .imgBox img {
  width: 80px;
  height: 80px;
}
.shenqing {
  background-color: #e8f5ff;
  color: #20a0ff;
  margin: 5px 10px;
  border-radius: 4px;
}
.chuli {
  background-color: #e7faef;
  color: #13ce66;
  margin: 5px 10px;
  border-radius: 4px;
}
.zuofei {
  background-color: #fef8e9;
  color: #f7ba2a;
  margin: 5px 10px;
  border-radius: 4px;
}
</style>
