<template>
  <el-dialog
    title="会员详情"
    :visible="dialogVisible"
    @update:visible="updateVisible"
    width="800px"
    :lock-scroll="true">

    <panel :icon="'icon-huiyuanxinxi'" title="会员信息">
        <el-row>
            <el-col :span="12">
                <div class="form-item">
                   会员卡号：{{data.cardcode}}
                </div>
            </el-col>
            <el-col :span="12">
                <div class="form-item">
                   归属服务商：{{data.uFacilitatorName}}
                   <!-- TODO: -->
                </div>
            </el-col>
            <el-col :span="12">
                <div class="form-item">
                   公司名称：{{data.cardname}}
                </div>
            </el-col>
            <el-col :span="12">
                <div class="form-item">
                   合同有效期：{{data.uTerm | dateFormate('yyyy-mm-dd')}} 至 {{data.uToterm | dateFormate('yyyy-mm-dd')}}
                </div>
            </el-col>
        </el-row>
    </panel>

    <panel :icon="'icon-huiyuanxinxi'" title="联系信息">
        <el-row>
            <el-col :span="12">
                <div class="form-item">
                   企业负责人：{{data.cntctprsn}}
                </div>
            </el-col>
            <el-col :span="12">
                <div class="form-item">
                    统一社会信用代码：
                    <!-- TODO: -->
                </div>
            </el-col>
            <el-col :span="12">
                <div class="form-item">
                   企业地址：{{data.street}}
                </div>
            </el-col>
            <el-col :span="12">
                <div class="form-item">
                   联系电话：{{data.phone2}}
                </div>
            </el-col>
        </el-row>
    </panel>

    <panel :icon="'icon-huiyuanxinxi'" title="商品信息">
        <el-row>
            <el-col :span="12">
                <div class="form-item">
                   可售商品总量：{{data.maxProductNum1+data.maxProductNum2}}
                </div>
            </el-col>
            <el-col :span="12">
                <div class="form-item">
                   已售商品总量：{{data.currProductNum1+data.currProductNum2}}
                </div>
            </el-col>
            <el-col :span="12">
                <div class="form-item">
                   可售商品上限（通用类）：{{data.maxProductNum1}}
                </div>
            </el-col>
            <el-col :span="12">
                <div class="form-item">
                   可售商品上限（个性类）：{{data.maxProductNum2}}
                </div>
            </el-col>
            <el-col :span="12">
                <div class="form-item">
                   当前销售数量（通用类）：{{data.currProductNum1}}
                </div>
            </el-col>
            <el-col :span="12">
                <div class="form-item">
                   当前销售数量（个性类）：{{data.currProductNum2}}
                </div>
            </el-col>
        </el-row>
    </panel>
    
    </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {};
  },

  components: {},

  computed: {
    dialogVisible() {
      return this.visible;
    }
  },

  created() {},

  mounted() {},

  methods: {
    updateVisible(event) {
      this.$emit("update:visible", event);
    }
  }
};
</script>
<style lang="stylus" scoped>
.form-item
    height 40px
    line-height 28px
</style>
