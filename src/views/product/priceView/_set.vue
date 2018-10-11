<template>
    <el-dialog title="商品价格设置" :visible="dialogVisible" @update:visible="updateVisible" width="800px" :lock-scroll="true">
        <el-form :model="form" label-width="120px">
            <el-form-item label="产品编码">
                {{data.ItemCode}}
            </el-form-item>
            <el-form-item label="产品信息">
                <div v-if="data.ItemName">{{data.ItemName}}</div>
                <div v-if="data.Spec">规格：{{data.Spec}}</div>
                <div v-if="data.U_Series">系列：{{data.U_Series}}</div>
                <div v-if="data.U_MQuality">材质：{{data.U_MQuality}}</div>
                <div v-if="data.U_UnitPackModel">包装规格：{{data.U_UnitPackModel}}</div>
                <div v-if="data.SalUnitMsr">单位：{{data.SalUnitMsr}}</div>
            </el-form-item>
            <el-form-item label="标准价">
                {{form.data.standPrice | num2money}}元
            </el-form-item>
            <el-form-item label="是否爆品">
                <div v-if="data.canSetHot==1">
                    <el-radio v-model="submitForm.ishot" :label="1" @change="ishotChange">是</el-radio>
                    <el-radio v-model="submitForm.ishot" :label="0" @change="ishotChange">否</el-radio>
                </div>
                <div v-else>--</div>
            </el-form-item>
            <el-form-item label="服务商价毛利率">
                <el-radio v-for="item in fgrossList" :key="item.id" v-model="submitForm.fgross" :label="item.grossrate" @change="fgrossChange">{{item.grossrate+'%'}}</el-radio>
            </el-form-item>
            <el-form-item label="服务商价">
                {{fprice | num2money}}元
            </el-form-item>
            <el-form-item label="销售价毛利率">
                <el-radio v-for="item in sgrossList" :key="item.id" v-model="submitForm.sgross" :label="item.grossrate">{{item.grossrate+'%'}}</el-radio>
            </el-form-item>
            <el-form-item label="销售价">
                {{sprice | num2money}}元
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <slot name="footer">
                <el-button size="small" @click="cancel">取 消</el-button>
                <el-button size="small" type="primary" @click="confirm">确 定</el-button>
            </slot>
        </span>
    </el-dialog>
</template>

<script>
import dialog from "@/components/dialog/dialog.js";
import { mapGetters, mapActions } from "vuex";
export default {
  mixins: [dialog],
  props: {
    data: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      searchParams: {
        itemcode: this.data.ItemCode,
        itemname: this.data.ItemName,
        spec: this.data.Spec,
        uSeries: this.data.U_Series,
        uMquality: this.data.U_MQuality,
        ishot: this.data.ishot,
        grossId: this.data.grossId
      },
      fgrossList: [],
      sgrossList: [],
      submitForm: {
        ishot: 0,
        fgross: 0,
        sgross: 0,
        fprice: 0,
        sprice: 0,
        itemcode: this.data.ItemCode,
        grossid: this.data.grossid,
        id: this.data.fgrossId,
        grossid: this.data.grossId
      }
    };
  },

  components: {},

  computed: {
    ...mapGetters({
      form: "fgrossGross/data"
    }),
    fprice: function() {
      let fprice =
        this.form.data.standPrice *
        this.data.fPriceFucRatio /
        (1 - this.submitForm.fgross/100);
      this.submitForm.fprice = fprice;
      return fprice;
    },
    sprice: function() {
      let sprice =
        this.form.data.standPrice *
        0.8 /
        (1 - this.submitForm.fgross/100) /
        (1 - this.submitForm.sgross/100);
      this.submitForm.sprice = sprice;
      return sprice;
    }
  },

  created() {
    this.getData();
  },

  mounted() {},

  methods: {
    ...mapActions({
      fgrossGross: "fgrossGross/getByParams",
      providerFgrossPut: "providerFgross/put"
    }),
    async getData() {
      let res = await this.fgrossGross(this.searchParams);
      await this.setData();
    },
    async confirm() {
      let res = await this.providerFgrossPut(this.submitForm);
      this.$message.success(res.msg);
      this.updateVisible(false);
      this.$emit("success");
    },
    fgrossChange(val) {
      let arr = this.fgrossList.filter(item => item.grossrate == val)[0].sgross;
      this.sgrossList = arr;
      this.submitForm.sgross = (arr[0] && arr[0].grossrate) || 0;
    },
    ishotChange(val) {
      this.fgrossList =
        val == 1
          ? this.form.data.fgross
          : this.form.data.fgross.filter(item => item.ishot == 0);
        if(this.fgrossList.map(item => item.grossrate).indexOf(this.submitForm.fgross)==-1){
            this.submitForm.fgross = this.fgrossList[0].grossrate
        }
    },
    setData() {
      this.submitForm.ishot = this.data.ishot;
      this.fgrossList =
        this.data.ishot == 1
          ? this.form.data.fgross
          : this.form.data.fgross.filter(item => item.ishot == 0);

      this.submitForm.fgross =
        this.data.facilitatorGross ||
        (this.fgrossList[0] && this.fgrossList[0].grossrate) ||
        0;

      this.sgrossList = this.fgrossList.filter(
        item => item.grossrate == this.submitForm.fgross
      )[0].sgross;

      this.submitForm.sgross =
        this.data.salGross ||
        (this.sgrossList[0] && this.sgrossList[0].grossrate) ||
        0;
    }
  }
};
</script>
<style>
</style>