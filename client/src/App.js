import { Fragment } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.scss';
import { publicRoutes } from './routes/routes';
import { ToastContainer } from 'react-toastify';
import DefaultLayOut from './Layouts/DefaultLayOut/DefaultLayOut';
import Container from './Layouts/DefaultLayOut/Container/Container';
import { AuthContextProvider } from './firebase/context/AuthContext';
// gsap
import gsap from 'gsap';

// gsap plugins
import ScrollTrigger from 'gsap/ScrollTrigger';
import Cart from './components/Cart/Cart';
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
          <Cart />
          <ModalAddress />
          <ToastContainer />
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              let Layout = DefaultLayOut;

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
                      <Container>
                        <Page />
                      </Container>
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
