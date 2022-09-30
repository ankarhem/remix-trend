import { Response } from "@remix-run/node";
import type { TypedResponse } from "@remix-run/node";
import { type DataFunctionArgs, json, type Session } from "@remix-run/node";
import { badRequest, serverError } from "remix-utils";
import { commitSession, getSession } from "~/cookies";
import type { AddMultipleToCartMutation } from "~/graphql/types";
import {
  type AddToCartMutation,
  ProductVariantsDocument,
  AddMultipleToCartDocument,
} from "~/graphql/types";
import { AddToCartDocument } from "~/graphql/types";
import { sendJetshopRequest, type StoreAPIResponse } from "~/lib/jetshop";
import { ProductType } from "~/lib/utils/product";
import { arraysEqual } from "~/utils/common";

const setCartIdAndReturnData = async (
  session: Session,
  cart: StoreAPIResponse<AddToCartMutation | AddMultipleToCartMutation>
) => {
  const data =
    (cart as StoreAPIResponse<AddToCartMutation>)?.data?.addToCart ||
    (cart as StoreAPIResponse<AddMultipleToCartMutation>)?.data
      ?.addMultipleToCart;
  const newCartId = data?.cart?.id;

  if (!newCartId) {
    throw badRequest({ message: "Invalid cart id returned" });
  }

  session.set("cartId", newCartId);

  return json(cart, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

const getVariantFromOptions = async ({
  args,
  articleNumber,
  variantValues,
}: {
  args: DataFunctionArgs;
  articleNumber: string;
  variantValues: string[] | FormDataEntryValue[];
}) => {
  const productResult = await sendJetshopRequest({
    args,
    query: ProductVariantsDocument,
    variables: {
      articleNumber: articleNumber,
    },
  }).then((res) => res.json());

  const variant = productResult.data?.product?.variants?.values?.find(
    (variant) => {
      if (!variant?.values) return false;

      if (variant.values.length !== variantValues.length) {
        throw badRequest({
          errors: [
            {
              message: "Invalid variant combination selected",
            },
          ],
        });
      }
      return arraysEqual(variant.values, variantValues);
    }
  );

  return variant;
};

export const action = async (
  args: DataFunctionArgs
): Promise<TypedResponse<StoreAPIResponse<AddToCartMutation>>> => {
  const cookieHeader = args.request.headers.get("Cookie");
  const session = await getSession(cookieHeader);
  const cartId = session.get("cartId");
  const formData = await args.request.formData();

  const articleNumber = formData.get("_articleNumber");

  try {
    if (typeof articleNumber !== "string") {
      throw badRequest({
        errors: [{ message: "Invalid article number" }],
      });
    }
    switch (formData.get("_productType")) {
      case ProductType.Basic: {
        const cartResult = await sendJetshopRequest({
          args,
          query: AddToCartDocument,
          variables: {
            input: {
              cartId: cartId,
              articleNumber: articleNumber,
            },
          },
        });

        const cart = await cartResult.json();
        return setCartIdAndReturnData(session, cart);
      }
      case ProductType.Variant: {
        const variantValues = [
          formData.get("_variantOption_0"),
          formData.get("_variantOption_1"),
        ].filter(Boolean) as FormDataEntryValue[];

        const variant = await getVariantFromOptions({
          args,
          articleNumber,
          variantValues,
        });

        if (!variant) {
          throw badRequest({
            errors: [{ message: "No purchasable variant found" }],
          });
        }

        const cartResult = await sendJetshopRequest({
          args,
          query: AddToCartDocument,
          variables: {
            input: {
              cartId: cartId,
              articleNumber: variant.articleNumber,
            },
          },
        });

        const cart = await cartResult.json();
        return setCartIdAndReturnData(session, cart);
      }

      case ProductType.Configuration: {
        const configurationIds = formData.getAll("_configurationId");

        const cartResult = await sendJetshopRequest({
          args,
          query: AddToCartDocument,
          variables: {
            input: {
              cartId: cartId,
              articleNumber: formData.get("_articleNumber") as string,
              configurationIds: configurationIds as string[],
            },
          },
        });

        const cart = await cartResult.json();
        return setCartIdAndReturnData(session, cart);
      }
      case ProductType.Package: {
        const basicProducts = formData
          .getAll("_BasicProduct")
          .map((articleNumber) => ({ articleNumber: articleNumber as string }));

        /**
         *
         * Since we can't guarantee order we need to do this
         * and then sort the array by the index
         *
         * {
         *   "articleNumber": {
         *     0: "value",
         *   }
         * }
         */
        const variantProductOptions: Map<
          string,
          Map<number, string>
        > = new Map();

        for (const [name, value] of formData.entries()) {
          if (!name.startsWith("_packageVariantOption_")) continue;

          if (typeof value !== "string") {
            throw badRequest({
              errors: [{ message: `Invalid selection` }],
            });
          }

          // _packageVariantOption_<articleNumber>_<index>
          const [, , articleNumber, index] = name.split("_");
          if (!variantProductOptions.has(articleNumber)) {
            variantProductOptions.set(articleNumber, new Map());
          }
          const currentValues = variantProductOptions.get(articleNumber);
          currentValues?.set(parseInt(index), value);
        }

        const variantProducts = await Promise.all(
          Array.from(variantProductOptions.entries()).map(
            async ([key, value]) => {
              // Sort the values by the index
              const values = [...value.entries()]
                .sort()
                .map(([, value]) => value);
              const variant = await getVariantFromOptions({
                args,
                articleNumber: key,
                variantValues: values,
              });

              if (!variant) {
                throw badRequest({
                  errors: [
                    {
                      message: `No purchaseable variant found for articleNumber: ${key}`,
                    },
                  ],
                });
              }

              return variant;
            }
          )
        );

        const cartResult = await sendJetshopRequest({
          args,
          query: AddMultipleToCartDocument,
          variables: {
            cartId: cartId,
            items: [
              ...basicProducts,
              ...variantProducts.map((v) => ({
                articleNumber: v.articleNumber,
              })),
            ],
          },
        });

        const cart = await cartResult.json();
        return setCartIdAndReturnData(session, cart);
      }
      default: {
        throw badRequest({
          errors: [{ message: "Invalid product type" }],
        });
      }
    }
  } catch (e) {
    if (e instanceof Response) {
      return e;
    }
    return serverError({
      errors: [{ message: "Something went wrong" }],
    });
  }
};
