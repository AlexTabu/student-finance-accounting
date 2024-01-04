import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import appStore from "../stores/AppStore";
import StyledButton from "../components/StyledButton";
import { purpleHoverStyle } from "../constants";

const AuthPage = observer(() => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (login === "testLogin22" && password === "s#dDA23@44#Ds") {
            appStore.setAuthenticated(true);
            navigate("/results");
        } else {
            window.alert('Invalid credentials!');
        }
    };

    return (
        <div className="h-full bg-gradient-to-b from-teal-500 to-purple-500 h-screen text-white p-4 overflow-hidden">
            <div className="flex min-h-full">
                <div className="flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-20 w-auto"
                            src="/panda.gif"
                            alt="Panda"
                        />
                        <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-black">
                            Sign in to your account
                        </h2>
                    </div>
                    <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-3" action="#" method="POST" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="login" className="block text-sm font-medium leading-6 text-black">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="login"
                                        name="login"
                                        value={login}
                                        onChange={e => setLogin(e.target.value)}
                                        type="text"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1
                                            ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                            focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-black">
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        type="password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1
                                            ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                            focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div
                                className="flex justify-center"
                            >
                                <StyledButton
                                    width='w-full'
                                    marginTop='mt-5'
                                    text='Sign in'
                                    type="submit"
                                    hoverStyle={purpleHoverStyle}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="flex-1 flex-col justify-center px-6 py-32 lg:px-8">
                    <h1 className="text-6xl font-bold text-black">
                        With SFA, even a poor student can buy a panda!
                    </h1>
                    <h2 className="ml-px mt-2 text-3xl font-bold text-black">But it is not exactly :)</h2>
                </div>
            </div>
        </div>
    )
});

export default AuthPage;
