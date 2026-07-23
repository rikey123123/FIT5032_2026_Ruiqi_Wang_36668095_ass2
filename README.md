# CareBridge

CareBridge is a Vue 3 web application for older adults and carers to find support services, read health resources, and rate resource helpfulness.

## Run Locally

```bash
npm install
npm run dev
```

Build the production version with:

```bash
npm run build
```

## Demonstration Accounts

Create normal test users through the Register page. The application creates the following public demonstration administrator when it starts:

```text
Email: admin@carebridge.test
Password: CareBridgeDemo2026!
```

These are test-only credentials. Do not use a real password in this application.

## Image Credit

Home page health professional photograph downloaded from Unsplash: https://images.unsplash.com/photo-1576091160399-112ba8d25d1d

## A2 Functionality

| Requirement | CareBridge implementation |
| --- | --- |
| Vue 3 | Vue components, Composition API state, router, conditionals, lists, and events |
| Responsive design | Mobile-first CSS with layout changes at 576px, 992px, and 1400px |
| Validation | Required values, Email format, length limits, password confirmation, duplicate Email, rating range, and administrator resource validation |
| Dynamic data | Searchable services and resources are rendered from JavaScript data and reactive state |
| Authentication | Multiple locally stored accounts can register, log in, persist a session, and log out |
| Roles | User and admin roles control navigation and route access |
| Ratings | One 1-5 rating per user per resource, with update support, average score, and rating count |

## Security Notes

- Vue interpolation is used for displayed user content. The app does not use `v-html`, so stored text is not interpreted as executable HTML.
- Resource title, summary, and content reject HTML tags and have client-side length checks before browser storage writes.
- Form validation runs before every user, resource, and rating write. Rating values are also checked in the shared rating composable.
- Router guards check both authentication and the admin role before `/account` and `/admin` are displayed.
- No API key, private key, or real credential is stored in the project.

This is a browser-only teaching application. `localStorage`, front-end route guards, and test passwords are not production security controls because a browser user can inspect or modify them. A production version requires server-side validation, secure password hashing, an authentication provider, and database security rules.

## Manual Demonstration Checklist

1. Check the Home, Find Support, Health Resources, Login, Register, My Account, Help, and Not Found routes.
2. Test the Support and Health Resources keyword and category filters, including no-result states.
3. Submit invalid and valid registration forms, then refresh and confirm duplicate Email validation.
4. Test incorrect and correct login credentials, refresh to confirm the session, and log out.
5. Open `/admin` as a visitor, user, and administrator to demonstrate route protection.
6. Add and remove a resource as the administrator, then check the public resource list.
7. Rate one resource with two separate users and update one rating to demonstrate aggregate calculations.
8. Submit `<script>alert('test')</script>` in an administrator resource field to demonstrate HTML tag rejection.
9. Test keyboard navigation, visible focus, the skip link, and desktop/mobile layouts.
