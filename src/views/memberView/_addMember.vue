<template>
  <el-dialog
    title="会员新增"
    :visible="dialogVisible"
    @update:visible="updateVisible"
    width="500px"
    :lock-scroll="true">
    <el-form v-model="addForm" ref="addForm" :rules="rules" label-position="left" label-width="100px">
        <el-form-item label="会员联系人">
            <el-input v-model="addForm.cntctPrsn"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
            <el-input v-model="addForm.phone2"></el-input>
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
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rules: {
        cntctPrsn: [
          { required: true, message: "请输入会员联系人", trigger: "blur" }
        ],
        phone2: [{ required: true, message: "请输入联系电话", trigger: "blur" }]
      },
      addForm: {
        cntctPrsn: "",
        phone2: ""
      }
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
      hyRegister: "hyRegister/post"
    }),
    updateVisible(event) {
      this.$emit("update:visible", event);
    },
    async confirm() {
      let res = await this.hyRegister(this.addForm);
      this.$message.success(res.msg);
      this.updateVisible(false);
      this.$emit("success");
    }
  }
};
</script>
<style>
</style>