<!--
  select组件
    - v-model
    - props: 
      - defaultValue : ''
      - defaultText: '请选择'
      - selectData: [
          {
            value: 12,
            text: '北京'
          }
        ]
      - withSplit: 是否添加竖线分隔符（竖线位于左侧）
 -->
<template>
  <div :class="{'select-box': true, 'left-border': withSplit }">
    <select v-bind:value="selectValue" @change="emitChange($event)" type="select" name="aaa" class="select">
      <option v-if="withDefault" :value="defaultText || ''">{{ defaultText || '请选择' }}</option>
      <option :key="item.value" v-for="item in selectData" :value="item.value">{{ item.text }}</option>
    </select>
    <i class="iconfont icon-down"></i>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'selectValue',
    event: 'change'
  },
  props: {
    withSplit: {
      type: Boolean,
      default: false
    },
    withDefault: {
      type: Boolean,
      default: true
    },
    defaultValue: {
      type: String,
      default: ''
    },
    defaultText: {
      type: String,
      default: ''
    },
    selectData: {
      type: [Array],
      default: []
    },
    selectValue: [Number, String]
  },
  methods: {
    emitChange (e) {
      this.$emit('change', e.target.value)
    }
  }
}
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
.select-box {
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
  .select {
    padding: 0.1rem 0;
    font-size: 0.16rem;
    flex: 1;
    margin-left: 0.15rem;
    outline: none;
  }
  .iconfont {
    margin-right: 0.2rem;
    color: #999;
  }
  &.left-border {
    &:before {
      content: '';
      position: absolute;
      width: 1px;
      height: 50%;
      top: 25%;
      background-color: #DBDBDB;
      left: 0;
    }
  }
}
</style>
