<template>
  <el-dialog
    title="设置销售范围"
    :visible="dialogVisible"
    @update:visible="updateVisible"
    width="850px"
    :lock-scroll="true">
    <div class="transfer">
        <div class="left">
            <div>可售会员：</div>
            <member-table :key="tableKey" :type='1' :productId="data.id" :singleOpr="singleOpr" @selectChange="(list)=> {availableList = list}"></member-table>
        </div>
        <div class="middle">
            <div>
                <el-button type="danger" size="small" @click="setBanned">禁售<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </div>
            <div>
                <el-button type="primary" icon="el-icon-arrow-left" size="small" @click="setAvailable">可售</el-button>
            </div>
        </div>
        <div class="right">
            <div>禁售会员：</div>
            <member-table :key="tableKey" :type='2' :productId="data.id" :singleOpr="singleOpr" @selectChange="(list)=> {bannedList = list}"></member-table>
        </div>
    </div>
    </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MemberTable from "./_memberTable";
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
    },
    singleOpr: {
      type: Boolean,
      default: true
    },
    datas: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      availableList: [],
      bannedList: [],
      tableKey: false
    };
  },

  components: { MemberTable },

  computed: {
    dialogVisible() {
      return this.visible;
    }
  },

  created() {},

  mounted() {},

  methods: {
    ...mapActions({
      providerDenySpu: "providerDenySpu/put"
    }),
    updateVisible(event) {
      this.$emit("update:visible", event);
    },
    async confirm() {
      this.updateVisible(false);
      this.$emit("success");
    },
    async setBanned() {
      let values = this.availableList.map(item => {
        return {
          cardcode: item.cardcode,
          productCode: this.data.code,
          productId: this.data.id,
          type: this.data.type
        };
      });
      let res = await this.providerDenySpu({
        operatetype: 2,
        values
      });
      this.$message.success(res.msg);
      this.tableKey = !this.tableKey;
    },
    async setAvailable() {
      let values = this.bannedList.map(item => {
        return {
          cardcode: item.cardcode,
          productCode: this.data.code,
          productId: this.data.id,
          type: this.data.type
        };
      });
      let res = await this.providerDenySpu({
        operatetype: 1,
        values
      });
      this.$message.success(res.msg);
      this.tableKey = !this.tableKey;
    }
  }
};
</script>
<style lang="stylus" scoped>
.transfer
    display flex
    align-items center
    .left, .right
        flex 1
        align-self flex-start
    .middle
        width 90px
        padding 10px
        &>div:first-child
            margin-bottom 10px
</style>
