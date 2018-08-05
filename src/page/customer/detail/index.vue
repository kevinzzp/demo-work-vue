<template>
  <div class="page-range">
    <!--客户信息-->
    <template>
      <p class="page-range-header">客户信息</p>
      <mt-field disableClear label="客户名称" :value="form.xx_custom.name" readonly></mt-field>
      <fieldtemp title="联系人" cla="customeInfo">
        <template slot="mtvalue">
          <xxg-btn :text="info.contacts" v-for="(info,index) in form.xx_custom.contactsMessage" :key="index" type="circle" :noticeText="info.position"
            @btnAction="msgClick(info,index,'customeInfo')">
          </xxg-btn>
        </template>

      </fieldtemp>
      <mt-field disableClear label="所属行业" :value="form.xx_custom.industry" readonly></mt-field>
      <mt-field disableClear label="主营业务" :value="form.xx_custom.mainBusiness" readonly></mt-field>
      <mt-field disableClear label="注册地" :value="form.xx_custom.registerAddr" readonly></mt-field>
      <mt-field disableClear label="用途" :value="form.xx_custom.purpose" readonly></mt-field>
      <fieldtemp title="企业需求">
        <template slot="mtvalue">{{ form.xx_custom.demand }}</template>
      </fieldtemp>
      <fieldtemp title="公司简介" cla2="textarea_box">
        <template slot="mtvalue">{{ form.xx_custom.companyIntroduce }}</template>
      </fieldtemp>
    </template>
    <!--客户状态-->
    <template>
      <p class="page-range-header">客户状态</p>
      <mt-field disableClear label="客户状态" :value="stateTxt(form.xx_custom.state)" readonly></mt-field>
      <template v-if="form.xx_custom.state == 10">
        <fieldtemp title="关联合同">
          <i slot="mtvalue" class="iconfont icon-file-text ">
            <nobr>{{ form.xx_custom.contractId ? '已关联': '未关联' }}</nobr>
          </i>
          <i v-if="form.xx_custom.contractId" slot="mtother" class="iconfont icon-right"></i>
        </fieldtemp>
        <!-- <mt-field disableClear label="签约面积" :value="form.xx_space_order.spaceSize + '㎡'" readonly></mt-field>
        <mt-field disableClear label="签约金额" :value="'¥'+ form.xx_space_order.amount" readonly></mt-field>
        <fieldtemp title="签约地点" cla2="textarea_box">
          <div slot="mtvalue" style="border-bottom: .01rem solid #d9d9d961;" v-for="(info,index) in form.xx_space_order.spaceIds.split(',')"
            :key="index">
            {{ info }}
            <hr />
          </div>
        </fieldtemp> -->
      </template>
      <template v-else>
        <mt-field label="意向面积" disableClear readonly :value="form.xx_custom.intentionSize + '㎡'"></mt-field>
        <mt-field label="意向园区" disableClear readonly :value="form.xx_custom.intentionPark"></mt-field>
        <mt-field label="意向位置" disableClear readonly :value="form.xx_custom.intentionPosition"></mt-field>
        <fieldtemp title="备注" cla2="textarea_box">
          <template slot="mtvalue">
            {{ form.xx_custom.remark }}
          </template>
        </fieldtemp>
      </template>
    </template>

    <template>
      <p class="page-range-header">跟进记录</p>
      <div v-if="form.xx_custom_et.length > 0">
        <xxg-card v-for="(item,index) in form.xx_custom_et" :info="item" :state="contractState" :detail="true" :key="index"></xxg-card>
      </div>
      <div v-else style="text-align: center;  line-height: .6rem; background: #fff;">
        暂无跟进记录...
      </div>
    </template>
    <!--编辑授权人-->
    <template>
      <p class="page-range-header">客户编辑授权人</p>
      <div class="certigier-box">
        <template v-if="form.xx_custom.empowermentIds.length > 0" v-for="(info,index) in form.xx_custom.empowermentIds">
          <xxg-btn v-if="info" :key="index" type="circle-blank1" @click="getCertigier(info.ddId)" :noticeText="info.ddName" icon="user1"></xxg-btn>
          </xxg-btn>
        </template>
        <div v-else style="text-align: center;  line-height: .6rem; background: #fff;">
          暂无客户编辑授权人...
        </div>
        <div class="certigier-notice">
          仅上述用户允许编辑该客户
          <br /> 如需添加权限，请联系
          <a style="color: #09c;">{{ form.xx_custom.creatorId ? form.xx_custom.creatorId.ddName: '' }}</a>
        </div>

      </div>
    </template>

    <msg-box cla="msgBox" :msg="msg_obj" :detail="true" @close-btn-action="closeMsg"></msg-box>

  </div>
