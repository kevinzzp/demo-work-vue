<!-- 空间选择组件，可以选择多个空间 -->
<template>
  <div class="box">
    <div class="title"><span>第 {{ number || 1 }} 条</span></div>
    <div class="op">
      <span @click="buttonClick(1)" v-if="!number || number === 1" class="add">
        <i class="iconfont icon-jiahao"></i>
      </span>
      <span @click="buttonClick(-1)" v-else class="minus">
        <i class="iconfont icon-jianhao"></i>
      </span>
    </div>
    <div class="line">
      <m-select :selectData="spaceData[0]" @change="valueChange($event, 1)"/>
      <template v-if="spaceData.length>1">
        <m-select :selectData="spaceData[1]" @change="valueChange($event, 2)"
          :withSplit="true"/>
      </template>
    </div>
    <div v-if="spaceData.length>2" class="line">
      <m-select :selectData="spaceData[2]" @change="valueChange($event, 3)"/>
      <template v-if="spaceData.length>3">
        <m-select :selectData="spaceData[3]" @change="valueChange($event, 4)"
          :withSplit="true"/>
      </template>
    </div>
    <div v-if="spaceData.length>4" class="line">
      <m-select :selectData="spaceData[4]" @change="valueChange($event, 5)"/>
      <template v-if="spaceData.length>5">
        <m-select :selectData="spaceData[5]" @change="valueChange($event, 6)"
          :withSplit="true"/>
      </template>
    </div>
  </div>
</template>

<script>
import mSelect from '@/components/m-select.vue'
export default {
  model: { // 多个值以逗号隔开，示例值: 123   123,345
    prop: 'selectItems',
    event: 'change'
  },
  components: {
    mSelect
  },
  props: {
    buttonClick: { // 右上角按钮点击事件。1: 添加；-1: 删除
      type: Function,
      default: () => {}
    },
    number: [ String, Number ],
    selectItems: [ String, Number ]
  },
  data: function () {
    return {
      overValue: null,
      spaceData: [[]]
    }
  },
  beforeMount () {
    this.getNext(1)
  },
  watch: {
    overValue () {
      this.$emit('change', this.overValue)
    }
  },
  methods: {
    valueChange (value, layer) {
      this.overValue = value
      this.getNext(value, layer + 1).then((data) => {
        if (data) {
          this.overValue = null
        }
      })
    },
    getNext (id = 0, layer = 0) {
      if (layer > 6) {
        return Promise.resolve(null)
      }

      let body = {
        'layer': layer,
        'parent': id
      }
      let data = this.$utils.toJson(body)
      this.$service.postgetXxSpaces(data).then(function (res) {
        console.log(res)
        let success = res.success
        let code = res.code
        let data = res.data
        let message = res.message
        if (!success) {
          throw new Error({ code, message })
        }
        return data && data.length && data
      }).then((data) => {
        let returnData = []
        for (let item in data) {
          returnData.push({ value: data[item]['id'], text: data[item]['name'] })
        }
        this.spaceData.splice(layer - 1, this.spaceData.length, returnData)
        return returnData
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.box {
  font-size: 0.16rem;
  border: 1px solid #eee;
  border-radius: 5px;
  margin: 0.1rem;
  margin-top: 0.3rem;
  position: relative;
  .title {
    font-size: 0.15rem;
    text-align: center;
    margin-top: -0.1rem;
    >span {
      padding: 0 0.1rem;
      background-color: #fff;
    }
    margin-bottom: 0.2rem;
  }
  .op {
    position: absolute;
    top: -0.12rem;
    right: 0.13rem;
    span {
      padding: 0.03rem 0.05rem;
      background-color: #fff;
    }
    i {
      color: #2E87EA;
      font-size: 0.20rem;
    }
  }
  :last-child:after {
    :after {
      height: 0;
    }
  }
}
.line {
  display: flex;
  position: relative;
  padding: 0.04rem 0;
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    left: 0.1rem;
    background-color: #eee;
    bottom: 0;
  }
  /deep/ >*{
    flex: 1;
    width: 50%;
  }
}
</style>
