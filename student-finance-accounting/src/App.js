import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AuthPage from "./pages/AuthPage";
import ResultsPage from "./pages/ResultsPage";
import DataPage from "./pages/DataPage";
import InstructionsPage from "./pages/InstructionsPage";
import DeveloperPage from "./pages/DeveloperPage";
import store from './store';
import { observer } from "mobx-react-lite";

const App = observer(() =>  {
  let routes = [
    {path: "/results", element: <ResultsPage />},
    {path: "/data", element: <DataPage />},
    {path: "/instructions", element: <InstructionsPage />},
    {path: "/developer", element: <DeveloperPage />},
    {path: "/", element: <AuthPage />}
  ];

  return (
    <Router>
      <Routes>
        {routes.map((route, index) =>  
          <Route
            key={index}
            path={route.path}
            element={
              (route.path === '/' || !store.isAuthenticated) ?
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
