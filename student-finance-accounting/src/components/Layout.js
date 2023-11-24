import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import store from "../store";

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
        className={`fixed w-full h-1/6 bg-purple-700 text-white p-4 transition-all
        duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
      >
        <Link to="/">Logout</Link>
        {store.isAuthenticated && (
          <>
            <Link to="/results">Results</Link>
            <Link to="/data">Data</Link>
            <Link to="/instructions">Instructions</Link>
            <Link to="/developer">Developer</Link>
          </>
        )}
      </header>
      <main>{children}</main>
      <footer className="w-full h-1/6 bg-purple-700 text-white p-4 bottom-0">
        Footer
      </footer>
    </div>
  );
});

export default Layout;