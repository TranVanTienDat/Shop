import privateClient from '../client/private.client';
import formDatePrivateClient from '../client/formDataPrivate.client';
const ratingUserEndpoints = {
  postComment: 'rating/add-comment',
  getCommentOfProductID: ({ productID }) => `rating/get-comment/${productID}`,
};

const ratingApi = {
  postComment: async (payload) => {
    try {
      const res = await formDatePrivateClient.post(
        ratingUserEndpoints.postComment,
        payload
      );
      return { res };
    } catch (err) {
      return { err };
    }
  },
  getCommentOfProductID: async ({ productID }) => {
    try {
      const res = await privateClient.get(
        ratingUserEndpoints.getCommentOfProductID({ productID })
      );
      return { res };
    } catch (err) {
      return { err };
    }
  },
};

export default ratingApi;
