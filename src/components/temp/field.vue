<template>
    <a :class="{'mint-cell': true, 'mint-field':true}">
        <div class="mint-cell-wrapper ">
            <div class="mint-cell-title">
                <span :class="['mint-cell-text', cla]">{{ title }}</span>
            </div>

            <div :class="[mitfix,cla2]">
                <slot name="mtvalue"></slot>
            </div>

            <div class="mint-field-other">
                <slot name="mtother"> </slot>
            </div>
        </div>
    </a>
</template>
<script>
    export default {
        props: {
            title: {
                default: ''
            },
            cla: {
                default: ''
            },
            cla2: {
                default: ''
            },
            mitfix: {
                default: ''
            }
        }
    }
</script>
<style lang="scss">
    .mint-cell {
        &.timeRange-box {
            width: 50%;
            float: left;
            .mint-cell-title {
                padding-right: .05rem;
            }
            .endTime-picker {
                text-align: left;
                color: #999;
                width: .2rem;
            }
            .date-picker-box {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>