<template>
    <el-dialog title="修改密码" :visible="dialogVisible" @update:visible="updateVisible" width="400px" :lock-scroll="true">
        <el-form :model="form" status-icon :rules="rules" ref="form" :label-position="'right'" label-width="80px">
            <el-form-item label="原密码:" prop="oldPassword">
                <el-input v-model="form.oldPassword" type="password" placeholder="请输入原密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码:" prop="newPassword">
                <el-input v-model="form.newPassword" type="password" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="newPassword2">
                <el-input v-model="form.newPassword2" type="password" placeholder="请输入确认密码"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import dialog from "@/components/dialog/dialog.js";
export default {
  mixins: [dialog],
  data() {
    var validateoldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入原密码！"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码！"));
      } else {
        if (this.form.newPassword !== "") {
          this.$refs.form.validateField("newPassword2");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码！"));
      } else if (value !== this.form.newPassword) {
        callback(new Error("两次输入密码不一致！"));
      } else {
        callback();
      }
    };
    return {
      form: {
        newPassword: "",
        newPassword2: "",
        oldPassword: ""
      },
      rules: {
        oldPassword: [{ validator: validateoldPass, trigger: "blur" }],
        newPassword: [{ validator: validatePass, trigger: "blur" }],
        newPassword2: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },

  components: {},

  computed: {},

  created() {},

  mounted() {},

  methods: {
    ...mapActions({
      resetPw: "resetPw/post"
    }),
    async confirm() {
      await this.$refs.form.validate();
      await this.resetPw(this.form);
      await this.$alert("密码修改成功，请重新登录！", "提示", {
        confirmButtonText: "确定"
      });
      this.$router.push({ path: "/login" });
    }
  }
};
</script>
<style lang="stylus" scoped>
</style>
