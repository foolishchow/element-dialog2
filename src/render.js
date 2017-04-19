import dialog from './util';
let cache = {};
const newVue = function(self) {
    var instance = new Vue({
        data: {
            obj: self
        },
        render(h) {
            var slots = [];
            if (this.obj.$slots.default) slots.push(this.obj.$slots.default);
            if (this.obj.$slots.footer) slots.push(h('div', { slot: 'footer' }, [this.obj.$slots.footer]));
            return h(
                'el-dialog', {
                    attrs: {
                        'title': this.obj.title,
                        'value': this.obj.value,
                        'modal': this.obj.modal,
                        'modal-append-to-body': this.obj.modalAppendToBody,
                        'top': this.obj.top,
                        'size': this.obj.size,
                        'lock-scroll': this.obj.lockScroll,
                        'custom-class': this.obj.customClass,
                        'close-on-press-escape': this.obj.closeOnPressEscape,
                        'show-close': this.obj.showClose,
                        'close-on-click-modal': this.obj.closeOnClickModal
                    },
                    on: {
                        'open': this.handleOpen,
                        'close': this.handleClose
                    }
                }, [slots]
            );
        },
        methods: {
            handleOpen() {
                // console.info(`[component:el-dialog2:inner-dialog-${self.index}] : open`)
                self.$emit('open')
            },
            handleClose() {
                self.$emit('close')
                self.$emit('input', false)
                    // console.info(`[component:el-dialog2:inner-dialog-${self.index}] : close`)
            }
        }
    });
    return instance;
};
export default {
    destroyed() {
            if (this.index) {
                cache[this.index].$destroy();
                dialog.clear(this.index);
            }
        },
        updated() {
            // console.info(`[component:el-dialog2:index(${this.index})] : updated`);
            // console.info(this.$slots)
            cache[this.index].$forceUpdate();
        },
        created() {
            if (this.index == undefined) {
                this.index = dialog.index();
            }
            // console.info(`[component:el-dialog2:index(${this.index})]  : create`)
        },
        mounted() {
            var root = dialog.get(this.index);
            cache[this.index] = newVue(this);
            cache[this.index].$mount(root)
        }
}
