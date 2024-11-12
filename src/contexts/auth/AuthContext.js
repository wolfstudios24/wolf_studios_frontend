"use client";
import { api, server_base_api } from "@/utils/api";
import { removeTokenFromCookies, setTokenInCookies } from "@/utils/axios-api.helpers";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
// import { removeTokenFromCookies, setTokenInCookies } from 'utils/axios-api.helpers';

export const INITIAL_AUTH_STATE = {
    token: "",
    name: "",
    email: "",
    contact_number: "",
    profile_pic: "",
    role: "USER",
};

export const AuthContext = createContext({
    userInfo: INITIAL_AUTH_STATE,
    isLogin: false,
    login: () => { },
    logout: () => { },
});

export const isValidToken = (token) => {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
    } catch (e) {
        return false;
    }
};

export const AuthProvider = (props) => {
    const [userInfo, setUserInfo] = useState(INITIAL_AUTH_STATE);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const auth = localStorage.getItem("auth");
        if (auth) {
            const data = JSON.parse(auth);
            const date1 = new Date(data.date);
            const date2 = new Date();
            const diff = (date2.getTime() - date1.getTime()) / (1000 * 60 * 60);
            if (diff <= 1) {
                setUserInfo(data);
                api.defaults.headers.common["auth-Token"] = `${data.token}`;
            }
        }
        setLoading(false);
    }, []);

    const handleLogin = async (email, password, onError) => {
        console.log(email, password, "handleLogin");
        try {
            const res = await server_base_api.post("/auth/login", {
                email: email,
                password: password,
            });

            const userData = {
                token: res.data.data.token,
                name: res.data.data.name,
                email: res.data.data.email,
                contact_number: res.data.data.contact_number,
                profile_pic: res.data.data.profile_pic,
                role: res.data.data.role,
            };

            localStorage.setItem(
                "auth",
                JSON.stringify({ ...userData, date: new Date() })
            );

            setTokenInCookies(userData.token);
            setUserInfo(userData);

            if (userData.role === "ADMIN") {
                router.push("/dashboard/analytics");
            } 
        } catch (error) {
            console.error("Login error:", error);
            onError(error.response?.data?.message || "An error occurred");
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        setUserInfo(INITIAL_AUTH_STATE);
        delete api.defaults.headers.common["Authorization"];
        removeTokenFromCookies();
        router.push("/auth/custom/sign-in");
    };

    return (
        <AuthContext.Provider
            value={{
                userInfo,
                isLogin: !!userInfo.token,
                login: handleLogin,
                logout: handleLogout,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};
