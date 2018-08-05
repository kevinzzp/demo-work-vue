<template>
    <div class="page-range">
        <template>
            <p class="page-range-header">合同信息</p>
            <mt-field label="公司" v-model="form.name" placeholder="请输入公司名"></mt-field>
            <mt-field label="签约金额" v-model="form.amount" placeholder="请输入签约金额">
                元
            </mt-field>
            <xxg-horzin>
                <mt-field slot="lSlot" @click.native="ddPicker('signSt')" :disableClear="true" readonly class="start-time-field" :value="timeComputed(form.signSt)"
                    label="时间" placeholder="请选择开始时间"></mt-field>
                <mt-field slot="rSlot" :disableClear="true" @click.native="ddPicker('signEt')" readonly class="end-time-field" :value="timeComputed(form.signEt)"
                    label="至" placeholder="请选择结束时间"></mt-field>
            </xxg-horzin>
        </template>
        <template>
            <p class="page-range-header">审批人</p>
            <xxg-flow :dataSource.aync="form.appro"></xxg-flow>
        </template>

        <xxg-btn boxStyle="btn-box-skipbox" text="稍后再填写" @btnAction="skipAction"></xxg-btn>
    </div>
</template>

<script>
    import moment from 'moment'
    import XxgHorzin from '@/components/form/horizon'
    import dd from 'dingtalk-jsapi/index.js'
    import {
        scanCard,
        openApp
    } from '@/common/utils'
    import XxgBtn from '@/components/btn'
    import XxgFlow from '@/components/approflow'
    /* eslint-disable */
    export default {
        data() {
            return {
                // edit: false,
                // flag: 0,
                // corpId: null,
                form: {
                    name: null,
                    signSt: null,
                    signEt: null,
                    amount: null,
                    appro: [{
                        id: null,
                        name: null
                    }, {
                        id: null,
                        name: null
                    }]
                }
            }
        },
        mounted() {
            dd.biz.navigation.setRight({
                show: true,
                control: true,
                text: '提交',
                onSuccess: (result) => {

                },
                onFail(err) {

                }
            })
            dd.biz.navigation.setTitle({
                title: '合同提交审批'
            })
        },
        created() {

        },
        components: {
            XxgHorzin,
            XxgBtn,
            XxgFlow
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
            skipAction() {

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
        .contract_tmp {
            position: relative;
            .mint-cell-wrapper {
                padding-left: .46rem;
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