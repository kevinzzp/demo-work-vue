<template>
    <div class="xxg-card-room">
        <mt-field v-for="(info,index) in map" :key="index" v-model="list[info.key]" readonly :placeholder="info.name" @click.native="selectHandler(info,info.key)">
            <i class="iconfont icon-down"></i>
        </mt-field>
        <xx-picker @addAction="addHandler" :slots="slots" :selectShow="select_show" @handleCancel="handleCancel" @handleConfirm="handleConfirm"></xx-picker>
        <msg-box :msg="msg_obj" maskCla="max-zindex-msg" :state="state" :addRoomKey="true" @infoAddAction="addMsg" @close-btn-action="closeMsg"></msg-box>
    </div>
</template>
<script>
    import XxPicker from '@/components/form/picker'
    import MsgBox from '@/components/modal/msg'
    export default {
        components: {
            XxPicker,
            MsgBox
        },
        data() {
            return {
                select_show: false,
                slots: [{
                    flex: 1,
                    values: []
                }],
                map: [{
                    name: '城市',
                    key: 'city',
                    option: ['北京', '上海', '天津', '河北', '山西']

                }, {
                    name: '地点',
                    key: 'addr',
                    option: ['中关村', '1', '2', '3', '4']
                }, {
                    name: '楼',
                    key: 'lou',
                    option: ['1楼', '2', '3', '4', '5']
                }, {
                    name: '座',
                    key: 'zuo',
                    option: ['A', 'B', 'C', 'D', 'E']
                }, {
                    name: '层',
                    key: 'ceng',
                    option: ['1', '2', '3', '4', '5']
                }, {
                    name: '房间号',
                    key: 'number',
                    option: ['111', '222', '333', '444', '555']
                }],
                msg_obj: {
                    info: {}
                }
            }
        },
        props: {
            list: Object,
            state: Object
        },
        methods: {
            addHandler() {
                this.msg_obj = {
                    show: true,
                    title: '添加房屋',
                    info: {
                        roomName: '',
                        roomSize: '',
                        state: 1
                    }
                }
            },
            addMsg() {
                this.msg_obj.show = false;
            },
            closeMsg() {
                this.msg_obj.show = false;
            },
            selectHandler(info, key) {
                this.slots[0].values = info.option
                this.select_show = key;
            },
            handleCancel() {
                this.select_show = false
            },
            handleConfirm(values) {
                this.select_show = false
                this.$emit('selectInfo', Object.assign(this.list, values))
            }
        }
    }
</script>
<style lang="scss" scoped>
    .xxg-card-room {
        height: 1.4rem;
        margin: 0 auto .2rem;
        border-radius: 3px;
        border: 1px solid #eeeeee;
        padding: .05rem;
        box-sizing: border-box;
        background-color: #fff;
        font-size: .16rem;
        position: relative;
        .mint-cell {
            float: left;
            width: 50%;
        }
        .title,
        .delete-btn {
            position: absolute;
            line-height: .23rem;
            top: -0.1rem;
            font-size: .14rem;
            z-index: 1;
            text-align: center;
            background: #fff;
        }
        .title {
            left: 50%;
            width: .62rem;
            transform: translate(-50%);
        }
        .delete-btn {
            right: .08rem;
            color: #09c;
            font-weight: 500;
        }
    }
</style>