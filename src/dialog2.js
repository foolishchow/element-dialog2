import mixin from './render';
export default {
    mixins: [mixin],
    name: 'el-dialog2',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        modal: {
            type: Boolean,
            default: true
        },
        modalAppendToBody: {
            type: Boolean,
            default: true
        },
        lockScroll: {
            type: Boolean,
            default: true
        },
        closeOnClickModal: {
            type: Boolean,
            default: false
        },
        closeOnPressEscape: {
            type: Boolean,
            default: true
        },
        showClose: {
            type: Boolean,
            default: true
        },
        size: {
            type: String,
            default: 'small'
        },
        customClass: {
            type: String,
            default: ''
        },
        top: {
            type: String,
            default: '15%'
        }
    },
    data() {
        return {};
    },
    render(h) {
        if (this.value) {
            return h('div', {
                staticClass: "el-dialog2"
            });
        } else {
            return null;
        }
    }
}
