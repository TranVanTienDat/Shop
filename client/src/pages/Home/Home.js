import AboutUs from '~/components/AboutUs/AboutUs';
import CategoriesShop from '~/components/CategoriesShop/CategoriesShop';
import TopProducts from '~/components/SliderTopProducts/TopProducts';

function Home() {
  return (
    <div style={{ marginTop: '120px' }}>
      <CategoriesShop />
      <TopProducts />
      <AboutUs />
    </div>
  );
}

export default Home;
