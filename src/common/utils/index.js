import axios from 'axios'
import * as dd from 'dingtalk-jsapi'
import {
  Indicator
} from 'mint-ui'
import req from './request'

let config = {
  ready: false
}

// 钉钉免登录 - 用以后台保存session
function _exempts(corpId) {
  dd.runtime.permission.requestAuthCode({
    corpId,
    onSuccess: (result) => {
      req.post({
        url: '/api/ddOauth/exempts',
        body: {
          code: result.code
        }
      }).then((res) => {
        if (res.code === 302) {} else {
          localStorage.setItem('userInfo', res.data)
        }
        Indicator.close()
      }).catch((err) => {
        Indicator.close()
        alert(err)
      })
    },
    onFail: (err) => {
      Indicator.close()
      alert('身份校验失败...请检查网络并退出重试' + err)
    }
  })
}

export function loginInit() {
  // 如果本地存在corpId就不再进行config了
  let _corpId = localStorage.getItem('corpId')
  if (_corpId) {
    _exempts(_corpId)
  } else {
    Indicator.open({
      text: '登陆校验中...',
      spinnerType: 'double-bounce'
    })
    req.get({
      url: '/api/ddOauth/getConfig'
    }).then((response) => {
      let _corpId = response.data.corpId
      localStorage.setItem('corpId', _corpId)
      _exempts(_corpId)
    }).catch((err) => {
      console.log('身份校验失败...请检查网络并退出重试' + err)
      Indicator.close()
    })
  }
}

/**
 * 鉴权api
 * @param needCorpAuth {Boolean} : 是否需要企业鉴权
 */
export function ready(needCorpAuth = true) {
  // config以恶搞页面只需要鉴权一次，如果鉴权过则不需要再次鉴权
  return new Promise((resolve, reject) => {
    if (config.ready) {
      resolve(config)
      return
    }
    dd.error((error) => {
      alert(JSON.stringify(error))
      reject(error)
    })
    if (needCorpAuth) {
      // 后台获取congi配置，成功会调用 ready
      axios.get('/api/ddOauth/getConfig', {
        params: {
          pageUrl: location.href
        }
      }).then(function (res) {
        let _config = res.data.data
        _config = {
          agentid: _config.agentid,
          corpId: _config.corpId,
          timeStamp: _config.timeStamp,
          nonceStr: _config.nonceStr,
          signature: _config.signature,
          jsApiList: [
            'biz.contact.complexPicker',
            'biz.util.scanCard',
            'biz.util.open',
            'biz.telephone.showCallMenu',
            'runtime.info',
            'biz.contact.choose',
            'device.notification.confirm',
            'device.notification.alert',
            'device.notification.prompt',
            'biz.ding.post',
            'biz.util.openLink'
          ]
        }
        dd.config(_config)
        dd.ready(() => {
          config = Object.assign(config, {
            ready: true
          }, _config)
          resolve(config)
        })
      }).catch(function (error) {
        console.log(error)
        reject(error)
      })
    } else {
      dd.ready(() => {
        config.ready = true
        resolve(config)
      })
    }
  })
}

// 企业通讯录选人
export function complexPicker(params, cb) {
  return ready().then(() => {
    return new Promise((resolve, reject) => {
      let conf = Object.assign({
        title: '跟进记录通讯人', // 标题
        corpId: null, // 企业的corpId
        multiple: false, // 是否多选
        limitTips: '超出了', // 超过限定人数返回提示
        maxUsers: 1, // 最大可选人数
        pickedUsers: [], // 已选用户
        pickedDepartments: [], // 已选部门
        disabledUsers: [], // 不可选用户
        disabledDepartments: [], // 不可选部门
        requiredUsers: [], // 必选用户（不可取消选中状态）
        requiredDepartments: [], // 必选部门（不可取消选中状态）
        appId: null, // 微应用的Id
        permissionType: 'GLOBAL', // 可添加权限校验，选人权限，目前只有GLOBAL这个参数
        responseUserOnly: true, // 返回人，或者返回人和部门
        startWithDepartmentId: 0, // 0表示从企业最上层开始
        onSuccess(result) {
          typeof cb === 'function' && cb(result)
          resolve(result)
        },
        onFail(err) {
          typeof cb === 'function' && cb(err)
          reject(err)
        }
      }, params)
      dd.biz.contact.complexPicker(conf)
    })
  })
}

// 扫描二维码
export function scanCard(cb) {
  return ready().then(() => {
    return new Promise((resolve, reject) => {
      dd.biz.util.scanCard({
        onSuccess(data) {
          typeof cb === 'function' && cb(data)
          resolve(data)
        },
        onFail(err) {
          alert(err)
          reject(err)
        }
      })
    })
  })
}

// 打开应用内页面
export function openApp(params, pageName) {
  return ready().then(() => {
    return new Promise((resolve, reject) => {
      let conf = {
        name: pageName || 'profile', // 页面名称
        params: JSON.stringify(params), // 传参
        onSuccess(data) {
          resolve(data)
        },
        onFail: function (err) {
          console.log(JSON.stringify(err))
          reject(err)
        }
      }
      dd.biz.util.open(conf)
    })
  })
}

// 拨打电话
export function showCallMenu(params) {
  let conf = Object.assign({
    onSuccess() {},
    onFail() {}
  }, params)
  return ready.then(() => {
    dd.biz.telephone.showCallMenu(conf)
  })
}

//上传图片
export function uploadImg(params) {
  let conf = Object.assign({
    onSuccess() {},
    onFail(result) {
      alert(JSON.stringify(result))
    }
  }, params)

  return ready.then(() => {
    dd.biz.util.uploadImage(conf)
  })
}

//预览图片
export function previewImage(params) {
  let conf = Object.assign({
    onSuccess() {},
    onFail(result) {
      alert(JSON.stringify(result))
    }
  }, params)
  return ready.then(() => {
    dd.biz.util.previewImage(conf)
  })
}