import config from '~/config';

export const nav = [
  {
    to: config.routes.home,
    order: 0,
    text: 'Home',
  },
  {
    to: config.routes.orderOnline,
    order: 1,
    text: 'Shop',
  },
  {
    to: config.routes.gallery,
    order: 2,
    text: 'Gallery',
  },
  {
    to: config.routes.contact,
    order: 3,
    text: 'Contact',
  },
];
