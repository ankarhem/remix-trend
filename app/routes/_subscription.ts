import type { ActionFunction } from 'remix';
import type { Mutation } from '~/graphql/types';
import { sendJetshopRequest } from '~/lib/jetshop';

enum SubscriptionType {
  Newsletter = 'newsletter',
}

export type SubscriptionData = Mutation['subscribeToNewsletter'] & {
  error: {
    message: string;
  };
};

const getErrorDetail = (error: unknown): string => {
  if (Array.isArray(error)) {
    return error[0].message;
  }
  return 'Unknown error';
};

const onError = (data: unknown) => {
  return {
    error: {
      message: getErrorDetail(data),
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

        const data = await response.json();

        // Response is not to consistent, meaning API will respond with a status 200 and subscribeToNewsletter null,
        // Therefor we need both try catch and still check if the response is a true/false or null.
        if (!data.subscribeToNewsletter) {
          return onError(data);
        }
      } catch (err) {
        return onError(err);
      }
    }
    default: {
      return { error: 'Unknown subscription type' };
    }
  }
};
