import { RouteQuery } from '~/graphql/types';

export type RouteCategory = Extract<
  NonNullable<RouteQuery['route']>['object'],
  { __typename: 'Category' }
>;

export type RouteProduct = Extract<
  NonNullable<RouteQuery['route']>['object'],
  { __typename: 'Product' }
>;

export type RoutePage = Extract<
  NonNullable<RouteQuery['route']>['object'],
  { __typename: 'Page' }
>;

export type RouteStartPage = Extract<
  NonNullable<RouteQuery['route']>['object'],
  { __typename: 'StartPage' }
>;
