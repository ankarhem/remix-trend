import {
  type DataFunctionArgs,
  json,
  type Session,
} from "@remix-run/server-runtime";
import { badRequest } from "remix-utils";
import { commitSession, getSession } from "~/cookies";
import {
  type AddToCartMutation,
  ProductVariantsDocument,
} from "~/graphql/types";
import { AddToCartDocument } from "~/graphql/types";
import { sendJetshopRequest, type StoreAPIResponse } from "~/lib/jetshop";
import { ProductType } from "~/lib/utils/product";
import { arraysEqual } from "~/utils/common";

export type CartActionData = {
  cart?: NonNullable<AddToCartMutation["addToCart"]>["cart"];
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
};

const setCartIdAndReturnData = async (
  session: Session,
  cart: StoreAPIResponse<AddToCartMutation>
) => {
  const newCartId = cart.data?.addToCart?.cart?.id;

  if (!newCartId) {
    throw badRequest({ message: "Invalid cart id returned" });
  }

  session.set("cartId", newCartId);

  return json<CartActionData>(
    { cart: cart?.data?.addToCart?.cart },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};

export const action = async (args: DataFunctionArgs) => {
  const cookieHeader = args.request.headers.get("Cookie");
  const session = await getSession(cookieHeader);
  const cartId = session.get("cartId");
  const formData = await args.request.formData();

  // try {
  switch (formData.get("_productType")) {
    case ProductType.Variant:
    case ProductType.Basic: {
      const variantValues = [
        formData.get("_variantOption_0"),
        formData.get("_variantOption_1"),
      ];
      const articleNumber = formData.get("_articleNumber");

      if (typeof articleNumber !== "string") {
        throw badRequest({ message: "Invalid article number" });
      }

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
          console.log(variant.values, variantValues);
          return arraysEqual(variant.values, variantValues);
        }
      );

      if (!variant) {
        // Should probably find out what the issue is
        // and return error message if out of stock etc.
        throw badRequest({ message: "Invalid variant" });
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
    default:
      return {
        error: {
          name: "InvalidProductType",
          message: "The product type could not be determined",
        },
      };
  }
};
