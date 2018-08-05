<template>
    <Modal :cla="cla" :title="title" closeBtn="0">
        <p class="msg-tip" v-html="msg"></p>
        <a class="cancleBtn" @click="clickAction(false)">{{cancleText}}</a>
        <a class="sureBtn" @click="clickAction(true)">{{sureText}}</a>
    </Modal>
</template>
<script>
    import Modal from './index';
    export default {
        props: {
            title: {
                default: ''
            },
            msg: {
                default: ""
            },
            cla: {
                default: ""
            },
            sureText: {
                default: "确认"
            },
            cancleText: {
                default: "取消"
            }
        },
        methods: {
            clickAction(flag) {
                this.$emit('deleteAciton', flag)
            }
        },
        components: {
            Modal
        }
    }
</script>
<style lang="scss" scoped>
    .msg-tip {
        line-height: .25rem;
        text-align: center;
        word-wrap: break-word;
        margin: .3rem;
        max-width: 400px;
        font-size: .14rem;
    }

    .cancleBtn,
    .sureBtn {
        float: left;
        width: 50%;
        line-height: .4rem;
        color: #09c;
        cursor: pointer;
        border-top: 1px solid #666;
        box-sizing: border-box;
        margin-top: .18rem;
    }

    .cancleBtn {
        border-right: 1px solid #777;
    }
</style>