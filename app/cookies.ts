import { createCookie } from 'remix';

export const cartIdCookie = createCookie('cartId', {
  maxAge: 604_800, // one week
});
