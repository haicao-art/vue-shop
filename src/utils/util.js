/**
 * @Author: crababy
 * @Date:   2018-05-25T10:20:43+08:00
 * @Last modified by:   crababy
 * @Last modified time: 2018-05-25T10:20:50+08:00
 * @License: http://www.opensource.org/licenses/mit-license.php MIT License
 */

/**
 * 存储localStorage
 * @param {[type]} name    [description]
 * @param {[type]} content [description]
 */
export const setStore = (name, content) => {
  if(!name) return
  if(typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}


/**
 * 获取localStorage
 * @type {[type]}
 */
export const getStore = (name) => {
  if(!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
export const removeStore = (name) => {
  if(!name) return
  window.localStorage.removeItem(name)
}
