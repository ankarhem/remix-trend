import { Link } from 'remix';
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
    <div className='w-full relative'>
      <img
        src={imageSrc.value}
        alt='hero'
        className='object-cover aspect-video w-full'
        loading={isAboveFold ? 'eager' : 'lazy'}
      />

      <div className='absolute inset-0 from-blue-700/90 to-transparent bg-gradient-to-br'>
        <div className='p-4 absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center max-w-sm'>
          <h2 className='text-white text-6xl font-bold mb-8'>{header}</h2>
          {text && (
            <p className='text-blue-50 text-lg font-medium mb-8'>{text}</p>
          )}
          {buttonLink && buttonText && (
            <Link
              to={buttonLink}
              className='text-blue-300 font-bold py-2 px-4 rounded hover:bg-blue-400 hover:text-blue-50 border-blue-400 border-2'
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
