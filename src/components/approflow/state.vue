<template>
    <a class="mint-cell appro-state-box">
        <span class="appro-handler-left" @click="backSignHandler" v-if="state == 4">
            退约
        </span>
        <span v-else class="appro-handler-left" @click="discardHandler">
            废弃
        </span>
        <span class="appro-handler-right" @click="editHandler" v-if="state != 4 ">
            编辑
        </span>
        <span class="appro-handler-right  appro-handler-right-ed" @click="signHandler" v-if="state == 4 ">
            签约
        </span>
        <msg-box btnTxt="确定" :msg="msg_obj" :contractMsg="contractMsg" @infoAddAction="addMsg" @close-btn-action="closeMsg"></msg-box>
    </a>
</template>
<script>
    import MsgBox from '@/components/modal/msg'
    export default {
        props: {
            state: {
                default: ""
            }
        },
        components: {
            MsgBox
        },
        data() {
            return {
                contractMsg: 0,
                msg_obj: {}
            }
        },
        computed: {

        },
        methods: {
            backSignHandler() {
                this.contractMsg = 1
                this.msg_obj = {
                    show: true,
                    title: '退约合同',
                    info: {
                        ajax: '1',
                        party: '乙方',
                        time: '2020-2-14',
                        amount: 1000,
                        desc: '客户不准备继续使用房屋，决定退约',
                        url: []
                    }
                }
            },
            discardHandler() {
                this.contractMsg = 2
                this.msg_obj = {
                    show: true,
                    title: '废弃合同',
                    info: {
                        ajax: '2',
                        party: '乙方',
                        time: '2020-10-14',
                        amount: 150000,
                        desc: '客户需要再多租两间房屋，因此废弃合同',
                        url: []
                    }
                }
            },
            signHandler() {
                this.contractMsg = 3
                this.msg_obj = {
                    show: true,
                    title: '签约合同',
                    info: {
                        ajax: '3',
                        party: '乙方',
                        time: '2020-10-14',
                        amount: 150000,
                        desc: '客户准备签约',
                        url: []
                    }
                }
            },
            editHandler() {
                // window.location.href = ''
            },
            addMsg(info) {
                this.msg_obj.show = false;
                return;
            },
            closeMsg() {
                this.msg_obj.show = false;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .appro-state-box {
        padding: .1rem;
        .appro-handler- {
            &left {
                float: left;
                text-align: center;
                color: #e51c23;
                border-radius: .05rem;
                border: .01rem solid #e51c23;
                line-height: .25rem;
                width: .65rem;
            }
            &right {
                color: #2e87ea;
                text-align: center;
                border-radius: .05rem;
                border: .01rem solid #2e87ea;
                width: .65rem;
                line-height: .25rem;
                float: right;
                &-ed {
                    color: #259b24;
                    border-color: #259b24;
                }
            }
        }
    }
</style>