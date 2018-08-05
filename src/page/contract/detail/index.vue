<template>
    <div class="page-range">
        <template>
            <p class="page-range-header" style="padding-top: .24rem;">合同预览</p>
            <div class="contract_tmp">
                <i class="iconfont icon-file-text"></i>
                <mt-field readonly :disableClear="true" :value="contactTxt()" @click="linkContact">
                    <i class="iconfont icon-right"></i>
                </mt-field>
            </div>

        </template>
        <template>
            <p class="page-range-header">合同状态</p>
            <fieldtemp :title="accrTitle()" cla="accr-state" cla2="mint-cell-value">
                <span v-if="form.state === 1" class="accr-handler" slot="mtother" @click="jumpAddr">
                    提交审批
                    <i class="iconfont icon-right"> </i>
                </span>
            </fieldtemp>
            <mt-field class="detail_textarea" :disableClear="true" readonly :value="form.spaceSignInfo" type="textarea"></mt-field>
            <appro-state v-if="form.state != 2" :state="form.state"></appro-state>
        </template>

        <template>
            <p class="page-range-header">
                乙方
            </p>

            <mt-field :disableClear="true" readonly :value="form.secondPartyInfo.compony"></mt-field>
            <transition name="xxUp">
                <div class="flodHandler-box" v-show="flodMap.secondParty">
                    <i class="iconfont icon-shangshuangjiantou" @click="flodClickHandler('secondParty',false)"></i>
                    <mt-field label="法人" :disableClear="true" readonly :value="form.secondPartyInfo.corporation"></mt-field>
                    <mt-field class="detail_textarea" label="注册地址" :disableClear="true" readonly :value="form.secondPartyInfo.registerAddr" type="textarea"></mt-field>
                    <mt-field class="detail_textarea" label="通讯地址" :disableClear="true" readonly :value="form.secondPartyInfo.contactAddr" type="textarea"></mt-field>
                    <mt-field label="联系电话" :disableClear="true" readonly :value="form.secondPartyInfo.phone"></mt-field>
                </div>
            </transition>
            <transition name="xxDown">
                <div class="flodHandler-box" v-show="!flodMap.secondParty">
                    <i class="iconfont icon-shuangxiajiantou-" @click="flodClickHandler('secondParty',true)"></i>
                </div>
            </transition>

        </template>
        <!--费用相关-->
        <template>
            <p class="page-range-header">费用相关</p>
            <mt-field label="签约金额" :value="form.signPrice" disableClear readonly type="number">元</mt-field>
            <mt-field label="共计" type="number" :disableClear="true" readonly :value="form.signYears">年</mt-field>
            <transition name="xxUp">
                <div class="flodHandler-box" v-show="flodMap.signPrice">
                    <i class="iconfont icon-shangshuangjiantou" @click="flodClickHandler('signPrice',false)"></i>
                    <xxg-horzin v-show="flodMap.signPrice">
                        <mt-field slot="lSlot" readonly :disableClear="true" class="start-time-field" :value="form.signSt" label="时间"></mt-field>
                        <mt-field slot="rSlot" readonly :disableClear="true" class="end-time-field" :value="form.signEt" label="至"></mt-field>
                    </xxg-horzin>
                    <mt-field label="首期租金" type="number" :disableClear="true" readonly :value="form.firstRent">元</mt-field>
                    <mt-field label="物业费" type="number" :disableClear="true" readonly :value="form.propertyFee">元 / 平方米 / 天</mt-field>
                    <mt-field label="押金" type="number" :disableClear="true" readonly :value="form.deposit">元</mt-field>
                </div>
            </transition>
            <transition name="xxDown">
                <div class="flodHandler-box" v-show="!flodMap.signPrice">
                    <i class="iconfont icon-shuangxiajiantou-" @click="flodClickHandler('signPrice',true)"></i>
                </div>
            </transition>
        </template>

        <!--免租信息-->
        <template>
            <p class="page-range-header">免租信息（若无则不填写）
            </p>
            <mt-field label="免租时间" :value="form.rentFreeInfo.time" disableClear readonly type="number">个月</mt-field>
            <mt-field label="免租金额" disableClear readonly :value="form.rentFreeInfo.amount">元</mt-field>
            <mt-field label="免租说明" class="detail_textarea" type="textarea" disableClear readonly :value="form.rentFreeInfo.desc"></mt-field>
            <fieldtemp title="免租证明">
                <template slot="mtvalue">
                    <xxg-upload :urls="form.rentFreeInfo.certify" :detail="true"></xxg-upload>
                </template>
            </fieldtemp>
        </template>

        <!--租赁房屋-->
        <template>
            <p class="page-range-header">租赁房屋</p>
            <mt-field label="房屋用途" :disableClear="true" readonly :value="form.housingUse"></mt-field>
            <room-tmp :spaceData.aync="form.spaceMap" :detail="true"></room-tmp>
            <mt-field label="合同展示" :disableClear="true" readonly :value="form.housingSign"></mt-field>
            <mt-field label="建筑面积" :disableClear="true" readonly :value="form.housingSquare" type="number">
                平方米
            </mt-field>
        </template>

        <!--租金明细-->
        <template>
            <p class="page-range-header">租金明细</p>
            <transition name="xxUp">
                <div class="flodHandler-box" v-show="flodMap.rentDetail">
                    <i class="iconfont icon-shangshuangjiantou" @click="flodClickHandler('rentDetail',false)"></i>
                    <xxg-details :detail="true" v-show="flodMap.rentDetail" :dataSource.aync="form.rentDetail"></xxg-details>
                </div>
            </transition>
            <transition name="xxDown">
                <div class="flodHandler-box" v-show="!flodMap.rentDetail">
                    <i class="iconfont icon-shuangxiajiantou-" @click="flodClickHandler('rentDetail',true)"></i>
                </div>
            </transition>
        </template>
        <!--支付方式-->
        <!--         <template>
            <p class="page-range-header">支付方式</p>
            <mt-field label="户名" placeholder="请输入户名"></mt-field>
            <mt-field label="开户行" placeholder="请输入开户行"></mt-field>
            <mt-field label="账号" placeholder="请输入账号" type="number"></mt-field>
        </template> -->
        <!-- 违约条款 -->
        <template>
            <p class="page-range-header">违约条款</p>
            <transition name="xxUp">
                <div class="flodHandler-box" v-show="flodMap.breakDetail">
                    <i class="iconfont icon-shangshuangjiantou" @click="flodClickHandler('breakDetail',false)"></i>
                    <xxg-deposit :detail="true" :firstPy.aync="form.breakDetailFirst" :secondPy.aync="form.breakDetailSecond"></xxg-deposit>
                </div>
            </transition>
            <transition name="xxDown">
                <div class="flodHandler-box" v-show="!flodMap.breakDetail">
                    <i class="iconfont icon-shuangxiajiantou-" @click="flodClickHandler('breakDetail',true)"></i>
                </div>
            </transition>
        </template>
        <!-- 附加资料 -->
        <template>
            <p class="page-range-header">附加资料</p>
            <div class="additional-box">
                <h5 class="additional-title">营业执照</h5>
                <div class="additional-main">
                    <xxg-upload :urls="form.additional.certificate" :detail="true"></xxg-upload>
                </div>
                <h5 class="additional-title">身份证</h5>
                <div class="additional-main">
                    <xxg-upload :urls="form.additional.idCard" :detail="true"></xxg-upload>
                </div>
            </div>
        </template>
        <button @click="ccclick"></button>
        fdsdf
        </button>
    </div>
