# API Integration Snippet Library

A curated, up-to-date library of API integration snippets (Stripe, Twilio, GitHub) with a modern searchable web app.

## Directory Structure
```
api-integration-snippet-library/
├── vendors/
│   ├── stripe/
│   │   ├── snippet.md          # Stripe API integration examples
│   │   └── metadata.json       # Vendor metadata
│   ├── twilio/
│   │   ├── snippet.md          # Twilio SMS API integration examples
│   │   └── metadata.json       # Vendor metadata
│   └── github/
│       ├── snippet.md          # GitHub API integration examples
│       └── metadata.json       # Vendor metadata
├── metadata-index.json         # Combined metadata for web app
├── web-app/                    # Web app source code
└── README.md                   
```

## Quick Start
- Run locally: `cd web-app && python3 -m http.server 8000`
- Open [http://localhost:8000/](http://localhost:8000/)

## Add a Vendor
1. Add a folder in `vendors/` with `snippet.md` and `metadata.json`.
2. Update `metadata-index.json`.
3. Push to GitHub (public).

## Features
- Search/filter by vendor or topic
- Click a vendor to view a rendered Markdown snippet
- Easy to extend with new APIs

---

