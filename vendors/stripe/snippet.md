# Stripe API Integration Snippet

This snippet demonstrates how to integrate with the Stripe API using Node.js, including authentication, customer data retrieval, and payment processing.

> **Note:** For new integrations, Stripe recommends using the Payment Intents API over the legacy Charges API.

## Installation

Install the official Stripe Node SDK:

```bash
npm install stripe --save
```

### Auth: Authentication Example

```javascript
// Initialize the Stripe SDK with your secret key
// (Set STRIPE_SECRET_KEY in your environment, e.g. a .env file)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
```

## Examples

### Read: Retrieve a Customer

```javascript
const customer = await stripe.customers.retrieve('cus_12345');
console.log(customer);
```

### Write: Create a Payment Intent

```javascript
const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000,                    // $20.00, expressed in cents
  currency: 'usd',
  payment_method_types: ['card'],
  description: 'Test payment',
});
console.log(paymentIntent);
```

### Error-Handling Pattern

```javascript
try {
  const customer = await stripe.customers.retrieve('cus_12345');
  console.log(customer);
} catch (err) {
  // err is a StripeError — inspect err.type, err.code, err.message
  console.error('Stripe API error:', err);
}
```

## References

- Installation & SDK setup: [Stripe Node quick-start](https://docs.stripe.com/get-started/development-environment?lang=node)
- Retrieve customer (read): [Customers -> Retrieve](https://docs.stripe.com/api/customers/retrieve)
- Create payment (write): [PaymentIntents -> Create](https://docs.stripe.com/api/payment_intents/create)






