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
  /** The category's dynamic filtersNB: Carries a performance cost, as asking for this will result in a separate API call in the backend. */
  dynamicFiltering?: Maybe<Array<Maybe<CategoryDynamicFilter>>>;
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

export type CategoryDynamicFilter = {
  type?: Maybe<Scalars['String']>;
  value?: Maybe<CategoryDynamicFilterValue>;
};

export type CategoryDynamicFilterValue = BoolValue | ListStringValue | StringValue;

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

export type CustomerUpdateExternalAttribute = {
  name: Scalars['String'];
  value: Scalars['String'];
};

export type CustomerUpdateInput = {
  billingAddress: CustomerUpdateBillingAddressInput;
  consents?: InputMaybe<Array<InputMaybe<CustomerUpdateConsentInput>>>;
  deliveryAddresses?: InputMaybe<Array<InputMaybe<CustomerUpdateDeliveryAddressInput>>>;
  dynamicContent?: InputMaybe<Scalars['String']>;
  externalAttributes?: InputMaybe<Array<InputMaybe<CustomerUpdateExternalAttribute>>>;
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

export type ListStringValue = {
  value?: Maybe<Array<Maybe<Scalars['String']>>>;
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

export type SignUpExternalAttribute = {
  name: Scalars['String'];
  value: Scalars['String'];
};

export type SignUpInput = {
  billingAddress: SignUpBillingAddressInput;
  consents?: InputMaybe<Array<InputMaybe<SignUpConsentInput>>>;
  deliveryAddresses?: InputMaybe<Array<InputMaybe<SignUpDeliveryAddressInput>>>;
  dynamicContent?: InputMaybe<Scalars['String']>;
  emailAddress: Scalars['String'];
  externalAttributes?: InputMaybe<Array<InputMaybe<SignUpExternalAttribute>>>;
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

export type ContentFragmentFragment = { id: string, items?: Array<{ type: string, children?: Array<{ type: string, properties?: Array<{ name: string, type: string, valueType?: ContentPropertyValueType | null, value?: { boolValue?: boolean | null } | { name: string, images?: Array<{ url?: any | null } | null> | null, primaryRoute?: { path: string } | null } | { value?: string | null, focalPointX?: number | null, focalPointY?: number | null } | { id: number, articleNumber: string, name: string, subName: string, shortDescription: string, description: string, mainHeader: string, primaryRoute?: { id: string, path: string, slug: string, breadcrumbs?: Array<string | null> | null } | null, images?: Array<{ modifiedDate?: string | null, alt?: string | null, title?: string | null, url?: any | null } | null> | null, badges?: Array<{ name?: string | null, url?: any | null, location?: ProductBadgeLocation | null, style?: string | null, text?: string | null } | null> | null, customFields?: Array<{ key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, stringValue: string } | null> | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | { value?: string | null } | null } | null> | null } | null> | null, properties?: Array<{ name: string, type: string, valueType?: ContentPropertyValueType | null, value?: { boolValue?: boolean | null } | { name: string, images?: Array<{ url?: any | null } | null> | null, primaryRoute?: { path: string } | null } | { value?: string | null, focalPointX?: number | null, focalPointY?: number | null } | { id: number, articleNumber: string, name: string, subName: string, shortDescription: string, description: string, mainHeader: string, primaryRoute?: { id: string, path: string, slug: string, breadcrumbs?: Array<string | null> | null } | null, images?: Array<{ modifiedDate?: string | null, alt?: string | null, title?: string | null, url?: any | null } | null> | null, badges?: Array<{ name?: string | null, url?: any | null, location?: ProductBadgeLocation | null, style?: string | null, text?: string | null } | null> | null, customFields?: Array<{ key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, stringValue: string } | null> | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | { value?: string | null } | null } | null> | null } | null> | null };

export type CategoryPageFragment = { id: number, name: string, mainHeader?: string | null, content?: string | null, breadcrumbText?: string | null, isDynamic: boolean, images?: Array<{ width?: number | null, url?: any | null } | null> | null, data?: { id: string, items?: Array<{ type: string, children?: Array<{ type: string, properties?: Array<{ name: string, type: string, valueType?: ContentPropertyValueType | null, value?: { boolValue?: boolean | null } | { name: string, images?: Array<{ url?: any | null } | null> | null, primaryRoute?: { path: string } | null } | { value?: string | null, focalPointX?: number | null, focalPointY?: number | null } | { id: number, articleNumber: string, name: string, subName: string, shortDescription: string, description: string, mainHeader: string, primaryRoute?: { id: string, path: string, slug: string, breadcrumbs?: Array<string | null> | null } | null, images?: Array<{ modifiedDate?: string | null, alt?: string | null, title?: string | null, url?: any | null } | null> | null, badges?: Array<{ name?: string | null, url?: any | null, location?: ProductBadgeLocation | null, style?: string | null, text?: string | null } | null> | null, customFields?: Array<{ key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, stringValue: string } | null> | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | { value?: string | null } | null } | null> | null } | null> | null, properties?: Array<{ name: string, type: string, valueType?: ContentPropertyValueType | null, value?: { boolValue?: boolean | null } | { name: string, images?: Array<{ url?: any | null } | null> | null, primaryRoute?: { path: string } | null } | { value?: string | null, focalPointX?: number | null, focalPointY?: number | null } | { id: number, articleNumber: string, name: string, subName: string, shortDescription: string, description: string, mainHeader: string, primaryRoute?: { id: string, path: string, slug: string, breadcrumbs?: Array<string | null> | null } | null, images?: Array<{ modifiedDate?: string | null, alt?: string | null, title?: string | null, url?: any | null } | null> | null, badges?: Array<{ name?: string | null, url?: any | null, location?: ProductBadgeLocation | null, style?: string | null, text?: string | null } | null> | null, customFields?: Array<{ key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, stringValue: string } | null> | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | { value?: string | null } | null } | null> | null } | null> | null } | null, products?: { totalResults?: number | null, sortOrders?: Array<{ text: string, defaultDirection: SortDirection, value: ProductOrderOptions } | null> | null, filters?: Array<{ __typename: 'BooleanFilter', default?: boolean | null, id: string, name: string } | { __typename: 'ListFilter', id: string, name: string, items: Array<{ id: string, text: string, value: string, resultCount?: number | null } | null> } | { __typename: 'MultiListFilter', id: string, name: string, lists: Array<{ id: string, name: string, items: Array<{ id: string, value: string, text: string, resultCount?: number | null } | null> } | null> } | { __typename: 'NumericRangeFilter', id: string, min: any, max: any, name: string } | null> | null, result: Array<{ id: number, articleNumber: string, name: string, subName: string, isPackage?: boolean | null, primaryRoute?: { id: string, path: string, slug: string } | null, images?: Array<{ alt?: string | null, title?: string | null, url?: any | null, modifiedDate?: string | null } | null> | null, badges?: Array<{ name?: string | null, url?: any | null, location?: ProductBadgeLocation | null, style?: string | null, text?: string | null } | null> | null, canonicalCategory?: { primaryRoute?: { path: string } | null } | null, customFields?: Array<{ key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, stringValue: string } | null> | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | null> } | null };

export type ContentItemFragmentFragment = { type: string, properties?: Array<{ name: string, type: string, valueType?: ContentPropertyValueType | null, value?: { boolValue?: boolean | null } | { name: string, images?: Array<{ url?: any | null } | null> | null, primaryRoute?: { path: string } | null } | { value?: string | null, focalPointX?: number | null, focalPointY?: number | null } | { id: number, articleNumber: string, name: string, subName: string, shortDescription: string, description: string, mainHeader: string, primaryRoute?: { id: string, path: string, slug: string, breadcrumbs?: Array<string | null> | null } | null, images?: Array<{ modifiedDate?: string | null, alt?: string | null, title?: string | null, url?: any | null } | null> | null, badges?: Array<{ name?: string | null, url?: any | null, location?: ProductBadgeLocation | null, style?: string | null, text?: string | null } | null> | null, customFields?: Array<{ key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, stringValue: string } | null> | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | { value?: string | null } | null } | null> | null };

export type StartPageCategoryGridFragment = { name: string, images?: Array<{ url?: any | null } | null> | null, primaryRoute?: { path: string } | null };

export type StartPageProductGridFragment = { id: number, articleNumber: string, name: string, subName: string, shortDescription: string, description: string, mainHeader: string, primaryRoute?: { id: string, path: string, slug: string, breadcrumbs?: Array<string | null> | null } | null, images?: Array<{ modifiedDate?: string | null, alt?: string | null, title?: string | null, url?: any | null } | null> | null, badges?: Array<{ name?: string | null, url?: any | null, location?: ProductBadgeLocation | null, style?: string | null, text?: string | null } | null> | null, customFields?: Array<{ key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, stringValue: string } | null> | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null };

export type ContentPageFragment = { name: string, mainHeader?: string | null, content?: string | null, pageId: string, primaryRoute?: { id: string, path: string } | null, images?: Array<{ url?: any | null } | null> | null, data?: { id: string, items?: Array<{ type: string, children?: Array<{ type: string, properties?: Array<{ name: string, type: string, valueType?: ContentPropertyValueType | null, value?: { boolValue?: boolean | null } | { name: string, images?: Array<{ url?: any | null } | null> | null, primaryRoute?: { path: string } | null } | { value?: string | null, focalPointX?: number | null, focalPointY?: number | null } | { id: number, articleNumber: string, name: string, subName: string, shortDescription: string, description: string, mainHeader: string, primaryRoute?: { id: string, path: string, slug: string, breadcrumbs?: Array<string | null> | null } | null, images?: Array<{ modifiedDate?: string | null, alt?: string | null, title?: string | null, url?: any | null } | null> | null, badges?: Array<{ name?: string | null, url?: any | null, location?: ProductBadgeLocation | null, style?: string | null, text?: string | null } | null> | null, customFields?: Array<{ key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, stringValue: string } | null> | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | { value?: string | null } | null } | null> | null } | null> | null, properties?: Array<{ name: string, type: string, valueType?: ContentPropertyValueType | null, value?: { boolValue?: boolean | null } | { name: string, images?: Array<{ url?: any | null } | null> | null, primaryRoute?: { path: string } | null } | { value?: string | null, focalPointX?: number | null, focalPointY?: number | null } | { id: number, articleNumber: string, name: string, subName: string, shortDescription: string, description: string, mainHeader: string, primaryRoute?: { id: string, path: string, slug: string, breadcrumbs?: Array<string | null> | null } | null, images?: Array<{ modifiedDate?: string | null, alt?: string | null, title?: string | null, url?: any | null } | null> | null, badges?: Array<{ name?: string | null, url?: any | null, location?: ProductBadgeLocation | null, style?: string | null, text?: string | null } | null> | null, customFields?: Array<{ key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, stringValue: string } | null> | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | { value?: string | null } | null } | null> | null } | null> | null } | null, parent?: { id: string, name: string, primaryRoute?: { id: string, path: string } | null, subPages?: Array<{ id: string, name: string, primaryRoute?: { id: string, path: string } | null }> | null } | null, subPages?: Array<{ id: string, name: string, primaryRoute?: { id: string, path: string } | null }> | null };

export type SubPageFragment = { id: string, name: string, primaryRoute?: { id: string, path: string } | null };

export type InPackagesFragment = { inPackages?: Array<{ id: number, name: string, primaryRoute?: { id: string, path: string } | null }> | null };

export type ProductGridFragment = { id: number, articleNumber: string, name: string, subName: string, isPackage?: boolean | null, primaryRoute?: { id: string, path: string, slug: string } | null, images?: Array<{ alt?: string | null, title?: string | null, url?: any | null, modifiedDate?: string | null } | null> | null, badges?: Array<{ name?: string | null, url?: any | null, location?: ProductBadgeLocation | null, style?: string | null, text?: string | null } | null> | null, canonicalCategory?: { primaryRoute?: { path: string } | null } | null, customFields?: Array<{ key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, stringValue: string } | null> | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null };

export type ProductPageFragment = { id: number, articleNumber: string, name: string, subName: string, breadcrumbText?: string | null, shortDescription: string, description: string, hasVariants: boolean, isPackage?: boolean | null, hasConfigurations: boolean, canonicalCategory?: { primaryRoute?: { path: string } | null } | null, categories?: Array<{ primaryRoute?: { path: string } | null } | null> | null, primaryRoute?: { path: string, id: string, breadcrumbs?: Array<string | null> | null } | null, stockStatus?: { buyable: boolean, maxOrderQuantity?: number | null, stockDate?: any | null, stockNotificationEnabled?: boolean | null, text?: string | null } | null, warehouseStock?: Array<{ stockLevel?: number | null, location?: { id: number, name?: string | null } | null } | null> | null, variants?: { options: Array<{ name?: string | null, values: Array<string | null> } | null>, values: Array<{ values: Array<string | null>, articleNumber: string, warehouseStock?: Array<{ stockLevel?: number | null, location?: { id: number, name?: string | null } | null } | null> | null, images?: Array<{ url?: any | null, modifiedDate?: string | null } | null> | null, stockStatus?: { buyable: boolean, maxOrderQuantity?: number | null, stockDate?: any | null, stockNotificationEnabled?: boolean | null, text?: string | null } | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | null> } | null, images?: Array<{ alt?: string | null, title?: string | null, url?: any | null, modifiedDate?: string | null } | null> | null, relatedProducts?: Array<{ id: number, articleNumber: string, name: string, subName: string, isPackage?: boolean | null, primaryRoute?: { id: string, path: string, slug: string } | null, images?: Array<{ alt?: string | null, title?: string | null, url?: any | null, modifiedDate?: string | null } | null> | null, badges?: Array<{ name?: string | null, url?: any | null, location?: ProductBadgeLocation | null, style?: string | null, text?: string | null } | null> | null, canonicalCategory?: { primaryRoute?: { path: string } | null } | null, customFields?: Array<{ key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, stringValue: string } | null> | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | null> | null, customFields?: Array<{ key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, boolValue: boolean } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, htmlValue: string } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, listValues?: Array<string | null> | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, items?: Array<{ id: number, parentId?: number | null, title: string, value: string } | null> | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, stringValue: string } | null> | null, badges?: Array<{ name?: string | null, url?: any | null, location?: ProductBadgeLocation | null, style?: string | null, text?: string | null } | null> | null, preOrder?: { fromDate?: any | null, toDate?: any | null } | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null, customerComments?: Array<{ name: string, required: boolean } | null> | null, inPackages?: Array<{ id: number, name: string, primaryRoute?: { id: string, path: string } | null }> | null, configurations?: Array<{ name?: string | null, options: Array<{ id: string, name?: string | null, price?: { exVat: any, incVat: any, vat: any } | null, priceCalculation?: { formula?: string | null, id: string, name?: string | null, variables?: Array<{ id: string, name?: string | null } | null> | null } | null } | null> } | null> | null, campaigns?: Array<{ id: number, name: string, primaryRoute?: { id: string, path: string } | null } | null> | null };

export type StartPageFragment = { isActive?: boolean | null, breadcrumbText?: string | null, name: string, content?: string | null, head?: { title?: string | null, metaTags?: Array<{ name?: string | null, content?: string | null } | null> | null } | null, primaryRoute?: { canonicalPath?: string | null, alternateRoutes?: Array<{ channelId?: number | null, culture?: string | null, route?: string | null, alias?: string | null } | null> | null } | null, images?: Array<{ url?: any | null, width?: number | null, title?: string | null, height?: number | null } | null> | null, data?: { id: string, items?: Array<{ type: string, children?: Array<{ type: string, properties?: Array<{ name: string, type: string, valueType?: ContentPropertyValueType | null, value?: { boolValue?: boolean | null } | { name: string, images?: Array<{ url?: any | null } | null> | null, primaryRoute?: { path: string } | null } | { value?: string | null, focalPointX?: number | null, focalPointY?: number | null } | { id: number, articleNumber: string, name: string, subName: string, shortDescription: string, description: string, mainHeader: string, primaryRoute?: { id: string, path: string, slug: string, breadcrumbs?: Array<string | null> | null } | null, images?: Array<{ modifiedDate?: string | null, alt?: string | null, title?: string | null, url?: any | null } | null> | null, badges?: Array<{ name?: string | null, url?: any | null, location?: ProductBadgeLocation | null, style?: string | null, text?: string | null } | null> | null, customFields?: Array<{ key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, stringValue: string } | null> | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | { value?: string | null } | null } | null> | null } | null> | null, properties?: Array<{ name: string, type: string, valueType?: ContentPropertyValueType | null, value?: { boolValue?: boolean | null } | { name: string, images?: Array<{ url?: any | null } | null> | null, primaryRoute?: { path: string } | null } | { value?: string | null, focalPointX?: number | null, focalPointY?: number | null } | { id: number, articleNumber: string, name: string, subName: string, shortDescription: string, description: string, mainHeader: string, primaryRoute?: { id: string, path: string, slug: string, breadcrumbs?: Array<string | null> | null } | null, images?: Array<{ modifiedDate?: string | null, alt?: string | null, title?: string | null, url?: any | null } | null> | null, badges?: Array<{ name?: string | null, url?: any | null, location?: ProductBadgeLocation | null, style?: string | null, text?: string | null } | null> | null, customFields?: Array<{ key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, stringValue: string } | null> | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | { value?: string | null } | null } | null> | null } | null> | null } | null };

export type WarehouseStockFragment = { stockLevel?: number | null, location?: { id: number, name?: string | null } | null };

export type AddToCartMutationVariables = Exact<{
  input: AddToCartInput;
}>;


export type AddToCartMutation = { addToCart?: { cart?: { id?: string | null, externalCheckoutUrl?: any | null, totalQuantity?: number | null, productTotal?: { incVat: any, exVat: any, vat: any } | null, productPreviousTotal?: { incVat: any, exVat: any, vat: any } | null, discountTotal?: { incVat: any, exVat: any, vat: any } | null, aggregatedDiscounts?: Array<{ name?: string | null, description?: string | null, value?: { incVat: any, exVat: any, vat: any } | null, campaign?: { name: string } | null } | null> | null, items?: Array<{ id: string, quantity: number, articleNumber: string, subHeading?: string | null, variant?: { values: Array<string | null>, articleNumber: string, images?: Array<{ modifiedDate?: string | null, url?: any | null, alt?: string | null, title?: string | null } | null> | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | null, configurations?: Array<{ name?: string | null, option: { id: string, name?: string | null } } | null> | null, discounts?: Array<{ name?: string | null, description?: string | null, value?: { incVat: any, exVat: any, vat: any } | null } | null> | null, discount?: { incVat: any, exVat: any, vat: any } | null, total: { incVat: any, exVat: any, vat: any }, previousTotal: { incVat: any, exVat: any, vat: any }, product?: { id: number, name: string, articleNumber: string, primaryRoute?: { id: string, path: string } | null, images?: Array<{ modifiedDate?: string | null, alt?: string | null, title?: string | null, url?: any | null } | null> | null, canonicalCategory?: { primaryRoute?: { path: string } | null } | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | null } | null> | null } | null } | null };

export type AutocompleteQueryVariables = Exact<{
  term: Scalars['String'];
}>;


export type AutocompleteQuery = { searchAutoComplete?: { categories?: { result?: Array<{ id: number, name: string, primaryRoute?: { id: string, slug: string, path: string, breadcrumbs?: Array<string | null> | null } | null } | null> | null } | null, products?: { result: Array<{ name: string, id: number, primaryRoute?: { id: string, slug: string, path: string } | null } | null> } | null } | null };

export type CartQueryVariables = Exact<{
  cartId?: InputMaybe<Scalars['String']>;
}>;


export type CartQuery = { cart?: { id?: string | null, externalCheckoutUrl?: any | null, totalQuantity?: number | null, productTotal?: { incVat: any, exVat: any, vat: any } | null, productPreviousTotal?: { incVat: any, exVat: any, vat: any } | null, discountTotal?: { incVat: any, exVat: any, vat: any } | null, aggregatedDiscounts?: Array<{ name?: string | null, description?: string | null, value?: { incVat: any, exVat: any, vat: any } | null, campaign?: { name: string } | null } | null> | null, items?: Array<{ id: string, quantity: number, articleNumber: string, subHeading?: string | null, variant?: { values: Array<string | null>, articleNumber: string, images?: Array<{ modifiedDate?: string | null, url?: any | null, alt?: string | null, title?: string | null } | null> | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | null, configurations?: Array<{ name?: string | null, option: { id: string, name?: string | null } } | null> | null, discounts?: Array<{ name?: string | null, description?: string | null, value?: { incVat: any, exVat: any, vat: any } | null } | null> | null, discount?: { incVat: any, exVat: any, vat: any } | null, total: { incVat: any, exVat: any, vat: any }, previousTotal: { incVat: any, exVat: any, vat: any }, product?: { id: number, name: string, articleNumber: string, primaryRoute?: { id: string, path: string } | null, images?: Array<{ modifiedDate?: string | null, alt?: string | null, title?: string | null, url?: any | null } | null> | null, canonicalCategory?: { primaryRoute?: { path: string } | null } | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | null } | null> | null } | null };

export type NavTreeQueryVariables = Exact<{
  root?: InputMaybe<Scalars['Int']>;
  levels?: InputMaybe<Scalars['Int']>;
  includeHidden?: InputMaybe<Scalars['Boolean']>;
}>;


export type NavTreeQuery = { categories: Array<{ id: number, name: string, level: number, parentId?: number | null, hasSubcategories?: boolean | null, subcategories?: Array<{ id: number, name: string, level: number, parentId?: number | null, hasSubcategories?: boolean | null, primaryRoute?: { id: string, path: string } | null } | null> | null, primaryRoute?: { id: string, path: string } | null } | null> };

export type CategoriesWithSubcategoriesFragment = { id: number, name: string, level: number, parentId?: number | null, hasSubcategories?: boolean | null, subcategories?: Array<{ id: number, name: string, level: number, parentId?: number | null, hasSubcategories?: boolean | null, primaryRoute?: { id: string, path: string } | null } | null> | null, primaryRoute?: { id: string, path: string } | null };

export type CategoryDetailFragment = { id: number, name: string, level: number, parentId?: number | null, hasSubcategories?: boolean | null, primaryRoute?: { id: string, path: string } | null };

export type PagesQueryVariables = Exact<{ [key: string]: never; }>;


export type PagesQuery = { pages: Array<{ name: string, id: string, primaryRoute?: { id: string, path: string } | null, subPages?: Array<{ id: string, name: string, primaryRoute?: { id: string, path: string } | null }> | null } | null> };

export type ProductVariantsQueryVariables = Exact<{
  articleNumber: Scalars['String'];
}>;


export type ProductVariantsQuery = { product?: { id: number, articleNumber: string, variants?: { options: Array<{ name?: string | null, values: Array<string | null> } | null>, values: Array<{ articleNumber: string, values: Array<string | null> } | null> } | null } | null };

export type RouteQueryVariables = Exact<{
  path: Scalars['String'];
  first?: InputMaybe<Scalars['Paging']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProductOrderOptions>;
  orderByDirection?: InputMaybe<SortDirection>;
  filters?: InputMaybe<FilterInput>;
}>;


export type RouteQuery = { route?: { id: string, path: string, slug: string, canonicalPath?: string | null, breadcrumbs?: Array<string | null> | null, object?: { __typename: 'Category', id: number, name: string, mainHeader?: string | null, content?: string | null, breadcrumbText?: string | null, isDynamic: boolean, head?: { title?: string | null, metaTags?: Array<{ name?: string | null, content?: string | null } | null> | null } | null, images?: Array<{ width?: number | null, url?: any | null } | null> | null, data?: { id: string, items?: Array<{ type: string, children?: Array<{ type: string, properties?: Array<{ name: string, type: string, valueType?: ContentPropertyValueType | null, value?: { boolValue?: boolean | null } | { name: string, images?: Array<{ url?: any | null } | null> | null, primaryRoute?: { path: string } | null } | { value?: string | null, focalPointX?: number | null, focalPointY?: number | null } | { id: number, articleNumber: string, name: string, subName: string, shortDescription: string, description: string, mainHeader: string, primaryRoute?: { id: string, path: string, slug: string, breadcrumbs?: Array<string | null> | null } | null, images?: Array<{ modifiedDate?: string | null, alt?: string | null, title?: string | null, url?: any | null } | null> | null, badges?: Array<{ name?: string | null, url?: any | null, location?: ProductBadgeLocation | null, style?: string | null, text?: string | null } | null> | null, customFields?: Array<{ key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, stringValue: string } | null> | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | { value?: string | null } | null } | null> | null } | null> | null, properties?: Array<{ name: string, type: string, valueType?: ContentPropertyValueType | null, value?: { boolValue?: boolean | null } | { name: string, images?: Array<{ url?: any | null } | null> | null, primaryRoute?: { path: string } | null } | { value?: string | null, focalPointX?: number | null, focalPointY?: number | null } | { id: number, articleNumber: string, name: string, subName: string, shortDescription: string, description: string, mainHeader: string, primaryRoute?: { id: string, path: string, slug: string, breadcrumbs?: Array<string | null> | null } | null, images?: Array<{ modifiedDate?: string | null, alt?: string | null, title?: string | null, url?: any | null } | null> | null, badges?: Array<{ name?: string | null, url?: any | null, location?: ProductBadgeLocation | null, style?: string | null, text?: string | null } | null> | null, customFields?: Array<{ key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, stringValue: string } | null> | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | { value?: string | null } | null } | null> | null } | null> | null } | null, products?: { totalResults?: number | null, sortOrders?: Array<{ text: string, defaultDirection: SortDirection, value: ProductOrderOptions } | null> | null, filters?: Array<{ __typename: 'BooleanFilter', default?: boolean | null, id: string, name: string } | { __typename: 'ListFilter', id: string, name: string, items: Array<{ id: string, text: string, value: string, resultCount?: number | null } | null> } | { __typename: 'MultiListFilter', id: string, name: string, lists: Array<{ id: string, name: string, items: Array<{ id: string, value: string, text: string, resultCount?: number | null } | null> } | null> } | { __typename: 'NumericRangeFilter', id: string, min: any, max: any, name: string } | null> | null, result: Array<{ id: number, articleNumber: string, name: string, subName: string, isPackage?: boolean | null, primaryRoute?: { id: string, path: string, slug: string } | null, images?: Array<{ alt?: string | null, title?: string | null, url?: any | null, modifiedDate?: string | null } | null> | null, badges?: Array<{ name?: string | null, url?: any | null, location?: ProductBadgeLocation | null, style?: string | null, text?: string | null } | null> | null, canonicalCategory?: { primaryRoute?: { path: string } | null } | null, customFields?: Array<{ key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, stringValue: string } | null> | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | null> } | null } | { __typename: 'Page', name: string, mainHeader?: string | null, content?: string | null, pageId: string, head?: { title?: string | null, metaTags?: Array<{ name?: string | null, content?: string | null } | null> | null } | null, primaryRoute?: { id: string, path: string } | null, images?: Array<{ url?: any | null } | null> | null, data?: { id: string, items?: Array<{ type: string, children?: Array<{ type: string, properties?: Array<{ name: string, type: string, valueType?: ContentPropertyValueType | null, value?: { boolValue?: boolean | null } | { name: string, images?: Array<{ url?: any | null } | null> | null, primaryRoute?: { path: string } | null } | { value?: string | null, focalPointX?: number | null, focalPointY?: number | null } | { id: number, articleNumber: string, name: string, subName: string, shortDescription: string, description: string, mainHeader: string, primaryRoute?: { id: string, path: string, slug: string, breadcrumbs?: Array<string | null> | null } | null, images?: Array<{ modifiedDate?: string | null, alt?: string | null, title?: string | null, url?: any | null } | null> | null, badges?: Array<{ name?: string | null, url?: any | null, location?: ProductBadgeLocation | null, style?: string | null, text?: string | null } | null> | null, customFields?: Array<{ key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, stringValue: string } | null> | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | { value?: string | null } | null } | null> | null } | null> | null, properties?: Array<{ name: string, type: string, valueType?: ContentPropertyValueType | null, value?: { boolValue?: boolean | null } | { name: string, images?: Array<{ url?: any | null } | null> | null, primaryRoute?: { path: string } | null } | { value?: string | null, focalPointX?: number | null, focalPointY?: number | null } | { id: number, articleNumber: string, name: string, subName: string, shortDescription: string, description: string, mainHeader: string, primaryRoute?: { id: string, path: string, slug: string, breadcrumbs?: Array<string | null> | null } | null, images?: Array<{ modifiedDate?: string | null, alt?: string | null, title?: string | null, url?: any | null } | null> | null, badges?: Array<{ name?: string | null, url?: any | null, location?: ProductBadgeLocation | null, style?: string | null, text?: string | null } | null> | null, customFields?: Array<{ key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, stringValue: string } | null> | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | { value?: string | null } | null } | null> | null } | null> | null } | null, parent?: { id: string, name: string, primaryRoute?: { id: string, path: string } | null, subPages?: Array<{ id: string, name: string, primaryRoute?: { id: string, path: string } | null }> | null } | null, subPages?: Array<{ id: string, name: string, primaryRoute?: { id: string, path: string } | null }> | null } | { __typename: 'Product', id: number, articleNumber: string, name: string, subName: string, breadcrumbText?: string | null, shortDescription: string, description: string, hasVariants: boolean, isPackage?: boolean | null, hasConfigurations: boolean, head?: { title?: string | null, metaTags?: Array<{ name?: string | null, content?: string | null } | null> | null } | null, canonicalCategory?: { primaryRoute?: { path: string } | null } | null, categories?: Array<{ primaryRoute?: { path: string } | null } | null> | null, primaryRoute?: { path: string, id: string, breadcrumbs?: Array<string | null> | null } | null, stockStatus?: { buyable: boolean, maxOrderQuantity?: number | null, stockDate?: any | null, stockNotificationEnabled?: boolean | null, text?: string | null } | null, warehouseStock?: Array<{ stockLevel?: number | null, location?: { id: number, name?: string | null } | null } | null> | null, variants?: { options: Array<{ name?: string | null, values: Array<string | null> } | null>, values: Array<{ values: Array<string | null>, articleNumber: string, warehouseStock?: Array<{ stockLevel?: number | null, location?: { id: number, name?: string | null } | null } | null> | null, images?: Array<{ url?: any | null, modifiedDate?: string | null } | null> | null, stockStatus?: { buyable: boolean, maxOrderQuantity?: number | null, stockDate?: any | null, stockNotificationEnabled?: boolean | null, text?: string | null } | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | null> } | null, images?: Array<{ alt?: string | null, title?: string | null, url?: any | null, modifiedDate?: string | null } | null> | null, relatedProducts?: Array<{ id: number, articleNumber: string, name: string, subName: string, isPackage?: boolean | null, primaryRoute?: { id: string, path: string, slug: string } | null, images?: Array<{ alt?: string | null, title?: string | null, url?: any | null, modifiedDate?: string | null } | null> | null, badges?: Array<{ name?: string | null, url?: any | null, location?: ProductBadgeLocation | null, style?: string | null, text?: string | null } | null> | null, canonicalCategory?: { primaryRoute?: { path: string } | null } | null, customFields?: Array<{ key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, stringValue: string } | null> | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | null> | null, customFields?: Array<{ key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, boolValue: boolean } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, htmlValue: string } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, listValues?: Array<string | null> | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, items?: Array<{ id: number, parentId?: number | null, title: string, value: string } | null> | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, stringValue: string } | null> | null, badges?: Array<{ name?: string | null, url?: any | null, location?: ProductBadgeLocation | null, style?: string | null, text?: string | null } | null> | null, preOrder?: { fromDate?: any | null, toDate?: any | null } | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null, customerComments?: Array<{ name: string, required: boolean } | null> | null, inPackages?: Array<{ id: number, name: string, primaryRoute?: { id: string, path: string } | null }> | null, configurations?: Array<{ name?: string | null, options: Array<{ id: string, name?: string | null, price?: { exVat: any, incVat: any, vat: any } | null, priceCalculation?: { formula?: string | null, id: string, name?: string | null, variables?: Array<{ id: string, name?: string | null } | null> | null } | null } | null> } | null> | null, campaigns?: Array<{ id: number, name: string, primaryRoute?: { id: string, path: string } | null } | null> | null } | { __typename: 'StartPage', isActive?: boolean | null, breadcrumbText?: string | null, name: string, content?: string | null, head?: { title?: string | null, metaTags?: Array<{ name?: string | null, content?: string | null } | null> | null } | null, primaryRoute?: { canonicalPath?: string | null, alternateRoutes?: Array<{ channelId?: number | null, culture?: string | null, route?: string | null, alias?: string | null } | null> | null } | null, images?: Array<{ url?: any | null, width?: number | null, title?: string | null, height?: number | null } | null> | null, data?: { id: string, items?: Array<{ type: string, children?: Array<{ type: string, properties?: Array<{ name: string, type: string, valueType?: ContentPropertyValueType | null, value?: { boolValue?: boolean | null } | { name: string, images?: Array<{ url?: any | null } | null> | null, primaryRoute?: { path: string } | null } | { value?: string | null, focalPointX?: number | null, focalPointY?: number | null } | { id: number, articleNumber: string, name: string, subName: string, shortDescription: string, description: string, mainHeader: string, primaryRoute?: { id: string, path: string, slug: string, breadcrumbs?: Array<string | null> | null } | null, images?: Array<{ modifiedDate?: string | null, alt?: string | null, title?: string | null, url?: any | null } | null> | null, badges?: Array<{ name?: string | null, url?: any | null, location?: ProductBadgeLocation | null, style?: string | null, text?: string | null } | null> | null, customFields?: Array<{ key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, stringValue: string } | null> | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | { value?: string | null } | null } | null> | null } | null> | null, properties?: Array<{ name: string, type: string, valueType?: ContentPropertyValueType | null, value?: { boolValue?: boolean | null } | { name: string, images?: Array<{ url?: any | null } | null> | null, primaryRoute?: { path: string } | null } | { value?: string | null, focalPointX?: number | null, focalPointY?: number | null } | { id: number, articleNumber: string, name: string, subName: string, shortDescription: string, description: string, mainHeader: string, primaryRoute?: { id: string, path: string, slug: string, breadcrumbs?: Array<string | null> | null } | null, images?: Array<{ modifiedDate?: string | null, alt?: string | null, title?: string | null, url?: any | null } | null> | null, badges?: Array<{ name?: string | null, url?: any | null, location?: ProductBadgeLocation | null, style?: string | null, text?: string | null } | null> | null, customFields?: Array<{ key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, stringValue: string } | null> | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | { value?: string | null } | null } | null> | null } | null> | null } | null } | null, parents?: Array<{ id: string, path: string, slug: string } | null> | null, alternateRoutes?: Array<{ channelId?: number | null, culture?: string | null, route?: string | null, alias?: string | null } | null> | null } | null };

export type SearchQueryVariables = Exact<{
  term: Scalars['String'];
  first?: InputMaybe<Scalars['Paging']>;
  offset?: InputMaybe<Scalars['Int']>;
  filters?: InputMaybe<FilterInput>;
}>;


export type SearchQuery = { search?: { products?: { totalResults?: number | null, filters?: Array<{ default?: boolean | null, id: string, name: string } | { id: string, name: string, items: Array<{ id: string, text: string, value: string, resultCount?: number | null } | null> } | { id: string, name: string, lists: Array<{ id: string, name: string, items: Array<{ id: string, value: string, text: string, resultCount?: number | null } | null> } | null> } | { id: string, min: any, max: any, name: string } | null> | null, result: Array<{ id: number, articleNumber: string, name: string, subName: string, isPackage?: boolean | null, primaryRoute?: { id: string, path: string, slug: string } | null, images?: Array<{ alt?: string | null, title?: string | null, url?: any | null, modifiedDate?: string | null } | null> | null, badges?: Array<{ name?: string | null, url?: any | null, location?: ProductBadgeLocation | null, style?: string | null, text?: string | null } | null> | null, canonicalCategory?: { primaryRoute?: { path: string } | null } | null, customFields?: Array<{ key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null } | { key?: string | null, type?: ProductCustomFieldType | null, title?: string | null, stringValue: string } | null> | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | null> } | null } | null };

export type BadgeFragment = { name?: string | null, url?: any | null, location?: ProductBadgeLocation | null, style?: string | null, text?: string | null };

export type CartCoreFragmentFragment = { id?: string | null, externalCheckoutUrl?: any | null, totalQuantity?: number | null, productTotal?: { incVat: any, exVat: any, vat: any } | null, productPreviousTotal?: { incVat: any, exVat: any, vat: any } | null, discountTotal?: { incVat: any, exVat: any, vat: any } | null, aggregatedDiscounts?: Array<{ name?: string | null, description?: string | null, value?: { incVat: any, exVat: any, vat: any } | null, campaign?: { name: string } | null } | null> | null, items?: Array<{ id: string, quantity: number, articleNumber: string, subHeading?: string | null, variant?: { values: Array<string | null>, articleNumber: string, images?: Array<{ modifiedDate?: string | null, url?: any | null, alt?: string | null, title?: string | null } | null> | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | null, configurations?: Array<{ name?: string | null, option: { id: string, name?: string | null } } | null> | null, discounts?: Array<{ name?: string | null, description?: string | null, value?: { incVat: any, exVat: any, vat: any } | null } | null> | null, discount?: { incVat: any, exVat: any, vat: any } | null, total: { incVat: any, exVat: any, vat: any }, previousTotal: { incVat: any, exVat: any, vat: any }, product?: { id: number, name: string, articleNumber: string, primaryRoute?: { id: string, path: string } | null, images?: Array<{ modifiedDate?: string | null, alt?: string | null, title?: string | null, url?: any | null } | null> | null, canonicalCategory?: { primaryRoute?: { path: string } | null } | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | null } | null> | null };

export type CurrencyFragmentFragment = { id: string, name?: string | null, isDefault?: boolean | null, format?: { code: string, decimals: number } | null };

export type ChannelsFragmentFragment = { id: number, name?: string | null, url?: any | null, isDefault?: boolean | null, displayName?: string | null, imageUrl?: string | null, requiresAuth?: boolean | null, countries?: Array<{ name?: string | null, code?: string | null, isDefault?: boolean | null } | null> | null, languages?: Array<{ culture: string, name: string, isDefault?: boolean | null } | null> | null, currencies?: Array<{ id: string, name?: string | null, isDefault?: boolean | null, format?: { code: string, decimals: number } | null } | null> | null, defaultCurrency?: { id: string, name?: string | null, isDefault?: boolean | null, format?: { code: string, decimals: number } | null } | null, defaultLanguage?: { culture: string, name: string, isDefault?: boolean | null } | null, settings?: { nostoAccountId?: string | null, pricesIncVat?: boolean | null, tracking?: { ga?: { trackingId?: string | null, useArticleNumberAsId?: boolean | null } | null, gtm?: { containerId?: string | null } | null, fca?: { accessToken?: string | null, pixelId?: string | null } | null } | null } | null };

export type CommentsFragmentFragment = { customerComments?: Array<{ name: string, required: boolean } | null> | null };

type Head_Category_Fragment = { head?: { title?: string | null, metaTags?: Array<{ name?: string | null, content?: string | null } | null> | null } | null };

type Head_Page_Fragment = { head?: { title?: string | null, metaTags?: Array<{ name?: string | null, content?: string | null } | null> | null } | null };

type Head_Product_Fragment = { head?: { title?: string | null, metaTags?: Array<{ name?: string | null, content?: string | null } | null> | null } | null };

type Head_StartPage_Fragment = { head?: { title?: string | null, metaTags?: Array<{ name?: string | null, content?: string | null } | null> | null } | null };

export type HeadFragment = Head_Category_Fragment | Head_Page_Fragment | Head_Product_Fragment | Head_StartPage_Fragment;

export type PriceFragment = { incVat: any, exVat: any, vat: any };

export type ProductCampaignFragment = { campaigns?: Array<{ id: number, name: string, primaryRoute?: { id: string, path: string } | null } | null> | null };

export type ProductConfigurationsFragment = { hasConfigurations: boolean, configurations?: Array<{ name?: string | null, options: Array<{ id: string, name?: string | null, price?: { exVat: any, incVat: any, vat: any } | null, priceCalculation?: { formula?: string | null, id: string, name?: string | null, variables?: Array<{ id: string, name?: string | null } | null> | null } | null } | null> } | null> | null };

export type MinimalProductListDetailFragment = { id: string, name?: string | null, items?: Array<{ variant?: { articleNumber: string } | null, product?: { articleNumber: string } | null } | null> | null };

export type VariantDetailFragment = { id: string, articleNumber: string, values: Array<string | null>, stockStatus?: { buyable: boolean, text?: string | null } | null, images?: Array<{ modifiedDate?: string | null, alt?: string | null, title?: string | null, url?: any | null } | null> | null };

export type VariantsDetailFragment = { options: Array<{ name?: string | null, values: Array<string | null> } | null>, values: Array<{ id: string, articleNumber: string, values: Array<string | null>, stockStatus?: { buyable: boolean, text?: string | null } | null, images?: Array<{ modifiedDate?: string | null, alt?: string | null, title?: string | null, url?: any | null } | null> | null } | null> };

export type ProductDetailFragment = { id: number, articleNumber: string, name: string, subName: string, hasConfigurations: boolean, hasVariants: boolean, isPreOrder?: boolean | null, isPackage?: boolean | null, stockStatus?: { buyable: boolean, text?: string | null } | null, primaryRoute?: { id: string, path: string, slug: string } | null, badges?: Array<{ name?: string | null, url?: any | null, location?: ProductBadgeLocation | null, style?: string | null, text?: string | null } | null> | null, images?: Array<{ modifiedDate?: string | null, alt?: string | null, title?: string | null, url?: any | null } | null> | null, variants?: { options: Array<{ name?: string | null, values: Array<string | null> } | null>, values: Array<{ id: string, articleNumber: string, values: Array<string | null>, stockStatus?: { buyable: boolean, text?: string | null } | null, images?: Array<{ modifiedDate?: string | null, alt?: string | null, title?: string | null, url?: any | null } | null> | null } | null> } | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null };

export type ProductListFragmentFragment = { id: string, description?: string | null, name?: string | null, shareToken?: string | null, items?: Array<{ quantity?: number | null, description?: string | null, product?: { id: number, articleNumber: string, name: string, subName: string, hasConfigurations: boolean, hasVariants: boolean, isPreOrder?: boolean | null, isPackage?: boolean | null, stockStatus?: { buyable: boolean, text?: string | null } | null, primaryRoute?: { id: string, path: string, slug: string } | null, badges?: Array<{ name?: string | null, url?: any | null, location?: ProductBadgeLocation | null, style?: string | null, text?: string | null } | null> | null, images?: Array<{ modifiedDate?: string | null, alt?: string | null, title?: string | null, url?: any | null } | null> | null, variants?: { options: Array<{ name?: string | null, values: Array<string | null> } | null>, values: Array<{ id: string, articleNumber: string, values: Array<string | null>, stockStatus?: { buyable: boolean, text?: string | null } | null, images?: Array<{ modifiedDate?: string | null, alt?: string | null, title?: string | null, url?: any | null } | null> | null } | null> } | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null } | null, variant?: { id: string, articleNumber: string, values: Array<string | null>, stockStatus?: { buyable: boolean, text?: string | null } | null, images?: Array<{ modifiedDate?: string | null, alt?: string | null, title?: string | null, url?: any | null } | null> | null } | null } | null> | null };

export type ProductMetadataFragment = { name: string, articleNumber: string, description: string, images?: Array<{ modifiedDate?: string | null, alt?: string | null, title?: string | null, url?: any | null } | null> | null, primaryRoute?: { id: string, path: string } | null, canonicalCategory?: { name: string } | null, price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null };

export type ProductPriceFragment = { price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null };

export type ProductVariantPriceFragment = { price?: { incVat: any, exVat: any, vat: any } | null, previousPrice?: { incVat: any, exVat: any, vat: any } | null };

export type RouteCrumbFragment = { id: string, path: string, slug: string, canonicalPath?: string | null, parents?: Array<{ id: string, path: string, slug: string, object?: { breadcrumbText?: string | null } | { breadcrumbText?: string | null } | { breadcrumbText?: string | null } | { breadcrumbText?: string | null } | null } | null> | null, alternateRoutes?: Array<{ channelId?: number | null, culture?: string | null, route?: string | null, alias?: string | null } | null> | null };

export type RouteMetaFragment = { id: string, path: string, slug: string, canonicalPath?: string | null, breadcrumbs?: Array<string | null> | null, parents?: Array<{ id: string, path: string, slug: string } | null> | null, alternateRoutes?: Array<{ channelId?: number | null, culture?: string | null, route?: string | null, alias?: string | null } | null> | null };

export type StockStatusFragment = { buyable: boolean, maxOrderQuantity?: number | null, stockDate?: any | null, stockNotificationEnabled?: boolean | null, text?: string | null };

export const PriceFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Price"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Price"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"incVat"}},{"kind":"Field","name":{"kind":"Name","value":"exVat"}},{"kind":"Field","name":{"kind":"Name","value":"vat"}}]}}]} as unknown as DocumentNode<PriceFragment, unknown>;
export const ProductPriceFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductPrice"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"previousPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Price"}}]}}]}},...PriceFragmentDoc.definitions]} as unknown as DocumentNode<ProductPriceFragment, unknown>;
export const BadgeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Badge"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductBadge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"style"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]} as unknown as DocumentNode<BadgeFragment, unknown>;
export const StartPageProductGridFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StartPageProductGrid"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"articleNumber"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"subName"}},{"kind":"Field","name":{"kind":"Name","value":"shortDescription"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"mainHeader"}},{"kind":"Field","name":{"kind":"Name","value":"primaryRoute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"breadcrumbs"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductPrice"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"modifiedDate"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Badge"}}]}},{"kind":"Field","name":{"kind":"Name","value":"customFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomStringField"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"stringValue"},"name":{"kind":"Name","value":"value"}}]}}]}}]}},...ProductPriceFragmentDoc.definitions,...BadgeFragmentDoc.definitions]} as unknown as DocumentNode<StartPageProductGridFragment, unknown>;
export const StartPageCategoryGridFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StartPageCategoryGrid"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryRoute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]} as unknown as DocumentNode<StartPageCategoryGridFragment, unknown>;
export const ContentItemFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ContentItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"properties"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"getImageAsImageValue"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"valueType"}},{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ImageValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"focalPointX"}},{"kind":"Field","name":{"kind":"Name","value":"focalPointY"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StartPageProductGrid"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StartPageCategoryGrid"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StringValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BoolValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"boolValue"},"name":{"kind":"Name","value":"value"}}]}}]}}]}}]}},...StartPageProductGridFragmentDoc.definitions,...StartPageCategoryGridFragmentDoc.definitions]} as unknown as DocumentNode<ContentItemFragmentFragment, unknown>;
export const ContentFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Content"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentItemFragment"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentItemFragment"}}]}}]}}]}},...ContentItemFragmentFragmentDoc.definitions]} as unknown as DocumentNode<ContentFragmentFragment, unknown>;
export const ProductGridFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductGrid"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"articleNumber"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"subName"}},{"kind":"Field","name":{"kind":"Name","value":"primaryRoute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isPackage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductPrice"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Badge"}}]}},{"kind":"Field","name":{"kind":"Name","value":"canonicalCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"primaryRoute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"customFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomStringField"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"stringValue"},"name":{"kind":"Name","value":"value"}}]}}]}}]}},...ProductPriceFragmentDoc.definitions,...BadgeFragmentDoc.definitions]} as unknown as DocumentNode<ProductGridFragment, unknown>;
export const CategoryPageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mainHeader"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"breadcrumbText"}},{"kind":"Field","name":{"kind":"Name","value":"isDynamic"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderByDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderByDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sortOrders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"defaultDirection"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"filters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ListFilter"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"resultCount"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NumericRangeFilter"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BooleanFilter"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MultiListFilter"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"resultCount"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalResults"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductGrid"}}]}}]}}]}},...ContentFragmentFragmentDoc.definitions,...ProductGridFragmentDoc.definitions]} as unknown as DocumentNode<CategoryPageFragment, unknown>;
export const SubPageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Page"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryRoute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]} as unknown as DocumentNode<SubPageFragment, unknown>;
export const ContentPageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Page"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"primaryRoute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mainHeader"}},{"kind":"Field","alias":{"kind":"Name","value":"pageId"},"name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentItemFragment"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentItemFragment"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryRoute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subPages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"includeHidden"},"value":{"kind":"BooleanValue","value":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SubPage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"subPages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"includeHidden"},"value":{"kind":"BooleanValue","value":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SubPage"}}]}}]}},...ContentItemFragmentFragmentDoc.definitions,...SubPageFragmentDoc.definitions]} as unknown as DocumentNode<ContentPageFragment, unknown>;
export const StockStatusFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StockStatus"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StockStatus"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buyable"}},{"kind":"Field","name":{"kind":"Name","value":"maxOrderQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"stockDate"}},{"kind":"Field","name":{"kind":"Name","value":"stockNotificationEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]} as unknown as DocumentNode<StockStatusFragment, unknown>;
export const WarehouseStockFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WarehouseStock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Warehouse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stockLevel"}}]}}]} as unknown as DocumentNode<WarehouseStockFragment, unknown>;
export const CommentsFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customerComments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"required"}}]}}]}}]} as unknown as DocumentNode<CommentsFragmentFragment, unknown>;
export const ProductVariantPriceFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductVariantPrice"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"previousPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Price"}}]}}]}},...PriceFragmentDoc.definitions]} as unknown as DocumentNode<ProductVariantPriceFragment, unknown>;
export const InPackagesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"InPackages"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inPackages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryRoute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]} as unknown as DocumentNode<InPackagesFragment, unknown>;
export const ProductConfigurationsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductConfigurations"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasConfigurations"}},{"kind":"Field","name":{"kind":"Name","value":"configurations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exVat"}},{"kind":"Field","name":{"kind":"Name","value":"incVat"}},{"kind":"Field","name":{"kind":"Name","value":"vat"}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceCalculation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formula"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"variables"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProductConfigurationsFragment, unknown>;
export const ProductCampaignFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCampaign"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaigns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryRoute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]} as unknown as DocumentNode<ProductCampaignFragment, unknown>;
export const ProductPageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"articleNumber"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"subName"}},{"kind":"Field","name":{"kind":"Name","value":"breadcrumbText"}},{"kind":"Field","name":{"kind":"Name","value":"shortDescription"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"hasVariants"}},{"kind":"Field","name":{"kind":"Name","value":"isPackage"}},{"kind":"Field","name":{"kind":"Name","value":"canonicalCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"primaryRoute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"primaryRoute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryRoute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"breadcrumbs"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductPrice"}},{"kind":"Field","name":{"kind":"Name","value":"stockStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StockStatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"warehouseStock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WarehouseStock"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentsFragment"}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"values"}}]}},{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"warehouseStock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WarehouseStock"}}]}},{"kind":"Field","name":{"kind":"Name","value":"values"}},{"kind":"Field","name":{"kind":"Name","value":"articleNumber"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedDate"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductVariantPrice"}},{"kind":"Field","name":{"kind":"Name","value":"stockStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StockStatus"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"relatedProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductGrid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"customFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomBoolField"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"boolValue"},"name":{"kind":"Name","value":"value"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomStringField"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"stringValue"},"name":{"kind":"Name","value":"value"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomHtmlField"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"htmlValue"},"name":{"kind":"Name","value":"value"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomListField"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"listValues"},"name":{"kind":"Name","value":"value"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomMultiLevelListField"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Badge"}}]}},{"kind":"Field","name":{"kind":"Name","value":"preOrder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fromDate"}},{"kind":"Field","name":{"kind":"Name","value":"toDate"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"InPackages"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductConfigurations"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCampaign"}}]}},...ProductPriceFragmentDoc.definitions,...StockStatusFragmentDoc.definitions,...WarehouseStockFragmentDoc.definitions,...CommentsFragmentFragmentDoc.definitions,...ProductVariantPriceFragmentDoc.definitions,...ProductGridFragmentDoc.definitions,...BadgeFragmentDoc.definitions,...InPackagesFragmentDoc.definitions,...ProductConfigurationsFragmentDoc.definitions,...ProductCampaignFragmentDoc.definitions]} as unknown as DocumentNode<ProductPageFragment, unknown>;
export const StartPageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StartPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StartPage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"head"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"metaTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryRoute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"}},{"kind":"Field","name":{"kind":"Name","value":"alternateRoutes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"culture"}},{"kind":"Field","name":{"kind":"Name","value":"route"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"breadcrumbText"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentItemFragment"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentItemFragment"}}]}}]}}]}}]}},...ContentItemFragmentFragmentDoc.definitions]} as unknown as DocumentNode<StartPageFragment, unknown>;
export const CategoryDetailFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"hasSubcategories"}},{"kind":"Field","name":{"kind":"Name","value":"primaryRoute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]} as unknown as DocumentNode<CategoryDetailFragment, unknown>;
export const CategoriesWithSubcategoriesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"categoriesWithSubcategories"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryDetail"}},{"kind":"Field","name":{"kind":"Name","value":"subcategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryDetail"}}]}}]}},...CategoryDetailFragmentDoc.definitions]} as unknown as DocumentNode<CategoriesWithSubcategoriesFragment, unknown>;
export const CartCoreFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CartCoreFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cart"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"externalCheckoutUrl"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"productTotal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"productPreviousTotal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discountTotal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"aggregatedDiscounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"articleNumber"}},{"kind":"Field","name":{"kind":"Name","value":"subHeading"}},{"kind":"Field","name":{"kind":"Name","value":"variant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"values"}},{"kind":"Field","name":{"kind":"Name","value":"articleNumber"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductVariantPrice"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"modifiedDate"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"configurations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"option"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"discounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Price"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"discount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"previousTotal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"articleNumber"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductPrice"}},{"kind":"Field","name":{"kind":"Name","value":"primaryRoute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"modifiedDate"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"canonicalCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"primaryRoute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]}}]}},...PriceFragmentDoc.definitions,...ProductVariantPriceFragmentDoc.definitions,...ProductPriceFragmentDoc.definitions]} as unknown as DocumentNode<CartCoreFragmentFragment, unknown>;
export const CurrencyFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CurrencyFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Currency"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isDefault"}},{"kind":"Field","name":{"kind":"Name","value":"format"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}}]}}]}}]} as unknown as DocumentNode<CurrencyFragmentFragment, unknown>;
export const ChannelsFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChannelsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Channel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"isDefault"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"requiresAuth"}},{"kind":"Field","name":{"kind":"Name","value":"countries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"isDefault"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"culture"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isDefault"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CurrencyFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"defaultCurrency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CurrencyFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"defaultLanguage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"culture"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isDefault"}}]}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nostoAccountId"}},{"kind":"Field","name":{"kind":"Name","value":"tracking"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ga"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trackingId"}},{"kind":"Field","name":{"kind":"Name","value":"useArticleNumberAsId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"gtm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"containerId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fca"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"pixelId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pricesIncVat"}}]}}]}},...CurrencyFragmentFragmentDoc.definitions]} as unknown as DocumentNode<ChannelsFragmentFragment, unknown>;
export const HeadFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Head"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Document"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"head"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"metaTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]}}]} as unknown as DocumentNode<HeadFragment, unknown>;
export const MinimalProductListDetailFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MinimalProductListDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomerProductList"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"variant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"articleNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"articleNumber"}}]}}]}}]}}]} as unknown as DocumentNode<MinimalProductListDetailFragment, unknown>;
export const VariantDetailFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VariantDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"articleNumber"}},{"kind":"Field","name":{"kind":"Name","value":"values"}},{"kind":"Field","name":{"kind":"Name","value":"stockStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buyable"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"modifiedDate"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<VariantDetailFragment, unknown>;
export const VariantsDetailFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VariantsDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductVariants"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"values"}}]}},{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VariantDetail"}}]}}]}},...VariantDetailFragmentDoc.definitions]} as unknown as DocumentNode<VariantsDetailFragment, unknown>;
export const ProductDetailFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductDetail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"articleNumber"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"subName"}},{"kind":"Field","name":{"kind":"Name","value":"hasConfigurations"}},{"kind":"Field","name":{"kind":"Name","value":"hasVariants"}},{"kind":"Field","name":{"kind":"Name","value":"isPreOrder"}},{"kind":"Field","name":{"kind":"Name","value":"isPackage"}},{"kind":"Field","name":{"kind":"Name","value":"stockStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buyable"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryRoute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductPrice"}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Badge"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"modifiedDate"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VariantsDetail"}}]}}]}},...ProductPriceFragmentDoc.definitions,...BadgeFragmentDoc.definitions,...VariantsDetailFragmentDoc.definitions]} as unknown as DocumentNode<ProductDetailFragment, unknown>;
export const ProductListFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductListFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomerProductList"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shareToken"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductDetail"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VariantDetail"}}]}}]}}]}},...ProductDetailFragmentDoc.definitions,...VariantDetailFragmentDoc.definitions]} as unknown as DocumentNode<ProductListFragmentFragment, unknown>;
export const ProductMetadataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"articleNumber"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductPrice"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"modifiedDate"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryRoute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}},{"kind":"Field","name":{"kind":"Name","value":"canonicalCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},...ProductPriceFragmentDoc.definitions]} as unknown as DocumentNode<ProductMetadataFragment, unknown>;
export const RouteCrumbFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RouteCrumb"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Route"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"parents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"breadcrumbText"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"}},{"kind":"Field","name":{"kind":"Name","value":"alternateRoutes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"culture"}},{"kind":"Field","name":{"kind":"Name","value":"route"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}}]}}]} as unknown as DocumentNode<RouteCrumbFragment, unknown>;
export const RouteMetaFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RouteMeta"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Route"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"parents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"}},{"kind":"Field","name":{"kind":"Name","value":"alternateRoutes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelId"}},{"kind":"Field","name":{"kind":"Name","value":"culture"}},{"kind":"Field","name":{"kind":"Name","value":"route"}},{"kind":"Field","name":{"kind":"Name","value":"alias"}}]}},{"kind":"Field","name":{"kind":"Name","value":"breadcrumbs"}}]}}]} as unknown as DocumentNode<RouteMetaFragment, unknown>;
export const AddToCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addToCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddToCartInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addToCart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CartCoreFragment"}}]}}]}}]}},...CartCoreFragmentFragmentDoc.definitions]} as unknown as DocumentNode<AddToCartMutation, AddToCartMutationVariables>;
export const AutocompleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Autocomplete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"term"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchAutoComplete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"term"},"value":{"kind":"Variable","name":{"kind":"Name","value":"term"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryRoute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"breadcrumbs"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"primaryRoute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AutocompleteQuery, AutocompleteQueryVariables>;
export const CartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Cart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cartId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cartId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CartCoreFragment"}}]}}]}},...CartCoreFragmentFragmentDoc.definitions]} as unknown as DocumentNode<CartQuery, CartQueryVariables>;
export const NavTreeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NavTree"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"root"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"levels"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"includeHidden"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"root"},"value":{"kind":"Variable","name":{"kind":"Name","value":"root"}}},{"kind":"Argument","name":{"kind":"Name","value":"levels"},"value":{"kind":"Variable","name":{"kind":"Name","value":"levels"}}},{"kind":"Argument","name":{"kind":"Name","value":"includeHidden"},"value":{"kind":"Variable","name":{"kind":"Name","value":"includeHidden"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"categoriesWithSubcategories"}}]}}]}},...CategoriesWithSubcategoriesFragmentDoc.definitions]} as unknown as DocumentNode<NavTreeQuery, NavTreeQueryVariables>;
export const PagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Pages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"primaryRoute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subPages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"primaryRoute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PagesQuery, PagesQueryVariables>;
export const ProductVariantsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductVariants"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"articleNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"articleNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"articleNumber"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"articleNumber"}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"values"}}]}},{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"articleNumber"}},{"kind":"Field","name":{"kind":"Name","value":"values"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProductVariantsQuery, ProductVariantsQueryVariables>;
export const RouteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Route"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"path"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Paging"}},"defaultValue":{"kind":"IntValue","value":"16"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductOrderOptions"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderByDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortDirection"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"route"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"path"},"value":{"kind":"Variable","name":{"kind":"Name","value":"path"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RouteMeta"}},{"kind":"Field","name":{"kind":"Name","value":"object"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Head"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryPage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductPage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentPage"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"StartPage"}}]}}]}}]}},...RouteMetaFragmentDoc.definitions,...HeadFragmentDoc.definitions,...CategoryPageFragmentDoc.definitions,...ProductPageFragmentDoc.definitions,...ContentPageFragmentDoc.definitions,...StartPageFragmentDoc.definitions]} as unknown as DocumentNode<RouteQuery, RouteQueryVariables>;
export const SearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Search"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"term"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Paging"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"search"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"term"},"value":{"kind":"Variable","name":{"kind":"Name","value":"term"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paging"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ListFilter"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"resultCount"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NumericRangeFilter"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BooleanFilter"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MultiListFilter"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"resultCount"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalResults"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductGrid"}}]}}]}}]}}]}},...ProductGridFragmentDoc.definitions]} as unknown as DocumentNode<SearchQuery, SearchQueryVariables>;