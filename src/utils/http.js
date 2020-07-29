// Http request
// Http 请求

import axios from 'axios'

axios.defaults.timeout = 50000

/**
 * Get request
 * Get 请求
 * @param {String} url 
 * @param {String} params 
 */
export const get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'get',
      params
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * Post request
 * Post 请求
 * @param {String} url 
 * @param {String} params 
 */
export function post(url, data) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}