import axios from "axios";

export const baseUrl ="http://localhost:8080"
export const reactUrl ="http://localhost:5173"

export const myAxios = (token, setToken) => {

    let instance = axios.create({
        baseURL : baseUrl,
        timeout:5000,

    })

    instance.interceptors.response.use( //응답이 올때마다 헤더에 토큰 유무 체크하여 토큰 갱신
        (response)=> {
            if(response.headers.authorization){
                setToken(response.headers.authorization)
            }
            return response;
        }

        ,
        (error)=> { //error 발생시
            if(error.response && error.response.status){
                switch(error.response.status){
                    case 401:   //401,403 은 인증오류, 로그인 다시시도
                    case 403: window.location.href = `${reactUrl}/login`; break;
                    default : return Promise.reject(error);
                }
                return Promise.reject(error);
            }
        }
    )

    //토큰이 있으면 헤더에 토큰을 삽입하여 요청
    //토큰 없이 테스트하려고 막아둠
    if(token){
    token && instance.interceptors.request.use((config)=> {
        config.headers.authorization = token;
        return config;
    })
    
}

    return instance;
    
}