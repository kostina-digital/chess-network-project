# User Flows

Common end-to-end paths a signed-in user takes in ChessConnect.

```mermaid
flowchart TD
    subgraph Auth
        A1[Landing] --> A2[Sign up / Log in]
        A2 --> A3[Dashboard]
    end

    A3 --> BF["Browse blog feed"]
    BF --> B1["Create post (text + up to 3 images)"]
    A3 --> P1["Edit profile (update bio, avatar)"]
    A3 --> S1[Search users/posts]
    A3 --> N1[Open news]

    B1 --> B2[Post appears in Blog]
    B2 --> B3[Receive likes/comments]
    B3 --> B4[Reply / react to comments]

    S1 --> S2[Open user profile]
    S2 --> S3[Follow / unfollow]
    S2 --> S4[View user's posts]

    P1 --> P2[Avatar stored via uploads API]

    N1 --> N2[Read article detail]
```

- Auth: sign up or log in to reach the dashboard.
- Profile: edit bio and upload avatar (stored through `/api/uploads/avatars/...`).
- Posting: create posts with images; others can like or comment; comments include author links and timestamps.
- Search: find users or posts, open profiles, follow/unfollow, read their posts.
- News: browse curated chess news and open article pages.
