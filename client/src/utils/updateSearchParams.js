export const NavigateSearchParams = (params, filter, numberPage) => {
  const keyword = params.get('keyword');
  const minPrice = params.get('minPrice');
  const maxPrice = params.get('maxPrice');
  const rating = params.get('rating');

  const objectSearchParams = {};
  if (keyword) {
    objectSearchParams.keyword = keyword;
  }
  if (filter?.minPrice > 0) {
    objectSearchParams.minPrice = filter.minPrice;
  } else if (parseInt(minPrice) > 0) {
    objectSearchParams.minPrice = minPrice;
  }

  if (filter?.maxPrice > 0) {
    objectSearchParams.maxPrice = filter.maxPrice;
  } else if (parseInt(minPrice) > 0) {
    objectSearchParams.maxPrice = maxPrice;
  }

  if (filter?.rating > 0) {
    objectSearchParams.rating = filter.rating;
  } else if (parseInt(rating) > 0) {
    objectSearchParams.rating = rating;
  }

  if (numberPage) {
    objectSearchParams.numberPage = `${numberPage}`;
  } else {
    objectSearchParams.numberPage = 0;
  }
  objectSearchParams.limit = 20;
  return objectSearchParams;
};

export const updateSearchParams = (params) => {
  const keyword = params.get('keyword');
  const minPrice = params.get('minPrice');
  const maxPrice = params.get('maxPrice');
  const rating = params.get('rating');
  const page = params.get('numberPage');
  const limit = params.get('limit');
  const objectSearchParams = {
    keyword,
    minPrice: minPrice ?? 0,
    maxPrice: maxPrice ?? 0,
    rating: rating ?? 0,
    page,
    limit,
  };
  return objectSearchParams;
};
