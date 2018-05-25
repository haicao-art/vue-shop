import Cookies from 'js-cookie'

const TokenKey = 'qiran-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, exp) {
  exp = exp  || null;     //默认过期时间session 浏览器关闭失效
  return Cookies.set(TokenKey, token, {expires: exp})
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
