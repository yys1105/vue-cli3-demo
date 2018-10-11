export default {
    props: {
        maxHeight: {
            type: String,
            default: "-1"
        },
        name: {
            type: String,
            default: "table",
            required: true
        },
        border: {
            type: Boolean,
            default: false
        },
        highlight: {
            type: Boolean,
            default: true
        },
        datas: {
            type: Array,
            default: function () {
                return []
            }
        },
        stripe: {
            type: Boolean,
            default: true
        },
        showHeader: {
            type: Boolean,
            default: true
        },
        // 是否开启复选框
        select: {
            // 复选开启
            default: false,
            type: Boolean
        },
         // 是否开启序号
        index: {
            // 复选开启
            default: false,
            type: Boolean
        },
        // 复选框状态函数
        selectFun: {
            default: function () { return true },
            type: Function
        },
        
    },
    methods: {
        // 单项被选择
        selectItem(selection, row) {
            this.$emit("selectChange", row, selection);
        },
        // 全选
        selectAll(selection) {
            this.$emit("selectChange", null, selection);
        },
        // 复选变化
        selectionChange(selection) {
            this.$emit("selectChange", null, selection);
        },
        renderHeader(h, { column, $index }) {
            return (
                <span>{column.label}</span>
            )
        },
    }
}