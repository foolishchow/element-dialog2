<template>
    <div class="el-dialog2" v-if="value"></div>
</template>
<script>
    import mixin from './render';
    export default {
        mixins:[mixin],
        name:'el-dialog2',
        props: {
            value:{
                type:Boolean,
                default:false
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
        data(){
            return {};
        }
    }
</script>
