import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `DateTime` scalar type represents a date and time. `DateTime` expects timestamps to be formatted in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
  DateTime: any;
  Decimal: any;
  /** The `Paging` scalar type represents a numeric values between <1; 100> */
  Paging: any;
  Uri: any;
};

export type ActivateExternalCustomerByIdInput = {
  externalCustomerId: Scalars['String'];
};

export type ActivateExternalCustomerByIdResult = {
  success: Scalars['Boolean'];
  token?: Maybe<Token>;
};

export type ActivateExternalCustomerByTokenInput = {
  externalCustomerToken: Scalars['String'];
};

export type ActivateExternalCustomerByTokenResult = {
  customer?: Maybe<ExternalCustomer>;
  success: Scalars['Boolean'];
};

export enum ActivationStatusSource {
  ActivationRequired = 'ACTIVATION_REQUIRED',
  AdditionalUserDataRequired = 'ADDITIONAL_USER_DATA_REQUIRED',
  CountryNotValid = 'COUNTRY_NOT_VALID',
  NonExistingCustomer = 'NON_EXISTING_CUSTOMER',
  PreexistingCustomer = 'PREEXISTING_CUSTOMER'
}

export type AddMultipleToCartInput = {
  articleNumber: Scalars['String'];
  comments?: InputMaybe<Array<InputMaybe<InputComment>>>;
  configurationIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  preOrderDate?: InputMaybe<Scalars['DateTime']>;
  /** Default value is 1. */
  quantity?: InputMaybe<Scalars['Int']>;
};

export type AddToCartInput = {
  articleNumber: Scalars['String'];
  /** Not specifying cart id will create new cart. */
  cartId?: InputMaybe<Scalars['String']>;
  comments?: InputMaybe<Array<InputMaybe<InputComment>>>;
  configurationIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  preOrderDate?: InputMaybe<Scalars['DateTime']>;
  /** Default value is 1. */
  quantity?: InputMaybe<Scalars['Int']>;
};

export type AddToCustomerProductListInput = {
  articleNumber: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Int']>;
};

export type AlternateRoute = {
  alias?: Maybe<Scalars['String']>;
  channelId?: Maybe<Scalars['Int']>;
  culture?: Maybe<Scalars['String']>;
  route?: Maybe<Scalars['String']>;
};

export type BoolValue = {
  value?: Maybe<Scalars['Boolean']>;
};

export type BooleanFilter = Filter & {
  default?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  name: Scalars['String'];
};

export type BooleanFilterInput = {
  id: Scalars['String'];
  /** null is equivalent to excluding the filter. */
  value?: InputMaybe<Scalars['Boolean']>;
};

export type BusinessCustomer = Customer & {
  billingAddress?: Maybe<CustomerAddress>;
  communication?: Maybe<CustomerCommunication>;
  deliveryAddresses?: Maybe<Array<Maybe<CustomerAddress>>>;
  dynamicContent?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  externalAttributes?: Maybe<Array<Maybe<CustomerExternalAttribute>>>;
  /** Customer id for external system */
  externalId?: Maybe<Scalars['String']>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  googleUserId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  language?: Maybe<Language>;
  memberId?: Maybe<Scalars['String']>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  orderHeaders?: Maybe<OrderHeaderResult>;
  /** @deprecated Use `organizationNumber` instead. */
  organizationId?: Maybe<Scalars['String']>;
  organizationNumber?: Maybe<Scalars['String']>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  store?: Maybe<Store>;
  /** @deprecated Use communication.acceptsEmail */
  subscribedToNewsletter?: Maybe<Scalars['Boolean']>;
};


export type BusinessCustomerOrderHeadersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type Cart = {
  aggregatedDiscounts?: Maybe<Array<Maybe<Discount>>>;
  discountTotal?: Maybe<Price>;
  externalCheckoutUrl?: Maybe<Scalars['Uri']>;
  id?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<CartItem>>>;
  productPreviousTotal?: Maybe<Price>;
  productTotal?: Maybe<Price>;
  totalQuantity?: Maybe<Scalars['Int']>;
};

