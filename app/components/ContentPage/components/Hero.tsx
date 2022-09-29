import { Link } from '@remix-run/react';
import { z } from 'zod';

const HeroSchema = z.object({
  header: z.string(),
  text: z.string().optional(),
  imageSrc: z.string(),
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
        src={imageSrc}
        alt='hero'
        className='object-cover w-full aspect-video'
        loading={isAboveFold ? 'eager' : 'lazy'}
      />

      <div className='absolute inset-0 flex flex-col items-start justify-center from-blue-700/90 to-transparent bg-gradient-to-br'>
        <div className='p-4'>
          <h2 className='mb-8 text-3xl font-bold text-white'>{header}</h2>
          {text && (
            <p className='mb-8 text-lg font-medium text-gray-50'>{text}</p>
          )}
          {buttonLink && buttonText && (
            <Link
              to={buttonLink}
              className='px-4 py-2 font-bold text-white bg-blue-700 rounded hover:bg-blue-800'
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