</template>

<script>
    import XxgHorzin from '@/components/form/horizon'
    import qs from 'query-string'
    import Fieldtemp from '@/components/temp/field'
    import formMap from '@/config/formMap'
    import slotsMap from '@/config/slotsMap'
    import dd from 'dingtalk-jsapi/index.js'
    import roomTmp from '@/components/room/temp'
    import XxgDetails from '@/components/temp/details'
    import XxgDeposit from '@/components/temp/deposit'
    import ApproState from '@/components/approflow/state'
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
                approvalState: {},
                flodMap: {
                    secondParty: null,
                    breakDetail: null,
                    rentDetail: null,
                    signPrice: null
                },
                form: {
                    housingSign: null,
                    identifier: "2746547265957",
                    firstRent: 4000,
                    propertyFee: 27,
                    secondParty: "南慕容",
                    spaceMap: [],
                    spaceSignInfo: null,
                    rentFreeInfo: {
                        time: '2018-9-10',
                        amount: '100',
                        desc: '免租的信息是什么信息',
                        certify: [
                            'http://img.zcool.cn/community/0100785859056fa8012060c8c2bbc0.JPG@1280w_1l_2o_100sh.jpg'
                        ]
                    },
                    secondPartyInfo: {
                        compony: 'xx公司',
                        corporation: '法人',
                        registerAddr: '注册地址',
                        contactAddr: '通讯地址',
                        phone: '电话'
                    },
                    signEt: "2018-07-23 00:00:00",
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
                    housingSquare: 10000,
                    housingUse: "结婚生娃",
                    docUrl: null,
                    signPrice: 10000,
                    deposit: 100,
                    templateId: "1",
                    signSt: "2018-07-21 00:00:00",
                    state: 1,
                    signYears: 10,
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
                }
            }
        },
        mounted() {
            // 状态字典 
            this.getDict('approvalState')
            dd.biz.navigation.setMenu({
                items: [{
                    "id": "1",
                    "text": "编辑"
                }, {
                    "id": "2",
                    "text": "转发"
                }],
                onSuccess(data) { /* {"id":"1"} */ },
                onFail(err) {}
            });
            dd.biz.navigation.setTitle({
                title: '合同详情'
            })

            // document.querySelectorAll('input,textarea').forEach(info => info.onfocus = e => this.flag = 1)
        },
        created() {
            let {
                contractId
            } = qs.parse(window.location.search)
            this.$service.getOneXxContractDetail({
                id: contractId
            }).then((res) => {
                if (+res.code === 0 && res.data) {
                    this.form = { ...res.data
                    }
                }
                // // this.comtractState = accrMap[this.form.state]
            }).catch(reject => {
                console.log(111)
            })
        },
        components: {
            XxgHorzin,
            Fieldtemp,
            roomTmp,
            XxgDetails,
            XxgDeposit,
            ApproState,
            XxgUpload
        },
        watch: {

        },
        methods: {
            contactTxt() {
                if (!this.form.docUrl) {
                    return 'PDF生成失败，点击重新生成'
                }
                return this.form.identifier
            },
            linkContact() {
                if (this.form.docUrl) {
                    // window.location.href = '' + this.form.url
                    alert(this.form.docUrl)
                }
            },
            accrTitle() {
                return this.approvalState[this.form.state] || ''
            },
            ccclick() {
                console.log(this.form.xx_rent_details)
            },
            jumpAddr(url) {
                if (url) {

                }
            },
            flodClickHandler(key, bool) {
                this.flodMap[key] = bool;
            },
            getDict(key) {
                this[key] = {
                    1: '未提交审批',
                    2: '审批中',
                    3: '审批通过',
                    4: '已签约'
                }
                return;
                Indicator.open('Loading...')
                this.$service.getDict(key).then(res => {
                    Indicator.close()
                    let obj = {};
                    res.forEach(info => {
                        obj[info.value] = info.name
                    });
                    this[key] = obj;
                }).catch(rej => {
                    Indicator.close()
                    //失敗
                })
            }
        }
    }
