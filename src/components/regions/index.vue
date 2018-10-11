<template>
  <el-cascader
    :options="options"
    v-model="selectedOptions"
    @change="handleChange"
    :props="props">
  </el-cascader>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      props: {
        // value: "id",
        label: "name"
      },
      options: [],
      selectedOptions: []
    };
  },

  components: {},

  computed: {},

  created() {
    this.getOptions();
  },

  mounted() {},

  methods: {
    getOptions() {
      axios
        .get(
          "http://s3.jzez100.com/s2/4/06/d7/2d92625d782402ef191eaed5a96b6ca06ad11f9e60fc619101d26d6ab0c.json"
        )
        .then(res => {
          this.options = this.optionHandle(res.data);
        })
        .catch(err => {});
    },
    optionHandle(data) {
      data.forEach(pro => {
        pro.children = pro.citys;
        pro.value = {
          name: pro.name,
          id: pro.id,
          level: pro.level
        };
        delete pro.citys;
        pro.children.forEach(city => {
          city.children = city.area;
          city.value = {
            name: city.name,
            id: city.id,
            level: city.level
          };
          delete city.area;
          city.children.forEach(area => {
            area.name = area.area;
            area.value = {
              name: area.name,
              id: area.id,
              level: area.level
            };
            delete area.area;
          });
        });
      });
      return data;
    },
    handleChange() {
        this.$emit('change',this.selectedOptions)
    }
  }
};
</script>
<style>
</style>