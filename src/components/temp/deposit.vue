<template>
    <div class="deposit-msg-box">
        <h5 class="deposit-msg-title">甲方提前收回房屋违约金</h5>
        <msg-handler :detail="detail" :dataSource="firstPy" @addAction="addFirstPy" @deleteAction="deleteFirstPy">
            <template slot-scope="props">
                <xxg-horzin type="uncontract">
                    <mt-field :readonly="detail" slot="lSlot" type="number" v-model="props.info.year" label="第">
                        年度
                    </mt-field>
                    <mt-field :readonly="detail" slot="rSlot" type="number" v-model="props.info.breakRent" label="违约金">
                        个月
                    </mt-field>
                </xxg-horzin>
                <xxg-horzin>
                    <mt-field readonly slot="lSlot" @click.native="ddPicker('st',props.info)" class="start-time-field" :value="timeComputed(props.info.st)"
                        label="时间" placeholder="请输入开始时间"></mt-field>
                    <mt-field :readonly="detail" @click.native="ddPicker('et',props.info)" slot="rSlot" class="end-time-field" :value="timeComputed(props.info.et)"
                        label="至" placeholder="请输入结束时间"></mt-field>
                </xxg-horzin>
            </template>
        </msg-handler>
        <h5 class="deposit-msg-title">乙方提前退租违约金</h5>
        <msg-handler :detail="detail" :dataSource="secondPy" @addAction="addSecondPy" @deleteAction="deleteSecondPy">
            <template slot-scope="props">
                <xxg-horzin type="uncontract">
                    <mt-field :readonly="detail" slot="lSlot" type="number" v-model="props.info.year" label="第">
                        年度
                    </mt-field>
                    <mt-field :readonly="detail" slot="rSlot" type="number" v-model="props.info.breakRent" label="违约金">
                        个月
                    </mt-field>
                </xxg-horzin>
                <xxg-horzin>
                    <mt-field readonly slot="lSlot" @click.native="ddPicker('st',props.info)" class="start-time-field" :value="timeComputed(props.info.st)"
                        label="时间" placeholder="请输入开始时间"></mt-field>
                    <mt-field :readonly="detail" @click.native="ddPicker('et',props.info)" slot="rSlot" class="end-time-field" :value="timeComputed(props.info.et)"
                        label="至" placeholder="请输入结束时间"></mt-field>
                </xxg-horzin>
            </template>
        </msg-handler>
    </div>
</template>
<script>
    import dd from 'dingtalk-jsapi/index.js'
    import msgHandler from './msgHandler'
    import XxgHorzin from '@/components/form/horizon'
    export default {
        props: {
            firstPy: Array,
            secondPy: Array,
            detail: {
                default: false
            }
        },
        components: {
            XxgHorzin,
            msgHandler
        },
        watch: {

        },
        computed: {

        },
        methods: {
            addFirstPy() {
                this.firstPy.push(this.firstPy.slice(0, 1))
            },
            deleteFirstPy(index) {
                this.firstPy.splice(index, 1)
            },
            addSecondPy() {
                this.secondPy.push(this.secondPy.slice(0, 1))
            },
            deleteSecondPy(index) {
                this.secondPy.splice(index, 1)
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
    .deposit-msg {

        &-box {
            border: 1px solid transparent;
            background-color: #fff;
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
    }
</style>