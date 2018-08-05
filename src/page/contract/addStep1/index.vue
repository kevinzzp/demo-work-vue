<template>
    <div class="page-range">
        <template>
            <p class="page-range-header" style="padding-top: .24rem;">基本信息</p>
            <div class="contract_tmp">
                <i class="iconfont icon-file-text"></i>
                <mt-field readonly placeholder="请选择合同模板">
                    <i class="iconfont icon-down"></i>
                </mt-field>
            </div>
            <mt-field label="合同编号" v-model="form.identifier" placeholder="请输入合同编号"></mt-field>
            <mt-field label="签约地点" v-model="form.signPlace" placeholder="请输入签约地点"></mt-field>
        </template>
        <!--甲方-->
        <template>
            <p class="page-range-header">甲方</p>
            <mt-field readonly :value="form.firstParty" placeholder="请选择公司">
                <i class="iconfont icon-down"></i>
            </mt-field>
            <mt-field label="法人" v-model="form.firstPartyInfo.name" placeholder="请输入法人"></mt-field>
            <mt-field label="注册地址" v-model="form.firstPartyInfo.registerAddr" type="textarea" placeholder="请输入注册地址"></mt-field>
            <mt-field label="通讯地址" v-model="form.firstPartyInfo.contactAddr" type="textarea" placeholder="请输入通讯地址"></mt-field>
            <mt-field label="联系电话" v-model="form.firstPartyInfo.phone" type="number" placeholder="请输入联系电话"></mt-field>
            <mt-field label="户名"  v-model="form.account" placeholder="请输入户名"></mt-field>
            <mt-field label="开户行" v-model="form.accountBank" placeholder="请输入开户行"></mt-field>
            <mt-field label="账号" type="number" v-model="form.accountNumber" placeholder="请输入账号"></mt-field>
        </template>
        <!--乙方-->
        <template>
            <p class="page-range-header">
                乙方
                <a class="add-handler">添加客户</a>
            </p>
            <mt-field :value="form.secondParty" readonly>
                <i class="iconfont icon-search"></i>
            </mt-field>
            <mt-field label="法人" v-model="form.secondPartyInfo.corporation" placeholder="请输入法人"></mt-field>
            <mt-field label="注册地址" v-model="form.secondPartyInfo.registerAddr" type="textarea" placeholder="请输入注册地址"></mt-field>
            <mt-field label="通讯地址" v-model="form.secondPartyInfo.contactAddr" type="textarea" placeholder="请输入通讯地址"></mt-field>
            <mt-field label="联系电话" v-model="form.secondPartyInfo.phone" placeholder="请输入联系电话"></mt-field>
        </template>
        <!--租赁房屋-->
        <template>
            <p class="page-range-header">租赁房屋</p>
            <mt-field label="房屋用途" v-model="form.spaceUse" placeholder="房屋用途"></mt-field>
            <room-tmp :spaceData.aync="form.spaceMap"></room-tmp>
            <mt-field label="合同展示" v-model="form.spaceSign" placeholder="合同展示"></mt-field>
            <mt-field label="建筑面积" v-model="form.spaceSquare" type="number">
                平方米
            </mt-field>
        </template>
        <!--费用相关-->
        <template>
            <p class="page-range-header">费用相关</p>
            <mt-field label="签约金额" v-model="form.signPrice" type="number">元</mt-field>
            <xxg-horzin>
                <mt-field slot="lSlot" @click.native="ddPicker('signSt')" :disableClear="true" readonly class="start-time-field" :value="timeComputed(form.signSt)"
                    label="时间" placeholder="请选择开始时间"></mt-field>
                <mt-field slot="rSlot" :disableClear="true" @click.native="ddPicker('signEt')" readonly class="end-time-field" :value="timeComputed(form.signEt)"
                    label="至" placeholder="请选择结束时间"></mt-field>
            </xxg-horzin>
            <mt-field label="共计" type="number" v-model="form.signYears" placeholder="共计">年</mt-field>
            <mt-field label="首期租金" type="number" v-model="form.firstRent" placeholder="首期租金">元</mt-field>
            <mt-field label="物业费" type="number" v-model="form.propertyFee" placeholder="物业费">元 / 平方米 / 天</mt-field>
            <mt-field label="押金" type="number" v-model="form.deposit" placeholder="押金">元</mt-field>
        </template>
        <!--免租信息-->
        <template>
            <p class="page-range-header">免租信息（若无则不填写）
            </p>
            <mt-field label="免租时间" v-model="form.rentFreeInfo.time" type="number">个月</mt-field>
            <mt-field label="免租金额" type="number" v-model="form.rentFreeInfo.amount">元</mt-field>
            <mt-field label="免租说明" type="textarea" v-model="form.rentFreeInfo.desc" placeholder="请输入免租说明"></mt-field>
            <fieldtemp title="免租证明">
                <template slot="mtvalue">
                    <xxg-upload :urls.aync="form.rentFreeInfo.certify"></xxg-upload>
                </template>
            </fieldtemp>
        </template>
        <!--租金明细-->
        <template>
            <p class="page-range-header">租金明细</p>
            <xxg-details :dataSource.aync="form.rentDetail"></xxg-details>
        </template>
        <template>
            <p class="page-range-header">违约条款</p>
            <xxg-deposit :firstPy.aync="form.breakDetailFirst" :secondPy.aync="form.breakDetailSecond"></xxg-deposit>
        </template>
        <template>
            <p class="page-range-header">附加资料</p>
            <div class="additional-box">
                <h5 class="additional-title">营业执照</h5>
                <div class="additional-main">
                    <xxg-upload :urls.aync="form.additional.certificate"></xxg-upload>
                </div>
                <h5 class="additional-title">身份证</h5>
                <div class="additional-main">
                    <xxg-upload :urls.aync="form.additional.idCard"></xxg-upload>
                </div>
            </div>
        </template>
        <button @click="ccclick">
            fdsdf
        </button>
    </div>
