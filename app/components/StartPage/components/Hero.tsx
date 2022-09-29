import { Link } from '@remix-run/react';
import { z } from 'zod';

const HeroSchema = z.object({
  header: z.string(),
  text: z.string().optional(),
  imageSrc: z.object({
    value: z.string(),
    focalPointX: z.number().optional(),
    focalPointY: z.number().optional(),
  }),
  buttonLink: z.string().optional(),
  buttonText: z.string().optional(),
  isAboveFold: z.boolean(),
});

function Hero({
  header,
  text,
  imageSrc,
  buttonLink,
  buttonText,
  isAboveFold,
}: z.infer<typeof HeroSchema>) {
  return (
    <div className='relative w-full'>
      <img
        src={imageSrc.value}
        alt='hero'
        className='object-cover w-full aspect-video'
        loading={isAboveFold ? 'eager' : 'lazy'}
      />

      <div className='absolute inset-0 from-blue-700/90 to-transparent bg-gradient-to-br'>
        <div className='absolute max-w-sm p-4 text-center -translate-x-1/2 -translate-y-1/2 top-1/2 lg:top-1/3 left-1/2'>
          <h2 className='mb-8 text-5xl font-bold text-white lg:text-6xl'>
            {header}
          </h2>
          {text && (
            <p className='hidden mb-8 text-lg font-medium text-blue-50 lg:block'>
              {text}
            </p>
          )}
          {buttonLink && buttonText && (
            <Link
              to={buttonLink}
              className='px-4 py-2 font-bold text-blue-300 border-2 border-blue-400 rounded hover:bg-blue-400 hover:text-blue-50'
              role='button'
            >
              {buttonText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Object.assign(Hero, {
  // ErrorComponent: () => null,
  schema: HeroSchema,
});
