import { useMemo } from "react";
import type { RouteProduct } from "~/utils/types";
import { useTransitionalParams } from "./useTransitionalParams";

export enum ProductType {
  Basic = "Basic",
  Variant = "Variant",
  Package = "Package",
  Configuration = "Configuration",
}

export const getProductType: (
  product: Pick<RouteProduct, "hasVariants" | "isPackage" | "hasConfigurations">
) => ProductType = (product) => {
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
