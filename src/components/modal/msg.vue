<template>
    <Modal :cla="'msgBox' + ' ' + maskCla" name="xxg" :show="msg.show" :title="msg.title" closeBtn="true" @close-btn-action="doBtnAction">
        <div v-if="roomMsg" class="select-room-box">
            <mt-field label="已选择" class="room-textarea" :value="setShowMsg(msg.info)" readonly type="textarea"></mt-field>
            <div class="clearfix ">
                <mt-field v-for="(key,index) in Object.keys(msg.mapList || {})" :class="{'room-item': true, 'room-item-1': index %2 === 0 }"
                    :key="index" v-model="msg.info[key]" readonly :placeholder="msg.mapList[key].placeholder" @click.native="selectHandler(key,msg.info,msg.mapList[key].option)">
                    <i class="iconfont icon-down"></i>
                </mt-field>
            </div>
            <div class="notice_box notice_box_1">
                签约面积为所有添加房屋的面积之和
            </div>
            <div class="notice_box notice_box_2">
                选择时请逐层进行选择
            </div>
        </div>
        <div v-else-if="addRoomKey" class="contract-box">
            <mt-field label="房屋名" v-model="msg.info.roomName" placeholder="如：望远楼"></mt-field>
            <mt-field label="空间面积" v-model="msg.info.roomSize" placeholder="可为空"></mt-field>

        </div>
        <div v-else-if="contractMsg === 1" class="contract-box">
            <mt-field label="退约方" v-model="msg.info.party" placeholder="请输入退约方"></mt-field>
            <mt-field @click.native="ddPicker('time')" :disableClear="true" readonly :value="timeComputed(msg.info.time)" label="退约时间"
                placeholder="请选择退约时间"></mt-field>
            <mt-field label="违约金" v-model="msg.info.amount">
                元
            </mt-field>
            <mt-field label="操作说明" type="textarea" v-model="msg.info.desc" placeholder="请输入操作说明"></mt-field>
            <fieldtemp title="签约扫描件">
                <template slot="mtvalue">
                    <xxg-upload :urls.aync="msg.info.urls"></xxg-upload>
                </template>
            </fieldtemp>
        </div>
        <div v-else-if="contractMsg === 2" class="contract-box">
            <mt-field label="废弃方" v-model="msg.info.party" placeholder="请输入废弃方"></mt-field>
            <mt-field @click.native="ddPicker('time')" :disableClear="true" readonly :value="timeComputed(msg.info.time)" label="退约时间"
                placeholder="请选择废弃时间"></mt-field>
            <mt-field label="违约金" v-model="msg.info.amount">
                元
            </mt-field>
            <mt-field label="操作说明" type="textarea" v-model="msg.info.desc" placeholder="请输入操作说明"></mt-field>
        </div>
        <div v-else-if="contractMsg === 3" class="contract-box">
            <mt-field label="签约方" v-model="msg.info.party" placeholder="请输入签约方"></mt-field>
            <mt-field @click.native="ddPicker('time')" :disableClear="true" readonly :value="timeComputed(msg.info.time)" label="退约时间"
                placeholder="请选择签约时间"></mt-field>
            <mt-field label="签约金" v-model="msg.info.amount">
                元
            </mt-field>
            <mt-field label="操作说明" type="textarea" v-model="msg.info.desc" placeholder="请输入操作说明"></mt-field>
            <fieldtemp title="签约扫描件">
                <template slot="mtvalue">
                    <xxg-upload :urls.aync="msg.info.urls"></xxg-upload>
                </template>
            </fieldtemp>
        </div>
        <template v-else>
            <template v-for="(key,index) in Object.keys(msg.mapList || {})" v-if="msg.mapList[key]">
                <mt-field :key="index" :class="{necessary_info:msg.mapList[key].necessary }" v-if="msg.mapList[key].type !== 'select' " :label="msg.mapList[key].name"
                    v-model="msg.info[key]" :readonly="detail" :placeholder="!detail ? msg.mapList[key].placeholder : ''" :type="msg.mapList[key].type">
                    <template v-if="msg.mapList[key].icon">
                        <i v-if="msg.mapList[key].iconClick" :class="['iconfont','icon-' + msg.mapList[key].icon]" @click="iconClick(key)"></i>
                        <i v-else :class="['iconfont','icon-' + msg.mapList[key].icon]"></i>
                    </template>
                </mt-field>
                <mt-field :key="index" v-else :label="msg.mapList[key].name" :value="getState(msg.info[key],key)" readonly :placeholder="!detail ? msg.mapList[key].placeholder : ''"
                    @click.native="selectHandler(key,msg.info)">
                    <i class="iconfont icon-down"></i>
                </mt-field>
            </template>
        </template>
        <a v-if="!detail" @click="addAction" class="add-btn">{{btnTxt}}</a>
        <xx-picker :slots="slots" :selectShow="select_show" @handleCancel="handleCancel" @handleConfirm="handleConfirm"></xx-picker>
    </Modal>
