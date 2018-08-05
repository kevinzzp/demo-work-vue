<template>
    <Modal cla="mask-top" :title="title" @close-btn-action="doBtnAction">
        <p class="msg-tip" v-html="msg"></p>
        <Btn type="sy-green" @btnAction="doBtnAction" :text="btnText"></Btn>
    </Modal>
</template>
<script>
    import Modal from './index';
    import {
        mapActions
    } from 'vuex';

    import Btn from '@/components/btn';
    export default {
        props: {
            title: {
                default: ''
            },
            msg: {
                default: ""
            },
            btnText: {
                default: "关闭"
            }
        },
        name: "Alert",
        methods: {
            ...mapActions(['fAlert']),
            doBtnAction({
                show
            }) {
                this.fAlert({
                    show
                });
            }
        },
        components: {
            Btn,
            Modal
        }
    }
</script>
<style lang="scss" scoped="">
    .msg-tip {
        line-height: .25rem;
        text-align: left;
        word-wrap: break-word;
        margin: .3rem;
        max-width: 400px;
        font-size: .14rem;
    }
</style>