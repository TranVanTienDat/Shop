import publicClient from '../client/public.client';

const productEndpoints = {
  getProductById: ({ productID }) => `product/${productID}`,
  getProducts: ({ keyword, minPrice, maxPrice, category, page, limit }) =>
    `product/products?keyword=${keyword}&minPrice=${minPrice}&maxPrice=${maxPrice}&category=${category}&page=${page}&limit=${limit}`,
  getTopProducts: 'product/top',
  getCategoriesProduct: ({ category }) =>
    `product/category?category=${category}`,
};

const productApi = {
  getAllProduct: async (payload) => {
    try {
      const res = await publicClient.get(productEndpoints.signIn, payload);

      return { res };
    } catch (err) {
      console.log('err');
      return { err };
    }
  },

  getProductById: async ({ productID }) => {
    try {
      const res = await publicClient.get(
        productEndpoints.getProductById({ productID })
      );

      return { res };
    } catch (err) {
      console.log('err');
      return { err };
    }
  },
  getProducts: async ({
    keyword,
    minPrice,
    maxPrice,
    category,
    page,
    limit,
  }) => {
    try {
      const res = await publicClient.get(
        productEndpoints.getProducts({
          keyword,
          minPrice,
          maxPrice,
          category,
          page,
          limit,
        })
      );

      return { res };
    } catch (err) {
      console.log('err');
      return { err };
    }
  },

  getTopProducts: async () => {
    try {
      const res = await publicClient.get(productEndpoints.getTopProducts);

      return { res };
    } catch (err) {
      console.log('err');
      return { err };
    }
  },
  getCategoriesProduct: async ({ category }) => {
    try {
      const res = await publicClient.get(
        productEndpoints.getCategoriesProduct({ category })
      );

      return { res };
    } catch (err) {
      console.log('err');
      return { err };
    }
  },
};

export default productApi;
