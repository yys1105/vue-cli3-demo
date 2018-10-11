export default {
    props: {
        visible: {
            type: Boolean,
            default: false
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
        },
        confirm() {
            this.$emit("comfirm");
        },
        cancel() {
            this.$emit("cancel");
            this.updateVisible(false);
        }
    }
}