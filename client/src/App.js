import { Fragment } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.scss';
import Layout from './Layouts/DefaultLayout/Layout';
import Container from './Layouts/DefaultLayout/Container/Container';
import { AuthContextProvider } from './firebase/context/AuthContext';
import { publicRoutes } from './routes/routes';
// gsap
import gsap from 'gsap';

// gsap plugins
import ScrollTrigger from 'gsap/ScrollTrigger';
import LoadingButton from './Layouts/DefaultLayout/Loading/LoadingButton/LoadingButton';
import ModalAddress from './pages/PaymentOrder/components/ModalAddress/ModalAddress';

function App() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.config({
    force3D: true,
  });
  return (
    <Router>
      <AuthContextProvider>
        <div className="App">
          {/* <Cart /> */}
          <ModalAddress />
          <LoadingButton />

          <ToastContainer />
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              let LayoutDefault = Layout;
              let ChildrenLayout = Fragment;
              if (route.childrenLayout) {
                ChildrenLayout = route.childrenLayout;
              }
              if (route.layout) {
                LayoutDefault = route.layout;
              } else if (route.layout === null) {
                LayoutDefault = Fragment;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <LayoutDefault>
                      {route.index ? (
                        <Container
                          state={route.state ? route.state : undefined}
                        >
                          <ChildrenLayout>
                            <Page />
                          </ChildrenLayout>
                        </Container>
                      ) : (
                        <Container
                          state={route.state ? route.state : undefined}
                        >
                          <ChildrenLayout>
                            <Page />
                          </ChildrenLayout>
                        </Container>
                      )}
                    </LayoutDefault>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
