<template>

    <PhMask :cla="cla" v-show="show">
        <transition :name="name">
            <template v-if="show">
                <div v-if="needBox" class="dialog">
                    <p class="title">
                        {{title}}
                        <a v-if="closeBtn != 0" class="closeBtn" @click="closeHandler">×</a>
                    </p>
                    <slot></slot>
                </div>
                <slot v-else></slot>
            </template>
        </transition>
    </PhMask>

</template>
<script>
    import CloseBtn from '@/components/btn/close-btn'
    import PhMask from '@/components/mask'
    export default {
        props: {
            title: {
                // default:`${location.origin} 提示:`
                default: ' '
            },
            cla: {
                default: ''
            },
            closeBtn: {
                default: 1
            },
            needBox: {
                default: true
            },
            show: {
                default: false
            },
            name: {
                default: ''
            }
        },
        name: 'BaseModal',
        methods: {
            closeHandler() {
                this.$emit('close-btn-action')
            }
        },
        components: {
            PhMask,
            CloseBtn
        }
    }
</script>
<style lang="scss" scoped="">
    .xxg-enter-active,
    .xxg-leave-active {
        transition: all .4s;
    }

    .xxg-enter,
    .xxg-leave-active {
        transform: translateY(100%)
    }

    .msgBox {
        .dialog {
            background-color: #fff;
            position: absolute;
            bottom: 0;
            text-align: center;
            width: 100%;
            border-top-left-radius: .05rem;
            border-top-right-radius: .05rem;
            left: 0;
            .title {
                height: .3rem;
                line-height: .3rem;
                color: #333;
                margin: 0;
                border-top-left-radius: .05rem;
                border-top-right-radius: .05rem;
                background-color: rgb(46,
                135, 234);
                color: #fff;
                &:before {
                    content: " "
                }
            }
            .closeBtn {
                cursor: pointer;
                padding: .05rem;
                font-size: .18rem;
                display: inline-block;
                right: 0.05rem;
                top: -0.05rem;
                position: absolute;
                &:hover {
                    color: #09c;
                }
            }
        }
    }
</style>