</script>

<style lang="scss">
    @keyframes identifier {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0%);
            opacity: 1;
        }
    }

    @keyframes against {
        from {
            transform: translateY(0%);
            opacity: 1;
        }
        to {
            transform: translateY(100%);
            opacity: 0;
        }
    }

    .xxUp-enter-active,
    .xxDown-leave-active {
        animation: identifier .4s;
    }

    .xxUp-leave-active,
    .xxDown-enter-active {
        animation: against .4s;
    }

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
        .contract_tmp {
            position: relative;
            .mint-cell-wrapper {
                padding-left: .46rem;
                input {
                    color: #666666;
                    font-size: .14rem;
                }
            }
            .icon-file-text {
                position: absolute;
                top: .15rem;
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
                &.accr-state {
                    width: 1rem;
                    color: #e51c23;
                }
            }
            textarea {
                height: .97rem;
                border-radius: .05rem;
                border: .01rem solid rgba(238, 238, 238, 1);
            }
            .accr-handler {
                color: #2e87ea;
                .icon-right {
                    color: #999;
                }
            }
            .mint-field-other {
                color: #999;
            }
        }
        .detail_textarea {
            textarea {
                border: none;
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
        .flodHandler-box {
            min-height: .48rem;
            position: relative;
            background-color: #fff;
            .icon {
                &-shangshuangjiantou {
                    position: absolute;
                    left: 50%;
                    bottom: -0.08rem;
                    z-index: 1;
                    transform: translateX(-50%);
                }
                &-shuangxiajiantou- {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    z-index: 1;
                    transform: translate(-50%, -50%);
                    -webkit-transform: translate(-50%, -50%);
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