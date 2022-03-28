import CategoryRoute from './CategoryRoute';
import ContentRoute from './ContentRoute';
import ProductRoute from './ProductRoute';

type Object =
  | {
      __typename: 'Category';
    }
  | {
      __typename: 'Product';
    }
  | {
      __typename: 'Page';
    }
  | {
      __typename: 'StartPage';
    };

type Props<Object> = {
  route: {
    object?: Object | null;
  };
  categoryPage: React.FC<{
    category: Extract<Object, { __typename: 'Category' }>;
  }>;
  productPage: React.FC<{
    product: Extract<Object, { __typename: 'Product' }>;
  }>;
  contentPage: React.FC<{
    page: Extract<Object, { __typename: 'Page' }>;
  }>;
};

function DynamicRoute<O extends Object>({
  route,
  categoryPage,
  productPage,
  contentPage,
}: Props<O>) {
  if (!route?.object?.__typename) {
    throw new Error('No route object');
  }

  switch (route.object.__typename) {
    case 'Category':
      return (
        <CategoryRoute
          categoryPage={categoryPage}
          category={route.object as Extract<O, { __typename: 'Category' }>}
        />
      );
    case 'Product':
      return (
        <ProductRoute
          productPage={productPage}
          product={route.object as Extract<O, { __typename: 'Product' }>}
        />
      );
    case 'Page':
      return (
        <ContentRoute
          contentPage={contentPage}
          page={route.object as Extract<O, { __typename: 'Page' }>}
        />
      );
    default:
      // StartPage should not happen as that is it's own file-route
      // in the remix router
      throw new Error('Unknown route type');
  }
}

export default DynamicRoute;
