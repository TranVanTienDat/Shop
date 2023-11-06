import InputJoin from '~/components/AboutUs/InputJoin/InputJoin';
import Banner from '~/components/Banner/Banner';
import Shop from '~/features/shop/Shop';
function OrderOnline() {
  return (
    <div style={{ marginTop: '120px' }}>
      <Banner />
      <Shop />
      <InputJoin />
    </div>
  );
}

export default OrderOnline;
