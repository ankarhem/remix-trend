import { useMemo } from 'react';
import type { RouteProduct } from '~/utils/types';
import { useTransitionalParams } from './useTransitionalParams';

export enum ProductType {
  Basic = 'Basic',
  Variant = 'Variant',
  Package = 'Package',
  Configuration = 'Configuration',
}

export const getProductType: (product: RouteProduct) => ProductType = (
  product
) => {
  if (product.hasVariants) return ProductType.Variant;
  if (product.isPackage) return ProductType.Package;
  if (product.hasConfigurations) return ProductType.Configuration;
  return ProductType.Basic;
};

export const useSelectedArticleNumber = (
  product: RouteProduct
): string | undefined => {
  const params = useTransitionalParams();

  const articleNumber = useMemo(() => {
    const productType = getProductType(product);
    switch (productType) {
      case ProductType.Variant:
        const selectedValues = product.variants?.options
          .map((option) => (option?.name ? params.get(option.name) : null))
          .filter((value) => value !== null);
        if (!selectedValues || selectedValues?.length === 0) return undefined;
        const match = product.variants?.values.find((variant) =>
          variant?.values.every((value) => selectedValues.includes(value))
        );
        if (!match) return undefined;

        return match.articleNumber;
      default:
        return product.articleNumber;
    }
  }, [params, product]);

  return articleNumber;
};

export const useAllowedOptionValues = ({
  product,
  option,
}: {
  product: RouteProduct;
  option: NonNullable<NonNullable<RouteProduct['variants']>['options'][number]>;
}): string[] => {
  const productType = getProductType(product);
  const currentParams = useTransitionalParams();

  if (productType !== ProductType.Variant || !option?.name) return [];

  const params = new URLSearchParams(currentParams.toString());
  params.delete(option.name);

  const selectedValues = product.variants?.options
    .map((option) => (option?.name ? params.get(option.name) : null))
    .filter((value) => value !== null);

  if (!selectedValues || selectedValues?.length === 0) {
    return option.values.filter(
      (value) => typeof value === 'string'
    ) as string[];
  }

  const matches = product.variants?.values.filter((variant) => {
    const hasAllSelectedValues = selectedValues?.every((value) =>
      variant?.values.includes(value)
    );
    return hasAllSelectedValues;
  });

  const allowedValues = matches
    ?.flatMap((variant) => variant?.values)
    .filter((value) => !!value && option.values.includes(value))
    .filter((value) => typeof value === 'string') as string[];

  return allowedValues;
};
