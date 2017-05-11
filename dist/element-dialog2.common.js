'use strict';

var dialogIndex = 0;
var addClass = function addClass(el, cls) {
    if (!el) return;
    var curClass = el.className;
    var classes = (cls || '').split(' ');

    for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.add(clsName);
        } else {
            if (!hasClass(el, clsName)) {
                curClass += ' ' + clsName;
            }
        }
    }
    if (!el.classList) {
        el.className = curClass;
    }
};
var getDialogContainer = function getDialogContainer() {
    var container = document.querySelector('body>#el-dialog-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'el-dialog-container';
        // addClass(container,'el-dialog-container');
        document.querySelector('body').appendChild(container);
    }
    return container;
};
var getDialogRoot = function getDialogRoot(index) {
    var container = getDialogContainer();
    var wrap = document.createElement('div');
    addClass(wrap, 'el-dialog-wrap-' + index);
    var obj = document.createElement('div');
    wrap.appendChild(obj);
    container.appendChild(wrap);
    return obj;
};
var clearDialogRoot = function clearDialogRoot(index) {
    var obj = document.querySelector('body>#el-dialog-container>.el-dialog-wrap-' + index);
    obj.remove();
};
var dialog = {
    get: getDialogRoot,
    clear: clearDialogRoot,
    index: function index() {
        dialogIndex++;
        return dialogIndex;
    }
};

var cache = {};
var newVue = function newVue(self) {
    var instance = new Vue({
        data: {},
        computed: {
            obj: function obj() {
                return self;
            }
        },
        render: function render(h) {
            var slots = [];
            if (this.obj.$slots.title) slots.push(h('div', { slot: 'title' }, [this.obj.$slots.title]));
            if (this.obj.$slots.default) slots.push(this.obj.$slots.default);
            if (this.obj.$slots.footer) slots.push(h('div', { slot: 'footer' }, [this.obj.$slots.footer]));
            return h('el-dialog', {
                attrs: {
                    'title': this.obj.title,
                    'value': this.obj.value,
                    'visible': this.obj.value,
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
                    'close': this.handleClose,
                    'update:visible': this.handleStatus
                }
            }, [slots]);
        },

        methods: {
            handleOpen: function handleOpen() {
                // console.info(`[component:el-dialog2:inner-dialog-${self.index}] : open`)
                self.$emit('open');
            },
            handleClose: function handleClose() {
                // console.info(`[component:el-dialog2:inner-dialog-${self.index}] : close`)
                self.$emit('close');
                self.$emit('input', false);
            },
            handleStatus: function handleStatus(val) {
                var valold = this.obj.value;
                if (val == valold) return;
                if (val) {
                    // self.$emit('open')
                } else {
                    // self.$emit('close')
                    self.$emit('input', false);
                }
            }
        }
    });
    return instance;
};
var mixin = {
    destroyed: function destroyed() {
        if (this.index) {
            cache[this.index].$destroy();
            dialog.clear(this.index);
        }
    },
    updated: function updated() {
        // console.info(`[component:el-dialog2:index(${this.index})] : updated`);
        // console.info(this.$slots)
        cache[this.index].$forceUpdate();
    },
    created: function created() {
        if (this.index == undefined) {
            this.index = dialog.index();
        }
        // console.info(`[component:el-dialog2:index(${this.index})]  : create`)
    },
    mounted: function mounted() {
        var root = dialog.get(this.index);
        cache[this.index] = newVue(this);
        cache[this.index].$mount(root);
    }
};

var ElDialog2$1 = {
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
    data: function data() {
        return {};
    },
    render: function render(h) {
        if (this.value) {
            return h('div', {
                staticClass: "el-dialog2"
            });
        } else {
            return null;
        }
    }
};

if (typeof window !== 'undefined' && window.Vue) {
    Vue.component(ElDialog2$1.name, ElDialog2$1);
}

module.exports = ElDialog2$1;
