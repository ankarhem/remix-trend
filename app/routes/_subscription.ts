import type { ActionFunction } from 'remix';
import { sendJetshopRequest } from '~/lib/jetshop';

export interface SubscriptionData {
  email: string;
}

export const action: ActionFunction = async (args) => {
  const body = await args.request.formData();
  const email = body.get('email');

  console.log(email);

  return email;
};
