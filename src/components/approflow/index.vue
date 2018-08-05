<template>
    <div class="appro-flow-box">
        <template v-for="info in dataSource">

        </template>
        <div class="appro-flow-notice">提交后会自动生成审批流</div>
    </div>
</template>
<script>
    export default {
        props: {
            dataSource: Array
        },
        data() {
            return {

            }
        },
        computed: {

        },
        methods: {

        }
    }
</script>
<style lang="scss" scoped>
    .appro-flow {
        &-box {
            padding: .3rem;
            background-color: #fff;
            color: #333333;
            font-size: .14rem;
            text-align: center;
            >div {
                background-color: #F6F6F6;
            }
        }
        &-notice {
            border-radius: .03rem;
            line-height: .25rem;
        }
    }
</style>