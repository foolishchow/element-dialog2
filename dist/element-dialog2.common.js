'use strict';

let dialogIndex = 0;
const addClass = function (el, cls) {
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
const getDialogContainer = function () {
    var container = document.querySelector('body>#el-dialog-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'el-dialog-container';
        // addClass(container,'el-dialog-container');
        document.querySelector('body').appendChild(container);
    }
    return container;
};
const getDialogRoot = function (index) {
    let container = getDialogContainer();
    let wrap = document.createElement('div');
    addClass(wrap, `el-dialog-wrap-${index}`);
    let obj = document.createElement('div');
    wrap.appendChild(obj);
    container.appendChild(wrap);
    return obj;
};
const clearDialogRoot = function (index) {
    var obj = document.querySelector(`body>#el-dialog-container>.el-dialog-wrap-${index}`);
    obj.remove();
};
const dialog = {
    get: getDialogRoot,
    clear: clearDialogRoot,
    index() {
        dialogIndex++;
        return dialogIndex;
    }
};

let cache = {};
const newVue = function (self) {
    var obj = new Vue({
        data: {
            obj: self
        },
        render(h) {
            var slots = [];
            if (this.obj.$slots.default) {
                slots.push(this.obj.$slots.default);
            }
            if (this.obj.$slots.footer) {
                slots.push(h('div', { slot: 'footer' }, [this.obj.$slots.footer]));
            }
            return h('el-dialog', {
                attrs: {
                    title: this.obj.title,
                    value: this.obj.value,
                    modal: this.obj.modal,
                    'modal-append-to-body': this.obj.modalAppendToBody,
                    top: this.obj.top,
                    size: this.obj.size,
                    'lock-scroll': this.obj.lockScroll,
                    'custom-class': this.obj.customClass,
                    'close-on-press-escape': this.obj.closeOnPressEscape,
                    'show-close': this.obj.showClose,
                    'close-on-click-modal': false
                },
                on: {
                    'open': this.handleOpen,
                    'close': this.handleClose
                }
            }, [slots]);
        },
        methods: {
            handleOpen() {
                // console.info(`[component:el-dialog2:inner-dialog-${self.index}] : open`)
                self.$emit('open');
            },
            handleClose() {
                self.$emit('close');
                self.$emit('input', false);
                // console.info(`[component:el-dialog2:inner-dialog-${self.index}] : close`)
            }
        }
        /*,
        updated(){
            console.info(`[component:el-dialog2:inner-dialog-${self.index}] : updated`);
        }*/
    });
    return obj;
};
var mixin = {
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
            var index = dialog.index();
            this.index = index;
        }
        // console.info(`[component:el-dialog2:index(${this.index})]  : create`)
    },
    beforeMount() {},
    mounted() {
        var root = dialog.get(this.index);
        cache[this.index] = newVue(this);
        cache[this.index].$mount(root);
    }
};

var ElDialog2$1 = { template: "<div class=\"el-dialog2\" v-if=\"value\"></div>",
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
            default: true
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
    }
};

if (typeof window !== 'undefined' && window.Vue) {
    Vue.component(ElDialog2$1.name, ElDialog2$1);
}

module.exports = ElDialog2$1;
