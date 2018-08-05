<template>
  <div>
    <div class="box">
      <div class="item">
        <a href="/page/space/list.html">
          <span class="icon iconfont icon-tijikongjian"></span>
          <p class="text">空间管理</p>
        </a>
      </div>
      <div class="item">
        <a href="/page/customer/list.html">
          <span class="icon iconfont icon-guanlikehu"></span>
          <p class="text">客户管理</p>
        </a>
      </div>
      <div class="item">
        <a href="/page/contract/list.html">
          <span class="icon iconfont icon-dingdanguanli"></span>
          <p class="text">合同管理</p>
        </a>
      </div>
      <div class="item">
        <span class="icon iconfont icon-filedone"></span>
        <p class="text">票据管理</p>
      </div>
      <div class="item">
        <span class="icon iconfont icon-zhexiantu"></span>
        <p class="text">数据大盘</p>
      </div>
      <div class="item">
        <span class="icon iconfont icon-guanlizhongxin"></span>
        <p class="text">管理中心</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        test: 'hello world woshi'
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  a {
    text-decoration: none;
    cursor: pointer;
  }

  .box {
    display: flex;
    flex-wrap: wrap;
  }

  .item {
    text-align: center;
    width: 25%;
    height: .48rem;
    padding: .24rem 0 .24rem 0;
    .icon {
      color: #03a9f4;
      font-size: .48rem;
    }
    .text {
      font-size: .126rem;
      margin: .15rem 0 0 0;
      color: #888;
    }
  }
</style>