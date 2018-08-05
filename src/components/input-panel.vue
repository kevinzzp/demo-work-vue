<!-- 输入Panel容器，内科包含多项输入项 -->
<template>
  <div class="panel">
   <mt-field class="line" label="客户名称 " placeholder="输入客户名" v-model="customName"><a class="identification">*&nbsp;&nbsp;&nbsp;&nbsp;</a></mt-field>
    <slot/>
  </div>
</template>

<script>
export default {
  data: () => {

  },
  props: {
    title: String
  },
  methods: {

  }
}
</script>


<style lang="sass" scoped>
.panel {
  padding: 0.2rem 0;
  .title {
    color: #777;
    padding-left: 0.3rem;
    margin-bottom: 0.3rem;
  }
}
</style>
