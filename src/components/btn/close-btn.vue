<template>
    <a :class='["ph-btn","ph-close-btn",cla]' @click="notifyAction"></a>
</template>
<script>
    export default {
        props: {
            cla: {
                default: ""
            },
            icon: {
                default: "close"
            },
            action: {
                default: ""
            }
        },
        data() {
            return {
                dbclick: false
            }
        },
        methods: {
            notifyAction() {
                //判断按钮的状态
                if (!this.disabled && !this.dbclick) {
                    this.dbclick = true;
                    //500 s 后，自动打开禁用的按钮标记
                    setTimeout(i => this.dbclick = false, 500);
                    this.$emit("btnAction", this.action);
                }
            }
        }
    }
</script>
<style lang="scss" scoped="">
    .ph-btn {
        position: absolute;
        right: .1rem;
        top: 0;
        line-height: .3rem;
        height: .3rem;
        cursor: pointer;
        &.ph-close-btn {
            position: absolute;
            width: .12rem;
            height: .12rem;
            padding: .1rem;
            top: .05rem;
            right: .05rem;
            overflow: hidden;
            &:before,
            &:after {
                content: "";
                position: absolute;
                top: 0;
                right: 0;
                margin: auto;
                width: .14rem;
                height: .01rem;
                background-color: #666;
            }
            &:after {
                transform: rotate(45deg)
            }
            &:before {
                transform: rotate(-45deg)
            }
        }
        &:hover {
            opacity: .5;
        }
    }
</style>