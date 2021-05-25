import Axios from 'axios'
console.log(process.env.NODE_ENV)
const host = process.env.NODE_ENV === 'development' ? Axios.defaults.baseURL = 'http://api_devs.wanxikeji.cn' : Axios.defaults.baseURL = '真实地址'
Axios.defaults.headers.post['Content-Type'] = 'application/json; charset = UTF-8'
const ajax = Axios.create({

})
ajax.interceptors.request.use(req => {
    return req
}, erro => {
    return Promise.reject('error');
})
ajax.interceptors.response.use(res => {
    return res
}, erro => {
    return Promise.reject('error')
})
export default ajax