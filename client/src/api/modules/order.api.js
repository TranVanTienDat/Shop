import privateClient from '../client/private.client';

const orderEndpoints = {
  orderProduct: 'order/buy',
  getOrderProducts: ({ typeStatus }) =>
    `order/get-order-products?typeStatus=${typeStatus}`,
  cancelOrder: 'order/cancel-order',
};

const orderApi = {
  orderProduct: async (payload) => {
    try {
      const res = await privateClient.post(
        orderEndpoints.orderProduct,
        payload
      );
      return { res };
    } catch (err) {
      return { err };
    }
  },
  getOrderProducts: async ({ typeStatus }) => {
    try {
      const res = await privateClient.get(
        orderEndpoints.getOrderProducts({ typeStatus })
      );
      return { res };
    } catch (err) {
      return { err };
    }
  },
  cancelOrder: async (payload) => {
    try {
      const res = await privateClient.put(orderEndpoints.cancelOrder, payload);
      return { res };
    } catch (err) {
      return { err };
    }
  },
};

export default orderApi;
