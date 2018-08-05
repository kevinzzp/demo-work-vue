<template>
    <modal :show="pickerMsg.show" cla="mask-top" :needBox="needBox">
        <mt-datetime-picker ref="picker" type="time" v-model="pickerMsg.data" @confirm="handleConfirm">
        </mt-datetime-picker>
    </modal>
</template>

<script>
    import Modal from '@/components/modal';
    export default {
        data() {
            return {
                needBox: false
            }
        },
        components: {
            Modal
        },
        props: {
            data: {
                default: ''
            },
            show: {
                default: false
            }
        },
        created() {
            this.$refs.picker.open();
        },
        methods: {
            // 确认状态选择
            handleConfirm() {

            },
            handleCancel() {

            }
        },
        computed: {

        },
        watch: {
            'pickerMsg.show' (newVal) {

            }
        }
    }
</script>

<style lang="scss">
</style>