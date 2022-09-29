import {createCookieSessionStorage} from '@remix-run/node';

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    maxAge: 604_800, // one week
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
  }
});

export const {getSession, commitSession, destroySession} = sessionStorage;