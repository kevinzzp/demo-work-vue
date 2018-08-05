<template>
    <div class="page-range">
        <template>
            <div class="title_text userinfo-title">
                <div class="title_left">
                    客户信息
                </div>
                <div class="title_right">
                    <i class='iconfont icon-scan' @click="scanHandler"></i>
                    <br />
                    <span class="scan_text">扫名片</span>
                </div>
            </div>
            <mt-field label="客户名称" class="necessary_info" v-model="xx_custom.name" placeholder="输入客户名"></mt-field>
            <fieldtemp title="联系人" cla="customeInfo">
                <template slot="mtvalue">
                    <xxg-btn :text="info.contacts" v-for="(info,index) in xx_custom.contactsMessage" :key="index" type="circle" :noticeText="info.position"
                        @btnAction="msgClick('customeInfo',info,index)" @deleteAction="deleteMsg(index,xx_custom.contactsMessage)"
                        circleEdit="true">
                    </xxg-btn>
                    <xxg-btn type="circle-blank" icon="jiahao" @btnAction="msgClick('customeInfo')">
                    </xxg-btn>
                </template>
            </fieldtemp>
            <mt-field label="所属行业" class="necessary_info" v-model="xx_custom.industry" readonly placeholder="所属行业" @click.native="selectHandler('industry',xx_custom)">
                <i class="iconfont icon-down"></i>
            </mt-field>
            <mt-field label="主营业务" v-model="xx_custom.mainBusiness" placeholder="主营业务"></mt-field>
            <mt-field label="注册地" class="necessary_info" v-model="xx_custom.registerAddr" placeholder="注册地"></mt-field>
            <mt-field label="用途" v-model="xx_custom.purpose" readonly placeholder="用途" @click.native="selectHandler('purpose',xx_custom)">
                <i class="iconfont icon-down"></i>
            </mt-field>
            <mt-field label="企业需求" v-model="xx_custom.demand" type="textarea" rows="4" placeholder="输入企业需求"></mt-field>
            <mt-field label="公司简介" v-model="xx_custom.companyIntroduce" type="textarea" rows="4" placeholder="输入公司简介"></mt-field>
        </template>
        <!--编辑授权人-->
        <template>
            <p class="page-range-header">编辑授权人</p>
            <div class="certigier-box">
                <xxg-btn v-for="(info,index) in userinfo" @deleteAction="deleteMsg(index,userinfo)" :key="index" :circleEdit="accessFlag"
                    type="circle-blank1" :noticeText="info.ddName" icon="user1"></xxg-btn>
                <xxg-btn v-if="accessFlag" type="circle-blank1" icon="jiahao" @click="certigierHandler">
                </xxg-btn>
                <div class="certigier-notice">
                    仅上述用户允许编辑该客户
                    <br /> 如需添加权限，请联系
                    <a style="color: #09c; cursor: pointer;" @click="openSingleChat">{{ creatorInfo.ddName }}</a>
                </div>
            </div>
        </template>
        <msg-box :msg="msg_obj" @infoAddAction="addMsg" @close-btn-action="closeMsg"></msg-box>
        <xx-picker :slots="slots" :selectShow="select_show" @handleCancel="handleCancel" @handleConfirm="handleConfirm"></xx-picker>
        <button @click="aaClcik">
            asdas
        </button>
    </div>
</template>

