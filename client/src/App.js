import { Fragment } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.scss';
import Container from './layout/MainLayout/Container/Container';
import MainLayout, { PageWrapper } from './layout/MainLayout/Layout';
import { publicRoutes } from './routes/routes';
// gsap
import gsap from 'gsap';

// gsap plugins
import ScrollTrigger from 'gsap/ScrollTrigger';
import { LoadingButton } from './components/Loading/LoadingGlobal';
import { LoadingDetailProduct } from './components/Loading/LoadingGlobal';
import ModalAddress from './pages/PaymentOrder/components/ModalAddress/ModalAddress';

function App() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.config({
    force3D: true,
  });
  return (
    <Router>
      <div className="App">
        <ModalAddress />
        <LoadingButton />
        <LoadingDetailProduct />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              let LayoutDefault = PageWrapper;
              let ChildrenLayout = Fragment;
              if (route.childrenLayout) {
                ChildrenLayout = route.childrenLayout;
              }
              if (route.layout === null) {
                LayoutDefault = Container;
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
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
