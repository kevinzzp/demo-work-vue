<template>
<div class="body">

      <div class="title_text"><div class="title_left"><nobr>客户信息</nobr></div><div class="title_right"><i class='iconfont icon-scan'><nobr>&nbsp;扫名片</nobr></i></div></div>

      <mt-field class="line" label="客户名称 " placeholder="输入客户名" v-model="form.customName"><a class="validation">*&nbsp;</a></mt-field>
			<mt-field class="line" label="联  系  人" placeholder="联系人" v-model="form.customContacts"><a class="validation"></a></mt-field>
			<mt-field class="line" label="联系电话 " placeholder="手机号/座机号" type="tel" v-model="form.customTel"><a class="validation">*&nbsp;</a></mt-field>
			<mt-field class="line" label="座机" placeholder="座机" type="tel" v-model="form.customSeatTel"></mt-field>
			<mt-field class="line" label="联系邮箱" placeholder="邮箱" state="" v-model="form.customEmail"></mt-field>
			<mt-field class="line" label="职位" placeholder="职位" v-model="form.customPosition"></mt-field>
			<mt-field class="line" label="所属行业" placeholder="所属行业" v-model="form.customIndustry"><a class="theme-color"><i class="iconfont icon-down"></i></a></mt-field>
			<mt-field class="line" label="主营业务" placeholder="主营业务" v-model="form.customMainBusiness"></mt-field>
			<mt-field class="line" label="注册地" placeholder="注册地" v-model="form.customRegisterAddr"><a class="validation">*&nbsp;</a></mt-field>
			<mt-field class="line" label="用途" placeholder="用途" v-model="form.customPurpose"><a class="theme-color"><i class="iconfont icon-down"></i></a></mt-field>
			<mt-field class="line" label="公司介绍" placeholder="输入公司简介" type="textarea" rows="4" v-model="form.customCompanyIntroduce"></mt-field>
    
      <div class="title_text"><div class="title_left"><nobr>跟进状态</nobr></div><div class="title_right"></div></div>
	    <mt-field class="line" label="跟进状态" placeholder="跟进状态" readonly="readonly" @click.native="contractIntentionStateClick" v-model="form.contractIntentionState"><a class="validation">*&nbsp;&nbsp;&nbsp;&nbsp;</a></mt-field>
      <div v-if="true">
			<mt-field class="line" label="关联合同" placeholder="输入合同编号、客户名" v-model="form.contractNo"><a class="validation">*</a><a class="theme-color"><i class='iconfont icon-search'></i>&nbsp;</a></mt-field>
		   <space-multi-select v-model="value" @change="valueChange" />
      </div>
      <div v-else-if="form.contractIntentionState==='意向客户'||form.contractIntentionState==='预签约'">
			  <mt-field class="line" label="意向面积" placeholder="意向面积" v-model="form.intentionSize"></mt-field>
			  <mt-field class="line" label="意向园区" placeholder="意向园区" v-model="form.intentionPark"></mt-field>
			  <mt-field class="line" label="意向位置" placeholder="意向位置" v-model="form.intentionAddr"></mt-field>
			  <mt-field class="line" label="接洽结果" placeholder="接洽结果" v-model="form.intentionContactResule"></mt-field>
			</div>

			<div class="title_text"><div class="title_left"><nobr>跟进人</nobr></div><div class="title_right"></div></div>
			<div v-for="(item,index) in form.followUpPersons">
			  <mt-field class="line" placeholder="跟进人" v-model="form.followUpPersons[index]"><a class="theme-color"><i class='iconfont icon-search'></i>&nbsp;</a></mt-field>
			</div>
	   
      <mt-picker  v-if="select_show" class="picker" :slots="slots" :visible-item-count="5" :show-toolbar="true"  ref="picker" value-key="cName">
          <mt-button  @click="handleConfirm" class="picker_ok">确认</mt-button>
          <mt-button  @click="handleCancel" class="picker_close">取消</mt-button>
      </mt-picker>
</div>
</template>
<script>
import spaceMultiSelect from '@/components/space-multi-select.vue'
import dd from 'dingtalk-jsapi/index.js'
export default {
  name: 'app',
  data () {
    return {
      form: {
        customName: null,
        customContacts: null,
        customTel: null,
        customSeatTel: null,
        customEmail: null,
        customPosition: null,
        customContactsMessage: null,
        customIndustry: null,
        customMainBusiness: null,
        customRegisterAddr: null,
        customPurpose: null,
        customCompanyIntroduce: null,
        contractIntentionState: null,
        contractNo: null,
        contract_addr_id: null,
        intentionSize: null,
        intentionPark: null,
        intentionAddr: null,
        intentionContactResule: null,
        followUpPersons: [''],
        followUpPerson: null
      },
      value: null,
      select_show: false,
      slots: [{
        flex: 1,
        values: ['意向客户', '预签约', '已签约', '退约']
      }]
    }
  },
  components: {
    spaceMultiSelect
  },
  mounted: function () {
    dd.biz.navigation.setRight({
      show: true, // 控制按钮显示， true 显示， false 隐藏， 默认true
      control: true, // 是否控制点击事件，true 控制，false 不控制， 默认false
      text: '完成', // 控制显示文本，空字符串表示显示默认文本
      onSuccess: (result) => {
        this.form.followUpPerson = this.followUpPersonGroup(this.form.followUpPersons)
        this.$service.postSaveXxCustom(this.$utils.toJson(this.form)).then((res) => {
          window.location.href = `/page/customer/list.html`
        })
      },
      onFail: function (err) {
        console.log(err)
      }
    })
    dd.biz.navigation.setTitle({
      title: '添加客户', // 控制标题文本，空字符串表示显示默认文本
      onSuccess: function (result) {
        /* 结构
        {
        } */
      },
      onFail: function (err) {
        console.log(err)
      }
    })
  },
  methods: {
    // 弹出状态选择
    contractIntentionStateClick: function () {
      this.select_show = true
    },
    // 确认状态选择
    handleConfirm () {
      this.currentTags = this.$refs.picker.getValues()[0]
      this.popupVisible = false
      this.form.contractIntentionState = this.currentTags
      this.select_show = false
    },
    // 取消状态选择
    handleCancel () {
      this.select_show = false
    },
    followUpPersonGroup (data) {
      let followUpPersons = ''
      for (let index = 0; index < data.length - 1; index++) {
        followUpPersons += data[index] + ','
      }
      return followUpPersons
    },
    valueChange: function () {
      console.log(1)
    }
  },
  watch: {
    form: {
      handler: function (newValue, oldValue) {
        if (this.form.followUpPersons.indexOf('') === -1) {
          this.form.followUpPersons.push('')
        }
      },
      deep: true
    }
  }
}
</script>
<style lang="scss"  >
.body{
	height: 100%;
  background-color: #F5F5F5;
}
.title_text{
  padding:0% 3% 0% 3%;
  line-height:0.7rem;
  font-size: 0.14rem;
	position:relative;
	display: flex;
  justify-content:space-between;
}
.line{
	&:after{
    content:"";
    width:100%;
    height:1px;
    background-color:#F5F5F5;
    position:absolute;
    z-index:1;
    left:0;
    }
}
.picker{
	bottom: 0;
	z-index:999;
	position: fixed;
	width: 100%;
	background-color: #FFFF;
  .picker_ok{
  float:right;
  margin-right:.16rem;
  margin-top:.32rem;
  }
  .picker_close{
  float:left;
  margin-left:.16rem;
  margin-top:.32rem;
  }
}
.validation{
  color: red;
}
</style>