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
    <div className="relative w-full">
      <img
        src={imageSrc.value}
        alt="hero"
        className="aspect-video w-full object-cover"
        loading={isAboveFold ? 'eager' : 'lazy'}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-blue-700/90 to-transparent">
        <div className="absolute top-1/2 left-1/2 max-w-sm -translate-x-1/2 -translate-y-1/2 p-4 text-center lg:top-1/3">
          <h2 className="mb-8 text-5xl font-bold text-white lg:text-6xl">
            {header}
          </h2>
          {text && (
            <p className="mb-8 hidden text-lg font-medium text-blue-50 lg:block">
              {text}
            </p>
          )}
          {buttonLink && buttonText && (
            <Link
              to={buttonLink}
              className="rounded border-2 border-blue-400 px-4 py-2 font-bold text-blue-300 hover:bg-blue-400 hover:text-blue-50"
              role="button"
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
