# Home Sync Pro

## Current State

The website currently has:
- Public-facing home page with service showcase
- Platform-specific pages (Google Home, Samsung SmartThings, Apple HomeKit, Amazon Alexa)
- Consultation form that stores inquiries in backend
- Admin portal accessible via footer link (currently unsecured, anyone can access)
- Admin portal displays all consultation inquiries with search/filter

## Requested Changes (Diff)

### Add
- User authentication system with login/logout
- Role-based access control (admin role)
- Protected admin portal route requiring authentication
- Login page for admin access
- User management capability

### Modify
- Admin portal route to require authentication
- Footer link to admin portal (show only when authenticated)
- Admin portal UI to include logout option

### Remove
- Public access to admin portal

## Implementation Plan

1. **Backend**: Add authorization component with admin role support, user management APIs
2. **Frontend**: 
   - Create login page with authentication form
   - Add auth context/hooks for managing user session
   - Protect admin portal route with auth guard
   - Add logout functionality to admin portal
   - Conditionally render admin portal link in footer based on auth state
3. **Validation**: Typecheck, lint, build

## UX Notes

- Admin portal link in footer only appears for authenticated admin users
- Unauthenticated users attempting to access admin portal are redirected to login page
- Login page provides email/password form
- Admin portal includes logout button
- After logout, user is redirected to home page
