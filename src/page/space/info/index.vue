<template>
  <div class="page-range">
    <!--客户信息-->
    <template>
      <p class="page-range-header">添加房屋</p>
      <xxg-room :list="form.addedSpace[0]" :state="approvalState" @selectInfo="selectConfirm"></xxg-room>
    </template>
    <template>
      <p class="page-range-header">已添加房屋</p>
      <div class="addedRomm">
        <mt-field v-for="(info,index) in form.addedSpace" :key="index" class="room-textarea" :value="setShowMsg(info)" readonly type="textarea">
          <i class="iconfont icon-tubiaozhizuomoban" :class="{'icon-added': index === 0 }" @click="sureRoom(index)"></i>
          <i class="iconfont icon-cuowu" :class="{'not-delete': index === 0 }" @click="deleteRoom(index)"></i>
        </mt-field>
      </div>
    </template>

  </div>
</template>

<script>
  import dd from 'dingtalk-jsapi/index.js'
  import qs from 'query-string'
  import Fieldtemp from '@/components/temp/field'
  import XxgHorzin from '@/components/form/horizon'
  import formMap from '@/config/formMap'
  import XxgRoom from '@/components/room'
  import {
    MessageBox
  } from 'mint-ui';
  /* eslint-disable */
  export default {
    data() {
      return {
        stateInfo: null,
        form: {
          addedSpace: [{
              city: '北京',
              addr: null,
              lou: '101',
              zuo: 'A',
              ceng: '3',
              number: '313'
            },
            {
              city: '上海',
              addr: 'a',
              lou: null,
              zuo: 'B',
              ceng: '3',
              number: '313'
            },
            {
              city: '深圳',
              addr: null,
              lou: null,
              zuo: 'CCC',
              ceng: '3',
              number: '313'
            },
            {
              city: '北京',
              addr: '中关村信息谷',
              lou: '逸夫楼',
              zuo: 'A座',
              ceng: '3 层',
              number: 'A103'
            },
            {
              city: '长沙',
              addr: null,
              lou: null,
              zuo: 'A',
              ceng: '3',
              number: '313'
            },
            {
              city: '天津',
              addr: 'a',
              lou: '2',
              zuo: 'A',
              ceng: '3',
              number: '313'
            },
            {
              city: '太原',
              addr: 'a',
              lou: '333',
              zuo: 'A',
              ceng: '3',
              number: '313'
            }
          ],
          spaceMap: {

          }
        },
        spaceState: [],
        approvalState: {
          1: '未提交审批',
          2: '审批中',
          3: '审批通过',
          4: '已签约'
        }
      }
    },
    components: {
      Fieldtemp,
      XxgHorzin,
      XxgRoom
    },
    beforeMount() {
      //获取房屋的dict表
      this.getDict('spaceState')
      this.getDict('approvalState')
    },
    mounted() {
      let {
        customeId
      } = qs.parse(window.location.search)
      dd.biz.navigation.setRight({
        show: true,
        control: true,
        text: '完成',
        onSuccess: (result) => {
          // window.location.href = `/page/customer/xxCustom.html?id=${customeId}`
        },
        onFail(err) {
          console.log(err)
        }
      })
      // 设置钉钉title
      dd.biz.navigation.setTitle({
        title: '添加房屋',
        onSuccess(result) {

        },
        onFail(err) {
          console.log(err)
        }
      })
    },
    methods: {
      setShowMsg(info) {
        return Object.values(info).filter(v => {
          if (v) {
            return v
          }
        }).join('/')
      },
      getDict(key) {
        return;
        let k = this.dictMap(key)
        this.$service.getDict(k).then(res => this[key] = res)
      },
      selectConfirm(list) {
        this.form.addedSpace[0] = list;
      },
      deleteRoom(i) {
        let self = this;
        if (i !== 0) {
          MessageBox.confirm('确定要删除吗?', '注意').then(action => {
            self.form.addedSpace.splice(i, 1)
          }).catch(reject => {});
        }

      },
      sureRoom(index) {
        index === 0 && this.form.addedSpace.unshift({
          city: null,
          addr: null,
          lou: null,
          zuo: null,
          ceng: null,
          number: null
        })
      }
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
    .addedRomm {
      .room-textarea {
        border-bottom: .01rem solid #ddd;
        textarea {
          font-family: Arial;
          background: #F6F6F6;
          margin: .1rem .15rem .02rem;
          height: .62rem;
          text-align: center;
          color: #101010;
          line-height: .23rem;
          padding: 0 .4rem;
          box-sizing: border-box;
        }
      }
      .mint-field-other {
        margin-right: .25rem;
        .iconfont {
          display: block;
          cursor: pointer;
          font-size: .2rem;
          line-height: .34rem;
          font-weight: 500;
        }
        .icon-added {
          color: #259B24;
        }
        .icon-cuowu {
          color: #E51C23;
        }
        .icon-cuowu.not-delete {
          color: #888;
        }
      }
    }
  }
</style>