</template>

<script>
  import dd from 'dingtalk-jsapi/index.js'
  import qs from 'query-string'
  import {
    MessageBox
  } from 'mint-ui';
  import XxgBtn from '@/components/btn'
  import MsgBox from '@/components/modal/msg'
  import XxgCard from '@/components/card'
  import formMap from '@/config/formMap'
  import Fieldtemp from '@/components/temp/field'
  /* eslint-disable */
  export default {
    data() {
      return {
        edit: false,
        status: 1,
        id: null,
        form: {
          xx_custom_et: [],
          xx_custom: {
            creatorId: {
              ddId: null,
              ddName: null
            },
            id: null,
            spareField: null,
            empowermentIds: [],
            contactsMessage: [],
            purpose: null,
            industry: null,
            demand: null,
            companyIntroduce: null,
            registerAddr: null,
            name: null,
            mainBusiness: null,
            state: null,
            intentionPosition: null,
            intentionSize: null,
            intentionPark: null
          }
          //,
          // xx_space_order: {
          //   id: null,
          //   contractId: null, //合同id
          //   customId: null,
          //   contractState: null, //状态
          //   remark: null,
          //   creatorId: null, // 下单人id
          //   amount: null, // 金额
          //   startTime: null,
          //   endTime: null,
          //   spaceSize: null,
          //   spaceIds: null, //空间id
          //   spaseMap: [] // 暂存 房屋信息表
          // }
        },
        contractState: [],
        //msg
        msg_obj: {
          show: false,
          mapList: {},
          key: null,
          title: null,
          info: []
        }
      }
    },
    beforeMount() {
      this.getDict('contractState')
    },
    components: {
      XxgBtn,
      MsgBox,
      XxgCard,
      Fieldtemp
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
          window.location.href = `/page/customer/xxCustom.html?id=${customeId}`
        },
        onFail(err) {
          console.log(err)
        }
      })
      // 设置钉钉title
      dd.biz.navigation.setTitle({
        title: '客户详情',
        onSuccess(result) {},
        onFail(err) {
          console.log(err)
        }
      })
    },
    methods: {
      getCertigier(id) {

      },
      stateTxt(state) {
        let obj = this.contractState.filter(v => {
          if (+v.value === +state) return v
        })
        return obj[0] ? obj[0].name : null;
      },
      dictMap(key) {
        // 未以后 字典字段查询多了之后做准备
        let cache = {
          contractState: 'contract_state',
          key
        }
        return cache[key]
      },
      getDict(key) {
        let k = this.dictMap(key)
        this.$service.getDict(k).then(res => this[key] = res)
      },
      msgClick(info, index, key) {
        let obj = {};
        Object.keys(formMap[key]).forEach(v => obj[v] = null);
        this.msg_obj = {
          mapList: formMap[key] || {},
          title: key === 'customeInfo' ? '编辑联系人' : '编辑跟进记录',
          show: true,
          info: Object.assign(obj, info)
        }
        this.editIndex = index
      },
      closeMsg() {
        this.msg_obj.show = false;
      }
    },
    created() {
      let {
        customeId
      } = qs.parse(window.location.search)

      this.$service.GetXxCustomDetails({
        id: customeId
      }).then((res) => {
        if (+res.code === 0) {
          let data = res.data;
          try {
            data.xx_custom.contactsMessage = JSON.parse(data.xx_custom.contactsMessage)

          } catch (error) {
            data.xx_custom.contactsMessage = []
          }
          this.form = { ...data
          }
        }
      }).catch(reject => {
        alert('获取客户详情失败，请稍后重试')
        window.location.href = '/page/customer/list.html'
      })
    }
  }
</script>

<style lang="scss">
  .page-range {
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
        &.customeInfo {
          line-height: 0.8rem;
          display: inline-block;
        }
      }
      .icon-file-text {
        color: rgba(46, 135, 234, 1);
        font-size: .18rem;
        nobr {
          font-size: .14rem;
          color: #666;
          padding: .09rem;
          vertical-align: middle;
        }
      }
      .icon-right {
        color: #999999
      }
      .textarea_box {
        padding: .1rem 0;
        width: 100%;
      }
    }
  }



  .icon-dianhua {
    color: rgba(46, 135, 234, 1)
  }

  /* 授权人 */

  .certigier-box {
    text-align: center;
    background: #fff;
    padding: .2rem .5rem;
    .certigier-notice {
      line-height: .22rem;
      padding: .1rem 0;
      color: #999;
    }
  }
</style>