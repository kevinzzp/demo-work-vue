<template>
    <div v-if="type==='time'" class="time-horizon-box clearfix">
        <slot name="lSlot"></slot>
        <slot name="rSlot"></slot>
    </div>
    <div v-else class="uncontract-horizon-box horizon-style">
        <slot name="lSlot"></slot>
        <slot name="rSlot"></slot>
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                default: 'time'
            }
        }
    }
</script>

<style lang="scss">
    .time-horizon-box,
    .uncontract-horizon-box {
        .mint-cell {
            width: 50%;
            float: left;
            .mint-cell-title {
                text-align: left;
                color: #999;
                width: auto;
                padding: 0 .1rem;
                .mint-cell-text {
                    width: auto;
                }
            }
            .mint-cell-wrapper {
                padding: 0 0 0 .1rem;
            }
        }
        &.horizon-style {
            .mint-cell-text {
                color: #999;
            }
        }
    }

</style>