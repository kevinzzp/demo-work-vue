<template>
    <div class="page-range">
        <!-- 跟进状态-->
        <template>
            <p class="page-range-header">客户状态</p>
            <mt-field class="necessary_info" label="跟进状态" :value="getState(form.contractState)" readonly placeholder="跟进状态" @click.native="selectHandler('contractState',form)">
                <i class="iconfont icon-down"></i>
            </mt-field>
            <!--签约状态-->
            <template v-if=" form.contractState == 10 || form.contractState == 20">
                <mt-field label="关联合同" placeholder="输入合同编号、客户名" v-model="form.contractId">
                    <i class="iconfont icon-search"></i>
                </mt-field>
<!--                 <mt-field class="necessary_info" placeholder="输入签约面积" type="number" label="签约面积" v-model="form.spaceSize">
                    平方米
                </mt-field>
                <mt-field class="necessary_info" label="签约金额" type="number" placeholder="输入签约金额" v-model="form.amount">
                    人民币
                </mt-field>
                <mt-field class="necessary_info" type="date" label="开始时间" v-model="form.startTime"></mt-field>
                <mt-field class="necessary_info" label="结束时间" type="date" v-model="form.endTime"></mt-field> -->
            </template>
            <!--其余状态-->
            <template v-else>
                <mt-field placeholder="输入意向面积" type="number" label="意向面积" v-model="xx_custom.intentionSize">
                    平方米
                </mt-field>
                <mt-field label="意向园区" placeholder="输入意向园区" v-model="xx_custom.intentionPark"></mt-field>
                <mt-field label="意向位置" placeholder="输入意向位置" v-model="xx_custom.intentionPosition">
                </mt-field>
                <div style="text-align: center;  line-height: .6rem; color: rgb(229, 28, 35); background: #fff;">
                    可在下方添加跟进记录
                </div>
            </template>

        </template>
        <!--跟进记录-->
        <template>
            <p class="page-range-header">跟进记录(长按删除)
                <a class="add-room" @click="msgClick('customRecord')">添加跟进记录</a>
            </p>
            <template v-if="xx_custom_et.length">
                <xxg-card v-for="(item,index) in xx_custom_et" @deleteAciton="deleteRecord(index)" :key="index" :info="item" :state="contractState"></xxg-card>
            </template>
            <div v-else style="text-align: center;  line-height: .6rem; background: #fff;">
                暂无跟进记录...
            </div>
        </template>
        <!-- 弹框 -->
        <msg-box :state="contractState" :msg="msg_obj" @infoAddAction="addMsg" @close-btn-action="closeMsg"></msg-box>

        <!-- select -->
        <xx-picker :slots="slots" :selectShow="select_show" @handleCancel="handleCancel" @handleConfirm="handleConfirm"></xx-picker>
        <button @click="aaClcik">
            asdas
        </button>
    </div>
</template>