</template>
<script>
    import {
        Indicator
    } from 'mint-ui'
    import Modal from './index'
    import XxPicker from '@/components/form/picker'
    import dd from 'dingtalk-jsapi/index.js'
    import XxgUpload from '@/components/form/upload'
    import Fieldtemp from '@/components/temp/field'
    import {
        complexPicker,
        showCallMenu
    } from '@/common/utils'
    export default {
        props: {
            msg: Object,
            btnTxt: {
                default: '添加'
            },
            detail: {
                default: false
            },
            state: {
                default: null
            },
            roomMsg: {
                default: false
            },
            contractMsg: {
                default: 0
            },
            addRoomKey: {
                default: false
            },
            maskCla: {
                default: ""
            }
        },
        data() {
            return {
                edit: true,
                dbclick: false,
                select_show: false,
                slots: [{
                    flex: 1,
                    values: []
                }],
                selectSource: {},
                flag: 0,
                corpId: null
            }
        },
        created() {
            // corpId --> 之后调用钉钉使用
            this.corpId = localStorage.getItem('corpId') || 'dingf936e4208969063335c2f4657eb6378f';
        },
        methods: {
            setShowMsg(info) {
                if (info && typeof info === 'object') return Object.values(info).filter(v => !v == false).join(' / ')
                return ''
            },
            iconClick(key) {
                switch (key) {
                    case 'name':
                        complexPicker({
                            corpId: this.corpId,
                            appId: 6535
                        }, (res) => {
                            alert(JSON.stringify(res))
                        })
                        break;
                    case 'tel':
                        this.detail && showCallMenu({
                            phoneNumber: this.msg.info[key],
                            showDingCall: true
                        })
                        break;
                    case 'workTel':
                        this.detail && showCallMenu({
                            phoneNumber: this.msg.info[key],
                            showDingCall: true
                        })
                        break;
                    default:
                        break;
                }
            },
            getState(idx, key) {
                if (key === undefined) return ''
                let obj = this[key].filter(info => {
                    if (+info.value === +idx) {
                        return info
                    }
                })[0]
                return typeof obj === 'object' ? obj.name : ''
            },
            doBtnAction() {
                this.$emit('close-btn-action')
            },
            addAction() {
                if (!this.dbclick) {
                    this.dbclick = true;
                    setTimeout(() => {
                        this.dbclick = false;
                    }, 500);
                    let ifo = this.msg.info
                    this.$emit("infoAddAction", ifo);
                }
            },
            selectHandler(key, datasource, values) {
                this.selectSource = datasource;
                if (values) {
                    this.slots = [{
                        flex: 1,
                        values
                    }]
                } else {
                    this.getDict(key)
                }

                this.select_show = key;
            },
            // 字典 key值转换
            dictTrans(key) {
                let cache = {
                    state: 'contract_state',
                    key
                }
                return cache[key]
            },
            getDict(key) {
                let dataKey = this.dictTrans(key)
                if (this[key] && this[key].length) {
                    this.slots[0].values = this[key];
                } else {
                    Indicator.open('Loading...')
                    this.$service.getDict(dataKey).then(res => {
                        Indicator.close()
                        if (res && res.length) this[key] = res
                        this.slots = [{
                            flex: 1,
                            values: this[key]
                        }]
                    }).catch(rej => {
                        Indicator.close() //失敗
                    })
                }
            },
            handleCancel() {
                this.select_show = false
            },
            handleConfirm(values) {
                this.selectSource = Object.assign(this.selectSource, values)
                this.select_show = false
            },
            timeComputed(time) {
                if (time) return time.split(' ')[0]
            },
            ddPicker(key) {
                let format = 'yyyy-MM-dd';
                let date = moment(new Date).format(format)
                let self = this
                dd.biz.util.datepicker({
                    format: format,
                    value: date, //默认显示日期
                    onSuccess(result) {
                        self.msg.info[key] = result.value + ' 00:00:00'
                    },
                    onFail(err) {
                        console.log(err)
                    }
                })
            },
        },
        components: {
            Modal,
            XxPicker,
            XxgUpload,
            Fieldtemp
        }
    }
</script>
<style lang="scss" scoped>
    .icon-dianhua {
        color: #09c;
    }

    .icon-mingpian {
        color: #2e87ea;
        font-size: .18rem;
    }

    .add-btn {
        background-color: rgb(234, 96, 46);
        display: block;
        width: 80%;
        margin: .2rem auto;
        color: #fff;
        line-height: .4rem;
        border-radius: .05rem;
    }
</style>