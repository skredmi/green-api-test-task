import { ReactElement } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { MainPage } from "./pages/MainPage/MainPage";
import { RequireAuth } from "./utils/RequireAuth";
import { AuthProvider } from "./utils/AuthProvider";

interface ExactRouteProps {
  exact: boolean;
  path: string;
  element: ReactElement;
}

const AuthRoute: ExactRouteProps = {
  exact: true,
  path: "/",
  element: <AuthPage />,
};

export const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route
                path="/chat"
                element={
                  <RequireAuth>
                    <MainPage />
                  </RequireAuth>
                }
              />
              <Route {...AuthRoute} />
            </Routes>
          </Layout>
        </AuthProvider>
      </Router>
    </>
  );
};
