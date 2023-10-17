import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faCartPlus,
  faChevronRight,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addCart } from '~/api/cartApi';
import { getProductById } from '~/api/productsApi';
import Button from '~/components/Button/Button';
import Star from '~/components/RatingStar/RatingStar';
import { err, success, warning } from '~/constants/ToastMessage/ToastMessage';
import { formatPrice } from '~/hook/func';
import { setIsLoading } from '~/store/slice/loadingSlice';
import { userData } from '~/store/slice/selector';
import styles from './ProductDetail.module.scss';
import Review from './Reviews/Review';
import { addCartProduct } from '~/store/slice/myCart';
import { onBuy } from '~/store/slice/BuyProductSlice';
const cx = classNames.bind(styles);
function ProductDetail() {
  const { status } = useSelector(userData);
  const { _id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null); // lấy ra sản phẩm
  const [quantity, setQuantity] = useState(1); // số lượng cần mua ban đầu là 1

  // Gồm list ảnh và ảnh ban đầu
  const [listImg, setLisImg] = useState({ list: [], mainImg: '' });

  // gồm list các sản phẩm và sản phẩm ban đầu cần render
  const [chooseProduct, setChooseProduct] = useState({
    listProduct: {},
    mainProduct: {},
  });

  // mỗi sản phẩm gồm size và số lượng trong kho
  const [sizes, setSizes] = useState({ ListSize: [], quantity: null });

  // lấy ra lựa chọn sản phẩm của khách hàng
  const [typeProduct, setTypeProduct] = useState({
    type: '',
    value: '',
    active1: null,
    active2: null,
  });

  useEffect(() => {
    const getProduct = async () => {
      try {
        dispatch(setIsLoading(true));
        const response = await getProductById(_id);
        dispatch(setIsLoading(false));
        if (response) {
          const data = response.data.selectProduct;
          setProduct(response.data);
          setChooseProduct({
            listProduct: data,
            mainProduct: data.listProduct[0],
          });
          if (!data.listProduct[0].quantity) {
            setSizes({
              ListSize: data.listProduct[0].sizes,
              quantity: data.listProduct[0].sizes[0].quantity,
            });
          } else {
            setSizes((prev) => ({
              ...prev,
              quantity: data.listProduct[0].quantity,
            }));
          }
          setLisImg({
            list: response.data.images,
            mainImg: response.data.images[0],
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [_id, dispatch]);

  // set lại lựa chọn khách hàng
  useEffect(() => {
    if (typeProduct.type) {
      const product = chooseProduct.listProduct.listProduct.find(
        (item) => item.color === typeProduct.type
      );
      setChooseProduct((prev) => ({ ...prev, mainProduct: product }));

      if (!product.quantity) {
        const qtt = product.sizes.find(
          (item) => item.size === typeProduct.value
        );
        setSizes({ ListSize: product.sizes, quantity: qtt?.quantity ?? 1 });
      } else {
        setSizes((prev) => ({ ...prev, quantity: product.quantity }));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeProduct]);

  // handle function
  const handleNav = () => {
    navigate('/detail-product');
  };

  const handleOnChangeMainImg = (srcImg) => {
    setLisImg((prev) => ({ ...prev, mainImg: srcImg }));
  };

  const handleChoose = (field1, value1, field2, value2) => {
    setTypeProduct((prev) => ({ ...prev, [field1]: value1, [field2]: value2 }));
  };

  // handle the number of products
  const handleQuantity = (field) => {
    if (field === 'prev' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (field === 'next') {
      setQuantity((prev) => prev + 1);
    }
    if (quantity > sizes.quantity) {
      warning('Vượt qua số lượng trong kho');
    }
  };

  const handleOnClick = async (field) => {
    if (status) {
      if (typeProduct.type) {
        const body = {
          productID: product._id,
          productName: product.name,
          productImage: listImg.mainImg,
          productPrice: chooseProduct.mainProduct.newPrice,
          productType: typeProduct.type,
          productValue: typeProduct.value
            ? typeProduct.value
            : typeProduct.type,
          productQuantity: quantity,
        };

        if (field === 'cart') {
          const { res, error } = await addCart(body);
          if (res) {
            dispatch(addCartProduct(body));
            success('thêm vào giỏ hàng thành công');
          }
          if (error) {
            err(error.message);
          }
        }
        if (field === 'buy') {
          dispatch(onBuy([body]));
          navigate('/payment-product');
        }
      } else {
        warning('Lựa chọn sản phẩm');
      }
    } else {
      err('Bạn cần đăng nhập');
    }
  };

  return (
    <div className={cx('wrapper')}>
      {product ? (
        <div className={cx('inner')}>
          <div className={cx('path')}>
            Grocery{' '}
            <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />{' '}
            Fruits{' '}
            <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />
            Japan Oranges
          </div>

          <div className={cx('detail')}>
            <div className={cx('info')}>
              <div className={cx('info__img')}>
                <div className={cx('main')}>
                  <img
                    className={cx('main_img')}
                    src={listImg.mainImg}
                    alt=""
                  />
                </div>
                <div className={cx('secondary')}>
                  {listImg.list.length > 0 &&
                    listImg.list.map((item, i) => {
                      return (
                        <img
                          key={i}
                          className={cx('secondary_img')}
                          src={item}
                          alt=""
                          onMouseMove={() => handleOnChangeMainImg(item)}
                        />
                      );
                    })}
                </div>
              </div>

              <div className={cx('info__product')}>
                <h1 className={cx('name')}>{product?.name}</h1>

                <div className={cx('product__parameters')}>
                  <div className={cx('rating')}>
                    <span className={cx('number')}>{product?.rating}</span>
                    <Star value={product?.rating} />
                  </div>
                  <div className={cx('sales')}>
                    <div className={cx('item')}>
                      <span className={cx('text')}>{product?.sold}</span>
                      Đã Bán
                    </div>
                    <div className={cx('item')}>
                      <span className={cx('text')}>
                        {product.reviews.length}
                      </span>
                      Đánh giá
                    </div>
                  </div>
                </div>
                <div className={cx('price')}>
                  {chooseProduct.mainProduct?.oldPrice && (
                    <span className={cx('old')}>
                      {formatPrice.format(chooseProduct.mainProduct?.oldPrice)}
                    </span>
                  )}

                  <span className={cx('new')}>
                    {formatPrice.format(chooseProduct.mainProduct?.newPrice)}
                  </span>
                  {chooseProduct.mainProduct?.discount && (
                    <span className={cx('discount')}>
                      Giảm {chooseProduct.mainProduct?.discount}%
                    </span>
                  )}
                </div>

                <div className={cx('selection')}>
                  <span className={cx('type')}>Màu sắc</span>
                  <div className={cx('values')}>
                    {chooseProduct.listProduct?.listProduct?.length > 0 &&
                      chooseProduct.listProduct.listProduct.map((item, i) => {
                        return (
                          <button
                            key={i}
                            onClick={() =>
                              handleChoose('type', item.color, 'active1', i)
                            }
                            className={cx(
                              'item',
                              item.quantity === 0
                                ? 'disabled'
                                : typeProduct.active1 === i
                                ? 'active'
                                : ''
                            )}
                          >
                            {item.color}
                          </button>
                        );
                      })}
                  </div>
                </div>

                {sizes.ListSize?.length > 0 && (
                  <div className={cx('selection')}>
                    <span className={cx('type')}>Size</span>
                    <div className={cx('values')}>
                      {sizes.ListSize?.length > 0 &&
                        sizes.ListSize?.map((item, i) => {
                          return (
                            <button
                              onClick={() =>
                                item.quantity > 0 &&
                                handleChoose('value', item.size, 'active2', i)
                              }
                              key={i}
                              className={cx(
                                'item',

                                item.quantity === 0
                                  ? 'disabled'
                                  : typeProduct.active2 === i
                                  ? 'active'
                                  : ''
                              )}
                            >
                              {item.size}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                )}

                <div className={cx('buy')}>
                  <div className={cx('quantity')}>
                    <span className={cx('title')}>Quantity</span>
                    <div className={cx('counter')}>
                      <span
                        className={cx('prev')}
                        onClick={() => handleQuantity('prev')}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </span>
                      <span className={cx('number')}>{quantity}</span>
                      <span
                        className={cx('next')}
                        onClick={() => handleQuantity('next')}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </span>
                    </div>
                    <div className={cx('existence')}>
                      {sizes.quantity && <>{sizes.quantity} sản phẩm có sẵn</>}
                    </div>
                  </div>

                  <div className={cx('button')}>
                    <Button
                      outline
                      icon={<FontAwesomeIcon icon={faCartPlus} />}
                      onClick={() => handleOnClick('cart')}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      large
                      onClick={() => handleOnClick('buy')}
                      icon={<FontAwesomeIcon icon={faHeart} />}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className={cx('description')}>
              <div className={cx('description__detail')}>
                <div className={cx('heading')}>CHI TIẾT SẢN PHẨM</div>
                <div className={cx('info')}>
                  {product?.description.parameter?.length > 0 &&
                    product?.description.parameter.map((item, i) => {
                      return (
                        <div key={i} className={cx('item')}>
                          <span className={cx('title')}>{item.title}</span>
                          <span className={cx('value')}>{item.value}</span>
                        </div>
                      );
                    })}

                  {product?.description.selectSize?.length > 0 && (
                    <>
                      <div className={cx('text')}>Lựa chọn size</div>
                      {product?.description.selectSize.map((item, i) => {
                        return (
                          <div key={i} className={cx('item')}>
                            <span className={cx('title')}>{item.title}</span>
                            <span className={cx('value')}>{item.value}</span>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
                <div className={cx('review')}>
                  <Review data={product?.reviews} />
                </div>
              </div>
              <div className={cx('products-other')}>
                <h4 className={cx('title')}>Top sản phẩm bán chạy</h4>
                <div className={cx('list')}>
                  <div className={cx('product')} onClick={handleNav}>
                    <img
                      className={cx('img')}
                      src="https://down-vn.img.susercontent.com/file/148212e6d7fbdb80316141cacf524f04"
                      alt=""
                    />
                    <h6 className={cx('name')}>
                      Đồng Hồ Nam Nữ Dây Da ROSIVGA - Đồng hồ đeo tay thời trang
                      mặt vuông
                    </h6>
                    <div className={cx('price')}>208.100</div>
                  </div>
                  <div className={cx('product')}>
                    <img
                      className={cx('img')}
                      src="https://down-vn.img.susercontent.com/file/148212e6d7fbdb80316141cacf524f04"
                      alt=""
                    />
                    <h6 className={cx('name')}>
                      Đồng Hồ Nam Nữ Dây Da ROSIVGA - Đồng hồ đeo tay thời trang
                      mặt vuông
                    </h6>
                    <div className={cx('price')}>208.100</div>
                  </div>
                  <div className={cx('product')}>
                    <img
                      className={cx('img')}
                      src="https://down-vn.img.susercontent.com/file/148212e6d7fbdb80316141cacf524f04"
                      alt=""
                    />
                    <h6 className={cx('name')}>
                      Đồng Hồ Nam Nữ Dây Da ROSIVGA - Đồng hồ đeo tay thời trang
                      mặt vuông
                    </h6>
                    <div className={cx('price')}>208.100</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ProductDetail;
