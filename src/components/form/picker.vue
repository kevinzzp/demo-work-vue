<template>
    <modal :show="selectShow" cla="mask-top" :needBox="needBox">
        <mt-picker class="picker" :slots="slots" @change="onValuesChange" :visible-item-count="5" :show-toolbar="true" :value-key="valueKey">
            <a v-if="selectShow === 'lou'" @click="handlerAdd" class="add">添加</a>
            <mt-button @click="handleConfirm" class="sure">确认</mt-button>
            <mt-button @click="handleCancel" class="cancel">取消</mt-button>
        </mt-picker>
    </modal>
</template>

<script>
    import Modal from '@/components/modal';

    let value;
    export default {
        data() {
            return {
                needBox: false,
                dbclick: false
            }
        },
        components: {
            Modal
        },
        props: {
            slots: Array,
            selectShow: {
                default: false
            },
            valueKey: {
                default: 'name'
            }
        },
        methods: {
            handlerAdd() {
                //判断按钮的状态
                if (!this.dbclick) {
                    this.dbclick = true;
                    setTimeout(() => {
                        this.dbclick = false;
                    }, 500);
                    this.$emit("addAction");
                }
            },
            // 确认状态选择
            handleConfirm() {
                let key = this.selectShow
                this.$emit('handleConfirm', {
                    [key]: value
                })
            },
            handleCancel() {
                this.$emit('handleCancel')
            },
            onValuesChange(picker, values) {
                if (typeof values[0] === 'object') {
                    value = values[0].value
                } else {
                    value = values[0]
                }

            }
        },
        computed: {

        },
        watch: {

        }
    }
</script>

<style lang="scss">
    .picker {
        bottom: 0;
        z-index: 999;
        position: fixed;
        width: 100%;
        background-color: #FFFF;
        .sure {
            float: right;
            margin-right: .16rem;
            margin-top: .32rem;
            background-color: #e51c23;
            color: #fff;
        }
        .cancel {
            float: left;
            margin-left: .16rem;
            margin-top: .32rem;
            background-color: #fff;
        }
        .add {
            position: absolute;
            cursor: pointer;
            color: #2e87ea;
            top: 30%;
            left: 50%;
            transform: translateX;
            transform: translatex(-50%);
            z-index: 2;
        }
    }
</style>