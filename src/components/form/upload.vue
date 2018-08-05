<template>
    <div class="upload_box ">
        <span v-for="(info,index) in urls" :key="index" class="upload_img">
            <img :src="info" alt="" @click="previewImg(info)" />
            <i v-if="!detail" class="iconfont icon-cuo" @click="deleteImg(index)"></i>
        </span>
        <span v-if="!detail" class="add_btn" @click="uploadImg">
            <i class="iconfont icon-jiahao"></i>
        </span>
    </div>
</template>
<script>
    import {
        uploadImg,
        previewImage
    } from '@/common/utils'
    export default {
        props: {
            urls: Array,
            detail: {
                default: false
            }
        },
        data() {
            return {
                dbclick: false,
                closeClick: false
            }
        },
        computed: {

        },
        methods: {
            uploadImg() {
                let self = this;
                uploadImg({
                    multiple: true, // 是否多选，默认false
                    max: 3, // 最多可选个数
                    onSuccess(result) {
                        self.urls.concat(result)
                    }
                })
            },
            previewImg(url) {
                previewImage({
                    urls: this.urls,
                    current: url
                })
            },
            deleteImg(index) {
                this.urls.splice(index, 1)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .upload_box {
        padding: .2rem 0;
        .upload_img {
            position: relative;
            display: inline-block;
            margin-right: .25rem;
            margin-bottom: .05rem;
            vertical-align: middle;
            img {
                width: .86rem;
                height: .68rem;
            }
            .icon-cuo {
                position: absolute;
                color: red;
                top: -0.15rem;
                right: -0.15rem;
                cursor: pointer;
            }
        }
        .add_btn {
            cursor: pointer;
            display: inline-block;
            width: .8rem;
            height: .6rem;
            box-sizing: border-box;
            border-radius: .05rem;
            text-align: center;
            border: .01rem solid rgba(187, 187, 187, 1);
            .iconfont {
                font-size: .2rem;
                line-height: .6rem;
                font-weight: 700;
            }
        }
    }
</style>