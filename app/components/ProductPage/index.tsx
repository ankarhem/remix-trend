import {
  CustomBoolField,
  CustomStringField,
  ProductCustomFieldType,
} from '~/graphql/types';
import { useSelectedArticleNumber } from '~/lib/utils/product';
import type { RouteProduct } from '~/utils/types';
import ProductGrid from '../CategoryPage/ProductGrid';
import Price from '../Price';
import AddToCartForm from './AddToCartForm';

type Props = {
  product: RouteProduct;
};

function ProductPage({ product }: Props) {
  const articleNumber = useSelectedArticleNumber(product);
  if (!product) return null;
  const selectedVariant = product.variants?.values.find(
    (variant) => variant?.articleNumber === articleNumber
  );

  return (
    <div className="container mx-auto mt-12 mb-8 flex flex-col gap-12">
      <div className="mx-4 grid grid-cols-12 gap-12 lg:mx-0 ">
        <div className="col-span-12 items-center justify-center bg-white lg:col-span-7">
          <img
            className="max-h-[600px] object-contain p-8 lg:min-h-[500px]"
            src={selectedVariant?.images?.[0]?.url || product.images?.[0]?.url}
            alt={product.name}
          />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <div className="mb-6">
            <h1 className="text-3xl font-bold uppercase text-gray-900">
              {product.name}
            </h1>
            <h2 className="text-sm font-bold">{product.subName}</h2>
            <span className="text-sm">
              {articleNumber || product.articleNumber}
            </span>
          </div>

          <div
            className="prose mb-6 max-w-prose text-sm text-gray-500"
            dangerouslySetInnerHTML={{
              __html: product.shortDescription,
            }}
          />

          <div className="mb-6 text-xl font-bold uppercase">
            <Price price={(selectedVariant || product).price} />
          </div>

          <AddToCartForm product={product} />
        </div>
      </div>

      <div className="mx-4 grid grid-cols-12 gap-12 lg:mx-0">
        <div className="col-span-12 lg:col-span-7">
          <h2 className="mb-4 text-lg font-bold uppercase text-gray-900">
            Product description
          </h2>
          <div
            className="prose text-sm text-gray-500"
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          ></div>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <h2 className="mb-4 text-lg font-bold uppercase text-gray-900">
            Specifications
          </h2>
          <table className="prose w-full">
            <tbody>
              {product.customFields?.map((_field) => {
                if (!_field) return null;
                let value;

                switch (_field.type) {
                  case ProductCustomFieldType.String: {
                    const field = _field as Extract<
                      typeof _field,
                      { stringValue: any }
                    >;
                    value = field.stringValue;
                    break;
                  }
                  case ProductCustomFieldType.Bool: {
                    const field = _field as Extract<
                      typeof _field,
                      { boolValue: any }
                    >;
                    value = field.boolValue ? 'Yes' : 'No';
                    break;
                  }
                  default:
                    return null;
                }

                return (
                  <tr className="text-left" key={_field.key}>
                    <th>{_field.title}</th>
                    <td>{value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {product.relatedProducts && product.relatedProducts?.length > 0 ? (
        <div className="mx-4 lg:mx-0">
          <h2 className="mb-6 text-2xl font-bold uppercase text-gray-900">
            Related products
          </h2>

          <ProductGrid
            products={product.relatedProducts}
            className="!grid-cols-[repeat(auto-fit,_minmax(300px,350px))] justify-start !p-0"
          />
        </div>
      ) : null}
    </div>
  );
}

export default ProductPage;
