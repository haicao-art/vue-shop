import fetch from '@/utils/fetch'

/**
* 获取地址列表
*/
export function getAddressList(params) {
 return fetch({
   url: 'address/getList',
   method: 'POST',
   data: {
     version: process.env.INTERFACE,
     token: params.token,
   }
 });
}

/**
* 获取地址详情
*/
export function getAddressInfo(params) {
 return fetch({
   url: 'address/info',
   method: 'POST',
   data: {
     version: process.env.INTERFACE,
     token: params.token,
     consignee_id: params.consignee_id
   }
 });
}


/**
 * 删除收货地址
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export function deleteAddress(params) {
 return fetch({
   url: 'address/delete',
   method: 'POST',
   data: {
     version: process.env.INTERFACE,
     token: params.token,
     consignee_id: params.consignee_id
   }
 });
}


/**
 * 新增地址
 * @param {[type]} token  [description]
 * @param {[type]} params [description]
 */
export function addAddress(token, params) {
 return fetch({
   url: 'address/add',
   method: 'POST',
   data: {
     version: process.env.INTERFACE,
     token: token,
     consignee: params.name,
     mobile: params.tel,
     province: params.province,
     city: params.city,
     district: params.county,
     address: params.address_detail,
     area_code: params.area_code,
     is_default: params.is_default,
   }
 });
}

/**
 * 更新地址
 * @param {[type]} token  [description]
 * @param {[type]} params [description]
 */
export function updateAddress(token, params) {
 return fetch({
   url: 'address/update',
   method: 'POST',
   data: {
     version: process.env.INTERFACE,
     token: token,
     consignee_id: params.id,
     consignee: params.name,
     mobile: params.tel,
     province: params.province,
     city: params.city,
     district: params.county,
     address: params.address_detail,
     area_code: params.area_code,
     is_default: params.is_default,
   }
 });
}