<script>
    import qs from 'query-string'
    import XxgBtn from '@/components/btn'
    import MsgBox from '@/components/modal/msg'
    import XxgCard from '@/components/card'
    import XxPicker from '@/components/form/picker'
    import XxgRoom from '@/components/room'
    import formMap from '@/config/formMap'
    import slotsMap from '@/config/slotsMap'
    import dd from 'dingtalk-jsapi/index.js'
    import {
        Indicator,
        Toast
    } from 'mint-ui'
    /* eslint-disable */
    export default {
        data() {
            return {
                edit: false, // 新增 、 编辑状态
                flag: 0,
                xx_custom: { // 公共信息
                    id: null,
                    spareField: null, //备用字段
                    empowermentIds: null, //
                    contactsMessage: null, //联系人信息表
                    purpose: null, //用途
                    industry: null, //所属行业
                    demand: null, //企业需求
                    companyIntroduce: null, //公司介绍
                    registerAddr: null, //注册地
                    name: null, //
                    creatorId: null, //创建人id --> userid
                    mainBusiness: null, //主营业务
                    state: 1, // 状态
                    intentionPosition: null, //意向位置
                    intentionSize: null, // 意向面积
                    intentionPark: null // 意向园区
                },
                corpId: null, // 调取钉钉接口使用的corpId
                xx_custom_et: [], // 跟进信息
                form: { // 签约状态数据
                    id: null,
                    contractId: null, //合同id
                    customId: null,
                    contractState: 1, //状态
                    remark: null,
                    creatorId: null, // 下单人id
                    amount: null, // 金额
                    startTime: null,
                    endTime: null,
                    spaceSize: null,
                    spaceIds: null, //空间id
                    spaseMap: [] // 暂存 房屋信息表
                },
                slots: [{ //下拉框内容
                    flex: 1,
                    values: []
                }],
                selectSource: {}, // 下拉框源数据
                contractState: [], // state字典
                select_show: false, // 下拉框标识
                editIndex: null,
                msg_obj: { // msg 信息栏所用数据
                    show: false,
                    mapList: {},
                    key: null,
                    title: null,
                    info: []
                }
            }
        },
        created() {
            let {
                id,
                edit
            } = qs.parse(window.location.search)
            // 获取 客户id

            // 编辑或者 新增
            this.edit = edit;
            if (this.edit) {
                this.$service.GetXxCustomDetails({
                    id
                }).then((res) => {
                    if (+res.code === 0) {
                        let data = res.data
                        // if (typeof data.xx_custom.spaceIds === 'object' && data.xx_custom.spaceIds.length) {
                        //     data.xx_custom.spaceIds = data.xx_custom.spaceIds.filter(info => {
                        //         if (v && typeof v === 'object') return v.id
                        //     }).join(',')
                        // }
                        console.log(111)
                        data.creatorId = data.xx_custom.creatorId.ddId
                        this.xx_custom = data.xx_custom;
                        this.xx_custom_et = res.data.xx_custom_et
                    }
                }).catch(reject => {

                })
            } else {
                this.form.customId = id;
                // 设置 saveXxCustom id 
                this.xx_custom.id = id;
                // 用户id 
                let useinfo = localStorage.getItem('useinfo') || {};

                this.form.creatorId = this.xx_custom.creatorId = useinfo.userid || 1;
            }
            // corpId --> 之后调用钉钉使用
            this.corpId = localStorage.getItem('corpId')


            // 状态字典
            this.getDict('contractState')
        },
        mounted() {
            // 设置右边 按钮
            dd.biz.navigation.setRight({
                show: true,
                control: true,
                text: '完成',
                onSuccess: (result) => {
                    Indicator.open('保存中...')
                    let data = Object.assign({
                        xxCustomEt: this.xx_custom_et
                    }, this.form)
                    data.xxCustomEt.forEach(info => {
                        info.userid = (info.userid && typeof info.userid === 'object') ? info.userid
                            .ddId : info.userid
                        if (info.receptionTime && info.receptionTime.split(' '.length === 1)) info.receptionTime +=
                            ' 00:00:00'
                    })
                    data.startTime += ' 00:00:00';
                    data.endTime += ' 23:59:59'
                    this.$service.postSaveXxCustom(this.xx_custom).then((res) => {
                        if (+res.code === 0) {
                            this.$service.postSaveXxSpaceOrderAndCustomEt(data).then((res) => {
                                Toast({
                                    message: '保存成功'
                                });
                                Indicator.close()
                                window.location.href = `/page/customer/list.html`
                            }).catch(rej => {
                                console.log(rej);
                                Indicator.close()
                            })
                        }
                    }).catch(rej => {
                        Indicator.close()
                    })
                },
                onFail(err) {
                    console.log(err)
                }
            })
            // 设置钉钉title
            dd.biz.navigation.setTitle({
                title: this.edit ? '编辑客户' : '添加客户',
                onSuccess(result) {},
                onFail(err) {
                    console.log(err)
                }
            })
            // input强绑定focus事件
            document.querySelectorAll('input,textarea').forEach(info => info.onfocus = e => this.flag = 1)
        },
        components: {
            XxgBtn,
            MsgBox,
            XxgCard,
            XxPicker,
            XxgRoom
        },
        watch: {
            'form.contractState' (newValue, oldValue) {
                this.xx_custom.state = newValue;
                if (+newValue === 10 || +newValue === 20) {
                    this.xx_custom = Object.assign(this.xx_custom, {
                        intentionPosition: null,
                        intentionSize: null,
                        intentionPark: null
                    })
                } else {
                    this.form = Object.assign(this.form, {
                        contractId: null, //合同id
                        amount: null, // 金额
                        startTime: null,
                        endTime: null,
                        spaceSize: null,
                        spaceIds: null
                    })
                }
            }
        },
        methods: {
            aaClcik() {
                Indicator.open('保存中...')
                let data = Object.assign({
                    xxCustomEt: this.xx_custom_et
                }, this.form)

                data.xxCustomEt.forEach(info => {
                    info.userid = (info.userid && typeof info.userid === 'object') ? info.userid
                        .ddId : info.userid
                    if (info.receptionTime && info.receptionTime.split(' '.length === 1)) info.receptionTime +=
                        ' 00:00:00'
                })
                data.startTime += ' 00:00:00';
                data.endTime += ' 23:59:59'
                console.log(JSON.stringify(data))
                this.$service.postSaveXxCustom(this.xx_custom).then((res) => {
                    if (+res.code === 0) {
                        this.$service.postSaveXxSpaceOrderAndCustomEt(data).then((res) => {

                            Toast({
                                message: '保存成功'
                            });
                            Indicator.close()
                            window.location.href = `/page/customer/list.html`
                        }).catch(rej => {
                            Indicator.close()
                        })
                    }
                }).catch(rej => {
                    Indicator.close()
                })
            },
            jsonObj(obj) { // clone 对象
                return JSON.parse(JSON.stringify(obj))
            },
            getState(status) { // 根据状态 获取对应的值
                if (status === undefined) return ''
                let obj = this.contractState.filter(info => {
                    if (+info.value === +status) {
                        return info.name
                    }
                })[0]
                return typeof obj === 'object' ? obj.name : ''
            },
            msgClick(key, info, index) { // msg model 框数据
                if (key) {
                    let obj = {};
                    Object.keys(formMap[key]).forEach(v => obj[v] = null);
                    let msg_obj = {
                        mapList: formMap[key] || {},
                        title: '编辑跟进记录',
                        key, // 
                        info: Object.assign(obj, {
                            userId: 1, //暂时
                            customId: this.form.creatorId
                        }, info) //当前数据
                    }
                    if (this.flag === 1) {
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
                    this.editIndex = index
                }
            },
            closeMsg() {
                this.msg_obj.show = false;
            },
            selectHandler(key, datasource) {
                this.selectSource = datasource;
                this.getDict(key)
                this.select_show = key;
            },
            handleCancel() {
                this.select_show = false
            },
            handleConfirm(values) {
                this.selectSource = Object.assign(this.selectSource, values)
                this.select_show = false
            },
            // 字典 key值转换
            dictTrans(key) {
                let cache = {
                    contractState: 'contract_state',
                    key
                }
                return cache[key]
            },
            getDict(key, flag) {
                let dataKey = this.dictTrans(key)
                // 若有，则直接赋值。
                if (this[key] && this[key].length) {
                    this.slots[0].values = this[key];
                } else {
                    // 获取字典列表
                    Indicator.open('Loading...')
                    this.$service.getDict(dataKey).then(res => {
                        Indicator.close()
                        if (res && res.length) this[key] = res
                        // 第一次请求保存
                        if (flag) return

                        this.slots = [{
                            flex: 1,
                            values: res.length ? res : slotsMap[key]
                        }]
                    }).catch(rej => {
                        Indicator.close()
                        //失敗
                    })
                }
            },
            deleteMsg(index, list) {
                if (list && list.length) list.splice(index, 1)
            },
            addMsg(info) {
                let i = this.editIndex;
                let obj = this.xx_custom_et;
                i !== undefined ? (obj[i] = info) : obj.push(info)
                this.editIndex = null;
                this.msg_obj.show = false;
            },
            addRom() {
                this.form.spaseMap.push({
                    city: null,
                    addr: null,
                    lou: null,
                    zuo: null,
                    ceng: null,
                    number: null
                })
            },
            deleteRom(index) {
                this.form.spaseMap.splice(index, 1)
            },
            deleteRecord(index) {
                this.xx_custom_et.splice(index, 1)
            }
        }
    }
</script>

<style lang="scss">
    .xxg-enter-active,
    .xxg-leave-active {
        transition: all .5s;
    }

    .xxg-enter,
    .xxg-leave-active {
        transform: translateY(100%)
    }


    .page-range {
        .mint-cell-wrapper {
            border-bottom: .01rem solid #d9d9d961;
            .mint-cell-title {
                width: .73rem;
                padding-right: .18rem;
                text-align: right;
            }
            .mint-cell-text {
                display: inline-block;
                width: .65rem;
                color: #333;
                &.customeInfo {
                    line-height: 0.8rem;
                    display: inline-block;
                }
            }
            textarea {
                height: .97rem;
                border-radius: .05rem;
                border: .01rem solid rgba(238, 238,
                238, 1);
            }
        }
    }

    /*     .contractNo-box {
        position: relative;
        .icon-file-text {
            position: absolute;
            line-height: .48rem;
            left: .95rem;
            z-index: 1;
            font-size: .18rem;
            color: #09c;
        }
        .icon-search {
            color: #999999;
        }
    }
 */

    .icon-dianhua {
        color: rgba(46, 135, 234, 1)
    }

    /*房屋 */

    .room-content {
        background-color: #fff;
        padding: .1rem;
        min-height: 1rem;
    }

    .add-room {
        float: right;
        color: #09c;
        cursor: pointer;
        &:hover {
            opacity: .8;
        }
    }
</style>