<script>
    import qs from 'query-string'
    import Fieldtemp from '@/components/temp/field'
    import XxgBtn from '@/components/btn'
    import MsgBox from '@/components/modal/msg'
    import XxPicker from '@/components/form/picker'
    import formMap from '@/config/formMap'
    import slotsMap from '@/config/slotsMap'
    import dd from 'dingtalk-jsapi/index.js'
    import {
        Indicator,
        Toast
    } from 'mint-ui'
    import {
        scanCard,
        openApp
    } from '@/common/utils'
    /* eslint-disable */
    export default {
        data() {
            return {
                currentUser: null,
                accessFlag: true,
                edit: false,
                flag: 0,
                corpId: null,
                xx_custom: {
                    id: null,
                    spareField: "1", //备用字段
                    empowermentIds: null, //
                    contactsMessage: [], //联系人信息表
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
                slots: [{
                    flex: 1,
                    values: []
                }],
                creatorInfo: {
                    ddId: null,
                    ddName: null
                },
                userinfo: [],
                selectSource: {},
                select_show: false,
                editIndex: null,
                msg_obj: {
                    show: false,
                    mapList: {},
                    title: null,
                    info: []
                }
            }
        },
        mounted() {
            dd.biz.navigation.setRight({
                show: true,
                control: true,
                text: '下一步',
                onSuccess: (result) => {
                    let data = JSON.parse(this.$utils.toJson(this.xx_custom));
                    data.contactsMessage = this.$utils.toJson(data.contactsMessage)
                    Indicator.open('保存中...')
                    this.$service.postSaveXxCustom(data).then((res) => {
                        Indicator.close()
                        if (+res.code === 0) {
                            Toast({
                                message: '保存成功'
                            });
                            let str = `/page/customer/xxCustomEt.html?id=${res.data.id}`
                            this.edit && (str += `&edit=true`)
                            window.location.href = str
                        } else {
                            Toast({
                                message: res.message || '保存失败,请重试'
                            });
                        }
                    }).catch(rej => {
                        Toast({
                            message: res.message || '保存失败,请重试'
                        });
                        Indicator.close()
                    })
                },
                onFail(err) {

                }
            })
            dd.biz.navigation.setTitle({
                title: this.edit ? '编辑客户' : '添加客户',
                onSuccess(result) {

                },
                onFail(err) {
                    console.log(err)
                }
            })
            document.querySelectorAll('input,textarea').forEach(info => info.onfocus = e => this.flag = 1)
        },
        created() {
            let {
                customeId
            } = qs.parse(window.location.search)
            let userinfo = localStorage.getItem('userInfo') || {
                userid: '030438571821301935',
                name: '冯钰杰'
            };
            this.currentUser = userinfo.userid;
            if (customeId) {
                this.edit = true;
                this.$service.GetXxCustomDetails({
                    id: customeId
                }).then((res) => {
                    if (+res.code === 0) {
                        let data = res.data;
                        try {
                            data.xx_custom.contactsMessage = JSON.parse(data.xx_custom.contactsMessage)

                        } catch (error) {
                            data.xx_custom.contactsMessage = []
                        }

                        
                        let cache = data.xx_custom.creatorId || {
                            ddId: userinfo.userid,
                            ddName: userinfo.name
                        }

                        this.creatorInfo = cache;
                        data.xx_custom.creatorId = cache.id;
                        this.xx_custom = { ...data.xx_custom
                        }
                        this.userinfo = data.xx_custom.empowermentIds.filter(v => {
                            if (v && typeof v === 'object') return v
                        })

                    }
                }).catch(reject => {
                    console.log(111)
                })
            } else {
                let m = {
                    ddId: userinfo.userid,
                    ddName: userinfo.name
                }
                this.creatorInfo = m
                this.userinfo = [m]
                this.xx_custom.creatorId = this.creatorInfo.userid;
            }
            this.corpId = localStorage.getItem('corpId') || 'dingf936e4208969063335c2f4657eb6378f';
        },
        components: {
            XxgBtn,
            MsgBox,
            XxPicker,
            Fieldtemp
        },
        watch: {
            'userinfo' (newVal) {
                newVal && (this.xx_custom.empowermentIds = newVal.map(v => v.ddId).join(',') + '');
            },
            'xx_custom.empowermentIds' (newVal) {
                this.accessFlag = newVal.indexOf(this.currentUser) > -1
            }
        },
        methods: {
            aaClcik() {
                let data = JSON.parse(this.$utils.toJson(this.xx_custom));
                data.contactsMessage = this.$utils.toJson(data.contactsMessage)
                Indicator.open('保存中...')
                this.$service.postSaveXxCustom(data).then((res) => {
                    Indicator.close()
                    if (+res.code === 0) {
                        Toast({
                            message: '保存成功'
                        });
                        window.location.href =
                            `/page/customer/xxCustomEt.html?id=${res.data.id}&edit=${this.edit}`
                    } else {
                        Toast({
                            message: res.message || '保存失败,请重试'
                        });
                    }
                }).catch(rej => {
                    Toast({
                        message: res.message || '保存失败,请重试'
                    });
                    Indicator.close()
                })
            },
            certigierHandler() {

            },
            openSingleChat() {
                //打开个人资料
                openApp({
                    id: this.xx_custom.creatorId,
                    corpId: this.corpId
                })
            },
            getState(status) {
                if (status === undefined) return ''
                let obj = this.state.filter(info => {
                    if (+info.value === +status) {
                        return info.name
                    }
                })[0]
                return typeof obj === 'object' ? obj.name : ''
            },
            msgClick(key, info, index) {
                if (key) {
                    let obj = {};
                    Object.keys(formMap[key]).forEach(v => obj[v] = null);
                    let msg_obj = {
                        mapList: formMap[key] || {},
                        title: '编辑联系人',
                        info: Object.assign(obj, info) //当前数据
                    }
                    this.editIndex = index
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
                Indicator.close()
            },
            handleConfirm(values) {
                this.selectSource = Object.assign(this.selectSource, values)
                this.select_show = false
            },
            getDict(key) {
                if (this[key] && this[key].length) {
                    this.slots[0].values = this[key];
                } else {
                    Indicator.open('Loading...')
                    this.$service.getDict(key).then(res => {
                        this[key] = res.length ? res : slotsMap[key]
                        Indicator.close()
                        this.slots = [{
                            flex: 1,
                            values: this[key]
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
                let obj = this.xx_custom.contactsMessage
                i !== undefined ? (obj[i] = info) : obj.push(info)
                this.editIndex = null;
                this.msg_obj.show = false;
            },
            scanHandler() {
                let reverData = {
                    ADDRESS: 'registerAddr',
                    COMPANY: 'name',
                    contactsMessage: {
                        "NAME": 'contacts',
                        "MPHONE": 'workTel',
                        "PHONE": 'tel',
                        "POSITION": 'position'
                    }
                }
                //扫描名片
                scanCard((data) => {
                    let v = {}
                    let msg = {}
                    Object.keys(data).forEach(key => {
                        if (reverData[key]) v[reverData[key]] = data[key]
                        else if (reverData.contactsMessage[key])
                            msg[reverData[key]] = data[key]
                    })
                    this.xx_custom = Object.assign(this.xx_custom, v);
                    this.xx_custom.contactsMessage.push(msg)
                })
            }
        }
    }
</script>

<style lang="scss">
    .title_text {
        padding: 0 3%;
        line-height: 0.23rem;
        font-size: 0.14rem;
        position: relative;
        display: flex;
        justify-content: space-between;
        color: #777777;

    }

    /* 编辑人标题 */

    .page-range .userinfo-title {
        padding-top: .35rem;
        .title_right {
            text-align: center;
            margin-top: -0.26rem;
            .icon-scan {
                color: #2E87EA;
                font-size: .24rem;
            }
            .scan_text {
                color: #101010;
                font-size: .12rem;
            }
        }
        .title_left {
            line-height: .29rem;
        }
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
                border: .01rem solid rgba(238, 238, 238, 1);
            }
        }
    }


    /* 授权人 */

    .certigier-box {
        background: #fff;
        padding: .27rem .53rem;
        box-sizing: border-box;
        text-align: center;
        .certigier-notice {
            line-height: .24rem;
            padding: .1rem 0;
            color: #999;
            text-align: center;
            font-size: .14rem;
        }
    }
</style>