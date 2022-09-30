import {
  type DataFunctionArgs,
  json,
  type Session,
} from "@remix-run/server-runtime";
import { badRequest } from "remix-utils";
import { commitSession, getSession } from "~/cookies";
import type { AddToCartMutation, Cart } from "~/graphql/types";
import { AddToCartDocument } from "~/graphql/types";
import { sendJetshopRequest, type StoreAPIResponse } from "~/lib/jetshop";
import { ProductType } from "~/lib/utils/product";

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
      const cartResult = await sendJetshopRequest({
        args,
        query: AddToCartDocument,
        variables: {
          input: {
            cartId: cartId,
            articleNumber: formData.get("_articleNumber") as string,
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
