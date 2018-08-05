<template>
    <span :class="['btn-box',boxStyle]">
        <a v-if="circleEdit" class="delete-btn" @click="closeAction">
            <i class="iconfont icon-cuowu"></i>
        </a>
        <a :class='cla' @click="notifyAction">
            <i v-if="icon" :class='["iconfont","icon-"+icon]'></i>
            <span>
                <slot>{{text}}</slot>
            </span>
        </a>
        <div v-if="noticeText" class="notice-text">
            {{ noticeText }}
        </div>
    </span>
</template>
<script>
    import {
        MessageBox
    } from 'mint-ui';
    export default {
        props: {
            type: {
                default: "func" //link
            },
            text: {
                default: ""
            },
            disabled: {
                default: false
            },
            icon: {
                default: ""
            },
            noticeText: {
                default: ""
            },
            circleEdit: {
                default: ""
            },
            boxStyle: {
                default: ""
            }
        },
        data() {
            return {
                dbclick: false,
                closeClick: false
            }
        },
        computed: {
            cla() {
                var c = {
                    'ph-btn': true,
                    'ph-btn-disabled': this.disabled
                }
                c['ph-btn-' + this.type] = true;
                if (this.type.indexOf('circle') > -1) {
                    c['ph-btn-circle'] = true;
                    delete c['ph-btn']
                }
                return c;
            }
        },
        methods: {
            notifyAction() {
                //判断按钮的状态
                if (!this.disabled && !this.dbclick) {
                    this.dbclick = true;
                    //500 ms 后，自动打开禁用的按钮标记
                    setTimeout(() => {
                        this.dbclick = false;
                    }, 500);
                    this.$emit("btnAction");
                }
            },
            closeAction() {
                MessageBox.confirm('确定要删除吗?', '注意').then(action => {
                    this.$emit("deleteAction", true);
                }).catch(reject => {

                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .ph-btn {
        cursor: pointer;
        background-color: #fff;
        border: .01rem solid #E7E7E7;
        box-shadow: 0 .01rem .03rem 0 #D3DBEC;
        height: .24rem;
        line-height: .24rem;
        display: inline-block;
        padding: 0 .12rem;
        text-align: center;
        transition: all 0.5s ease-in-out;
        font-size: .14rem;
        color: #3B4F61;
        letter-spacing: .002rem;
        margin-right: .1rem;
        &.ph-btn-disabled:hover {
            border: .01rem solid #E7E7E7;
            box-shadow: 0 0 0 0 #A2ACBD;
        }
        &:hover {
            background-color: #F6F6F6;
            box-shadow: 0 0 .04rem 0 #A2ACBD;
            border: .01rem solid transparent;
        }
        &.ph-btn-disabled {
            cursor: not-allowed;
            opacity: 0.7;
            background-color: #f3f3f3;
            box-shadow: 0 0 0 0 #A2ACBD;
        }
        &.ph-btn-sy-green {
            color: #fff;
            background-color: #59BBC4;
            &:hover {
                background-color: #00838F;
            }
        }
    }

    .ph-btn-circle {
        display: inline-block;
        border-radius: 50%;
        width: .48rem;
        padding: .02rem;
        color: #fff;
        font-size: .14rem;
        line-height: .46rem;
        text-align: center;
        background-color: rgb(46, 135, 234);
        box-sizing: border-box;
        height: .48rem;
        overflow: hidden;
        &-blank {
            background-color: #fff;
            color: rgba(46, 135, 234, 1);
            padding: 0;
            border: .02rem solid rgba(46, 135, 234, 1);
            .icon-jiahao {
                font-size: .2rem;
            }
        }
        &-blank1 {
            border: .01rem solid rgba(46, 135, 234, 1);
            background-color: #fff;
            color: rgba(46, 135, 234, 1);
            padding: 0;
            .icon-user1 {
                font-size: .24rem;
            }
            .icon-jiahao {
                font-size: .2rem;
            }
        }
    }

    .btn-box {
        padding: .1rem 0;
        display: inline-block;
        text-align: center;
        position: relative;
        font-size: .16rem;
        margin-right: .18rem;
        vertical-align: top;
        .delete-btn {
            position: absolute;
            right: -.06rem;
            top: .02rem;
            color: #E51C23;
        }
        .notice-text {
            font-size: .14rem;
            color: #101010;
            line-height: .2rem;
        }
        &-skipbox {
            display: block;
            margin: .3rem .1rem;
            .ph-btn {
                width: 100%;
                background-color: #EA602E;
                color: #fff;
                box-sizing: border-box;
                height: .42rem;
                line-height: .42rem;
                border-radius: .05rem;
            }
        }
    }
</style>