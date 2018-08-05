<template>
  <div class="body">
    <!-- tab-container -->
    <mt-tab-container>
      <!-- 客户 -->
      <mt-tab-container-item>
        <div class="search">
          <div class="search_one">
            <mt-field class="select_text" v-model="form.name" readonly placeholder="所属城市" @click.native="selectClick('name')">
              <i class="iconfont icon-down"></i>
            </mt-field>
            <mt-field class="select_text" :value="getState(form.state)" readonly placeholder="签约状态" @click.native="selectClick('state')">
              <i class="iconfont icon-down"></i>
            </mt-field>
            <mt-field class="select_text" v-model="form.purpose" readonly placeholder="行业" @click.native="selectClick('purpose')">
              <i class="iconfont icon-down"></i>
            </mt-field>
          </div>
          <div class="search_two">
            <i class='iconfont icon-search'></i>
            <mt-field class="search_text" v-model="form.contacts_message" placeholder="可输入公司名、联系人">
            </mt-field>
          </div>
        </div>\
        <div class="contents" v-for="data in listData">
          <div class="content_left">
            <div class="text">
              <div class="left_text title_font companyName-title">{{data.name}}</div>
              <div :class="['right_text','icon-color', 'icon-color-'+data.state ]">{{ getState(data.state) }}</div>
            </div>
            <div class="text">
              <div class="left_text text_font">联系人:{{ getContacts(data.contacts_message) }}</div>
              <div class="right_text">&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </div>
            <div class="text">
              <div class="left_text text_font">最新跟进人:{{ data.newestids }}</div>
              <div class="right_text text_font font-right">跟进于{{ data.reception_time }}</div>
            </div>
          </div>
          <div class="content_right" @click="details(data.id)">
            <i style="color:#999999;" class="iconfont icon-right"></i>
          </div>
        </div>


        <!-- 导航间距 -->
        <mt-navbar class="tab_forge">
          <mt-tab-item>
            <i class="iconfont icon-user"></i>
            <br>客户</mt-tab-item>
          <mt-tab-item>
            <i class="iconfont icon-solution"></i>
            <br>领导关怀</mt-tab-item>
        </mt-navbar>

      </mt-tab-container-item>
      <!-- 领导关怀 -->
      <mt-tab-container-item id="care">
      </mt-tab-container-item>
      <!-- 导航栏 picker选项 -->
    </mt-tab-container>
    <mt-navbar class="tab">
      <mt-tab-item>
        <i class="iconfont icon-user"></i>
        <br>客户</mt-tab-item>
      <mt-tab-item id="care">
        <i class="iconfont icon-solution"></i>
        <br>领导关怀</mt-tab-item>
    </mt-navbar>
    <xx-picker :slots="slots" :selectShow="select_show" @handleCancel="handleCancel" @handleConfirm="handleConfirm"></xx-picker>

  </div>
</template>

