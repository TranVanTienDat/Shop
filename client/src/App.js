import { Fragment } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.scss';
import Container from './layout/MainLayout/Container/Container';
import MainLayout from './layout/MainLayout/Layout';
import { publicRoutes } from './routes/routes';
// gsap
import gsap from 'gsap';

// gsap plugins
import ScrollTrigger from 'gsap/ScrollTrigger';
import LoadingButton from './layout/MainLayout/Loading/LoadingButton/LoadingButton';
import ModalAddress from './pages/PaymentOrder/components/ModalAddress/ModalAddress';

function App() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.config({
    force3D: true,
  });
  return (
    <Router>
      <div className="App">
        {/* <Cart /> */}
        <ModalAddress />
        <LoadingButton />

        <ToastContainer />
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let LayoutDefault = MainLayout;
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
                      <Container state={route.state ? route.state : undefined}>
                        <ChildrenLayout>
                          <Page />
                        </ChildrenLayout>
                      </Container>
                    ) : (
                      <Container state={route.state ? route.state : undefined}>
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
    </Router>
  );
}

export default App;
