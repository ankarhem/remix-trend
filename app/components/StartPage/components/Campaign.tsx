import React from 'react';
import { Link } from '@remix-run/react';
import { z } from 'zod';

const CampaignSchema = z.object({
  header: z.string(),
  alignment: z.enum(['right', 'left']),
  buttonLink: z.string(),
  buttonText: z.string(),
  imageSrc: z.object({
    value: z.string(),
  }),
  text: z.string(),
});

function Campaign({
  header,
  text,
  alignment,
  buttonLink,
  buttonText,
  imageSrc,
}: z.infer<typeof CampaignSchema>) {
  return (
    <div className='grid my-20 lg:grid-cols-2'>
      <div
        className={`flex flex-col justify-center items-center ${
          alignment === 'left' ? 'order-1 lg:order-1' : 'order-1 lg:order-2'
        }`}
      >
        <h2 className='mb-6 text-4xl font-semibold lg:mb-8'>{header}</h2>
        <p className='mb-4 text-xl text-gray-500 lg:mb-10'>{text}</p>
        <Link
          to={buttonLink}
          className='px-4 py-2 mb-8 text-blue-400 border-2 border-blue-400 rounded hover:bg-blue-400 hover:text-blue-50'
        >
          {buttonText}
        </Link>
      </div>
      <div
        className={`relative w-full ${
          alignment === 'left'
            ? 'order-2 lg:order-2 lg:translate-x-4'
            : 'order-2 lg:order-1 lg:-translate-x-4'
        }`}
      >
        <img
          src={imageSrc.value}
          alt='campaign'
          className={`block rounded-xl object-cover aspect-video w-full`}
        />
      </div>
    </div>
  );
}

export default Object.assign(Campaign, {
  schema: CampaignSchema,
});