</template>

<script>
    import moment from 'moment'
    import XxgHorzin from '@/components/form/horizon'
    import qs from 'query-string'
    import Fieldtemp from '@/components/temp/field'

    import XxPicker from '@/components/form/picker'
    import formMap from '@/config/formMap'
    import slotsMap from '@/config/slotsMap'
    import dd from 'dingtalk-jsapi/index.js'
    import roomTmp from '@/components/room/temp'
    import XxgDetails from '@/components/temp/details'
    import XxgDeposit from '@/components/temp/deposit'
    import XxgUpload from '@/components/form/upload'
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
                status: 0,
                flag: 0,
                corpId: null,
                form: {
                    signPlace: null, //签约地点
                    identifier: "2746547265957",
                    creator: null,
                    firstParty: null, //甲方
                    firstPartyInfo: {
                        name: null,
                        registerAddr: null,
                        contactAddr: null,
                        phone: null
                    }, //甲方信息
                    firstRent: 4000,
                    propertyFee: 27, //物业费
                    secondParty: "南慕容", //乙方
                    secondPartyInfo: { // 乙方信息
                        compony: 'xx公司',
                        corporation: '法人',
                        registerAddr: '注册地址',
                        contactAddr: '通讯地址',
                        phone: '电话'
                    },
                    signSt: "2018-07-21 00:00:00",
                    signEt: "2018-07-23 00:00:00",
                    rentFreeInfo: {
                        time: null,
                        amount: null,
                        desc: null,
                        certify: [
                            'http://img.zcool.cn/community/0100785859056fa8012060c8c2bbc0.JPG@1280w_1l_2o_100sh.jpg'
                        ]
                    },
                    breakDetailFirst: [{
                        year: 1,
                        breakRent: 2,
                        st: '2018-07-15',
                        et: '2018-07-14',
                        order: 1
                    }],
                    breakDetailSecond: [{
                        year: 1,
                        breakRent: 2,
                        st: '2018-07-15',
                        et: '2018-07-14',
                        order: 1
                    }],
                    spaceMap: [],
                    spaceSquare: 10000,
                    spaceUse: "结婚生娃",
                    docUrl: null,
                    signPrice: 10000,
                    additional: {
                        certificate: [
                            'http://img.zcool.cn/community/0100785859056fa8012060c8c2bbc0.JPG@1280w_1l_2o_100sh.jpg'
                        ],
                        idCard: [
                            'http://img.zcool.cn/community/0100785859056fa8012060c8c2bbc0.JPG@1280w_1l_2o_100sh.jpg',
                            'http://img.zcool.cn/community/0100785859056fa8012060c8c2bbc0.JPG@1280w_1l_2o_100sh.jpg',
                            'http://img.zcool.cn/community/0100785859056fa8012060c8c2bbc0.JPG@1280w_1l_2o_100sh.jpg'
                        ]
                    },
                    deposit: 100,
                    templateId: "1",
                    state: 1,
                    signYears: 10,
                    account: "张志鹏 ",
                    accountNumber: "12096543765009",
                    accountBank: "中国农业银行",
                    rentDetail: [{
                        dayRent: 2,
                        stTime: '2018-07-21 12:44:20 ',
                        etTime: '2018-07-23 12:44:24',
                        monthRent: 20,
                        yearRent: 200,
                        order: 1
                    }, {
                        dayRent: 3,
                        stTime: '2018-07-21 12:44:45',
                        etTime: '2018-07-30 12:44:49',
                        monthRent: 30,
                        yearRent: 300,
                        order: 2
                    }]
                },
                slots: [{
                    flex: 1,
                    values: []
                }],
                selectSource: {},
                select_show: false,
                editIndex: null
            }
        },
        mounted() {
            dd.biz.navigation.setRight({
                show: true,
                control: true,
                text: '完成',
                onSuccess: (result) => {

                },
                onFail(err) {

                }
            })
            dd.biz.navigation.setTitle({
                title: this.edit ? '编辑合同' : '添加合同'
            })
            // document.querySelectorAll('input,textarea').forEach(info => info.onfocus = e => this.flag = 1)
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

            this.corpId = localStorage.getItem('corpId') || 'dingf936e4208969063335c2f4657eb6378f';
        },
        components: {
            XxPicker,
            XxgHorzin,
            Fieldtemp,
            roomTmp,
            XxgDetails,
            XxgDeposit,
            XxgUpload
        },
        watch: {

        },
        methods: {
            ddPicker(key) {
                let format = 'yyyy-MM-dd';
                let date = moment(new Date).format(format)
                let self = this
                dd.biz.util.datepicker({
                    format: format,
                    value: date, //默认显示日期
                    onSuccess(result) {

                        self.form[key] = result.value + ' 00:00:00'
                    },
                    onFail(err) {
                        console.log(err)
                    }
                })
            },
            timeComputed(time) {

                if (time) return time.split(' ')[0]
            },
            ccclick() {
                alert(JSON.stringify(this.form))
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
        .add-handler {
            float: right;
            color: #2E87EA;
            cursor: pointer;
        }
        .contract_tmp {
            position: relative;
            .mint-cell-wrapper {
                padding-left: .46rem;
            }
            .icon-file-text {
                position: absolute;
                top: .13rem;
                left: .2rem;
                z-index: 1;
                font-size: .18rem;
                color: #2E87EA;
            }
        }
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
            .mint-field-other {
                color: #999;
            }
        }
        .mint-field.room-textarea {
            textarea {
                border: none;
                color: #2E87EA;
                font-size: .16rem;
                height: .6rem;
                font-family: Arial;
            }

        }
        .select-room-box {
            .room-item {
                float: left;
                width: 50%;
                &-1 {
                    .mint-cell-wrapper {
                        padding-right: 0;
                        .mint-cell-value {
                            padding-right: .1rem;
                            border-right: .02rem solid #d9d9d961;
                        }
                    }
                }
            }
            .notice_box {
                width: 55%;
                margin: 0 auto;
                text-align: center;
                color: #999;
                &_1 {
                    padding: .5rem 0 .1rem;
                }
                &_2 {
                    padding: .1rem 0 .5rem;
                }
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

    /* 附加资料 */

    .additional {
        &-box {
            background-color: #fff;
            border: 1px solid transparent;
        }
        &-title {
            margin: .23rem auto 0;
            width: 90%;
            text-align: center;
            color: #E51C23;
            font-size: .16rem;
            font-weight: 500;
            background-color: #F6F6F6;
            border-radius: .05rem;
        }
        &-main {
            padding: .1rem .2rem;
        }
    }
</style>