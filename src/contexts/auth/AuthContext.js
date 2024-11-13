"use client";
import { getProfileData } from "@/components/dashboard/settings/_lib/actions";
import { api, server_base_api } from "@/utils/api";
import { removeTokenFromCookies, setTokenInCookies } from "@/utils/axios-api.helpers";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
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
    console.log(token, "token")
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

    async function fetchProfileData() {
        try {
            const response = await getProfileData();
            console.log(response, "response...........")
            setUserInfo({
                name: response.first_name + " " + response.last_name,
                email: response.email,
                contact_number: response.contact_number,
                profile_pic: response.profile_pic,
                role: response.role,
            });
        } catch (error) {
            console.error('Error fetching profile data:', error);
            return null;
        }
    }
    React.useEffect(() => {
        const auth = localStorage.getItem("auth");
        console.log(auth, "auth from local storage. .....")
        if (auth) {
            const data = JSON.parse(auth);
            const currentTime = Date.now() / 1000;

            const isValidToken = data.expirationTime > currentTime;
            if (isValidToken) {
                fetchProfileData();
                api.defaults.headers.common["Authorization"] = `${data.token}`;
            } else {
                localStorage.removeItem("auth");
            }
        }

    }, [])

    console.log(userInfo.name, "userInfo.name.............")


    const handleLogin = async (email, password, onError) => {
        try {
            const res = await server_base_api.post("/auth/login", {
                email: email,
                password: password,
            });

            const decodedToken = jwtDecode(res.data.data.token);
            console.log(decodedToken, "decodedToken")
            const expirationTime = decodedToken.exp * 1000;


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
                JSON.stringify({ ...userData })
            );

            setTokenInCookies(userData.token);
            setUserInfo(userData);

            if (userData.role === "ADMIN") {
                router.push("/dashboard");
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
