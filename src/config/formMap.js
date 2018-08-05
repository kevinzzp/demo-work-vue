export default {
  customeInfo: {
    contacts: {
      name: '姓名',
      placeholder: '请输入姓名',
      type: 'input',
      necessary: true
    },
    position: {
      name: '职位',
      placeholder: '请输入职位',
      type: 'input'
    },
    tel: {
      name: '电话',
      placeholder: '请输入电话',
      type: 'number',
      icon: 'dianhua',
      necessary: true,
      iconClick: true
    },
    workTel: {
      name: '办公电话',
      placeholder: '请输入办公电话',
      type: 'number',
      icon: 'dianhua',
      iconClick: true
    },
    email: {
      name: '邮箱',
      placeholder: '请输入邮箱',
      type: 'email'
    }
  },
  customRecord: {
    name: {
      name: '跟进人',
      placeholder: '请输入跟进人',
      type: 'input',
      icon: 'search',
      necessary: true,
      icon: 'mingpian',
      iconClick: true
    },
    receptionTime: {
      name: '跟进时间',
      type: 'date'
    },
    state: {
      name: '客户状态',
      type: 'select',
      necessary: true
    },
    contactResult: {
      name: '接洽结果',
      type: 'input'
    },
    remark: {
      name: '备注',
      placeholder: '输入备注信息',
      type: 'textarea'
    }
  },
  room: {
    city: {
      placeholder: '城市',
      option: ['北京', '上海', '石家庄', '太原', '深圳', '长沙']
    },
    addr: {
      placeholder: '位置',
      option: ['1', '2', '3', '4', '5', '6']
    },
    lou: {
      placeholder: '楼',
      option: ['aa', 'bb', 'cc', 'ddd', 'eee', 'fff']
    },
    zuo: {
      placeholder: '座',
      option: ['A', 'B', 'C', 'D', 'E', 'F']
    },
    ceng: {
      placeholder: '层',
      option: ['1', '2', '3', '4', '5', '6']
    },
    number: {
      placeholder: '房间号',
      option: ['111', '222', '333', '444', '555', '666']
    }
  }
}
