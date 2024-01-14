import AboutUs from '~/components/AboutUs/AboutUs';
import Cart from '~/components/Cart/Cart';
import CategoriesShop from '~/components/CategoriesShop/CategoriesShop';
import TopProducts from '~/components/SliderTopProducts/TopProducts';

function Home() {
  return (
    <div style={{ marginTop: '120px' }}>
      <Cart />
      <CategoriesShop />
      <TopProducts />
      <AboutUs />
    </div>
  );
}

export default Home;
