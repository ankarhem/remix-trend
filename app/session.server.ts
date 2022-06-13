import type { DataFunctionArgs } from '@remix-run/server-runtime';
import { createCookieSessionStorage } from 'remix';
import {
  AddToCartDocument,
  AddToCartInput,
  CartDocument,
  UpdateCartInput,
  _UpdateCartDocument,
} from './graphql/types';
import { sendJetshopRequest } from './lib/jetshop';

const secret = process.env.ENCRYPTION_KEY;
if (typeof secret !== 'string') {
  throw new Error('ENCRYPTION_KEY is not set');
}

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'session',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [secret],
  },
});

const CART_ID_KEY = 'cart';
const CULTURE_KEY = 'culture';

export async function getSession(args: DataFunctionArgs) {
  const cookieHeader = args.request.headers.get('Cookie');
  let session = await sessionStorage.getSession(cookieHeader);

  return {
    commitSession() {
      return sessionStorage.commitSession(session);
    },
    getCartId(): string | undefined {
      return session.get(CART_ID_KEY);
    },
    async getCart() {
      const cartId = await this.getCartId();
      const cart = await sendJetshopRequest({
        args: args,
        query: CartDocument,
        variables: {
          cartId: cartId,
        },
      }).then((data) => data.cart);

      return cart;
    },
    /**
     * Can only be called once a cart has been created.
     *
     * - If no cart has been created you should use addToCart instead.
     * - If removing an item from the cart, you should use removeFromCart instead.
     */
    async setCart(cartItems: NonNullable<UpdateCartInput['items']>) {
      const cartId = await this.getCartId();
      const updateCartInput: UpdateCartInput = {
        cartId: cartId,
        items: cartItems,
      };
      const cart = await sendJetshopRequest({
        args: args,
        query: _UpdateCartDocument,
        variables: {
          input: updateCartInput,
        },
      }).then((data) => data?.updateCart?.cart);

      if (!cart?.id) {
        throw new Error('Error updating cart');
      }

      session.set(CART_ID_KEY, cart.id);
      return cart;
    },
    async addToCart(item: Omit<AddToCartInput, 'cartId'>) {
      const cartId = await this.getCartId();

      const addToCartInput: AddToCartInput = {
        cartId: cartId,
        ...item,
      };
      const cart = await sendJetshopRequest({
        args: args,
        query: AddToCartDocument,
        variables: {
          input: addToCartInput,
        },
      }).then((data) => {
        return data.addToCart?.cart;
      });

      if (!cart?.id) {
        throw new Error('Error updating cart');
      }

      console.log('cart', cart);

      session.set(CART_ID_KEY, cart.id);
      return cart;
    },
    getCulture(): string | undefined {
      return session.get(CULTURE_KEY);
    },
    setCulture(culture: string) {
      session.set(CULTURE_KEY, culture);
    },
    getChannel(): number | undefined {
      return session.get('channel');
    },
    setChannel(channel: number) {
      session.set('channel', channel);
    },
  };
}
