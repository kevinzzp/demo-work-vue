<template>
    <div :class="['mask',cla]" @click="doClick">
        <slot></slot>
    </div>

</template>
<script>
    export default {
        name: "MaskComp",
        props: {
            cla: {
                default: ""
            },
            clickable: {
                default: false
            }
        },
        methods: {
            doClick() {
                this.clickable && this.$emit("mask-click");
            }
        }
    }
</script>
<style lang="scss">
    .mask {
        z-index: 999;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .35);
        overflow: auto;
        text-align: center;
        &.mask-top {
            z-index: 9998;
        }
        &.msgBox {}
        &.max-zindex-msg {
            z-index: 9999;
        }
    }
</style>