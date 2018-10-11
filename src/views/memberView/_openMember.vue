<template>
  <el-dialog
    title="会员开通"
    :visible="dialogVisible"
    @update:visible="updateVisible"
    width="540px"
    :lock-scroll="true">
    <el-form :model="openForm" ref="openForm" :rules="rules" label-position="left" label-width="150px" size="small">
        <el-form-item label="会员联系人">
            <!-- <el-input v-model="openForm.cntctPrsn"></el-input> -->
            {{openForm.cntctprsn}}
        </el-form-item>
        <el-form-item label="联系电话">
            <!-- <el-input v-model="openForm.phone2"></el-input> -->
            {{openForm.phone2}}
        </el-form-item>
        <el-form-item label="银行子账号">
            <!-- <el-input v-model="openForm.u_BBank"></el-input> -->
            {{openForm.u_BBank}}
            <!-- TODO:银行子账号字段待确认，未返回 -->
        </el-form-item>
        <el-form-item label="会员名称" prop="cardname">
            <el-input v-model="openForm.cardname"></el-input>
        </el-form-item>
        <el-form-item label="省市区" prop="name">
            <regions-input @change="setRegions"></regions-input>
        </el-form-item>
        <el-form-item label="详细地址">
            <el-input v-model="openForm.street"></el-input>
        </el-form-item>
        <el-form-item label="可售通用类商品上限" prop="maxProductNum1">
            <el-input-number v-model="openForm.maxProductNum1" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="可售个性类商品上限" prop="maxProductNum2">
            <el-input-number v-model="openForm.maxProductNum2" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="合同有效期" prop="u_ToTerm">
            <el-date-picker
                v-model="dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd" @change="setDate"> 
            </el-date-picker>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="updateVisible(false)">取 消</el-button>
        <el-button size="small" type="primary" @click="confirm">确 定</el-button>
    </span>
    </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { hyData } from "@/utils/const.js";
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
    return {
      rules: {
        cardname: [
          { required: true, message: "请输入会员名称", trigger: "blur" }
        ],
        name: [{ required: true, message: "请选择省市区", trigger: "blur" }],
        street: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        maxProductNum1: [
          {
            required: true,
            message: "请输入可售通用类商品上限",
            trigger: "blur"
          }
        ],
        maxProductNum2: [
          {
            required: true,
            message: "请输入可售个性类商品上限",
            trigger: "blur"
          }
        ],
        u_ToTerm: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ]
      },
      openForm: { ...hyData, ...this.data },
      dateRange: []
    };
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
    ...mapActions({
        hyAudit:"hyAudit/put"
    }),
    updateVisible(event) {
      this.$emit("update:visible", event);
    },
    async confirm() {
      await this.$refs.openForm.validate();
      let res = await this.hyAudit(this.openForm)
      this.$message.success(res.msg);
      this.updateVisible(false);
      this.$emit("success");
    },
    setDate(dateRange) {
      this.openForm.u_Term = dateRange[0];
      this.openForm.u_ToTerm = dateRange[1];
    },
    setRegions(arr) {
      this.openForm.name = arr[0].name;
      this.openForm.city = arr[1].name;
      this.openForm.country = arr[2].name;
    }
  }
};
</script>
<style>
</style>