<template>
    <div class="msg-handler-box">
        <div class="msg-handler-item" v-for="(info,index) in dataSource" :key="index">
            <span class="title">第{{ index + 1 }}条</span>
            <template v-if="!detail">
                <i v-if="index === 0" class="iconfont add-btn icon-jiahao" @click="addAction"></i>
                <i v-else class="iconfont delete-btn icon-jianhao" @click="deleteAction(index)"></i>
            </template>

            <slot :info="info"></slot>
        </div>

    </div>
</template>
<script>
    export default {
        props: {
            dataSource: Array,
            detail: {
                default: false
            }
        },
        methods: {
            addAction() {
                this.$emit('addAction', {
                    year: null,
                    breakRent: null,
                    st: null,
                    et: null,
                    order: null
                })
            },
            deleteAction(index) {
                this.$emit('deleteAction', index)
            }
        }
    }
</script>
<style lang="scss">
    .msg-handler-box {
        min-height: .5rem;
        background-color: #fff;
        padding: .2rem .1rem;
        .msg-handler-item {
            border: 1px solid #eeeeee;
            padding: .1rem 0 0;
            border-bottom: none;
            position: relative;
            margin-bottom: .2rem;
            .title,
            .add-btn,
            .delete-btn {
                position: absolute;
                line-height: .23rem;
                top: -0.1rem;
                font-size: .14rem;
                z-index: 1;
                text-align: center;
                background: #fff;
            }
            .title {
                left: 50%;
                width: .62rem;
                transform: translate(-50%);
            }
            .add-btn,
            .delete-btn {
                right: .08rem;
                color: #09c;
                font-weight: 500;
            }
        }
    }
</style>