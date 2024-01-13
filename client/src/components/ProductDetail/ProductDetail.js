import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faAnglesLeft,
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
import cartApi from '~/api/modules/cart.api';
import productApi from '~/api/modules/product.api';
import Button from '~/components/Button/Button';
import Star from '~/components/RatingStar/RatingStar';
import {
  errMes,
  success,
  warning,
} from '~/constants/ToastMessage/ToastMessage';
import Footer from '~/layout/MainLayout/Footer/Footer';
import { onBuy } from '~/store/slice/BuyProductSlice';
import { setIsLoading, setIsLoadingButton } from '~/store/slice/loadingSlice';
import { addCartProduct } from '~/store/slice/myCart';
import { userData } from '~/store/slice/selector';
import { formatPrice } from '~/utils/func';
import styles from './ProductDetail.module.scss';
import RelatedProducts from './RelatedProducts/RelatedProducts';
import Review from './Reviews/Review';
const cx = classNames.bind(styles);
function ProductDetail() {
  const { status } = useSelector(userData);
  const { _id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // List images
  const [listImg, setLisImg] = useState({ list: [], mainImg: '' });

  //  list products and Initial product need render
  const [chooseProduct, setChooseProduct] = useState({
    listProduct: {},
    mainProduct: {},
  });

  // Each product includes size and quantity in the warehouse
  const [sizes, setSizes] = useState({ listSize: [], quantity: null });
  // Choose products of customers
  const [typeProduct, setTypeProduct] = useState({
    type: '',
    value: '',
    active1: null,
    active2: null,
  });

  useEffect(() => {
    const getProduct = async () => {
      window.scrollTo(0, 0);
      dispatch(setIsLoading(true));
      const { res, err } = await productApi.getProductById({
        productID: _id,
      });

      if (res) {
        const data = res.selectProduct;
        setProduct(res);
        setChooseProduct({
          listProduct: data,
          mainProduct: data[0],
        });

        if (!data[0].quantity) {
          setSizes({
            listSize: data[0].sizes,
            quantity: data[0].sizes[0].quantity,
          });
        } else {
          setSizes({
            listSize: null,
            quantity: data[0].quantity,
          });
        }

        setLisImg({
          list: res.images,
          mainImg: res.images[0],
        });
      }

      if (err) errMes(err.message);
      dispatch(setIsLoading(false));
    };

    getProduct();
  }, [_id, dispatch]);

  useEffect(() => {
    if (typeProduct.type) {
      const product = chooseProduct.listProduct.find(
        (item) => item.color === typeProduct.type
      );
      setChooseProduct((prev) => ({ ...prev, mainProduct: product }));

      if (!product.quantity) {
        const qtt = product.sizes.find(
          (item) => item.size === typeProduct.value
        );
        setSizes({ listSize: product.sizes, quantity: qtt?.quantity ?? 1 });
      } else {
        setSizes((prev) => ({ ...prev, quantity: product.quantity }));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeProduct]);

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
      if (quantity === sizes.quantity) {
        warning('Vượt qua số lượng trong kho');
      } else {
        setQuantity((prev) => prev + 1);
      }
    }
  };

  const handleOnClick = async (field) => {
    if (!status) {
      errMes('Bạn cần đăng nhập');
      return;
    }

    if (!typeProduct.type) {
      warning('Lựa chọn sản phẩm');
      return;
    }

    if (sizes.listSize && !typeProduct.value) {
      warning('Lựa chọn loại');
      return;
    }

    const body = {
      productID: product._id,
      productName: product.name,
      productImage: listImg.mainImg,
      productPrice: chooseProduct.mainProduct.newPrice,
      productType: typeProduct.type,
      productValue: typeProduct.value ? typeProduct.value : typeProduct.type,
      productQuantity: quantity,
    };

    if (field === 'cart') {
      dispatch(setIsLoadingButton({ isLoadingButton: true }));
      const { res, err } = await cartApi.postCart({
        ...body,
        productCheck: false,
      });
      dispatch(setIsLoadingButton({ isLoadingButton: false }));
      if (res) {
        if (res.add) {
          dispatch(addCartProduct(body));
        }
        success(res.message);
      }
      if (err) {
        errMes(err.message);
      }
    } else if (field === 'buy') {
      dispatch(onBuy([body]));
      navigate('/payment-product');
    }
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        {product ? (
          <>
            <div className={cx('path')}>
              Detail
              <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />
              product
              <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />
              {product.name}
            </div>

            <div className={cx('detail')}>
              <div className={cx('info')}>
                <div className={cx('info__img')}>
                  <img
                    className={cx('img__main')}
                    src={listImg.mainImg}
                    alt=""
                  />
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
                        <span className={cx('text')}>{product?.review}</span>
                        Đánh giá
                      </div>
                    </div>
                  </div>
                  <div className={cx('price')}>
                    {chooseProduct.mainProduct?.oldPrice && (
                      <span className={cx('old')}>
                        {formatPrice.format(
                          chooseProduct.mainProduct?.oldPrice
                        )}
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
                      {chooseProduct.listProduct?.length > 0 &&
                        chooseProduct.listProduct.map((item, i) => {
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

                  {sizes.listSize?.length > 0 && (
                    <div className={cx('selection')}>
                      <span className={cx('type')}>Size</span>
                      <div className={cx('values')}>
                        {sizes.listSize?.length > 0 &&
                          sizes.listSize?.map((item, i) => {
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
                      <div className={cx('flex')}>
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
                          {sizes.quantity && (
                            <>{sizes.quantity} sản phẩm có sẵn</>
                          )}
                        </div>
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

                <FontAwesomeIcon
                  onClick={() => navigate(-1)}
                  icon={faAnglesLeft}
                  className={cx('mobile__icon-back')}
                />
              </div>

              <div className={cx('description')}>
                <div className={cx('description__detail')}>
                  <div className={cx('heading')}>CHI TIẾT SẢN PHẨM</div>
                  <div className={cx('description__info')}>
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
                    <Review productID={product._id} />
                  </div>
                </div>
                <RelatedProducts
                  categories={product?.categories}
                  productID={product._id}
                />
              </div>
            </div>
          </>
        ) : null}
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetail;
