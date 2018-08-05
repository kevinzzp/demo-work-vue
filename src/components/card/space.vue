<template>
    <div class="contents">
        <ul class="card_item" v-for="info in listData">
            <li class="card_item_top">
                <span class="title"> {{ info.name }}</span>
                <span :class="['state_box','fr', 'state_box_' + info.state]"> {{ getState(info.state) }} </span>
            </li>
            <li class="card_item_middle">
                <span> {{ info.size ? info.size + '平米' : '' }}</span>
                <span class="middle_info"> {{ info.amount ? info.amount + '/天' : '' }} </span>
                <span class="fr"> {{ info.firstParty ? info.firstParty + '承担' : '' }} </span>
            </li>
            <li class="card_item_bottom">
                <span> {{ info.addr }}</span>
                <span class="fr"> {{ info.time ? info.time + '到期' : '' }} </span>
            </li>
        </ul>
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
                if (state === undefined) return ''
                let obj = this.state.filter(info => {
                    if (+info.value === +state) {
                        return info.name
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
    ul,
    li {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .contents {
        margin: 1.5% 0;
        font-size: .14rem;
        line-height: .22rem;
        .card_item {
            min-height: 1.24rem;
            box-sizing: border-box;
            padding: .1rem .12rem;
            background-color: #fff;
            margin-bottom: .2rem;
            .fr {
                float: right;
            }
            &_top {
                padding: .05rem .03rem;
                .title {
                    font-size: .16rem;
                    line-height: .26rem;
                    font-weight: 550;
                }
                .state_box {
                    width: .75rem;
                    display: inline-block;
                    text-align: center;
                    line-height: .2rem;
                    border-radius: .03rem;
                    color: #fff;
                    &_1 {
                        background-color: #EA602E;
                    }
                    &_2 {
                        background-color: #2E87EA;
                    }
                    &_3 {
                        background-color: #259B24;
                    }
                    &_4 {
                        background-color: #bbb;
                    }
                }
            }
            &_middle {
                padding: .05rem .03rem;
                .middle_info {
                    padding-left: .2rem;
                }
            }
            &_bottom {
                padding: .05rem .03rem;
                color: #848484;
            }
        }

    }
</style>