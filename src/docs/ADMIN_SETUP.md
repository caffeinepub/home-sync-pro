# Home Sync Pro - Admin Portal Setup

## Authentication System

The admin portal is now protected with Internet Identity authentication and role-based access control.

## Features

✅ **Secure Authentication**: Uses Internet Identity for password-free, cryptographic authentication
✅ **Role-Based Access**: Only users with admin role can access the admin portal
✅ **Protected Routes**: Admin portal automatically redirects unauthorized users
✅ **Session Management**: Logout functionality with proper state cleanup
✅ **Conditional UI**: Admin portal link only shows for authenticated admin users

## How to Set Up the First Admin User

Since the admin portal is now protected, you need to assign the admin role to your Internet Identity. Here's how:

### Option 1: Using the Backend Canister (Recommended)

1. **Get your Internet Identity Principal**:
   - Visit the login page: `/login`
   - Sign in with Internet Identity
   - Open your browser console and run:
     ```javascript
     const identity = await window.ic.plug.agent.getPrincipal();
     console.log(identity.toString());
     ```
   - Copy your principal ID

2. **Assign Admin Role via dfx**:
   ```bash
   # Navigate to your project directory
   cd /home/ubuntu/workspace
   
   # Assign admin role to your principal
   dfx canister call backend assignCallerUserRole '(principal "YOUR_PRINCIPAL_ID_HERE", variant { admin })'
   ```

### Option 2: Using a Setup Route (Alternative)

If you'd like a one-time setup page, you can:

1. Create a `/setup` route (only accessible before any admin is assigned)
2. The first user to sign in with Internet Identity becomes admin
3. After the first admin is set, the route becomes inaccessible

## File Structure

```
src/frontend/src/
├── contexts/
│   └── AuthContext.tsx           # Auth state management
├── components/
│   ├── ProtectedRoute.tsx        # Route guard for admin pages
│   └── RootLayout.tsx            # Updated to show/hide admin link
├── pages/
│   ├── LoginPage.tsx             # Internet Identity login
│   └── AdminPage.tsx             # Protected admin dashboard
└── hooks/
    └── useQueries.ts             # Updated query keys and methods
```

## Backend API Methods Used

- `getCallerUserRole()`: Check the role of the current user
- `isCallerAdmin()`: Quick check if user is admin
- `assignCallerUserRole(principal, role)`: Assign role to a user
- `getAllInquiries()`: Fetch all consultation submissions (admin only)

## Testing the Authentication Flow

1. **Unauthenticated Access**:
   - Visit `/admin` without logging in
   - Should redirect to `/login`

2. **Non-Admin Access**:
   - Sign in with Internet Identity as non-admin user
   - Try to access `/admin`
   - Should redirect to home with "Access Denied" message

3. **Admin Access**:
   - Sign in with Internet Identity as admin user
   - Visit `/admin`
   - Should see the consultation submissions dashboard

4. **Logout**:
   - Click "Logout" button in admin portal
   - Should return to home page
   - Admin portal link should disappear from footer

## Security Considerations

- ✅ Routes are protected with `ProtectedRoute` component
- ✅ Backend validates user roles before serving data
- ✅ Admin portal link only visible to authenticated admins
- ✅ Session state managed through Internet Identity
- ✅ Automatic redirects for unauthorized access attempts

## Next Steps

If you need additional features:

1. **Multi-level roles**: Add moderator, editor, etc.
2. **User management UI**: Admin page to assign/revoke roles
3. **Audit logging**: Track admin actions
4. **Permissions**: Granular permissions beyond just admin/user
