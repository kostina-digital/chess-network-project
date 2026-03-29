# Key Files

This file highlights the parts of the codebase that matter most when onboarding or debugging.

## Routing and layout

- `src/app/layout.tsx`
  Global app shell, auth provider wiring, footer, and page container.

- `src/app/(app)/layout.tsx`
  Authenticated area shell.

- `src/components/layout/Header.tsx`
  Top navigation, auth actions, and the global search bar.

## Authentication

- `src/lib/auth/userStore.ts`
  Registration, login verification, and password update logic.

- `src/lib/auth/getCurrentUser.ts`
  Central session resolution used across pages and APIs.

- `src/app/api/auth/*`
  Route handlers for login, register, logout, profile, avatar upload, forgot password, and reset password.

## Posts and feed

- `src/components/posts/PostCard.tsx`
  Main feed card with likes, comments, editing, and image rendering.

- `src/components/posts/ComposePostSection.tsx`
  Post creation form and client-side image selection.

- `src/lib/postService.ts`
  Feed loading, profile post loading, post creation, post editing, search, and comment helpers.

- `src/app/api/posts/*`
  Post CRUD, likes, comments, and related route handlers.

## Profiles and social graph

- `src/components/dashboard/UserProfileView.tsx`
  Profile header, follow actions, modal follower/following lists, and embedded post feed.

- `src/lib/followService.ts`
  Follow/unfollow logic and follower/following list queries.

- `src/app/api/users/[id]/follow/route.ts`
  Mutation endpoint for follow state.

- `src/app/api/users/[id]/network/route.ts`
  Read endpoint for modal follower/following lists.

## Search

- `src/components/layout/SiteSearchBar.tsx`
  Header search form.

- `src/app/(app)/search/SearchPageContent.tsx`
  Combined user and post search results page.

- `src/app/api/search/route.ts`
  Search endpoint returning both posts and users.

## Media and uploads

- `src/lib/saveAvatarImage.ts`
  Avatar validation and saving.

- `src/lib/savePostImages.ts`
  Post image validation, saving, and cleanup.

- `src/app/api/uploads/avatars/[name]/route.ts`
  Avatar file serving.

- `src/app/api/uploads/posts/[name]/route.ts`
  Post image file serving.

## Styling

- `src/app/globals.css`
  Theme tokens and typography helpers such as `h1-style`, `h2-style`, and paragraph classes.
