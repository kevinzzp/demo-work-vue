<template>
    <msg-handler :detail="detail" :dataSource="dataSource" @addAction="addDetails" @deleteAction="deleteDetails">
        <template slot-scope="props">
            <xxg-horzin>
                <mt-field slot="lSlot" @click.native="ddPicker('stTime',props.info)" readonly :disableClear="detail" class="start-time-field"
                    :value="timeComputed(props.info.stTime)" label="时间" placeholder="请输入开始时间"></mt-field>
                <mt-field slot="rSlot" readonly @click.native="ddPicker('etTime',props.info)" :disableClear="detail" class="end-time-field"
                    :value="timeComputed(props.info.etTime)" label="至" placeholder="请输入结束时间"></mt-field>
            </xxg-horzin>
            <mt-field label="日租金" :disableClear="detail" :readonly="detail" type="number" v-model="props.info.order">
                元/建筑平方米/天
            </mt-field>
            <mt-field label="月租金" :disableClear="detail" :readonly="detail" type="number" v-model="props.info.monthRent">
                每月30天计算
            </mt-field>
            <mt-field label="年租金" :disableClear="detail" :readonly="detail" type="number" v-model="props.info.yearRent">
                元
            </mt-field>
        </template>
    </msg-handler>
</template>
<script>
    import dd from 'dingtalk-jsapi/index.js'
    import msgHandler from './msgHandler'
    import XxgHorzin from '@/components/form/horizon'
    export default {
        props: {
            dataSource: Array,
            detail: {
                default: false
            }
        },
        components: {
            XxgHorzin,
            msgHandler
        },
        watch: {
            dataSource: {
                handler(newVal) {
                    newVal.forEach(info => {
                        if (!info.monthRent) {
                            info.monthRent = info.order ? info.order * 30 : null
                        }
                        if (!info.yearRent) {
                            info.yearRent = info.order ? info.order * 365 : null
                        }
                    })
                },
                deep: true
            }
        },
        computed: {

        },
        methods: {
            addDetails(info) {
                this.dataSource.push(info)
            },
            deleteDetails(index) {
                this.dataSource.splice(index, 1)
            },
            ddPicker(key, info) {
                if (this.detail) return;
                let date;
                let format = 'yyyy-MM-dd';
                if (info[key]) {
                    date = info[key].split(' ')[0]
                } else {
                    date = moment(new Date).format(format)
                }
                let self = this
                dd.biz.util.datepicker({
                    format: format,
                    value: date, //默认显示日期
                    onSuccess(result) {
                        info[key] = result.value + ' 00:00:00'
                    },
                    onFail(err) {
                        console.log(err)
                    }
                })
            },
            timeComputed(time) {
                if (time) return time.split(' ')[0]
            }
        }
    }
</script>
<style lang="scss">
    .rent-details-box {
        min-height: .5rem;
        background-color: #fff;
        padding: .2rem .1rem;
        .rent-details-item {
            border: 1px solid #eeeeee;
            padding: .1rem 0 0;
            border-bottom: none;
            position: relative;
            margin-bottom: .2rem;
            .title,
            .add-btn,
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
            .add-btn,
            .delete-btn {
                right: .08rem;
                color: #09c;
                font-weight: 500;
            }
        }
    }
</style>