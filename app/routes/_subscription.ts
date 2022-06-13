import type { ActionFunction } from 'remix';
import type { Mutation } from '~/graphql/types';
import { sendJetshopRequest } from '~/lib/jetshop';

enum SubscriptionType {
  Newsletter = 'newsletter',
  StockNotifications = 'stockNotifications',
}

export type SubscriptionData = {
  subscribed: Mutation['subscribeToNewsletter'] | null;
  error: {
    message: string;
  } | null;
};

const getErrorDetail = (errors: unknown): string => {
  if (Array.isArray(errors)) {
    return errors[0].message || 'Unknown error';
  }
  return 'Unknown error';
};

const onError = (error: unknown) => {
  return {
    subscribed: null,
    error: {
      message: getErrorDetail(error),
    },
  };
};

export const action: ActionFunction = async (args) => {
  const body = await args.request.formData();
  const email = body.get('email');

  switch (body.get('_subscriptionType')) {
    case SubscriptionType.Newsletter: {
      try {
        const response = await sendJetshopRequest({
          args,
          query: `mutation($email: String!) {
            subscribeToNewsletter(email: $email)
          }`,
          variables: {
            email,
          },
        });

        const { data, errors } = await response.json();

        // Response is not to consistent, meaning API will respond with a status 200 and subscribeToNewsletter null,
        // Which is why we need both try and if statements
        if (!data.subscribeToNewsletter) {
          return onError(errors);
        }

        return {
          subscribed: data.subscribeToNewsletter,
          error: null,
        };
      } catch (error) {
        return onError(error);
      }
    }
    default: {
      return onError(null);
    }
  }
};
