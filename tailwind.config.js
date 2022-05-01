const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // https://tailwind.ink?p=9.FAFCFCE4E8EEC1C9D0A2ABB78892A26B73855056693C40552B2E442B2E44F5FCFFD9EDFFACCFFC85ACF4758CEC5C66D2414AA6313B84262C62152041EEFDFECFF3FB8ED8E962BDE44D9DCE277FB51C5B921548760F3451082530F2FEEECFF7C991E39652D0803EB574288D60216B4418533A113B340A2627FBF9EAF6E4BAE7C07BDC9742CB7519AD51028933016C2706501A0F361206FEFAEEFCE2C0EFB586E78B5FD7664BB34434912728731620550F1C3B0B14FEF7F4FBE0DDF2AFB3EC798BDC5472BC326398184D73123F560E393B0427FEF7FFF8DDF4E8ADE1D882D9BF62CF9B47B274309557237E3D18672A0D53F8F9FEE7E5FCC6C0E9AE9DDE9B7AD87F58BE5F41994A2D7F36216420144C
    colors: {
      transparent: colors.transparent,
      white: colors.white,
      black: colors.black,
      gray: {
        50: '#FAFCFC',
        100: '#E4E8EE',
        200: '#C1C9D0',
        300: '#A2ABB7',
        400: '#8892A2',
        500: '#6B7385',
        600: '#505669',
        700: '#3C4055',
        800: '#2B2E44',
        900: '#2B2E44',
      },
      blue: {
        50: '#F5FCFF',
        100: '#D9EDFF',
        200: '#ACCFFC',
        300: '#85ACF4',
        400: '#758CEC',
        500: '#5C66D2',
        600: '#414AA6',
        700: '#313B84',
        800: '#262C62',
        900: '#152041',
      },
      teal: {
        50: '#EEFDFE',
        100: '#CFF3FB',
        200: '#8ED8E9',
        300: '#62BDE4',
        400: '#4D9DCE',
        500: '#277FB5',
        600: '#1C5B92',
        700: '#154876',
        800: '#0F3451',
        900: '#082530',
      },
      emerald: {
        50: '#F2FEEE',
        100: '#CFF7C9',
        200: '#91E396',
        300: '#52D080',
        400: '#3EB574',
        500: '#288D60',
        600: '#216B44',
        700: '#18533A',
        800: '#113B34',
        900: '#0A2627',
      },
      orange: {
        50: '#FBF9EA',
        100: '#F6E4BA',
        200: '#E7C07B',
        300: '#DC9742',
        400: '#CB7519',
        500: '#AD5102',
        600: '#893301',
        700: '#6C2706',
        800: '#501A0F',
        900: '#361206',
      },
      chestnut: {
        50: '#FEFAEE',
        100: '#FCE2C0',
        200: '#EFB586',
        300: '#E78B5F',
        400: '#D7664B',
        500: '#B34434',
        600: '#912728',
        700: '#731620',
        800: '#550F1C',
        900: '#3B0B14',
      },
      cerise: {
        50: '#FEF7F4',
        100: '#FBE0DD',
        200: '#F2AFB3',
        300: '#EC798B',
        400: '#DC5472',
        500: '#BC3263',
        600: '#98184D',
        700: '#73123F',
        800: '#560E39',
        900: '#3B0427',
      },
      purple: {
        50: '#FEF7FF',
        100: '#F8DDF4',
        200: '#E8ADE1',
        300: '#D882D9',
        400: '#BF62CF',
        500: '#9B47B2',
        600: '#743095',
        700: '#57237E',
        800: '#3D1867',
        900: '#2A0D53',
      },
      indigo: {
        50: '#F8F9FE',
        100: '#E7E5FC',
        200: '#C6C0E9',
        300: '#AE9DDE',
        400: '#9B7AD8',
        500: '#7F58BE',
        600: '#5F4199',
        700: '#4A2D7F',
        800: '#362164',
        900: '#20144C',
      },
    },
    extend: {
      animation: {
        slideLeft: 'slideLeft 20s linear infinite',
      },
      keyframes: {
        slideLeft: {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(-100%)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
