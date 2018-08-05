<template>
    <div class="contents">
        <div class="card_item" v-for="info in listData">
            <div class="content_top">
                <i class="iconfont  icon-pdf"></i>
                <div class="content_message">
                    <div class="content_message_name">{{ info.name }}</div>
                    <div class="content_notice">到期日： {{ info.endTime }}</div>
                </div>
                <div class="content_right">
                    <i style="color:#999999;" class="iconfont icon-right" @click="getDetail(info.id)"></i>
                </div>
            </div>
            <div class="content_bottom">
                <div class="content_notice">创建于：{{ info.createTime }}</div>
                <!-- <div class="content_notice">{{ info.keyboarder }}录入</div> -->
                <div :class="['content_state_box','content_state_box_' + info.state ]">{{ getState(info.state) }}</div>
            </div>
        </div>
    </div>

</template>
<script>
    export default {
        props: {
            listData: Array,
            state: Array,
        },
        methods: {
            getState(state) {
                console.log(state)
                if (state === undefined) return ''
                let obj = this.state.filter(info => {
                    if (+info.value === +state) {
                        return info
                    }
                })[0]
                return typeof obj === 'object' ? obj.name : ''
            },
            getDetail(id) {

            }
        }
    }
</script>
<style lang="scss" scoped>
    .contents {
        margin: 1.5% 0;
        font-size: .12rem;
        line-height: .22rem;
        .card_item {
            min-height: 1.48rem;
            box-sizing: border-box;
            padding: .05rem .12rem;
            background-color: #fff;
            margin-bottom: .2rem;
        }
        .content_top {
            display: flex;
            border-bottom: .02rem solid #f5f5f5;
            height: 67%;
            .icon-pdf {
                font-size: .5rem;
                color: #1694D9;
                line-height: .86rem;
            }
            .content_message {
                width: 72%;
                padding: .22rem 0 0 .16rem;
                &_name {
                    font-size: .16rem;
                    line-height: .28rem;
                    font-weight: 700;
                }

            }
        }
        .content_bottom {
            padding: .1rem .05rem;

        }
        .content_right {
            color: #999;
            font-size: .24rem;
            line-height: .3rem;
            margin-top: .38rem;
        }
        .content_notice {
            float: left;
            color: #848484;
            line-height: .22rem;
            margin-right: .3rem;
        }
        .content_state_box {
            float: right;
            width: .75rem;
            height: .2rem;
            border-radius: .03rem;
            color: #fff;
            text-align: center;
            &_1 {
                background-color: #2E87EA;
            }
            &_2 {
                background-color: #EA602E;
            }
            &_3 {
                background-color: #259B24;
            }
            &_4 {
                background-color: #666666;
            }
        }
    }
</style>