<template>
  <div class="page-range">
    <!--客户信息-->
    <template>
      <p class="page-range-header">房屋信息</p>
      <mt-field class="detail_textarea" label="位于" :disableClear="true" readonly :value="spaceTxt(form.spaceMap)" type="textarea"
        placeholder="请输入注册地址"></mt-field>
      <mt-field disableClear label=" 房屋面积" :value="form.size" readonly>
        平方米
      </mt-field>
      <mt-field disableClear label="客户状态" :value="stateTxt(this.form.state)" readonly></mt-field>
      <mt-field disableClear label="添加人" :value="form.addName" readonly>
        <i class="iconfont icon-right "></i>
      </mt-field>
    </template>
    <!--客户状态-->
    <template v-if="this.form.state===3">
      <p class="page-range-header">客户信息</p>
      <mt-field disableClear label="客户名称 " :value="form.customerName" readonly>
        <i class="iconfont icon-right "></i>
      </mt-field>
      <xxg-horzin>
        <mt-field slot="lSlot" readonly :disableClear="true" class="start-time-field" :value="form.signSt" label="时间"></mt-field>
        <mt-field slot="rSlot" readonly :disableClear="true" class="end-time-field" :value="form.signEt" label="至"></mt-field>
      </xxg-horzin>
      <fieldtemp title="关联合同" cla2="mint-cell-wrapper">
        <i slot="mtvalue" class="iconfont icon-file-text ">
          <nobr>{{ form.contractId ? '已关联': '未关联' }}</nobr>
        </i>
        <i slot="mtother" class="iconfont icon-right "></i>
      </fieldtemp>
    </template>
    <template v-if="this.form.state===2 ">
      <p class="page-range-header ">锁定人信息</p>
      <mt-field disableClear label="锁定人" :value="form.lockPerson" readonly>
        <i class="iconfont icon-right "></i>
      </mt-field>
    </template>
  </div>
</template>

<script>
  import dd from 'dingtalk-jsapi/index.js'
  import qs from 'query-string'
  import Fieldtemp from '@/components/temp/field'
  import XxgHorzin from '@/components/form/horizon'
  import formMap from '@/config/formMap'
  /* eslint-disable */
  export default {
    data() {
      return {
        stateInfo: null,
        form: {
          size: 100,
          state: 3,
          addName: 'admin',
          customerName: '北京万答科技有限公司',
          contractId: '1123123123',
          signSt: '2018-10-25',
          signEt: '2020-10-25',
          lockPerson: 'admin2',
          spaceMap: {
            city: '北京',
            addr: 'a',
            lou: '2',
            zuo: 'A',
            ceng: '3',
            number: '313'
          }
        },
        spaceState: []
      }
    },
    components: {
      Fieldtemp,
      XxgHorzin
    },
    beforeMount() {
      this.getDict('spaceState')
    },
    mounted() {
      let {
        customeId
      } = qs.parse(window.location.search)
      dd.biz.navigation.setRight({
        show: true,
        control: true,
        text: '编辑',
        onSuccess: (result) => {
          // window.location.href = `/page/customer/xxCustom.html?id=${customeId}`
        },
        onFail(err) {
          console.log(err)
        }
      })
      // 设置钉钉title
      dd.biz.navigation.setTitle({
        title: '房屋详情',
        onSuccess(result) {},
        onFail(err) {
          console.log(err)
        }
      })
    },
    methods: {
      stateTxt(state) {
        let obj = this.stateInfo.filter(v => {
          if (+v.value === +state) return v
        })
        return obj[0] ? obj[0].name : null;
      },
      spaceTxt(obj) {
        return Object.values(obj).join('/')
      },
      getDict(key) {
        this.stateInfo = [{
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
        let k = this.dictMap(key)
        this.$service.getDict(k).then(res => this[key] = res)
      },
    },
    created() {
      return;
      let {
        customeId
      } = qs.parse(window.location.search)

      this.$service.GetXxCustomDetails({
        id: customeId
      })
    }
  }
</script>

<style lang="scss">
  .page-range {
    .page-range-header {
      padding-top: .27rem;
    }
    .mint-cell-wrapper {
      border-bottom: .01rem solid #d9d9d961;
      .mint-cell-title {
        width: .73rem;
        padding-right: .18rem;
        text-align: right;
      }
      .mint-cell-text {
        display: inline-block;
        width: .65rem;
        color: #999999;

      }
      .icon-file-text {
        color: rgba(46, 135, 234, 1);
        font-size: .18rem;
        padding-right: .06rem;
        nobr {
          font-size: .14rem;
          color: #666;
        }
      }
      .icon-right {
        color: #999999
      }
      .detail_textarea {
        font-family: Arial;
        text-align: center;
        background-color: #eee;
        padding: .1rem;
        margin: .1rem;
      }
    }
  }
</style>