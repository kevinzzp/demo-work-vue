<template>
  <div class="body">
    <div class="search_one">
      <xxg-horzin cla="search_horizon">
        <mt-field slot="lSlot" @click.native="ddPicker('signSt')" :disableClear="true" readonly class="start-time-field" :value="timeComputed(form.signSt)"
          label="签约时间" placeholder="开始时间"></mt-field>
        <mt-field slot="rSlot" :disableClear="true" @click.native="ddPicker('signEt')" readonly class="end-time-field" :value="timeComputed(form.signEt)"
          label="至" placeholder="结束时间"></mt-field>
      </xxg-horzin>
    </div>
    <div class="search_two">
      <i class='iconfont icon-search'></i>
      <mt-field class="search_text" v-model="form.contacts_message" placeholder="输入签约人、客户公司名、合同编号">
      </mt-field>
    </div>
    <con-card :listData="listData" :state="state"></con-card>
  </div>
</template>

<script>
  import moment from 'moment'
  import {
    Indicator
  } from 'mint-ui'
  import dd from 'dingtalk-jsapi/index.js'
  import conCard from '@/components/card/contract'
  import XxgHorzin from '@/components/form/horizon'
  export default {
    components: {
      conCard,
      XxgHorzin
    },
    data() {
      return {
        form: {
          contacts_message: null,
          start: 0,
          size: 3,
          signSt: null,
          signEt: null
        },
        c: null,
        listData: [],
        state: [],
        loading: false,
        nomore: false
      }
    },
    mounted: function () {
      // 滚动加载数据监听
      document.body.scrollTop = 0
      this.c = document.documentElement.clientHeight;
      window.addEventListener('scroll', this.loadData)

      // 从后台加载数据
      this.getlist(this.form, 'new')
      this.getState('state');
      dd.ui.pullToRefresh.enable({
        onSuccess: () => {
          window.location.reload();
        },
        onFail: function () {}
      })
      // 设置 钉钉按钮
      dd.biz.navigation.setRight({
        show: true, // 控制按钮显示， true 显示， false 隐藏， 默认true
        control: true, // 是否控制点击事件，true 控制，false 不控制， 默认false
        text: '添加', // 控制显示文本，空字符串表示显示默认文本
        onSuccess: (result) => {
          window.location.href = '/page/contract/addStep1.html'
        },
        onFail: function (err) {
          console.log(err)
        }
      })

      // 设置 钉钉标题
      dd.biz.navigation.setTitle({
        title: '合同管理'
      })
    },
    methods: {
      // 监听翻页
      loadData() {
        let scrH = document.documentElement.scrollHeight;
        let srcT = document.documentElement.scrollTop; // 通过判断滚动条的top位置与可视网页之和与整个网页的高度是否相等来决定是否加载内容；
        if (srcT + this.c >= scrH && this.loading === false) {
          if (this.nomore === false) {
            this.loadMore();
          } else {
            Toast({
              message: '没有更多了哦...',
              position: 'bottom',
              duration: 2000
            });
          }
        }
      },
      // 查看详情
      details(id) {
        // window.location.href = `/page/customer/detail.html?customeId=${id}`
      },
      // 加载数据
      getlist(body, type) {
        Indicator.open('Loading...')
        this.$service.getXxContractList(body).then((res) => {
          console.log(res)
        })
      },
      getState(key) {
        this.state = [{
          value: 1,
          name: '待提审'
        }, {
          value: 2,
          name: '审批中'
        }, {
          value: 3,
          name: '已签约'
        }, {
          value: 4,
          name: '已废弃'
        }]
        return;
        this.$service.getDict(key).then(res => {
          this.state = res
        })
      },
      ddPicker(key) {
        let format = 'yyyy-MM-dd';
        let date = moment(new Date).format(format)
        let self = this
        dd.biz.util.datepicker({
          format: format,
          value: date, //默认显示日期
          onSuccess(result) {
            self.form[key] = result.value + ' 00:00:00'
          },
          onFail(err) {
            console.log(err)
          }
        })
      },
      timeComputed(time) {
        if (time) return time.split(' ')[0]
      },
      loadMore() {
        this.loading = true;
        this.form.start += 5;
        this.getlist(this.form, 'push')
      }
    },
    computed: {
      form_contacts_message() {
        return this.form.contacts_message
      },
      form_start() {
        return this.form.start
      },
    },
    watch: {
      form_contacts_message(newValue, oldValue) {
        this.form.start = 0
        this.getlist(this.form, 'new')
      },
      form_start(newValue, oldValue) {
        this.getlist(this.form, 'push')
      }
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
    background: #F5F5F5;
  }

  .search_one,
  .search_two {
    margin: 3%;
    position: relative;
    background-color: #fff;
    border-radius: .05rem;
    .icon-search {
      color: #8E8E93;
      position: absolute;
      top: 0;
      left: 2%;
      line-height: .32rem;
      font-size: .18rem;
      z-index: 1;
    }
    input::-webkit-input-placeholder {
      font-size: .12rem;
    }

  }

  .search_two {
    padding: 0 5%;
    /* s */
    .mint-cell {
      min-height: .32rem;
    }
  }
</style>