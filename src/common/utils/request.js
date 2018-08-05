import qryStr from 'query-string'
import 'fetch-detector'
import 'fetch-ie8'
import {loginInit} from '@/common/utils/index'
require('es6-promise').polyfill()

export default {

  defaultHeaders: {
    Accept: 'application/json'
  },
  defaultOptions: {
    credentials: 'same-origin'
  },
  // 转换成qs
  _toQs (body) {
    let qsUrl = {}
    Object.keys(body).forEach((key) => {
      if (body[key] !== undefined) {
        qsUrl[key] = body[key]
      }
    })
    return qryStr.stringify(qsUrl)
  },
  // 转换成form格式
  _toForm (body) {
    let form = new FormData()
    Object.keys(body).forEach((key) => {
      if (body[key] !== undefined) {
        form.append(key, body[key])
      }
    })
    return form
  },

  get ({ url, body = {}, headers = {}, options = {}, reqType = 'json' }) {
    if (body && this._toQs(body)) {
      url += `?${this._toQs(body)}`
    }
    options = Object.assign(this.defaultOptions, options)

    let fetchOptions = {
      method: 'GET',
      headers: {
        ...this.defaultHeaders,
        headers
      },
      ...options
    }

    return this._parseResponse(fetch(url, fetchOptions))
  },

  post ({ url, body = {}, headers = {}, options = {}, reqType = 'json' }) {
    options = Object.assign(this.defaultOptions, options)
    let fetchOptions = {
      method: 'POST',
      body,
      headers: {
        ...this.defaultHeaders,
        headers
      },
      ...options
    }
    if (reqType === 'file') {
      fetchOptions.body = this._toForm(body)
      delete fetchOptions.headers['Content-Type']
    } else {
      fetchOptions.body = JSON.stringify(body)
      fetchOptions.headers['Content-Type'] = 'application/json'
    }
    return this._parseResponse(fetch(url, fetchOptions))
  },
  // 相应吗处理
  _statusHandler (res) {
    if (res.ok) {
      return res
    } else if (res.status === 403) {
      loginInit()
    }
    throw new Error('请求错误：' + res.statusText)
  },
  // 结果处理
  _filterHandler (res) {
    return res.json()
  },
  // 错误异常处理
  errorHandler (error) {
    console.log('网络故障: ', error.message)
  },
  // 结果处理
  _parseResponse (response) {
    console.log(response)
    return response.then(this._statusHandler).then(this._filterHandler).catch(this._errorHandler)
  }
}
