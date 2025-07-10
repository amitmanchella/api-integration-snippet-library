# Twilio SMS API Integration Snippet

This snippet demonstrates how to integrate with Twilio Programmable Messaging using Python, including authentication, message history retrieval, and sending SMS messages.

> **Note:** Keep your Account SID and Auth Token secure—store them in environment variables, never hard-code them.

## Installation

Install the official Twilio Python SDK:

```bash
pip install twilio
```

## Setup & Authentication

```python
from twilio.rest import Client
import os

# Initialize the Twilio client with your credentials
# (Set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in your environment, e.g. a .env file)
account_sid = os.getenv("TWILIO_ACCOUNT_SID")
auth_token = os.getenv("TWILIO_AUTH_TOKEN")
client = Client(account_sid, auth_token)
```

## Examples

### Read: Fetch a Message

```python
# Twilio's default Client is synchronous; no 'await' needed.
# All Twilio SDK calls return resources / awaitable results
message = client.messages("SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch()
print(message.body)
```

### Write: Send an SMS

```python
from_number = os.getenv("TWILIO_FROM_NUMBER")  # avoid hard-coding
message = client.messages.create(
    body="Hello from Twilio!",
    from_=from_number,   # Your Twilio number
    to="+15558675310"   # Destination number
)
print(message.sid)
```

### Minimal Error-Handling Pattern

```python
from twilio.base.exceptions import TwilioRestException

try:
    message = client.messages("SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch()
    print(message.body)
except TwilioRestException as err:
    # err.code & err.msg map to Twilio's error dictionary
    print("Twilio API error:", err)
```

## References

- Installation & SDK setup: [Twilio Python Library](https://www.twilio.com/docs/libraries/reference/twilio-python/index.html)
- Retrieve/List Messages: [Message History Guide](https://www.twilio.com/docs/messaging/tutorials/how-to-retrieve-and-modify-message-history)
- Send SMS (create): [Message Resource -> Create](https://www.twilio.com/docs/messaging/api/message-resource)
- Error Handling: [Twilio Error Handling](https://www.twilio.com/docs/usage/errors#python)





