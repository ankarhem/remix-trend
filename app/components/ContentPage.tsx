import React from 'react';
import { RoutePage } from '~/utils/types';

type Props = {
  page: RoutePage;
};

function ContentPage({ page }: Props) {
  return <div>ContentPage: {page.name}</div>;
}

export default ContentPage;
