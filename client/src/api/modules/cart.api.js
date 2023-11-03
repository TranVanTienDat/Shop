import privateClient from '../client/private.client';

const cartEndpoints = {
  postCart: 'cart/add-cart',
  remoteItemCart: ({ cartID }) => `cart/remote-item/${cartID}`,
  getCart: 'cart/get-cart',
};

const cartApi = {
  postCart: async (payload) => {
    try {
      const res = await privateClient.post(cartEndpoints.postCart, payload);
      return { res };
    } catch (err) {
      return { err };
    }
  },
  remoteItemCart: async ({ cartID }) => {
    try {
      const res = await privateClient.delete(
        cartEndpoints.remoteItemCart({ cartID })
      );
      return { res };
    } catch (err) {
      return { err };
    }
  },
  getCart: async () => {
    try {
      const res = await privateClient.get(cartEndpoints.getCart);
      return { res };
    } catch (err) {
      return { err };
    }
  },
};

export default cartApi;
