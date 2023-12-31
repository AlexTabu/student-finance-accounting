import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AuthPage from "./pages/AuthPage";
import ResultsPage from "./pages/ResultsPage";
import DataPage from "./pages/DataPage";
import InstructionsPage from "./pages/InstructionsPage";
import DeveloperPage from "./pages/DeveloperPage";
import appStore from './stores/AppStore';
import { observer } from "mobx-react-lite";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

let routes = [
    { path: "/results", element: <ResultsPage /> },
    { path: "/data", element: <DataPage /> },
    { path: "/instructions", element: <InstructionsPage /> },
    { path: "/developer", element: <DeveloperPage /> },
    { path: "/", element: <AuthPage /> }
];

const App = observer(() => {
    return (
        <Router>
            <Routes>
                {routes.map((route, index) =>
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            (route.path === '/' || !appStore.isAuthenticated) ?
                                <AuthPage /> :
                                <Layout>
                                    {route.element}
                                </Layout>
                        }
                    />
                )}
            </Routes>
        </Router>
    );
});

export default App;
