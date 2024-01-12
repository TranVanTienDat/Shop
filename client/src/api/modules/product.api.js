import publicClient from '../client/public.client';

const productEndpoints = {
  getProductById: ({ productID }) => `product/${productID}`,
  getAllProduct: ({ page, limit }) =>
    `product/daily_discover?page=${page}&limit=${limit}`,
  getProducts: ({
    keyword,
    minPrice,
    maxPrice,
    category,
    rating,
    page,
    limit,
  }) =>
    `product/search?keyword=${keyword}&minPrice=${minPrice}&maxPrice=${maxPrice}&category=${category}&rating=${rating}&page=${page}&limit=${limit}`,
  getTopProducts: 'product/top',
  getCategoriesProduct: ({ category, page }) =>
    `product/category?category=${category}&page=${page}`,
  getBestseller: 'product/best_seller',
  getRelatedProducts: ({ related, _id }) => {
    const string = related.join(',');
    return `product/related?category=${string}&_id=${_id}`;
  },
};

const productApi = {
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
    rating,
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
          rating,
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

  getBestseller: async () => {
    try {
      const res = await publicClient.get(productEndpoints.getBestseller);

      return { res };
    } catch (err) {
      return { err };
    }
  },

  getCategoriesProduct: async ({ category, page }) => {
    try {
      const res = await publicClient.get(
        productEndpoints.getCategoriesProduct({ category, page })
      );
      return { res };
    } catch (err) {
      console.log('err');
      return { err };
    }
  },

  getRelatedProducts: async ({ related, _id }) => {
    try {
      const res = await publicClient.get(
        productEndpoints.getRelatedProducts({ related, _id })
      );
      return { res };
    } catch (err) {
      console.log('err');
      return { err };
    }
  },
  getAllProduct: async ({ page, limit }) => {
    try {
      const res = await publicClient.get(
        productEndpoints.getAllProduct({ page, limit })
      );
      return { res };
    } catch (err) {
      console.log('err');
      return { err };
    }
  },
};

export default productApi;
