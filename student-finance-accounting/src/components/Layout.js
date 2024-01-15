import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import appStore from "../stores/AppStore";
import StyledLink from "./StyledLink";

let links = [
    { path: '/results', name: 'Reports' },
    { path: '/data', name: 'Add report' },
    { path: '/instructions', name: 'Instructions' },
    { path: '/developer', name: 'Developer' }
];

const Layout = observer(({ children }) => {
    const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const scrollingDown = prevScrollPos < currentScrollPos;

            setVisible(!scrollingDown);

            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos]);

    return (
        <div className="w-full h-full">
            <header
                className={
                    `z-50 fixed w-full h-1/6 bg-purple-700 text-white flex justify-end items-center
                    space-x-3 p-4 transition-all duration-300 ${visible ? "opacity-100" : "opacity-0"}`
                }
            >
                {appStore.isAuthenticated && 
                    links.map((link, index) => <StyledLink key={index} path={link.path} name={link.name} />)
                }
                <StyledLink path='/' name='Logout' />
            </header>
            <main>{children}</main>
            <footer className="w-full h-1/6 bg-purple-700 text-white p-4 bottom-0 flex justify-center items-center">
                All nonexistent rights are protected by the license that I just made up 😜
            </footer>
        </div>
    );
});

export default Layout;
