import React from 'react';
import { Link } from 'remix';
import { z } from 'zod';

const HeroSchema = z.object({
  header: z.string(),
  text: z.string().optional(),
  imageSrc: z.string(),
  buttonLink: z.string().optional(),
  buttonText: z.string().optional(),
  isAboveFold: z.boolean().optional(),
});

function Hero(props: unknown) {
  const { header, text, imageSrc, buttonLink, buttonText, isAboveFold } =
    HeroSchema.parse(props);

  return (
    <div className='w-full relative'>
      <img
        src={imageSrc}
        alt='hero'
        className='object-cover aspect-video w-full'
        loading={isAboveFold ? 'eager' : 'lazy'}
      />

      <div className='absolute inset-0 flex flex-col items-start justify-center from-blue-700/90 to-transparent bg-gradient-to-br'>
        <div className='p-4'>
          <h2 className='text-white text-3xl font-bold mb-8'>{header}</h2>
          {text && (
            <p className='text-gray-50 text-lg font-medium mb-8'>{text}</p>
          )}
          {buttonLink && buttonText && (
            <Link
              to={buttonLink}
              className='bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800'
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

export default Hero;
