<template>
    <div class="xxg-room-field">
        <span class="title">
            签约房屋
            <span v-if="!detail" class="title-notice">
                （可添加多个房屋）
            </span>
            <span v-if="!detail" class="add-room-handler" @click="addRoom()">
                添加房屋
            </span>
        </span>
        <ul class="room-msg-box">
            <li v-for="(info,index) in spaceData" :key="index" :class="{'filst-room': index === 0}">
                <span class="room-msg-item">
                    {{ setShowMsg(info) }}
                </span>
                <i class="iconfont icon-jianhao" @click="deleteRoom(index)"></i>
            </li>
        </ul>

        <msg-box :msg="msg_obj" :roomMsg="true" @infoAddAction="addMsg" @close-btn-action="closeMsg"></msg-box>
    </div>
</template>
<script>
    import formMap from '@/config/formMap'
    import MsgBox from '@/components/modal/msg'
    export default {
        components: {
            MsgBox
        },
        data() {
            return {
                msg_obj: {
                    show: false,
                    mapList: formMap.room,
                    title: '选择房屋',
                    info: []
                },
                flag: 0
            }
        },
        props: {
            spaceData: Array,
            detail: {
                default: false
            }
        },
        mounted() {
            document.querySelectorAll('input,textarea').forEach(info => info.onfocus = e => this.flag = 1)
        },
        methods: {
            setShowMsg(info) {
                if (info && typeof info === 'object') return Object.values(info).join(' / ')
                return ''
            },
            deleteRoom(index) {
                let data = this.spaceData;
                data.splice(index, 1)
                this.$emit('update:spaceData', data)
            },
            addRoom(info) {
                let obj = {};
                Object.keys(formMap.room).forEach(v => obj[v] = '');
                let msg_obj = {
                    mapList: formMap.room || {},
                    title: '编辑联系人',
                    info: Object.assign(obj, info) //当前数据 
                }
                if (this.flag === 1) { // 软键盘兼容, 之后修改
                    setTimeout(() => {
                        this.msg_obj = Object.assign(msg_obj, {
                            show: true
                        })
                        this.flag = 0
                    }, 500);
                } else {
                    this.msg_obj = Object.assign(msg_obj, {
                        show: true
                    })
                }
            },
            addMsg(info) {
                let i = this.editIndex;
                let obj = this.spaceData;
                i !== undefined ? (obj[i] = info) : obj.push(info)
                this.editIndex = null;
                this.msg_obj.show = false;
            },
            closeMsg() {
                this.msg_obj.show = false;
            }
        }
    }
</script>
<style lang="scss" scoped>
    ul,
    li {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .xxg-room-field {
        background-color: #fff;
        color: #333;
        font-size: .16rem;
        line-height: .23rem;
        padding: .1rem;
        border-bottom: .01rem solid #d9d9d961;
        .title {
            padding-left: .09rem;
            .title-notice {
                opacity: .6;
            }
            .add-room-handler {
                float: right;
                color: #2E87EA;
                cursor: pointer;
                font-size: .14rem;
            }
        }
        .room-msg {
            &-box {
                margin-left: .18rem;
                li:not(.filst-room) {
                    border-top: .01rem solid #d9d9d961;
                }
                .icon-jianhao {
                    display: inline-block;
                    vertical-align: super;
                    font-weight: 700;
                    color: #2E87EA;
                    cursor: pointer;
                }
            }
            &-item {
                margin: .09rem;
                display: inline-block;
                width: 85%;
                box-sizing: border-box;
                padding: 0 .15rem;
                color: #101010;
                background-color: rgb(246, 246, 246);
                text-align: center;
                line-height: .23rem;
            }
        }
    }
</style>