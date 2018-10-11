<!-- 搜索组件 -->
<template>
  <div class="search">
    <!-- <el-form :inline="inline" :model="searchParams" class="demo-form-inline" :label-position="labelPosition">

            <el-form-item v-for="item in searchOption" :label="item.label" :key="item.label">
                <template v-if="item.type=='select'">
                    <el-select v-model="searchParams[item.key]" :size="size" @change="changeValue">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="opt in item.option" :key="opt.value" :label="opt.label" :value="opt.value"></el-option>
                    </el-select>
                </template>

                <template v-else-if="item.keys&&item.type=='dateRange'">
                    <el-date-picker
                        v-model="otherParam[item.keys.join('_')]"
                        type="daterange"
                        :size="size"
                        range-separator="至"
                        start-placeholder="开始日期"
                        value-format="yyyy-MM-dd"
                        end-placeholder="结束日期" @change="(arr)=>dateChangeValue(arr,item.keys)">
                    </el-date-picker>
                </template>

                <template v-else-if="item.key&&item.type=='dateRange'">
                    <el-date-picker
                        v-model="otherParam[item.key]"
                        type="daterange"
                        :size="size"
                        range-separator="至"
                        start-placeholder="开始日期"
                        value-format="yyyy-MM-dd"
                        end-placeholder="结束日期" @change="(arr)=>dateToStr(arr,item.key)">
                    </el-date-picker>
                </template>

                <template v-else-if="item.type=='category'">
                  <el-select v-model="searchParams[item.keys[0]]" :size="size" style="width:130px;" @change="(id) => setFirmcodeOpt(id,item.keys)">
                    <el-option v-for="(item,index) in ItmsgrpcodOpt" :key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                  <el-select v-model="searchParams[item.keys[1]]" :size="size" style="width:130px;" @change="(id) => setCodeOpt(id,item.keys)">
                    <el-option v-for="(item,index) in FirmcodeOpt" :key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                  <el-select v-model="searchParams[item.keys[2]]" :size="size" style="width:130px;">
                    <el-option v-for="(item,index) in CodeOpt" :key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </template>

                <template v-else>
                    <el-input v-model="searchParams[item.key]" @change="changeValue" :size="size"></el-input>
                </template>
            </el-form-item>

            
            <el-form-item>
                <el-button type="primary" @click="onSubmit" :size="size">查询</el-button>
            </el-form-item>
            <slot></slot> 

            <div style="float:right">
              <el-form-item>
                <slot name="right"></slot>
              </el-form-item>
            </div>
            
        </el-form> -->
    <div class="params">
      <div class="base panel">
        <div class="item" v-for="(item,index) in searchOption" :key="item.label" v-if="index<3">
          <span class="label">{{item.label}}</span>
          <div>
            <template v-if="item.type=='select'">
              <el-select v-model="searchParams[item.key]" :size="size" @change="changeValue" style="width: 183px;">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="opt in item.option" :key="opt.value" :label="opt.label" :value="opt.value"></el-option>
              </el-select>
            </template>

            <template v-else-if="item.keys&&item.type=='dateRange'">
              <el-date-picker v-model="otherParam[item.keys.join('_')]" type="daterange" :size="size" range-separator="至" start-placeholder="开始日期" value-format="yyyy-MM-dd" end-placeholder="结束日期" @change="(arr)=>dateChangeValue(arr,item.keys)">
              </el-date-picker>
            </template>

            <template v-else-if="item.key&&item.type=='dateRange'">
              <el-date-picker v-model="otherParam[item.key]" type="daterange" :size="size" range-separator="至" start-placeholder="开始日期" value-format="yyyy-MM-dd" end-placeholder="结束日期" @change="(arr)=>dateToStr(arr,item.key)">
              </el-date-picker>
            </template>

            <template v-else-if="item.type=='category'">
              <el-select v-model="searchParams[item.keys[0]]" :size="size" style="width:130px;" @change="(id) => setFirmcodeOpt(id,item.keys)">
                <el-option v-for="(item,index) in ItmsgrpcodOpt" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <el-select v-model="searchParams[item.keys[1]]" :size="size" style="width:130px;" @change="(id) => setCodeOpt(id,item.keys)">
                <el-option v-for="(item,index) in FirmcodeOpt" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <el-select v-model="searchParams[item.keys[2]]" :size="size" style="width:130px;">
                <el-option v-for="(item,index) in CodeOpt" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </template>

            <template v-else>
              <el-input v-model="searchParams[item.key]" @change="changeValue" :size="size"></el-input>
            </template>
          </div>
        </div>
      </div>
      <div class="more panel" v-show="telescopic">
        <div class="item" v-for="(item,index) in searchOption" :key="item.label" v-if="index>=3">
          <span class="label">{{item.label}}</span>
          <div>
            <template v-if="item.type=='select'">
              <el-select v-model="searchParams[item.key]" :size="size" @change="changeValue">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="opt in item.option" :key="opt.value" :label="opt.label" :value="opt.value"></el-option>
              </el-select>
            </template>

            <template v-else-if="item.keys&&item.type=='dateRange'">
              <el-date-picker v-model="otherParam[item.keys.join('_')]" type="daterange" :size="size" range-separator="至" start-placeholder="开始日期" value-format="yyyy-MM-dd" end-placeholder="结束日期" @change="(arr)=>dateChangeValue(arr,item.keys)">
              </el-date-picker>
            </template>

            <template v-else-if="item.key&&item.type=='dateRange'">
              <el-date-picker v-model="otherParam[item.key]" type="daterange" :size="size" range-separator="至" start-placeholder="开始日期" value-format="yyyy-MM-dd" end-placeholder="结束日期" @change="(arr)=>dateToStr(arr,item.key)">
              </el-date-picker>
            </template>

            <template v-else-if="item.type=='category'">
              <el-select v-model="searchParams[item.keys[0]]" :size="size" style="width:130px;" @change="(id) => setFirmcodeOpt(id,item.keys)">
                <el-option v-for="(item,index) in ItmsgrpcodOpt" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <el-select v-model="searchParams[item.keys[1]]" :size="size" style="width:130px;" @change="(id) => setCodeOpt(id,item.keys)">
                <el-option v-for="(item,index) in FirmcodeOpt" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <el-select v-model="searchParams[item.keys[2]]" :size="size" style="width:130px;">
                <el-option v-for="(item,index) in CodeOpt" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </template>

            <template v-else>
              <el-input v-model="searchParams[item.key]" @change="changeValue" :size="size"></el-input>
            </template>
          </div>
        </div>
        <slot></slot>
      </div>
    </div>
    <div class="btn">
      <el-button type="primary" @click="onSubmit" :size="size">查询</el-button>
      <el-button type="text" :size="size" v-if="moreFlag" @click="telescopic = !telescopic">{{telescopic?'收起':'更多'}}</el-button>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    inline: {
      type: Boolean,
      default: true
    },
    labelPosition: {
      type: String,
      default: "left"
    },
    size: {
      type: String,
      default: "small"
    },
    searchParams: {
      type: Object,
      default: function() {
        return {};
      }
    },
    searchOption: {
      type: Array,
      default: function() {
        return [{ label: "查询名称", name: "name" }];
      }
    }
  },
  data() {
    return {
      otherParam: {},
      rows: Math.ceil(this.searchOption.length / 3),
      ItmsgrpcodOpt: [{ name: "全部", id: "" }],
      FirmcodeOpt: [{ name: "全部", id: "" }],
      CodeOpt: [{ name: "全部", id: "" }],
      moreFlag: this.searchOption.length > 3 ? true : false,
      telescopic: false
    };
  },
  components: {},

  computed: {
    form: function() {
      return {};
    }
  },

  created() {
    this.searchOption.forEach(x => {
      if (x.type == "dateRange") {
        if (x.keys) this.$set(this.otherParam, x.keys.join("_"), []);
      }
      if (x.type == "category") {
        this.setItmsgrpcodOpt("0");
      }
    });
  },

  mounted() {},

  methods: {
    ...mapActions({
      getCategory: "productCategory/getById"
    }),
    async setItmsgrpcodOpt(id) {
      let res = await this.getCategory(id);
      this.ItmsgrpcodOpt = [{ id: "", name: "全部" }].concat(res.data);
    },
    async setFirmcodeOpt(id, keys) {
      this.FirmcodeOpt = [];
      this.searchParams[keys[1]] = "";
      this.CodeOpt = [];
      this.searchParams[keys[2]] = "";
      if (id === "") {
        return false;
      }
      let res = await this.getCategory(id);
      this.FirmcodeOpt = [{ id: "", name: "全部" }].concat(res.data);
    },
    async setCodeOpt(id, keys) {
      this.CodeOpt = [];
      this.searchParams[keys[2]] = "";
      if (id === "") {
        return false;
      }
      let res = await this.getCategory(id);
      this.CodeOpt = [{ id: "", name: "全部" }].concat(res.data);
    },
    changeValue(val) {
      this.$emit("update:searchParams", this.searchParams);
    },
    dateChangeValue(arr, keys) {
      keys.forEach((key, index) => {
        this.searchParams[key] = arr ? arr[index] : "";
      });

      this.$emit("update:searchParams", this.searchParams);
    },
    dateToStr(arr, key) {
      this.searchParams[key] = arr ? arr.join(" - ") : "";
      this.$emit("update:searchParams", this.searchParams);
    },
    onSubmit() {
      this.$emit("search");
    }
  }
};
</script>
<style lang="stylus" scoped>
.search
  margin 10px 0 10px 0
  display flex
  align-items center
  position relative
  .params
    .panel
      display flex
      align-items center
    .item
      display flex
      align-items center
      margin-right 10px
      .label
        padding 0 10px
        min-width 65px
    .more
      margin-top 10px
      max-width 1000px
      flex-wrap wrap
      .item
        margin-bottom: 10px;
  .btn
    align-self flex-start
    flex 1
  .right
    align-self flex-start
</style>
