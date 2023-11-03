import { Fragment } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.scss';
import Container from './Layouts/DefaultLayOut/Container/Container';
import DefaultLayOut from './Layouts/DefaultLayOut/DefaultLayOut';
import { AuthContextProvider } from './firebase/context/AuthContext';
import { publicRoutes } from './routes/routes';
// gsap
import gsap from 'gsap';

// gsap plugins
import ScrollTrigger from 'gsap/ScrollTrigger';
import ModalAddress from './pages/PaymentOrder/components/ModalAddress/ModalAddress';
import LoadingButton from './Layouts/DefaultLayOut/Loading/LoadingButton/LoadingButton';

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
              let Layout = DefaultLayOut;
              let ChildrenLayout = Fragment;
              if (route.childrenLayout) {
                ChildrenLayout = route.childrenLayout;
              }
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
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
                    </Layout>
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