export type CartItem = {
  articleNumber: Scalars['String'];
  configurations?: Maybe<Array<Maybe<SelectedProductConfiguration>>>;
  customerComments?: Maybe<Array<Maybe<CartItemComment>>>;
  /** Discount total */
  discount?: Maybe<Price>;
  discounts?: Maybe<Array<Maybe<Discount>>>;
  id: Scalars['String'];
  /** @deprecated Please use images on product instead. */
  images?: Maybe<Array<Maybe<ProductImage>>>;
  preOrderDate?: Maybe<Scalars['DateTime']>;
  /** Total price, excluding discounts */
  previousTotal: Price;
  /** Unit price, excluding discounts */
  previousUnitPrice: Price;
  product?: Maybe<Product>;
  quantity: Scalars['Int'];
  subHeading?: Maybe<Scalars['String']>;
  /** Total price, including discounts */
  total: Price;
  /** Unit price, including discounts */
  unitPrice: Price;
  variant?: Maybe<ProductVariant>;
  variantOptionNames?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CartItemComment = {
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type CartMutation = {
  cart?: Maybe<Cart>;
};

export type Category = Document & {
  /** The time interval of the campaign/category */
  activeDateSpan?: Maybe<CategoryActiveDateSpan>;
  breadcrumbText?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  /** Get content data set via the Content Editor.NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  data?: Maybe<Content>;
  externalDiscountId?: Maybe<Scalars['String']>;
  externalId?: Maybe<Scalars['String']>;
  hasSubcategories?: Maybe<Scalars['Boolean']>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  head?: Maybe<HtmlHead>;
  id: Scalars['Int'];
  images?: Maybe<Array<Maybe<CategoryImage>>>;
  /** A dynamic category has no fixed products; products are dynamically included based on filters defined on the category in Admin. N.B. Products found on a dynamic category has no route that includes said category, instead product.primaryRoute will have to be used. */
  isDynamic: Scalars['Boolean'];
  /**
   * Whether or not this category and all its children are considered hidden
   * @deprecated This field should no longer be used and will always be false.
   */
  isHidden: Scalars['Boolean'];
  level: Scalars['Int'];
  /** When empty will display the value of the name field */
  mainHeader?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  parent?: Maybe<Category>;
  /** @deprecated Use parent instead */
  parentCategory?: Maybe<Category>;
  /** @deprecated Use parent.id instead */
  parentId?: Maybe<Scalars['Int']>;
  /** The primary route of this Category. NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  primaryRoute?: Maybe<Route>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  products?: Maybe<PagedResult>;
  subcategories?: Maybe<Array<Maybe<Category>>>;
};


export type CategoryProductsArgs = {
  filters?: InputMaybe<FilterInput>;
  first?: InputMaybe<Scalars['Paging']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProductOrderOptions>;
  orderByDirection?: InputMaybe<SortDirection>;
};

export type CategoryActiveDateSpan = {
  endDate?: Maybe<Scalars['DateTime']>;
  startDate?: Maybe<Scalars['DateTime']>;
};

export type CategoryAutoCompleteResult = {
  result?: Maybe<Array<Maybe<Category>>>;
};

export type CategoryImage = {
  height?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['Uri']>;
  width?: Maybe<Scalars['Int']>;
};

export type CategorySearchResult = {
  result?: Maybe<Array<Maybe<Category>>>;
  totalResults?: Maybe<Scalars['Int']>;
};

export type ChangeByOneItemQuantityInput = {
  cartId: Scalars['String'];
  itemId: Scalars['String'];
};

/** Every channel has its own URL and can have different design, selection of products, prices and own settings for example shipping and payment. */
export type Channel = {
  countries?: Maybe<Array<Maybe<Country>>>;
  currencies?: Maybe<Array<Maybe<Currency>>>;
  defaultCurrency?: Maybe<Currency>;
  defaultLanguage?: Maybe<Language>;
  displayName?: Maybe<Scalars['String']>;
  groupName?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  /** The root url of images, this can be used to build image urls if needed. */
  imageUrl?: Maybe<Scalars['String']>;
  isDefault?: Maybe<Scalars['Boolean']>;
  languages?: Maybe<Array<Maybe<Language>>>;
  name?: Maybe<Scalars['String']>;
  /** This channel requires a user to be authorized. */
  requiresAuth?: Maybe<Scalars['Boolean']>;
  settings?: Maybe<ChannelSettings>;
  url?: Maybe<Scalars['Uri']>;
};

export type ChannelSettings = {
  countrySettings?: Maybe<Array<Maybe<CountrySettings>>>;
  nostoAccountId?: Maybe<Scalars['String']>;
  pricesIncVat?: Maybe<Scalars['Boolean']>;
  tracking?: Maybe<Tracking>;
};

export type Consent = {
  id: Scalars['ID'];
  isMandatory?: Maybe<Scalars['Boolean']>;
  linkText?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  page?: Maybe<Page>;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Content = {
  id: Scalars['ID'];
  items?: Maybe<Array<Maybe<ContentItem>>>;
};

export type ContentItem = {
  children?: Maybe<Array<Maybe<ContentItem>>>;
  properties?: Maybe<Array<Maybe<ContentItemProperty>>>;
  type: Scalars['String'];
};


export type ContentItemPropertiesArgs = {
  getImageAsImageValue?: InputMaybe<Scalars['Boolean']>;
};

export type ContentItemProperty = {
  name: Scalars['String'];
  type: Scalars['String'];
  value?: Maybe<ContentItemPropertyValue>;
  valueType?: Maybe<ContentPropertyValueType>;
};

export type ContentItemPropertyValue = BoolValue | Category | ImageValue | Product | StringValue;

export enum ContentPropertyValueType {
  Object = 'OBJECT',
  Scalar = 'SCALAR'
}

export type Coordinates = {
  latitude: Scalars['Decimal'];
  longitude: Scalars['Decimal'];
};

export type Country = {
  code?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isDefault?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
};

export type CountrySettings = {
  /**
   * NB: Carries a performance cost, as asking for this will result in a separate API call in the backend.
   *
   * This will use localization, and will work well when requesting one `channel`, but may give unpredictable results when getting multiple channels via `channels`
   */
  businessCustomerConsents?: Maybe<Array<Maybe<Consent>>>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  businessCustomerFields?: Maybe<Array<Maybe<CustomerField>>>;
  countryCode: Scalars['String'];
  paymentTypes?: Maybe<Array<Maybe<PaymentType>>>;
  /**
   * NB: Carries a performance cost, as asking for this will result in a separate API call in the backend.
   *
   * This will use localization, and will work well when requesting one `channel`, but may give unpredictable results when getting multiple channels via `channels`
   */
  privateCustomerConsents?: Maybe<Array<Maybe<Consent>>>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  privateCustomerFields?: Maybe<Array<Maybe<CustomerField>>>;
  shipping?: Maybe<Shipping>;
};

export type CreateCustomerProductListInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  /** The type of list created. Omit this and the default type will be used. */
  typeId?: InputMaybe<Scalars['Int']>;
};

export type Currency = {
  format?: Maybe<CurrencyFormat>;
  id: Scalars['String'];
  isDefault?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
};

export type CurrencyFormat = {
  code: Scalars['String'];
  /** @deprecated For currency formatting to a specific culture, instead use whichever culture makes sense contextually. */
  culture: Scalars['String'];
  decimals: Scalars['Int'];
};

export type CustomBoolField = CustomField & {
  key?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<ProductCustomFieldType>;
  value: Scalars['Boolean'];
};

export type CustomField = {
  key?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<ProductCustomFieldType>;
};

export type CustomHtmlField = CustomField & {
  key?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<ProductCustomFieldType>;
  value: Scalars['String'];
};

export type CustomItem = {
  content?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  image?: Maybe<Image>;
  linkUrl?: Maybe<Scalars['Uri']>;
  name: Scalars['String'];
};

export type CustomListField = CustomField & {
  key?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<ProductCustomFieldType>;
  value?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CustomMultiLevelListField = CustomField & {
  items?: Maybe<Array<Maybe<CustomMultiLevelListFieldItem>>>;
  key?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<ProductCustomFieldType>;
};

export type CustomMultiLevelListFieldItem = {
  id: Scalars['Int'];
  parentId?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  value: Scalars['String'];
};

export type CustomStringField = CustomField & {
  key?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<ProductCustomFieldType>;
  value: Scalars['String'];
};

export type Customer = {
  billingAddress?: Maybe<CustomerAddress>;
  communication?: Maybe<CustomerCommunication>;
  deliveryAddresses?: Maybe<Array<Maybe<CustomerAddress>>>;
  dynamicContent?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  externalAttributes?: Maybe<Array<Maybe<CustomerExternalAttribute>>>;
  /** Customer id for external system */
  externalId?: Maybe<Scalars['String']>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  googleUserId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  language?: Maybe<Language>;
  memberId?: Maybe<Scalars['String']>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  orderHeaders?: Maybe<OrderHeaderResult>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  store?: Maybe<Store>;
  /** @deprecated Use communication.acceptsEmail */
  subscribedToNewsletter?: Maybe<Scalars['Boolean']>;
};


export type CustomerOrderHeadersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type CustomerAddress = {
  addressName?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  co?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  companyAtt?: Maybe<Scalars['String']>;
  country?: Maybe<Country>;
  department?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  lastName?: Maybe<Scalars['String']>;
  mobilePhone?: Maybe<Scalars['String']>;
  municipality?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  streetName?: Maybe<Scalars['String']>;
};

export type CustomerCommunication = {
  acceptsEmail?: Maybe<Scalars['Boolean']>;
  acceptsPostal?: Maybe<Scalars['Boolean']>;
  acceptsSms?: Maybe<Scalars['Boolean']>;
};

export type CustomerExternalAttribute = {
  name: Scalars['String'];
  value: Scalars['String'];
};

export type CustomerField = {
  fields?: Maybe<Array<Maybe<CustomerField>>>;
  id: Scalars['ID'];
  name: Scalars['ID'];
  pattern?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
};

export type CustomerLoyalty = {
  bonusChecks?: Maybe<Array<Maybe<CustomerLoyaltyBonusCheck>>>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  bonusPoints?: Maybe<CustomerLoyaltyBonusPoints>;
  discounts?: Maybe<Array<Maybe<CustomerLoyaltyDiscount>>>;
  pointCards?: Maybe<Array<Maybe<CustomerLoyaltyPointCard>>>;
};


export type CustomerLoyaltyDiscountsArgs = {
  includeRedeemed?: Scalars['Boolean'];
};

export type CustomerLoyaltyBonusCheck = {
  /** For display purposes, not guaranteed to match up with a currency on the channel. */
  currency?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['DateTime']>;
  externalId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  redeemed?: Maybe<Scalars['Boolean']>;
  redeemedOn?: Maybe<Scalars['DateTime']>;
  startDate?: Maybe<Scalars['DateTime']>;
  value?: Maybe<Scalars['Decimal']>;
};

export type CustomerLoyaltyBonusPoints = {
  points?: Maybe<Scalars['Int']>;
};

export type CustomerLoyaltyDiscount = {
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  category?: Maybe<Category>;
  description?: Maybe<Scalars['String']>;
  discountCode?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['DateTime']>;
  externalData?: Maybe<CustomerLoyaltyDiscountOfferExternalData>;
  isActivatedByDiscountCode: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['DateTime']>;
};

export type CustomerLoyaltyDiscountOfferExternalData = {
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['DateTime']>;
  externalId?: Maybe<Scalars['String']>;
  externalReference?: Maybe<Scalars['String']>;
  heading?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  redeemed?: Maybe<Scalars['Boolean']>;
  redeemedOn?: Maybe<Scalars['DateTime']>;
  startDate?: Maybe<Scalars['DateTime']>;
};

export type CustomerLoyaltyPointCard = {
  externalId?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  lastStampTime?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  numberOfSlots?: Maybe<Scalars['Int']>;
  numberOfSlotsRemaining?: Maybe<Scalars['Int']>;
};

export type CustomerProductList = {
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  items?: Maybe<Array<Maybe<CustomerProductListItem>>>;
  name?: Maybe<Scalars['String']>;
  shareToken?: Maybe<Scalars['String']>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  type?: Maybe<CustomerProductListType>;
};

export type CustomerProductListItem = {
  description?: Maybe<Scalars['String']>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  product?: Maybe<Product>;
  quantity?: Maybe<Scalars['Int']>;
  variant?: Maybe<ProductVariant>;
};

export type CustomerProductListResult = {
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  customerProductList?: Maybe<CustomerProductList>;
  success?: Maybe<Scalars['Boolean']>;
};

export type CustomerProductListType = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export enum CustomerType {
  Company = 'COMPANY',
  Private = 'PRIVATE'
}

/** Fields that are required to have a value is determined by CustomerFields found in CountrySettings */
export type CustomerUpdateBillingAddressInput = {
  addressName?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  co?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<Scalars['String']>;
  companyAtt?: InputMaybe<Scalars['String']>;
  countryCode?: InputMaybe<Scalars['String']>;
  department?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  mobilePhone?: InputMaybe<Scalars['String']>;
  municipality?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  postalCode?: InputMaybe<Scalars['String']>;
  region?: InputMaybe<Scalars['String']>;
  streetName?: InputMaybe<Scalars['String']>;
};

export type CustomerUpdateConsentInput = {
  id?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['Boolean']>;
};

export type CustomerUpdateDeliveryAddressInput = {
  addressName?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  co?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<Scalars['String']>;
  companyAtt?: InputMaybe<Scalars['String']>;
  countryCode?: InputMaybe<Scalars['String']>;
  department?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  /** If this field is left empty, a new DeliveryAddress will be created. */
  id?: InputMaybe<Scalars['Int']>;
  lastName?: InputMaybe<Scalars['String']>;
  mobilePhone?: InputMaybe<Scalars['String']>;
  municipality?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  postalCode?: InputMaybe<Scalars['String']>;
  region?: InputMaybe<Scalars['String']>;
  streetName?: InputMaybe<Scalars['String']>;
};

export type CustomerUpdateInput = {
  billingAddress: CustomerUpdateBillingAddressInput;
  consents?: InputMaybe<Array<InputMaybe<CustomerUpdateConsentInput>>>;
  deliveryAddresses?: InputMaybe<Array<InputMaybe<CustomerUpdateDeliveryAddressInput>>>;
  dynamicContent?: InputMaybe<Scalars['String']>;
  organizationNumber?: InputMaybe<Scalars['String']>;
  pid?: InputMaybe<Scalars['String']>;
  preferences?: InputMaybe<CustomerUpdatePreferenceInput>;
};

export type CustomerUpdatePreferenceInput = {
  storeLocationId?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<CustomerUpdatePreferencesCommunicationInput>;
};

export type CustomerUpdatePreferencesCommunicationInput = {
  acceptsEmail?: InputMaybe<Scalars['Boolean']>;
  acceptsPostal?: InputMaybe<Scalars['Boolean']>;
  acceptsSms?: InputMaybe<Scalars['Boolean']>;
  culture?: InputMaybe<Scalars['String']>;
};

/** Responds with a bool value whether the update has been successful or not */
export type CustomerUpdateResponse = {
  success: Scalars['Boolean'];
};

export type DeleteCustomerProductListResult = {
  success?: Maybe<Scalars['Boolean']>;
};

export type Discount = {
  campaign?: Maybe<Category>;
  description?: Maybe<Scalars['String']>;
  externalId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Price>;
};

export type Document = {
  breadcrumbText?: Maybe<Scalars['String']>;
  head?: Maybe<HtmlHead>;
  primaryRoute?: Maybe<Route>;
};

export type ExternalCustomer = {
  address?: Maybe<MaskedProperty>;
  city?: Maybe<MaskedProperty>;
  co?: Maybe<MaskedProperty>;
  country?: Maybe<MaskedProperty>;
  countryCode?: Maybe<Scalars['String']>;
  email?: Maybe<MaskedProperty>;
  externalId?: Maybe<Scalars['String']>;
  firstName?: Maybe<MaskedProperty>;
  lastName?: Maybe<MaskedProperty>;
  mobilePhoneNumber?: Maybe<MaskedProperty>;
  phoneNumber?: Maybe<MaskedProperty>;
  pid?: Maybe<MaskedProperty>;
  postalCode?: Maybe<MaskedProperty>;
};

/**
 * The activation status has 4 states;
 * PREEXISTING_CUSTOMER: No customer info will be returned and the customer is advised to login to the preexisting account.
 * ACTIVATION_REQUIRED: The customer account needs to be activated. Email (masked), FirstName (masked) and externalId will be the only fields set on `customer`.
 * ADDITIONAL_USER_DATA_REQUIRED: Additional data needed to register the customer, the existing customer info will be available with masking on customer.
 * NON_EXISTING_CUSTOMER: Customer does not exist in any system and will have to do a sign up.
 * COUNTRY_NOT_VALID: The customer account may not be activated on this channel as it's missing the customer country. Email (masked), FirstName (masked), externalId and countryCode will be the only fields set on `customer`.
 *
 *
 */
export type ExternalCustomerResult = {
  customer?: Maybe<ExternalCustomer>;
  status?: Maybe<ActivationStatusSource>;
};

export type FacebookConversionsApi = {
  accessToken?: Maybe<Scalars['String']>;
  pixelId?: Maybe<Scalars['String']>;
};

export type Filter = {
  id: Scalars['String'];
  name: Scalars['String'];
};

export type FilterInput = {
  booleanFilters?: InputMaybe<Array<InputMaybe<BooleanFilterInput>>>;
  listFilters?: InputMaybe<Array<InputMaybe<ListFilterInput>>>;
  multiListFilters?: InputMaybe<Array<InputMaybe<MultiListFilterInput>>>;
  rangeFilters?: InputMaybe<Array<InputMaybe<RangeFilterInput>>>;
};

export type FreeShippingLimit = {
  exVat?: Maybe<Scalars['Decimal']>;
  incVat?: Maybe<Scalars['Decimal']>;
};

export type GoogleAnalytics = {
  trackingId?: Maybe<Scalars['String']>;
  useArticleNumberAsId?: Maybe<Scalars['Boolean']>;
};

export type GoogleTagManager = {
  containerId?: Maybe<Scalars['String']>;
};

export type HtmlHead = {
  metaTags?: Maybe<Array<Maybe<HtmlMetaTag>>>;
  title?: Maybe<Scalars['String']>;
};

export type HtmlMetaTag = {
  content?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Image = {
  height?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['Uri']>;
  width?: Maybe<Scalars['Int']>;
};

export type ImageValue = {
  focalPointX?: Maybe<Scalars['Int']>;
  focalPointY?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['String']>;
};

export type InputComment = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type Language = {
  culture: Scalars['String'];
  id: Scalars['String'];
  isDefault?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
};

export type Link = {
  link?: Maybe<Scalars['Uri']>;
  target?: Maybe<Scalars['String']>;
};

export type ListFilter = Filter & {
  id: Scalars['String'];
  items: Array<Maybe<ListFilterItem>>;
  name: Scalars['String'];
};

export type ListFilterInput = {
  id: Scalars['String'];
  values?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ListFilterItem = {
  id: Scalars['String'];
  resultCount?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
  value: Scalars['String'];
};

export type LoginExternalCustomerInput = {
  externalCustomerToken: Scalars['String'];
};

export type LoginExternalCustomerResult = {
  token?: Maybe<Token>;
};

/** The response will contain a authorization token if the login was successful */
export type LoginResponse = {
  token: Token;
};

export type MaskedProperty = {
  encrypted?: Maybe<Scalars['String']>;
  masked?: Maybe<Scalars['String']>;
};

export type MultiListFilter = Filter & {
  id: Scalars['String'];
  lists: Array<Maybe<MultiListFilterList>>;
  name: Scalars['String'];
};

export type MultiListFilterInput = {
  id: Scalars['String'];
  values?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type MultiListFilterList = {
  id: Scalars['String'];
  items: Array<Maybe<ListFilterItem>>;
  name: Scalars['String'];
};

export type MultipleContent = {
  content: Array<Maybe<Content>>;
  notFoundIds: Array<Maybe<Scalars['ID']>>;
};

export type Mutation = {
  /** Error codes: CustomerNotFound, CustomerAlreadyActivated, UnableToActivateCustomer, UnableToLoginCustomer, InvalidCustomerActivateInput */
  activateExternalCustomerById?: Maybe<ActivateExternalCustomerByIdResult>;
  /** Error codes: CustomerNotFound, CustomerAlreadyActivated, UnableToActivateCustomer, UnableToLoginCustomer, InvalidCustomerActivateInput */
  activateExternalCustomerByToken?: Maybe<ActivateExternalCustomerByTokenResult>;
  /** Adds products to the cart where you can add comments to the products and determine their quantities. Replies with the affected cart if a cartId has been presented, otherwise a new cart will be created.  */
  addMultipleToCart?: Maybe<CartMutation>;
  /** Adds a product to the cart where you can add a comment to the product and determine the quantity. Replies with the affected cart if a cartId has been presented, otherwise a new cart will be created.  */
  addToCart?: Maybe<CartMutation>;
  /**
   * ## Description
   * Adds items to product list, null id adds items to the default product list.
   * ## Error Codes
   * ### Unauthorized
   * Unauthorized
   * ### AddToProductListFailed
   * Error in underlying API call, more info may be contained in the error message.
   * ### InvalidArticleNumber
   * Article number cannot be empty
   * ### ProductNotFound
   * No match on article number
   * ### MoreThanOneMatchOnArticleNumber
   * Article number matched more than one article
   *
   */
  addToCustomerProductList?: Maybe<CustomerProductListResult>;
  /**
   * ## Description
   * Creates a product list for a logged in customer
   * ## Error Codes
   * ### Unauthorized
   *
   * ### UnableToCreateProductList
   * Error in underlying API call, more info may be contained in the error message.
   *
   */
  createCustomerProductList?: Maybe<CustomerProductListResult>;
  /** This mutation is used to reduce the quantity of a product in the cart, replies with the affected cart ruled by the cartId in the input. */
  decrementItemQuantity?: Maybe<CartMutation>;
  /** This mutation deletes a customer. An authorization token is needed in the request, in order to be able to delete the customer. */
  deleteCustomer?: Maybe<Scalars['Boolean']>;
  /**
   * ## Description
   * Deletes a product list for a logged in customer
   * ## Error Codes
   * ### Unauthorized
   *
   * ### ProductListNotFound
   * Argument `id` did not match any list for this customer.
   * ### UnableToDeleteProductList
   * Error in underlying API call, more info may be contained in the error message.
   *
   */
  deleteCustomerProductList?: Maybe<DeleteCustomerProductListResult>;
  /** This mutation is used to increase the quantity of a product in the cart, replies with the affected cart ruled by the cartId in the input */
  incrementItemQuantity?: Maybe<CartMutation>;
  /**
   * LoginMutation will log a user in.
   * One of email, pid, externalId or memberNumber is required, along with a password.
   * Returns an authorization token if the login was successful.
   */
  login?: Maybe<LoginResponse>;
  loginExternalCustomer?: Maybe<LoginExternalCustomerResult>;
  /** Removes a specific product in the cart, replies with the affected cart */
  removeFromCart?: Maybe<CartMutation>;
  /**
   * ## Description
   * Removes an item from a product list for a logged in customer, null id removes item in the default product list.
   * ## Error Codes
   * ### Unauthorized
   *
   * ### ProductListNotFound
   * Argument `id` did not match any list for this customer.
   * ### RemoveFromProductListFailed
   * Error in underlying API call, more info may be contained in the error message.
   * ### ProductNotFound
   * Argument `articleNumbers` did not match any products or variants.
   * ### MoreThanOneMatchOnArticleNumber
   * Argument `articleNumbers` matched more than one product/variant.
   * ### InvalidArticleNumber
   * Argument `articleNumbers` cannot be null or empty.
   *
   */
  removeFromCustomerProductList?: Maybe<CustomerProductListResult>;
  /** Removes specific items from the cart, replies with the affected cart */
  removeMultipleFromCart?: Maybe<CartMutation>;
  /** Requires a valid email and returns boolean value if successful, otherwise an error will be thrown */
  requestPasswordReset?: Maybe<RequestPasswordResetResult>;
  /** Requires a valid resetPasswordToken and a new password and if successful will return a authentication token */
  resetPassword?: Maybe<ResetPassword>;
  /** Used to add a specific quantity to a product in the cart. Replies with the affected cart ruled by the cartId in the input */
  setItemQuantity?: Maybe<CartMutation>;
  /**
   * The SignUp-mutation is used for creating a customer.
   *
   * If the sign up is successful the customer may be considered to be logged on and an authentication token will be returned
   */
  signUp?: Maybe<SignUpResponse>;
  /**
   * This mutation's purpose is to subscribe a customer to a newsletter. In order to subscribe a customer a valid email address is required
   *
   * Responds with a boolean value whether the subscription has been successful or not
   */
  subscribeToNewsletter?: Maybe<Scalars['Boolean']>;
  subscribeToStockNotifications?: Maybe<Scalars['Boolean']>;
  /** Responds with the affected cart. */
  updateCart?: Maybe<UpdateCartMutation>;
  /** This mutation's purpose is to update a existing customer's information. An authorization token is needed in the request, in order to be able to update the customer. */
  updateCustomer?: Maybe<CustomerUpdateResponse>;
  /** This mutation's purpose is to update a existing customer's price list using an access code. An authorization token is needed in the request, in order to be able to update the customer. */
  updateCustomerPriceList?: Maybe<UpdateCustomerPriceListResult>;
  /**
   * ## Description
   * Updates a product list for a logged in customer
   * ## Error Codes
   * ### Unauthorized
   *
   * ### ProductListNotFound
   * Argument `id` did not match any list for this customer.
   * ### UnableToUpdateProductList
   * Error in underlying API call, more info may be contained in the error message.
   *
   */
  updateCustomerProductList?: Maybe<CustomerProductListResult>;
  /**
   * ## Description
   * Updates an item in product list, null id updates item in the default product list.
   * ## Error Codes
   * ### Unauthorized
   *
   * ### ProductListNotFound
   * Argument `id` did not match any list for this customer.
   * ### UnableToUpdateProductListItem
   * Error in underlying API call, more info may be contained in the error message.
   * ### ProductNotFound
   * Argument `articleNumber` did not match any products or variants.
   * ### MoreThanOneMatchOnArticleNumber
   * Argument `articleNumber` matched more than one product/variant.
   * ### InvalidArticleNumber
   * Argument `articleNumber` cannot be null or empty.
   *
   */
  updateCustomerProductListItem?: Maybe<CustomerProductListResult>;
  /** The updatePassword mutation updates the customers password. Both the old password and a new password is a requirement. */
  updatePassword?: Maybe<UpdatePasswordResult>;
};


export type MutationActivateExternalCustomerByIdArgs = {
  input?: InputMaybe<ActivateExternalCustomerByIdInput>;
};


export type MutationActivateExternalCustomerByTokenArgs = {
  input?: InputMaybe<ActivateExternalCustomerByTokenInput>;
};


export type MutationAddMultipleToCartArgs = {
  cartId?: InputMaybe<Scalars['String']>;
  items: Array<InputMaybe<AddMultipleToCartInput>>;
};


export type MutationAddToCartArgs = {
  input: AddToCartInput;
};


export type MutationAddToCustomerProductListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  items: Array<AddToCustomerProductListInput>;
};


export type MutationCreateCustomerProductListArgs = {
  input: CreateCustomerProductListInput;
};


export type MutationDecrementItemQuantityArgs = {
  input: ChangeByOneItemQuantityInput;
};


export type MutationDeleteCustomerProductListArgs = {
  id: Scalars['ID'];
};


export type MutationIncrementItemQuantityArgs = {
  input: ChangeByOneItemQuantityInput;
};


export type MutationLoginArgs = {
  email?: InputMaybe<Scalars['String']>;
  externalId?: InputMaybe<Scalars['String']>;
  memberNumber?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  pid?: InputMaybe<Scalars['String']>;
};


export type MutationLoginExternalCustomerArgs = {
  input?: InputMaybe<LoginExternalCustomerInput>;
};


export type MutationRemoveFromCartArgs = {
  input: RemoveFromCartInput;
};


export type MutationRemoveFromCustomerProductListArgs = {
  articleNumbers?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<Scalars['ID']>;
};


export type MutationRemoveMultipleFromCartArgs = {
  input: RemoveMultipleFromCartInput;
};


export type MutationRequestPasswordResetArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String'];
  resetPasswordToken: Scalars['String'];
};


export type MutationSetItemQuantityArgs = {
  input: SetItemQuantityInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationSubscribeToNewsletterArgs = {
  email: Scalars['String'];
};


export type MutationSubscribeToStockNotificationsArgs = {
  articleNumber: Scalars['String'];
  email: Scalars['String'];
};


export type MutationUpdateCartArgs = {
  input: UpdateCartInput;
};


export type MutationUpdateCustomerArgs = {
  input: CustomerUpdateInput;
};


export type MutationUpdateCustomerPriceListArgs = {
  priceListAccessCode: Scalars['String'];
};


export type MutationUpdateCustomerProductListArgs = {
  input: UpdateCustomerProductListInput;
};


export type MutationUpdateCustomerProductListItemArgs = {
  input: UpdateCustomerProductListItemInput;
};


export type MutationUpdatePasswordArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type MyPagesContent = {
  /** Text that will show on the landing page on MyPages */
  welcomeText?: Maybe<Scalars['String']>;
};

export type NumericRangeFilter = Filter & {
  id: Scalars['String'];
  max: Scalars['Decimal'];
  min: Scalars['Decimal'];
  name: Scalars['String'];
};

export type Order = {
  attachments?: Maybe<Array<Maybe<OrderAttachment>>>;
  billingInfo?: Maybe<OrderInfo>;
  currency?: Maybe<Currency>;
  deliveryInfo?: Maybe<OrderInfo>;
  deliveryMethod?: Maybe<OrderDeliveryMethod>;
  giftVouchers?: Maybe<Array<Maybe<OrderGiftVoucher>>>;
  id: Scalars['ID'];
  items?: Maybe<Array<Maybe<OrderItem>>>;
  orderDate?: Maybe<Scalars['DateTime']>;
  orderNumber?: Maybe<Scalars['String']>;
  orderPurchaseLocation?: Maybe<Scalars['String']>;
  paymentMethod?: Maybe<OrderPaymentMethod>;
  status?: Maybe<OrderStatus>;
  total?: Maybe<Price>;
};


export type OrderItemsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type OrderAddress = {
  city?: Maybe<Scalars['String']>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  country?: Maybe<Country>;
  postcode?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
};

export type OrderAttachment = {
  id: Scalars['ID'];
  url?: Maybe<Scalars['String']>;
};

export type OrderDeliveryMethod = {
  fee?: Maybe<Price>;
  name?: Maybe<Scalars['String']>;
  tracking?: Maybe<OrderDeliveryMethodTracking>;
};

export type OrderDeliveryMethodTracking = {
  trackingUrl?: Maybe<Scalars['String']>;
  trackingUrlText?: Maybe<Scalars['String']>;
};

export type OrderGiftVoucher = {
  amount?: Maybe<Scalars['Decimal']>;
  charged?: Maybe<Scalars['Decimal']>;
  name?: Maybe<Scalars['String']>;
  validUntil?: Maybe<Scalars['DateTime']>;
};

export type OrderHeader = {
  currency?: Maybe<Currency>;
  /** If this is false, a call to `order` for this order will result in a failure. */
  hasOrderDetails?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  orderDate?: Maybe<Scalars['DateTime']>;
  orderNumber?: Maybe<Scalars['String']>;
  status?: Maybe<OrderStatus>;
  statusTimeline?: Maybe<Array<Maybe<OrderStatus>>>;
  total?: Maybe<Price>;
  trackingId?: Maybe<Scalars['String']>;
};

export type OrderHeaderResult = {
  result?: Maybe<Array<Maybe<OrderHeader>>>;
  totalResults?: Maybe<Scalars['Int']>;
};

export type OrderInfo = {
  address?: Maybe<OrderAddress>;
  company?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type OrderItem = {
  articleNumber?: Maybe<Scalars['String']>;
  discounts?: Maybe<Array<Maybe<OrderItemDiscount>>>;
  /** Name of the Product at the time the order was placed (may since have changed). Use this as a fallback if the 'product' field itself is null.  */
  name?: Maybe<Scalars['String']>;
  preOrderDate?: Maybe<Scalars['DateTime']>;
  /** N.B. this may be null if the Product has since been removed. */
  product?: Maybe<Product>;
  quantity?: Maybe<Scalars['Int']>;
  total?: Maybe<Price>;
  unitPrice?: Maybe<Price>;
  /** N.B. this may be null if the Product itself or the Variant has since been removed. */
  variant?: Maybe<ProductVariant>;
  /** N.B. this may be null if the Product has since been removed. */
  variantOptionNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Value of the Variant at the time the order was placed (may since have changed). Use this as a fallback if the 'variant' field itself is null. Will be null when the OrderItem is not a Variant. */
  variantValue?: Maybe<Scalars['String']>;
};

export type OrderItemDiscount = {
  value?: Maybe<Price>;
};

export type OrderPaymentMethod = {
  fee?: Maybe<Price>;
  name?: Maybe<Scalars['String']>;
};

export type OrderStatus = {
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  timestamp?: Maybe<Scalars['DateTime']>;
};

export type Package = {
  /** Total package discount in percentage */
  discountPercentage?: Maybe<Scalars['Decimal']>;
  /** Total package discount amount */
  discountValue?: Maybe<Price>;
  id: Scalars['ID'];
  items: Array<PackageItem>;
  /** The previous package price without any potential discount */
  previousPrice?: Maybe<Price>;
  /** The current package price with any potential discount */
  price?: Maybe<Price>;
};

export type PackageDiscount = PackageDiscountPercentage | PackageDiscountValue;

export type PackageDiscountPercentage = {
  percentage: Scalars['Decimal'];
};

export type PackageDiscountValue = {
  valueExVat: Scalars['Decimal'];
  valueIncVat: Scalars['Decimal'];
  valueVat: Scalars['Decimal'];
};

export type PackageItem = {
  discount?: Maybe<PackageDiscount>;
  minQuantity: Scalars['Int'];
  /** The previous package price without any potential discount */
  previousPrice?: Maybe<Price>;
  /** The current package price with any potential discount */
  price?: Maybe<Price>;
  product?: Maybe<Product>;
};

export type PackagePriceInput = {
  product: Scalars['ID'];
  variant?: InputMaybe<Scalars['ID']>;
};

export type Page = Document & {
  breadcrumbText?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  /** Get content data set via the Content Editor */
  data?: Maybe<Content>;
  /** External URL if page is set to URL, null if not. */
  externalUrl?: Maybe<Link>;
  hasExternalUrl?: Maybe<Scalars['Boolean']>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  head?: Maybe<HtmlHead>;
  id: Scalars['ID'];
  images?: Maybe<Array<Maybe<Image>>>;
  mainHeader?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  /**
   * * If this page was fetched by ID using the `page(id)` query, `parent` will be returned even if it is hidden.
   * * If this page was fetched using the `pages` query, `parent` will not be returned if it is hidden
   */
  parent?: Maybe<Page>;
  /** The primary route of this Page. NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  primaryRoute?: Maybe<Route>;
  /**
   * * If this page was fetched by ID using the `page(id)` query, `subPages` will be returned even if they are hidden. This can be overridden with the `includeHidden` flag.
   * * If this page was fetched using the `pages` query, `subPages` will not be returned if they are hidden. The `includeHidden` flag has no effect on this.
   */
  subPages?: Maybe<Array<Page>>;
};


export type PageSubPagesArgs = {
  includeHidden?: InputMaybe<Scalars['Boolean']>;
};

export type PagedResult = {
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  filters?: Maybe<Array<Maybe<Filter>>>;
  result: Array<Maybe<Product>>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  sortOrders?: Maybe<Array<Maybe<ProductSortOrder>>>;
  totalResults?: Maybe<Scalars['Int']>;
};


export type PagedResultFiltersArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type PagingInput = {
  first?: InputMaybe<Scalars['Paging']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type PersonLookup = {
  address?: Maybe<MaskedProperty>;
  city?: Maybe<MaskedProperty>;
  co?: Maybe<MaskedProperty>;
  country?: Maybe<MaskedProperty>;
  firstName?: Maybe<MaskedProperty>;
  lastName?: Maybe<MaskedProperty>;
  mobilePhoneNumber?: Maybe<MaskedProperty>;
  phoneNumber?: Maybe<MaskedProperty>;
  postalCode?: Maybe<MaskedProperty>;
};

export type Price = {
  exVat: Scalars['Decimal'];
  incVat: Scalars['Decimal'];
  vat: Scalars['Decimal'];
};

export type PrivateCustomer = Customer & {
  billingAddress?: Maybe<CustomerAddress>;
  communication?: Maybe<CustomerCommunication>;
  deliveryAddresses?: Maybe<Array<Maybe<CustomerAddress>>>;
  dynamicContent?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  externalAttributes?: Maybe<Array<Maybe<CustomerExternalAttribute>>>;
  /** Customer id for external system */
  externalId?: Maybe<Scalars['String']>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  googleUserId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  language?: Maybe<Language>;
  memberId?: Maybe<Scalars['String']>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  orderHeaders?: Maybe<OrderHeaderResult>;
  pid?: Maybe<Scalars['String']>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  store?: Maybe<Store>;
  /** @deprecated Use communication.acceptsEmail */
  subscribedToNewsletter?: Maybe<Scalars['Boolean']>;
};


export type PrivateCustomerOrderHeadersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type Product = Document & {
  articleNumber: Scalars['String'];
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  badges?: Maybe<Array<Maybe<ProductBadge>>>;
  barcode?: Maybe<Scalars['String']>;
  breadcrumbText?: Maybe<Scalars['String']>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  campaigns?: Maybe<Array<Maybe<Category>>>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  canonicalCategory?: Maybe<Category>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  categories?: Maybe<Array<Maybe<Category>>>;
  /** Calculates the price of the product based on the configuration choices that's been made. NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  configurationPrice?: Maybe<ProductConfigurationPrice>;
  /**
   * Configurations on a product are used to assemble a complete product,
   *
   * For example, if the product is a ring then the ring may have two configurations; measures of circumference and choice of engraving
   *
   * In this field, all the configurations of the product will be presented, the configuration name and its various options.
   */
  configurations?: Maybe<Array<Maybe<ProductConfiguration>>>;
  customFields?: Maybe<Array<Maybe<CustomField>>>;
  /**
   * Specifies input field(s) for the Customer to populate on the Product that will then carry through to the Order.
   *                     If 'required' is true the Product should not be purchasable until the field is populated.
   */
  customerComments?: Maybe<Array<Maybe<ProductComment>>>;
  /** Default previous price for the product in the channel, disregards Customer specific prices. */
  defaultPreviousPrice?: Maybe<Price>;
  /** Default price for the product in the channel, disregards Customer specific prices. */
  defaultPrice?: Maybe<Price>;
  description: Scalars['String'];
  /** The product is recommended to only be purchasable in multiples of the distributionPackageSize. (Different shops may have different levels of leniency on this rule). */
  distributionPackageSize: Scalars['Int'];
  /** All other products in the same family as the product. NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  familyMembers?: Maybe<Array<Product>>;
  hasConfigurations: Scalars['Boolean'];
  hasFamilyMembers: Scalars['Boolean'];
  hasUpsell?: Maybe<Scalars['Boolean']>;
  hasVariants: Scalars['Boolean'];
  hasVariantsWithDifferingPrices: Scalars['Boolean'];
  head?: Maybe<HtmlHead>;
  hidePrice?: Maybe<Scalars['Boolean']>;
  id: Scalars['Int'];
  images?: Maybe<Array<Maybe<ProductImage>>>;
  inPackages?: Maybe<Array<Product>>;
  isPackage?: Maybe<Scalars['Boolean']>;
  isPreOrder?: Maybe<Scalars['Boolean']>;
  /** Product header if it differs from the actual product name, usually displayed instead of the product name in the header tag at the product page. */
  mainHeader: Scalars['String'];
  name: Scalars['String'];
  /**
   * ## Description
   * NB: Carries a performance cost, as asking for this will result in a separate API call in the backend.
   * ## Error Codes
   * ### InvalidAmountOfArticleNumbers
   * Number of input products doesn't match package products
   * ### InvalidArticleNumber
   * Product or variant article number doesn't match any products
   * ### UnableToGetPackagePrice
   * Failed to calculate package price
   *
   */
  package?: Maybe<Package>;
  preOrder?: Maybe<ProductPreOrder>;
  /** The previous price (i.e. this will be higher than `price` if the product is discounted). Will be a Customer specific previous price, if that Customer has a separate price list. */
  previousPrice?: Maybe<Price>;
  /** The current price. Will be a Customer specific price, if that Customer has a separate price list. */
  price?: Maybe<Price>;
  /** The time interval of the discounted price. If the product has variants, the time interval will be that of the variant which price is shown on the product. */
  priceDateSpan?: Maybe<ProductPriceDateSpan>;
  /** The primary route of this Product. NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  primaryRoute?: Maybe<Route>;
  publishedDate?: Maybe<Scalars['DateTime']>;
  /** Quantity suffix e.g pcs, box, etc. */
  quantitySuffix?: Maybe<Scalars['String']>;
  /** Not in use. Always null. */
  recommendedPrice?: Maybe<Price>;
  recommendedProducts?: Maybe<RecommendedProducts>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  relatedProducts?: Maybe<Array<Maybe<Product>>>;
  shortDescription: Scalars['String'];
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  stockStatus?: Maybe<StockStatus>;
  subName: Scalars['String'];
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  upsell?: Maybe<Upsell>;
  variants?: Maybe<ProductVariants>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  warehouseStock?: Maybe<Array<Maybe<Warehouse>>>;
};


export type ProductCategoriesArgs = {
  includeHidden?: InputMaybe<Scalars['Boolean']>;
};


export type ProductConfigurationPriceArgs = {
  options?: InputMaybe<Array<ProductConfigurationPriceInput>>;
};


export type ProductImagesArgs = {
  includeVariantImages?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type ProductPackageArgs = {
  articleNumbers?: InputMaybe<Array<InputMaybe<PackagePriceInput>>>;
};


export type ProductWarehouseStockArgs = {
  includeInactive?: InputMaybe<Scalars['Boolean']>;
};

export type ProductAutoCompleteResult = {
  result: Array<Maybe<Product>>;
};

export type ProductBadge = {
  location?: Maybe<ProductBadgeLocation>;
  name?: Maybe<Scalars['String']>;
  style?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['Uri']>;
};

export enum ProductBadgeLocation {
  BottomLeft = 'BOTTOM_LEFT',
  BottomRight = 'BOTTOM_RIGHT',
  Custom = 'CUSTOM',
  TopLeft = 'TOP_LEFT',
  TopRight = 'TOP_RIGHT'
}

export type ProductComment = {
  name: Scalars['String'];
  required: Scalars['Boolean'];
};

export type ProductConfiguration = {
  name?: Maybe<Scalars['String']>;
  options: Array<Maybe<ProductConfigurationOption>>;
};

/**
 * Options by which you can configure a product.
 *
 * For instance, if you're selling rope the available options might be the dimensions; 10mm, 20mm, 30mm, etc.
 *
 * Price is either used as is, or if the configuration is using a price calculation (e.g. the rope is priced by length) it will be used in the calculation formula; e.g. (Length * Price).
 */
export type ProductConfigurationOption = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Price>;
  /** This will be set if the configuration requires price calculation, e.g. you might sell rope and price it by length. */
  priceCalculation?: Maybe<ProductConfigurationPriceCalculation>;
};

export type ProductConfigurationPrice = {
  previousPrice?: Maybe<Price>;
  price?: Maybe<Price>;
};

/**
 * Describes how the price is calculated on a configuration option.
 *
 * E.g. the configuration is for a carpet and it has a price calculation formula that reads: 'Width * Length * Price / 10000'.
 *
 * In this case, the variables would contain 'Width' and 'Length' whereas the 'Price' is taken from the selected option.
 */
export type ProductConfigurationPriceCalculation = {
  formula?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  variables?: Maybe<Array<Maybe<ProductConfigurationPriceCalculationVariable>>>;
};

export type ProductConfigurationPriceCalculationVariable = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type ProductConfigurationPriceInput = {
  optionId: Scalars['ID'];
};

export enum ProductCustomFieldType {
  Bool = 'BOOL',
  Html = 'HTML',
  List = 'LIST',
  MultiLevelList = 'MULTI_LEVEL_LIST',
  String = 'STRING'
}

export type ProductImage = {
  /** Alternate text for the image, commonly used for the alt attribute of img-tags. */
  alt?: Maybe<Scalars['String']>;
  modifiedDate?: Maybe<Scalars['String']>;
  /** @deprecated Images will no longer be offered in different sizes. Instead use 'url' in conjunction with our image resizing service. */
  sizes: Array<Maybe<ProductImageSize>>;
  /** Extra information, commonly used for the title attribute of img-tag. Should be shown on hover. */
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['Uri']>;
};

export type ProductImageSize = {
  height?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['Uri']>;
  width?: Maybe<Scalars['Int']>;
};

export enum ProductOrderOptions {
  ArticleNumber = 'ARTICLE_NUMBER',
  Bestseller = 'BESTSELLER',
  Custom = 'CUSTOM',
  Name = 'NAME',
  Price = 'PRICE',
  PublishDate = 'PUBLISH_DATE',
  SubHeading = 'SUB_HEADING'
}

export type ProductPreOrder = {
  fromDate?: Maybe<Scalars['DateTime']>;
  toDate?: Maybe<Scalars['DateTime']>;
};

export type ProductPriceDateSpan = {
  endDate?: Maybe<Scalars['DateTime']>;
  startDate?: Maybe<Scalars['DateTime']>;
};

export type ProductSearchResult = {
  filters?: Maybe<Array<Maybe<Filter>>>;
  result: Array<Maybe<Product>>;
  totalResults?: Maybe<Scalars['Int']>;
};

export type ProductSortOrder = {
  defaultDirection: SortDirection;
  isDefault: Scalars['Boolean'];
  text: Scalars['String'];
  value: ProductOrderOptions;
};

export type ProductVariant = {
  articleNumber: Scalars['String'];
  barcode?: Maybe<Scalars['String']>;
  /** Default previous price for the product in the channel, disregards Customer specific prices. */
  defaultPreviousPrice?: Maybe<Price>;
  /** Default price for the product in the channel, disregards Customer specific prices. */
  defaultPrice?: Maybe<Price>;
  id: Scalars['String'];
  images?: Maybe<Array<Maybe<ProductImage>>>;
  /** The previous price (i.e. this will be higher than `price` if the product is discounted). Will be a Customer specific previous price, if that Customer has a separate price list. */
  previousPrice?: Maybe<Price>;
  /** The current price. Will be a Customer specific price, if that Customer has a separate price list. */
  price?: Maybe<Price>;
  /** The time interval of the discounted price. */
  priceDateSpan?: Maybe<ProductPriceDateSpan>;
  /** Not in use. Always null. */
  recommendedPrice?: Maybe<Price>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  stockStatus?: Maybe<StockStatus>;
  /** Variant values (combination of option values) */
  values: Array<Maybe<Scalars['String']>>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  warehouseStock?: Maybe<Array<Maybe<Warehouse>>>;
};


export type ProductVariantWarehouseStockArgs = {
  includeInactive?: InputMaybe<Scalars['Boolean']>;
};

export type ProductVariantOption = {
  name?: Maybe<Scalars['String']>;
  values: Array<Maybe<Scalars['String']>>;
};

export type ProductVariants = {
  /** Available product variant options. */
  options: Array<Maybe<ProductVariantOption>>;
  /** Product variants, contains all possible values of options. */
  values: Array<Maybe<ProductVariant>>;
};

export type Query = {
  cart?: Maybe<Cart>;
  /** get categories by channel id, culture, root and culture */
  categories: Array<Maybe<Category>>;
  /** get category by id */
  category?: Maybe<Category>;
  /** get channel by id, null gets default channel */
  channel?: Maybe<Channel>;
  /** get all channels */
  channels: Array<Maybe<Channel>>;
  /** Returns Content found by list of its IDs. Also not found Content IDs are listed. */
  content?: Maybe<MultipleContent>;
  customer?: Maybe<Customer>;
  /** Fetches customer-unique offers */
  customerLoyalty?: Maybe<CustomerLoyalty>;
  /** get customer product list by id, null gets default product list */
  customerProductList?: Maybe<CustomerProductList>;
  customerProductLists: Array<Maybe<CustomerProductList>>;
  /**
   * Used in the sign up process when the shop has a third party customer repository, e.g. Voyado.
   *
   * Error codes: INVALID_VALUE (if `key` is null), ExternalCustomerLookupFailed
   */
  externalCustomerLookup?: Maybe<ExternalCustomerResult>;
  /** Fetches my pages content */
  myPagesContent?: Maybe<MyPagesContent>;
  /** fetch order by id */
  order?: Maybe<Order>;
  /** Fetch a single page by ID. */
  page?: Maybe<Page>;
  /** Fetch all non-hidden pages. If you are using nested pages, only root level pages will be returned. */
  pages: Array<Maybe<Page>>;
  /** Get information on person by Key(personal id number or phone number) */
  personLookup?: Maybe<PersonLookup>;
  product?: Maybe<Product>;
  products: Array<Maybe<Product>>;
  /** get product, category or page by path. */
  route?: Maybe<Route>;
  search?: Maybe<SearchResult>;
  searchAutoComplete?: Maybe<SearchAutoCompleteResult>;
  startPage?: Maybe<StartPage>;
  store?: Maybe<Store>;
  stores: Array<Maybe<Store>>;
};


export type QueryCartArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryCategoriesArgs = {
  includeHidden?: InputMaybe<Scalars['Boolean']>;
  levels?: InputMaybe<Scalars['Int']>;
  root?: InputMaybe<Scalars['Int']>;
};


export type QueryCategoryArgs = {
  id: Scalars['ID'];
};


export type QueryChannelArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryContentArgs = {
  ids: Array<InputMaybe<Scalars['String']>>;
};


export type QueryCustomerProductListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  shareToken?: InputMaybe<Scalars['String']>;
};


export type QueryExternalCustomerLookupArgs = {
  key?: InputMaybe<Scalars['String']>;
};


export type QueryOrderArgs = {
  id?: InputMaybe<Scalars['Int']>;
  orderId?: InputMaybe<Scalars['ID']>;
};


export type QueryPageArgs = {
  id: Scalars['Int'];
};


export type QueryPersonLookupArgs = {
  key: Scalars['String'];
};


export type QueryProductArgs = {
  articleNumber?: InputMaybe<Scalars['String']>;
  barcode?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryProductsArgs = {
  articleNumbers?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  barcodes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};


export type QueryRouteArgs = {
  path: Scalars['String'];
};


export type QuerySearchArgs = {
  term: Scalars['String'];
};


export type QuerySearchAutoCompleteArgs = {
  term: Scalars['String'];
};


export type QueryStartPageArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryStoreArgs = {
  id: Scalars['Int'];
};


export type QueryStoresArgs = {
  includeInactive?: Scalars['Boolean'];
};

export type RangeFilterInput = {
  id: Scalars['String'];
  max?: InputMaybe<Scalars['Decimal']>;
  min?: InputMaybe<Scalars['Decimal']>;
};

export type RecommendedProducts = {
  /** Customers who bought this product also bought these products. */
  bought?: Maybe<Array<Maybe<Product>>>;
  /** A shuffled top list of popular products. */
  shuffledToplist?: Maybe<Array<Maybe<Product>>>;
  /** Customers who viewed this product also viewed these products. */
  viewed?: Maybe<Array<Maybe<Product>>>;
};


export type RecommendedProductsBoughtArgs = {
  count?: InputMaybe<Scalars['Int']>;
};


export type RecommendedProductsShuffledToplistArgs = {
  count?: InputMaybe<Scalars['Int']>;
};


export type RecommendedProductsViewedArgs = {
  count?: InputMaybe<Scalars['Int']>;
};

export type RemoveFromCartInput = {
  cartId: Scalars['String'];
  itemId: Scalars['String'];
};

export type RemoveMultipleFromCartInput = {
  cartId: Scalars['String'];
  itemIds: Array<Scalars['String']>;
};

export type RequestPasswordResetResult = {
  success: Scalars['Boolean'];
};

export type ResetPassword = {
  token: Token;
};

/** Represents a route to either a Category, a Product, a Page or the StartPage. */
export type Route = {
  /** Alternative routes for this object, if it exists in another channel and/or in another language.NB: Carries no additional performance cost. */
  alternateRoutes?: Maybe<Array<Maybe<AlternateRoute>>>;
  /** Breadcrumb texts; starting with the root parent, ending on this route. */
  breadcrumbs?: Maybe<Array<Maybe<Scalars['String']>>>;
  canonicalPath?: Maybe<Scalars['String']>;
  /** N.B. for troubleshooting routes only! */
  debug?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  /** The Category, Product, Page or StartPage that the Route resolves to. NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  object?: Maybe<Document>;
  /** Parents are resolved by traversing the path, starting from the end, and are guaranteed to be returned in that order. NB: Carries a performance cost, as asking for this will result in a different, slightly more expensive (the more categories a shop has, the more expensive this gets), route query in the backend. */
  parents?: Maybe<Array<Maybe<Route>>>;
  path: Scalars['String'];
  slug: Scalars['String'];
};

export type SearchAutoCompleteResult = {
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  categories?: Maybe<CategoryAutoCompleteResult>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  products?: Maybe<ProductAutoCompleteResult>;
};


export type SearchAutoCompleteResultCategoriesArgs = {
  first?: InputMaybe<Scalars['Paging']>;
};

export type SearchResult = {
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  categories?: Maybe<CategorySearchResult>;
  products?: Maybe<ProductSearchResult>;
};


export type SearchResultCategoriesArgs = {
  paging?: InputMaybe<PagingInput>;
};


export type SearchResultProductsArgs = {
  filters?: InputMaybe<FilterInput>;
  paging?: InputMaybe<PagingInput>;
};

export type SelectedProductConfiguration = {
  name?: Maybe<Scalars['String']>;
  option: SelectedProductConfigurationOption;
};

export type SelectedProductConfigurationOption = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type SetItemQuantityInput = {
  cartId: Scalars['String'];
  itemId: Scalars['String'];
  quantity: Scalars['Int'];
};

export type Shipping = {
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  freeShippingLimit?: Maybe<FreeShippingLimit>;
};

/** BillingAddress itself is a required field. Whether fields belonging to BillingAddress are required is determined by privateCustomerFields or businessCustomerFields, found on channel.settings.countrySettings. */
export type SignUpBillingAddressInput = {
  city?: InputMaybe<SignUpPropertyInput>;
  co?: InputMaybe<SignUpPropertyInput>;
  company?: InputMaybe<SignUpPropertyInput>;
  companyAtt?: InputMaybe<SignUpPropertyInput>;
  countryCode?: InputMaybe<SignUpPropertyInput>;
  department?: InputMaybe<SignUpPropertyInput>;
  firstName?: InputMaybe<SignUpPropertyInput>;
  lastName?: InputMaybe<SignUpPropertyInput>;
  mobilePhone?: InputMaybe<SignUpPropertyInput>;
  municipality?: InputMaybe<SignUpPropertyInput>;
  phone?: InputMaybe<SignUpPropertyInput>;
  postalCode?: InputMaybe<SignUpPropertyInput>;
  region?: InputMaybe<SignUpPropertyInput>;
  streetName?: InputMaybe<SignUpPropertyInput>;
};

export type SignUpConsentInput = {
  id?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['Boolean']>;
};

export type SignUpDeliveryAddressInput = {
  addressName?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  co?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<Scalars['String']>;
  companyAtt?: InputMaybe<Scalars['String']>;
  countryCode?: InputMaybe<Scalars['String']>;
  department?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  mobilePhone?: InputMaybe<Scalars['String']>;
  municipality?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  postalCode?: InputMaybe<Scalars['String']>;
  region?: InputMaybe<Scalars['String']>;
  streetName?: InputMaybe<Scalars['String']>;
};

export type SignUpInput = {
  billingAddress: SignUpBillingAddressInput;
  consents?: InputMaybe<Array<InputMaybe<SignUpConsentInput>>>;
  deliveryAddresses?: InputMaybe<Array<InputMaybe<SignUpDeliveryAddressInput>>>;
  dynamicContent?: InputMaybe<Scalars['String']>;
  emailAddress: Scalars['String'];
  /** Customer id for external system */
  externalId?: InputMaybe<Scalars['String']>;
  organizationNumber?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  pid?: InputMaybe<Scalars['String']>;
  preferences?: InputMaybe<SignUpPreferencesInput>;
  priceListAccessCode?: InputMaybe<Scalars['String']>;
  type: CustomerType;
};

export type SignUpPreferencesCommunicationInput = {
  acceptsEmail?: InputMaybe<Scalars['Boolean']>;
  acceptsPostal?: InputMaybe<Scalars['Boolean']>;
  acceptsSms?: InputMaybe<Scalars['Boolean']>;
  culture?: InputMaybe<Scalars['String']>;
};

export type SignUpPreferencesInput = {
  storeLocationId?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<SignUpPreferencesCommunicationInput>;
};

/** This input is used for fields that can be auto filled with PersonLookup */
export type SignUpPropertyInput = {
  /** Specifies if the value field is encrypted or not. */
  hasChanged?: InputMaybe<Scalars['Boolean']>;
  /** If the user has made no change this should contain the encrypted value from PersonLookup, otherwise populate with the user input. */
  value?: InputMaybe<Scalars['String']>;
};

export type SignUpResponse = {
  token: Token;
};

export enum SortDirection {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING'
}

export type StartPage = Document & {
  breadcrumbText?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  /** Get content data set via the Content Editor */
  data?: Maybe<Content>;
  /** NB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  head?: Maybe<HtmlHead>;
  id: Scalars['Int'];
  images?: Maybe<Array<Maybe<Image>>>;
  isActive?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<Maybe<StartPageItem>>>;
  name: Scalars['String'];
  /** The primary route of this StartPage */
  primaryRoute?: Maybe<Route>;
};

export type StartPageItem = {
  column?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  item: StartPageItemObject;
  row?: Maybe<Scalars['Int']>;
};

export type StartPageItemObject = CustomItem | Product;

export type StockStatus = {
  buyable: Scalars['Boolean'];
  /** Globally unique id. */
  id: Scalars['ID'];
  maxOrderQuantity?: Maybe<Scalars['Int']>;
  stockDate?: Maybe<Scalars['DateTime']>;
  stockNotificationEnabled?: Maybe<Scalars['Boolean']>;
  /** The stock status id, not globally unique. */
  stockStatusId: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
};

export type Store = {
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  contact?: Maybe<Scalars['String']>;
  coordinates?: Maybe<Coordinates>;
  description?: Maybe<Scalars['String']>;
  externalId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  openHours?: Maybe<Scalars['String']>;
  other?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
};

export type StringValue = {
  value?: Maybe<Scalars['String']>;
};

/**
 * Authorization token that is used for customer actions such as login, delete or update
 * The token contains three different roles:
 * 0: Standard.
 * 1: Lite
 * 2: VoyadoSemiLogin
 */
export type Token = {
  value: Scalars['String'];
};

export type Tracking = {
  fca?: Maybe<FacebookConversionsApi>;
  ga?: Maybe<GoogleAnalytics>;
  gtm?: Maybe<GoogleTagManager>;
};

export type UpdateCartInput = {
  cartId?: InputMaybe<Scalars['String']>;
  items?: InputMaybe<Array<UpdateCartItemInput>>;
};

export type UpdateCartItemInput = {
  comments?: InputMaybe<Array<InputMaybe<InputComment>>>;
  id: Scalars['String'];
  preOrderDate?: InputMaybe<Scalars['DateTime']>;
  quantity?: Scalars['Int'];
};

export type UpdateCartMutation = {
  cart?: Maybe<Cart>;
};

export type UpdateCustomerPriceListResult = {
  success: Scalars['Boolean'];
};

export type UpdateCustomerProductListInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  typeId: Scalars['ID'];
};

export type UpdateCustomerProductListItemInput = {
  articleNumber: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Default value is 1. */
  quantity?: InputMaybe<Scalars['Int']>;
};

/** Responds with a boolean value whether the update has been successful or not */
export type UpdatePasswordResult = {
  success: Scalars['Boolean'];
};

export type Upsell = {
  id: Scalars['ID'];
  items: Array<UpsellItem>;
};

export type UpsellDiscount = UpsellDiscountPercentage | UpsellDiscountValue;

export type UpsellDiscountPercentage = {
  percentage: Scalars['Decimal'];
};

export type UpsellDiscountValue = {
  valueExVat: Scalars['Decimal'];
  valueIncVat: Scalars['Decimal'];
  valueVat: Scalars['Decimal'];
};

export type UpsellItem = {
  discount: UpsellDiscount;
  minQuantity: Scalars['Int'];
  product?: Maybe<Product>;
};

export type Warehouse = {
  location?: Maybe<Store>;
  stockLevel?: Maybe<Scalars['Int']>;
};

export type PaymentType = {
  apiClientId: Scalars['String'];
  availableForBusiness: Scalars['Boolean'];
  availableForPrivate: Scalars['Boolean'];
  name: Scalars['String'];
};

export type RouteQueryVariables = Exact<{ [key: string]: never; }>;


export type RouteQuery = { route?: { id: string, path: string } | null };

export type RouteQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type RouteQueryQuery = { route?: { id: string, path: string } | null };


export const RouteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Route"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"route"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"path"},"value":{"kind":"StringValue","value":"/bikes","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]} as unknown as DocumentNode<RouteQuery, RouteQueryVariables>;
export const RouteQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RouteQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"route"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"path"},"value":{"kind":"StringValue","value":"/bikes","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]} as unknown as DocumentNode<RouteQueryQuery, RouteQueryQueryVariables>;