import { Layout } from "./components/Layout/Layout";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { MainPage } from "./pages/MainPage/MainPage";

export const App = () => {
  return (
    <>
      <Layout>
        {/*         <AuthPage /> */}
        <MainPage />
      </Layout>
    </>
  );
};
