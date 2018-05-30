
import { wxAuthorize, wxfwhLogin} from '@/apis/member'
import { getToken, setToken, removeToken } from '@/utils/auth'

const member = {
    state: {
        memberInfo: {
          nickname: '',
          avatar: '',
          level: '',
          point: '',
          mobile: '',
        },
        token: getToken(),
        lastUpTime: 0
    },
    mutations: {
        SET_MEMBERINFO: (state, memberInfo) => {
          state.memberInfo = memberInfo
        },
        SET_TOKEN: (state, token) => {
          state.token = token
        },
        SET_LAST_UPTIME: (state, time) => {
          state.lastUpTime = time
        }
    },
    actions: {
      //用户名&密码登录
      async wxfwhLogin({ commit }, code) {
        await new Promise((resolve, reject) => {
          wxfwhLogin(code).then(response => {
            //登陆成功，进行token保存
            setToken(response.data.token)
            commit('SET_TOKEN', response.data.token)
            //commit('SET_ADMININFO', response.data)
            //commit('SET_LAST_UPTIME')
            resolve()
          }).catch(error => {
            if(error.code == 1102) {
              wxAuthorize('snsapi_userinfo', 'wxlogin', 'http://8b6cb677.ngrok.io/wxfwhLogin').then(response => {
                let _url = response.data.url
                window.location.href = _url
                return false;
              }).catch(error => {
                console.log(error)
                reject(error)
              })
            } else {
              reject(error)
            }
          })
        })
      },
      async FedLogOut({ commit }) {
        await new Promise((resolve, reject) => {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
        })
      }
    }
}

export default member
