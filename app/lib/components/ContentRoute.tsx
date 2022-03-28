import React from 'react';

type Props<P> = {
  contentPage: React.FC<{ page: P }>;
  page: P;
};

function ContentRoute<P>({ contentPage: Component, page }: Props<P>) {
  return <Component page={page} />;
}

export default ContentRoute;
