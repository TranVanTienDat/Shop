import CustomerReviews from '~/components/AboutUs/CustomerReviews/CustomerReviews';
import InputJoin from '~/components/AboutUs/InputJoin/InputJoin';
import Banner from '~/components/Banner/Banner';
import CategoriesShop from '~/components/CategoriesShop/CategoriesShop';

function Gallery() {
  return (
    <div style={{ marginTop: '120px' }}>
      <Banner />
      <CategoriesShop title="Our Gallery" />
      <CustomerReviews />
      <InputJoin />
    </div>
  );
}

export default Gallery;
