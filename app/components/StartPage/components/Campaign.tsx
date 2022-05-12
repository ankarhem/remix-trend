import React from 'react';
import { Link } from 'remix';
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
    <div className='grid lg:grid-cols-2 my-20'>
      <div
        className={`flex flex-col justify-center items-center ${
          alignment === 'left' ? 'order-1 lg:order-1' : 'order-1 lg:order-2'
        }`}
      >
        <h2 className='text-4xl mb-6 lg:mb-8 font-semibold'>{header}</h2>
        <p className='text-gray-500 text-xl mb-4 lg:mb-10'>{text}</p>
        <Link
          to={buttonLink}
          className='text-blue-400 border-2 border-blue-400 hover:bg-blue-400 hover:text-blue-50 rounded py-2 px-4 mb-8'
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
