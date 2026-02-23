# Home Sync Pro

## Current State

The website has:
- Home page with services showcase and consultation form
- Platform-specific pages (Google Home, Amazon Alexa, Apple HomeKit, Samsung SmartThings)
- Contact form that submits data to backend via `useSubmitContactForm` hook
- Footer with email contact info only (no phone number)
- Backend stores consultation form submissions

The user cannot currently view or retrieve the consultation form submissions that are stored in the backend.

## Requested Changes (Diff)

### Add
- Admin page to view all consultation inquiries from the backend
- Navigation link to access the admin page
- Display all submitted consultation data: name, email, phone, service interest, message, and submission timestamp
- Search/filter functionality to find specific inquiries
- Ability to export or copy inquiry details

### Modify
- Backend API to include a query function that retrieves all stored consultation inquiries

### Remove
- Nothing to remove

## Implementation Plan

1. **Backend Changes**
   - Add a query function to retrieve all consultation form submissions with timestamps
   - Return inquiries in reverse chronological order (newest first)

2. **Frontend Changes**
   - Create new `/admin` route and AdminPage component
   - Add navigation link to admin page in header/footer
   - Display inquiries in a table or card layout with all submission details
   - Add basic search/filter by name, email, or service type
   - Include timestamp for each submission
   - Make inquiry details easy to copy for follow-up

## UX Notes

- Admin page should be simple and functional
- Table format works well for desktop, card layout for mobile
- Show most recent inquiries first
- Include clear labels for all fields
- Make email addresses and phone numbers clickable (mailto: and tel: links)
