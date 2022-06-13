import { Link, useLoaderData, useFetcher } from 'remix';
import type { LayoutQueries } from '~/routes/__layout';
import type { SubscriptionData } from '~/routes/_subscription';

function NewsletterSubscriptionForm() {
  const { data, state, Form } = useFetcher<SubscriptionData>();
  const disabled = state === 'loading';
  const alreadySubscribed = data?.error?.message === 'AlreadySubscribed';

  return (
    <>
      <h2 className="text-gray-700 font-bold text-md uppercase mb-4 md:text-right">
        Join our newsletter
      </h2>

      <div className="flex flex-col">
        <Form
          method="post"
          action="/_subscription"
          className="flex flex-col md:flex-row md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center"
        >
          <div className="relative">
            <input type="hidden" name="_subscriptionType" value="newsletter" />
            <input
              type="email"
              className="rounded flex-1 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base hover:ring-gray-500/50 focus:ring-gray-500 hover:ring focus:ring-1 focus:hover:ring focus:border-gray-500 aria-disabled:bg-gray-100/95 aria-disabled:cursor-not-allowed"
              placeholder="Email"
              name="email"
              required
              disabled={disabled}
              aria-disabled={disabled}
            />
          </div>
          <button
            className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-gray-500 rounded shadow-md hover:bg-gray-600 focus:outline-none focus:ring-1 focus:hover:ring focus:ring-gray-600 aria-disabled:bg-gray-100/95 aria-disabled:cursor-not-allowed"
            type="submit"
            disabled={disabled}
            aria-disabled={disabled}
          >
            Subscribe
          </button>
        </Form>
        {alreadySubscribed && (
          <p className="text-sm pt-1">
            You're already a subscriber to our newsletter.
          </p>
        )}
        {data?.error?.message === 'Unknown error' && (
          <p className="text-sm pt-1">
            Something went wrong on our end. Please try again.
          </p>
        )}
        {data?.subscribed && (
          <p className="text-sm pt-1">
            You are now subscribed to our newsletter.
          </p>
        )}
      </div>
    </>
  );
}

function Footer() {
  const { pages } = useLoaderData<LayoutQueries>();
  return (
    <footer className="bg-white mt-6 py-8">
      <div className="container grid mx-auto grid-cols-2 md:grid-cols-3 pb-20 justify-items-center md:justify-items-start gap-y-6">
        <section>
          <h2 className="text-gray-700 text-md uppercase mb-4 font-bold">
            Remix Store
          </h2>
          <ul>
            {pages.map((page) => {
              if (!page?.primaryRoute) return null;
              return (
                <li
                  key={page.id}
                  className="mb-2 text-gray-500 hover:text-blue-400 transition-colors duration-200"
                >
                  <Link to={page.primaryRoute.path} prefetch="intent">
                    {page.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
        <section>
          <h2 className="text-gray-700 font-bold text-md uppercase mb-4">
            Address
          </h2>
          <address className="text-gray-500">
            <p>Företagsgatan 58</p>
            <p>501 77 Borås</p>
            <p>Sweden</p>
          </address>
        </section>
        <section className="md:justify-self-end col-span-full md:col-span-1 w-full flex flex-col items-center md:items-end">
          <NewsletterSubscriptionForm />
        </section>
      </div>
      <div className="pt-8 flex border-t border-gray-200 max-w-xs mx-auto items-center justify-center gap-6">
        <button aria-label="Go to facebook">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="text-xl hover:text-gray-800 transition-colors duration-200"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z"></path>
          </svg>
        </button>
        <button aria-label="Go to twitter">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="text-xl hover:text-gray-800 transition-colors duration-200"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1684 408q-67 98-162 167 1 14 1 42 0 130-38 259.5t-115.5 248.5-184.5 210.5-258 146-323 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5t-114-159.5q33 5 61 5 43 0 85-11-112-23-185.5-111.5t-73.5-205.5v-4q68 38 146 41-66-44-105-115t-39-154q0-88 44-163 121 149 294.5 238.5t371.5 99.5q-8-38-8-74 0-134 94.5-228.5t228.5-94.5q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z"></path>
          </svg>
        </button>
        <button aria-label="Go to instagram">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                fillRule="nonzero"
                d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6.5-.25a1.25 1.25 0 0 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM12 4c-2.474 0-2.878.007-4.029.058-.784.037-1.31.142-1.798.332-.434.168-.747.369-1.08.703a2.89 2.89 0 0 0-.704 1.08c-.19.49-.295 1.015-.331 1.798C4.006 9.075 4 9.461 4 12c0 2.474.007 2.878.058 4.029.037.783.142 1.31.331 1.797.17.435.37.748.702 1.08.337.336.65.537 1.08.703.494.191 1.02.297 1.8.333C9.075 19.994 9.461 20 12 20c2.474 0 2.878-.007 4.029-.058.782-.037 1.309-.142 1.797-.331.433-.169.748-.37 1.08-.702.337-.337.538-.65.704-1.08.19-.493.296-1.02.332-1.8.052-1.104.058-1.49.058-4.029 0-2.474-.007-2.878-.058-4.029-.037-.782-.142-1.31-.332-1.798a2.911 2.911 0 0 0-.703-1.08 2.884 2.884 0 0 0-1.08-.704c-.49-.19-1.016-.295-1.798-.331C14.925 4.006 14.539 4 12 4zm0-2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2z"
              />
            </g>
          </svg>
        </button>
      </div>
      <div className="text-center pt-10 sm:pt-12 font-light flex items-center justify-center text-gray-700">
        Powered by Jetshop
      </div>
    </footer>
  );
}

export default Footer;
