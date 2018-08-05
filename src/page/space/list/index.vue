<template>
  <div class="body">
    <div class="search">
      <div class="search_one">
        <mt-field class="select_text_1" v-model="form.name" readonly placeholder="注册地" @click.native="selectClick('name')">
          <i class="iconfont icon-down"></i>
        </mt-field>
        <mt-field class="select_text_2" :value="getState(form.state)" readonly placeholder="签约状态" @click.native="selectClick('state')">
          <i class="iconfont icon-down"></i>
        </mt-field>
        <mt-field class="select_text_3" v-model="form.purpose" readonly placeholder="用途" @click.native="selectClick('purpose')">
          <i class="iconfont icon-down"></i>
        </mt-field>
      </div>
      <div class="search_two">
        <i class='iconfont icon-search'></i>
        <mt-field class="search_text_4" v-model="form.contacts_message" placeholder="可输入公司名、联系人">
        </mt-field>
      </div>
    </div>
    <space-card :state="state" :listData="listData"></space-card>
  </div>
</template>

<script>
  import {
    Indicator
  } from 'mint-ui'
  import dd from 'dingtalk-jsapi/index.js'
  import spaceCard from '@/components/card/space'
  export default {
    components: {
      spaceCard
    },
    data() {
      return {
        form: {

        },
        listData: [{
          name: '北京摆渡科技有限公司',
          time: '2018年10月25号',
          size: '108',
          amount: 200,
          firstParty: '北京格里有限责任公司承租',
          addr: '北京软件园一号楼B座3层',
          state: 1
        }, {
          name: '303 方舟厅',
          time: '2018年10月25号',
          size: '111',
          amount: 222,
          firstParty: '北京格里有限责任公司承租',
          addr: '北京软件园一号楼B座3层',
          state: 2
        }, {
          name: '344 方舟厅',
          time: '2018年10月25号',
          size: '108',
          amount: 112,
          firstParty: '北京格里有限责任公司承租',
          addr: '北京软件园一号楼B座3层',
          state: 3
        }, {
          name: '404 方舟厅',
          time: '2018年10月25号',
          size: '1123',
          amount: 123123,
          firstParty: '北京格里有限责任公司承租',
          addr: '北京软件园一号楼B座3层',
          state: 4
        }],
        state: []
      }
    },
    mounted: function () {

      // 从后台加载数据
      // this.getlist(this.form, 'new')
      this.getState('state');
      // 设置 钉钉按钮
      dd.biz.navigation.setRight({
        show: true, // 控制按钮显示， true 显示， false 隐藏， 默认true
        control: true, // 是否控制点击事件，true 控制，false 不控制， 默认false
        text: '+', // 控制显示文本，空字符串表示显示默认文本
        onSuccess: (result) => {

        },
        onFail: function (err) {
          console.log(err)
        }
      })

      // 设置 钉钉标题
      dd.biz.navigation.setTitle({
        title: '空间管理'
      })
    },
    methods: {
      // 监听翻页
      loadData() {

      },
      // 查看详情
      details(id) {
        // window.location.href = `/page/customer/detail.html?customeId=${id}`
      },
      // 加载数据
      getlist(body, type) {
        // Indicator.open('Loading...')

      },
      getState(key) {
        this.state = [{
          value: 1,
          name: '未出租'
        }, {
          value: 2,
          name: '已锁定'
        }, {
          value: 3,
          name: '已出租'
        }, {
          value: 3,
          name: '退租'
        }]
        return;
        this.$service.getDict(key).then(res => {
          this.state = res
        })
      }
    },
    computed: {

    },
    watch: {

    }
  }
</script>

<style lang="scss">
  html,
  body {
    margin: 0;
    height: 100%;
  }

  .body {
    padding: 0%;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .search {
    margin: 3%;
    position: relative;
    border-radius: .05rem;
    .icon-search {
      color: #8E8E93;
      position: absolute;
      top: .15rem;
      left: 2%;
      font-size: .18rem;
      z-index: 1;
    }
  }

  .search_one {
    position: relative;
    display: flex;
    justify-content: center;
    .mint-cell {
      min-height: .3rem;
      border: .01rem solid #bbbbbb;
      border-radius: .05rem;
    }
    .mint-cell-wrapper {
      font-size: .14rem;
      line-height: .3rem;
    }
    .select_text {
      &_1 {
        width: 60%;
      }
      &_2 {
        width: 125%;
        margin: 0 .1rem;
      }
      &_3 {
        width: 60%;
      }
    }
  }

  .search_two {
    margin: 3% 0;
    position: relative;
    background-color: #fff;
    .icon-search {
      color: #8E8E93;
      position: absolute;
      top: .05rem;
      left: 2%;
      font-size: .18rem;
      z-index: 1;
    }
    .mint-cell-wrapper {
      font-size: .14rem;
      line-height: .3rem;
    }
    .search_text_4 {
      min-height: .3rem;
      padding: 0 5%;
      border: .01rem solid #bbb;
      border-radius: .05rem;
    }
  }
</style>