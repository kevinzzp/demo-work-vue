<template>
    <div class="xxg-card-box" :class="{cardActive: !detail}"  @touchstart="gtouchstart" @touchmove="gtouchmove" @touchend="gtouchend">
        <ul class="card-info">
            <li class="tl">
                <span v-if="typeof info.userId === 'object' ">{{ info.userId.ddName }}</span>
                <span v-else>{{ info.name }}</span>
                <i class="iconfont icon-dianhua" @click="callMenu"></i>
            </li>
            <li class="tr">
                <span :class="['status-box','status-box-'+ info.state ]">
                    {{ stateTxt(info.state) }}
                </span>
            </li>
            <li class="tl">
                <span v-if="typeof info.userId === 'object' ">{{ info.userId.ddMobile }}</span>
            </li>
            <li class="tr">{{ info.receptionTime }}</li>
        </ul>
        <div class="card-remark" v-html="getRemark(info)">

        </div>
    </div>
</template>
<script>
    import {
        MessageBox
    } from 'mint-ui';
    import {
        showCallMenu
    } from '@/common/utils'
    let timeOutEvent = 0;
    export default {
        props: {
            info: Object,
            state: Array,
            detail: {
                default: false
            }
        },
        methods: {
            callMenu() {
                showCallMenu({
                    phoneNumber: this.info.tel || '',
                    showDingCall: true
                })
            },
            getRemark(info) {
                return [
                    info.contactResult ? `接洽结果：${info.contactResult}` : undefined,
                    info.remark ? `备注：${info.remark}` : undefined
                ].filter(v => v).join('<br />')
            },
            stateTxt(state) {
                if (state === undefined) return ''
                let obj = this.state.filter(info => {
                    if (+info.value === +state) {
                        return info.name
                    }
                })[0]
                return typeof obj === 'object' ? obj.name : ''
            },
            gtouchstart(e) {
                if (this.detail) return
                timeOutEvent = setTimeout(() => this.longPress(), 500);
                e.stopPropagation();
            },
            gtouchend() {
                if (this.detail) return
                clearTimeout(timeOutEvent);
            },
            gtouchmove() {
                if (this.detail) return
                clearTimeout(timeOutEvent);
                timeOutEvent = 0;
            },
            longPress() {
                timeOutEvent = 0; //执行长按要执行的内容，如弹出菜单 
                MessageBox.confirm('确定要删除吗?', '注意').then(action => {
                    this.$emit('deleteAciton')
                }).catch(reject => {});
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

    .xxg-card-box {

        background-color: #fff;
        border-bottom: 1px solid #eee;

        &.cardActive {
            cursor: pointer;
        }
        .card-info {
            height: .76rem;
            font-size: .16rem;
            padding: .14rem .22rem .05rem .19rem;
            box-sizing: border-box;
            line-height: .23rem;
            color: #333333;
            li {
                float: left;
                width: 50%;
                height: 50%;
                .icon-dianhua {
                    margin-left: .3rem;
                }
                &.tl {
                    text-align: left
                }
                &.tr {
                    text-align: right;
                    font-size: .14rem;
                    color: #999;
                }
                .status-box {
                    display: inline-block;
                    width: .75rem;
                    color: #fff;
                    font-size: .12rem;
                    text-align: center;
                    line-height: .20rem;
                    border-radius: .03rem;
                    &-20 {
                        background-color: #666666;
                    }
                    &-10 {
                        background-color: #259B24;
                    }
                    &-2 {
                        background-color: #EA602E;
                    }
                    &-1 {
                        background-color: #2E87EA;
                    }
                }
            }
        }


        .card-remark {
            margin: 0 .25rem 0 .5rem;
            text-align: left;
            padding: .05rem;
            border-top: .01rem solid #eee;
            font-size: .14rem;
            color: #777;
            box-sizing: border-box;
        }

    }
</style>