<script>
  import {
    Indicator,
    Toast
  } from 'mint-ui'
  import dd from 'dingtalk-jsapi/index.js'
  import XxPicker from '@/components/form/picker'
  import slotsMap from '@/config/slotsMap'
  export default {
    components: {
      XxPicker
    },
    data() {
      return {
        nomore: false,
        form: {
          space_id: null,
          state: null,
          purpose: null,
          name: null,
          contacts_message: null,
          start: 0,
          size: 5
        },
        loading: false,
        a: null,
        b: null,
        c: null,
        listData: [],
        select_show: false,
        slots: [],
        state: []
      }
    },
    mounted: function () {
      dd.ui.pullToRefresh.stop()
      // 滚动加载数据监听
      document.body.scrollTop = 0
      // this.a = document.documentElement.scrollHeight || document.body.scrollHeight;
      // console.log(this.a)
      this.c = document.documentElement.clientHeight;
      window.addEventListener('scroll', this.loadData)

      // 从后台加载数据
      this.getlist(this.form, 'new')
      this.getMapData('state', true);
      // 设置 钉钉按钮
      dd.biz.navigation.setRight({
        show: true, // 控制按钮显示， true 显示， false 隐藏， 默认true
        control: true, // 是否控制点击事件，true 控制，false 不控制， 默认false
        text: '添加', // 控制显示文本，空字符串表示显示默认文本
        onSuccess: (result) => {
          window.location.href = `/page/customer/xxCustom.html`
        },
        onFail: function (err) {
          console.log(err)
        }
      })

      // 设置 钉钉标题
      dd.biz.navigation.setTitle({
        title: '客户管理'
      })
      //上拉刷新
      dd.ui.pullToRefresh.enable({
        onSuccess: () => {
          window.location.reload();
        },
        onFail: function () {}
      })
      dd.ui.webViewBounce.enable()
    },
    methods: {
      getContacts(arr) {
        return arr ? arr.map(v => v.contacts).join(',') : null
      },
      getState(status) {
        if (status === undefined) return ''
        let obj = this.state.filter(info => {
          if (+info.value === +status) {
            return info.name
          }
        })[0]
        return typeof obj === 'object' ? obj.name : ''
      },
      handleCancel() {
        this.select_show = false
      },
      handleConfirm(values) {
        this.form = Object.assign(this.form, values)
        this.select_show = false
      },
      // 监听翻页
      loadData() {
        let scrH = document.documentElement.scrollHeight;
        let srcT = document.documentElement.scrollTop;

        // 通过判断滚动条的top位置与可视网页之和与整个网页的高度是否相等来决定是否加载内容；
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
      selectClick(slotsMapKey) {
        if (slotsMapKey) this.getMapData(slotsMapKey)
      },
      // 查看详情
      details(id) {
        window.location.href = `/page/customer/detail.html?customeId=${id}`
      },
      // 加载数据
      getlist(body, type) {
        //Indicator.open('Loading...')
        this.$service.postGetXxCustoms(body).then((res) => {
          !res.data.length && (this.nomore = true);
          let arr = res.data.map(v => {
            try {
              v.contacts_message = JSON.parse(v.contacts_message)
            } catch (e) {
              v.contacts_message = []
            }
            return v;
          })
          if (type === 'push') {
            this.listData = this.listData ? this.listData.concat(arr) : arr;
            Indicator.close()
            this.loading = false;

          } else {
            this.listData = arr;
            Indicator.close()
          }

        })
      },
      getMapData(key, flag) {
        let showKey;
        switch (key) {
          case 'state':
            showKey = 'contract_state';
            break;
          default:
            showKey = key
            break;
        }
        this.$service.getDict(showKey).then(res => {
          this[key] = res.length ? res : slotsMap[key]
          if (flag) return;
          this.slots = [{
            flex: 1,
            values: this[key]
          }]
          this.select_show = key
        })
      },
      loadMore() {
        this.loading = true;
        this.form.start += 5;
        this.getlist(this.form, 'push')
      }
    },
    computed: {
      form_name() {
        return this.form.name
      },
      form_state() {
        return this.form.state
      },
      form_purpose() {
        return this.form.purpose
      },
      form_contacts_message() {
        return this.form.contacts_message
      },
      // form_start() {
      //   return this.form.start
      // },
    },
    watch: {
      form_name(newValue, oldValue) {
        this.form.start = 0
        this.getlist(this.form, 'new')
      },
      form_state(newValue, oldValue) {
        this.form.start = 0
        this.getlist(this.form, 'new')
      },
      form_purpose(newValue, oldValue) {
        this.form.start = 0
        this.getlist(this.form, 'new')
      },
      form_contacts_message(newValue, oldValue) {
        this.form.start = 0
        this.getlist(this.form, 'new')
      },
      // form_start(newValue, oldValue) {
      //   this.getlist(this.form, 'push')
      // }
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

  .search_one {
    padding: 5% 2% 0% 2%;
    position: relative;
    ;
    display: flex;
    justify-content: center;
    .select_text {
      width: 100%;
    }
  }

  .search_two {
    margin: 3%;
    padding-left: 5%;
    position: relative;
    background-color: #fff;
    .icon-search {
      color: #8E8E93;
      position: absolute;
      top: .15rem;
      left: 2%;
      font-size: .18rem;
      z-index: 1;
    }
  }



  .contents {
    display: flex;
    margin: 5% 0% 5% 0%;
    background-color: #FFFFFF;
    padding: 2% 4%;
    display: table;
    width: 92%;
    .content_left {
      width: 99%;
      position: relative;
    }
    .content_right {
      width: 10%;
      position: relative;
    }
  }

  .left_text {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    float: left;
    width: 48%;
    &.companyName-title {
      width: 60%;
    }
  }

  .right_text {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    float: right;
    width: 48%;
  }

  .text {
    padding: 3% 3% 3% 0%;
    overflow: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .content_right {
    display: table-cell;
    vertical-align: middle;
    text-align: right;
    /*设置文本水平居中*/
    ::after {
      content: "";
      width: 0.01rem;
      height: 80%;
      position: absolute;
      top: 10%;
      left: 0;
      background: #F5F5F5;
    }
  }



  .icon-color {
    border-radius: .02rem;
    width: .73rem;
    line-height: .20rem;
    color: #FFFFFF;
    text-align: center;
    &-20 {
      background-color: #666666;
    }
    &-10 {
      background-color: #259B24;
    }
    &-2 {
      background-color: #EA602E;
    }
    &-1 {
      background-color: #2E87EA;
    }
  }

  .title_font {
    line-height: .23rem;
    color: rgba(16, 16, 16, 1);
    font-size: 0.16rem;
    font-family: Arial;
    font-weight: bold;
  }

  .text_font {
    line-height: 0.19rem;
    color: rgba(132, 132, 132, 1);
    font-size: 0.13rem;
    text-align: left;
    font-family: Arial;
  }

  .font-right {
    text-align: right;
  }

  .tab {
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .tab_forge {
    visibility: hidden;
  }
</style>