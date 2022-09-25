export interface Billing_addres {
	address1: string;
	address2: string;
	city: string;
	company?: any;
	country: string;
	country_code: string;
	default: boolean;
	first_name: string;
	id: number;
	last_name: string;
	name: string;
	phone: string;
	province: string;
	province_code: string;
	zip: string;
}

export interface Currency {
	currency: string;
}

export interface Customer {
	accepts_marketing: boolean;
	created_at: string;
	email: string;
	first_name: string;
	id: number;
	last_name: string;
	note?: any;
	orders_count: string;
	state?: any;
	total_spent: string;
	updated_at: string;
	tags: string;
}

export interface Discount_code {
	id: number;
	code: string;
	usage_count: number;
	created_at: string;
	updated_at: string;
}

export interface Discount_code {
	discount_code: Discount_code;
}

export interface Line_item {
	fulfillment_service: string;
	grams: number;
	price: string;
	product_id: number;
	quantity: number;
	requires_shipping: boolean;
	sku: string;
	title: string;
	variant_id: number;
	variant_title: string;
	vendor: string;
}

export interface Phone {
	phone: string;
}

export interface Presentment_currency {
	presentment_currency: string;
}

export interface Shipping_addres {
	address1: string;
	address2: string;
	city: string;
	company?: any;
	country: string;
	first_name: string;
	last_name: string;
	latitude: string;
	longitude: string;
	phone: string;
	province: string;
	zip: string;
	name: string;
	country_code: string;
	province_code: string;
}

export interface Shipping_line {
	code: string;
	price: string;
	source: string;
	title: string;
}

export interface Tax_line {
	price: string;
	rate: number;
	title: string;
	channel_liable: boolean;
}

export interface PostCartAbandonedBody {
	abandoned_checkout_url: string;
	billing_address: Billing_addres;
	buyer_accepts_marketing: boolean;
	buyer_accepts_sms_marketing: boolean;
	cart_token: string;
	closed_at?: any;
	completed_at?: any;
	created_at: string;
	currency: Currency;
	customer: Customer;
	customer_locale: string;
	device_id: number;
	discount_codes: Discount_code[];
	email: string;
	gateway: string;
	id: number;
	landing_site: string;
	line_items: Line_item;
	location_id: number;
	note?: any;
	phone: Phone;
	presentment_currency: Presentment_currency;
	referring_site: string;
	shipping_address: Shipping_addres;
	sms_marketing_phone: string;
	shipping_lines: Shipping_line;
	source_name: string;
	subtotal_price: string;
	tax_lines: Tax_line;
	taxes_included: boolean;
	token: string;
	total_discounts: string;
	total_duties: string;
	total_line_items_price: string;
	total_price: string;
	total_tax: string;
	total_weight: number;
	updated_at: string;
	user_id: number;
}