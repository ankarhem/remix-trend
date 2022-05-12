import { z } from 'zod';

const HTMLContentSchema = z.object({
  html: z.string(),
});

const HTMLContent = ({ html }: z.infer<typeof HTMLContentSchema>) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};

export default HTMLContent;
