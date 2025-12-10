import { fcmTokenAtom, tokenAtom, userAtom } from "./atoms";
import {useAtom, useAtomValue, useSetAtom} from "jotai/react"
import { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { myAxios } from "./config";

export default function Token() {
    
    let params = new URL(window.location.href).searchParams;
    let tokenParam = params.get("token");
    let setUser = useSetAtom(userAtom)
    let[token, setToken] = useAtom(tokenAtom);
    setToken(tokenParam)
    let fcmToken = useAtomValue(fcmTokenAtom)
    
    console.log(tokenParam)
    const navigate = useNavigate();

    useEffect(()=> {
        let formData = new FormData();
        formData.append('fcmToken', fcmToken);
        token && myAxios(token, setToken).post("/user", formData)
        .then(res=> {
            setUser(res.data)
            navigate("/zipddak/main")
        })
        .catch(err=> {

        })

    },[token])
    
    return (
        <>
        </>
    )
}