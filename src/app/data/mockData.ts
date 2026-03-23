// Mock data for the chess social network

export interface User {
    id: string;
    username: string;
    fullName: string;
    bio: string;
    rating: number;
    favoriteOpening: string;
    avatarUrl: string;
    postsCount: number;
    followersCount: number;
    followingCount: number;
    isFollowing?: boolean;
  }
  
  export interface PostComment {
    id: string;
    authorName: string;
    text: string;
    likes: number;
    dislikes: number;
  }

  export interface Post {
    id: string;
    authorId: string;
    content: string;
    timestamp: Date;
    likes: number;
    isLiked: boolean;
    commentItems: PostComment[];
  }
  
  export const currentUser: User = {
    id: "1",
    username: "chessmaster2024",
    fullName: "Alexandra Chen",
    bio: "FIDE Master | Love tactical puzzles and endgames",
    rating: 2250,
    favoriteOpening: "Sicilian Defense",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandra",
    postsCount: 47,
    followersCount: 234,
    followingCount: 189,
  };
  
  export const users: User[] = [
    currentUser,
    {
      id: "2",
      username: "kingsidekiller",
      fullName: "Marcus Johnson",
      bio: "Aggressive player | King's Indian specialist",
      rating: 2180,
      favoriteOpening: "King's Indian Defense",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
      postsCount: 32,
      followersCount: 156,
      followingCount: 142,
      isFollowing: true,
    },
    {
      id: "3",
      username: "endgameempress",
      fullName: "Sofia Rodriguez",
      bio: "Endgame enthusiast | Chess coach",
      rating: 2320,
      favoriteOpening: "Queen's Gambit",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
      postsCount: 89,
      followersCount: 512,
      followingCount: 98,
      isFollowing: false,
    },
    {
      id: "4",
      username: "tacticalthunder",
      fullName: "David Kim",
      bio: "Puzzle addict | 2400+ on tactics trainer",
      rating: 2100,
      favoriteOpening: "Ruy Lopez",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      postsCount: 64,
      followersCount: 298,
      followingCount: 215,
      isFollowing: true,
    },
  ];
  
  export const posts: Post[] = [
    {
      id: "1",
      authorId: "2",
      content: "Just had an incredible game where I sacrificed my queen on move 18! My opponent couldn't see the back rank mate coming three moves later. Sometimes you have to trust your calculations and go for it. #TacticalVision #Sacrifice",
      timestamp: new Date(2026, 2, 14, 10, 30),
      likes: 42,
      isLiked: false,
      commentItems: [
        { id: "c1-1", authorName: "Sofia Rodriguez", text: "Brilliant sacrifice — did you see it all the way through before you played it?", likes: 12, dislikes: 0 },
        { id: "c1-2", authorName: "David Kim", text: "I need the PGN 😅 That sounds like a study composition.", likes: 5, dislikes: 1 },
        { id: "c1-3", authorName: "Alexandra Chen", text: "Queen sacs in real games hit different. Congrats on the win!", likes: 8, dislikes: 0 },
      ],
    },
    {
      id: "2",
      authorId: "3",
      content: "Studying Capablanca's endgames today. The simplicity and precision of his technique is just beautiful. If you want to improve your endgame understanding, start with 'Chess Fundamentals'. It's a classic for a reason!",
      timestamp: new Date(2026, 2, 13, 18, 15),
      likes: 67,
      isLiked: true,
      commentItems: [
        { id: "c2-1", authorName: "Marcus Johnson", text: "Capablanca's rook endgames are my bedtime reading.", likes: 21, dislikes: 2 },
        { id: "c2-2", authorName: "David Kim", text: "Fundamentals is underrated at every rating level.", likes: 9, dislikes: 0 },
      ],
    },
    {
      id: "3",
      authorId: "4",
      content: "Puzzle of the day: White to move and win. The key is finding the quiet move that sets up an unstoppable threat. Took me 15 minutes but finally cracked it! Anyone else working on tactics today?",
      timestamp: new Date(2026, 2, 13, 14, 45),
      likes: 28,
      isLiked: false,
      commentItems: [
        { id: "c3-1", authorName: "Alexandra Chen", text: "Quiet moves are the hardest to find under time pressure.", likes: 6, dislikes: 0 },
        { id: "c3-2", authorName: "Sofia Rodriguez", text: "Drop the FEN in the next post?", likes: 4, dislikes: 1 },
        { id: "c3-3", authorName: "Marcus Johnson", text: "15 min is fast — those took me an hour last week.", likes: 3, dislikes: 0 },
      ],
    },
    {
      id: "4",
      authorId: "1",
      content: "Broke through 2250 rating today! 🎉 The key was focusing on opening preparation and reducing blunders in time pressure. Excited to keep climbing. What rating goals are you working towards?",
      timestamp: new Date(2026, 2, 12, 20, 10),
      likes: 93,
      isLiked: true,
      commentItems: [
        { id: "c4-1", authorName: "David Kim", text: "Huge milestone — well done!", likes: 15, dislikes: 0 },
        { id: "c4-2", authorName: "Sofia Rodriguez", text: "I'm grinding toward 2400 classical. Slow but steady.", likes: 7, dislikes: 0 },
      ],
    },
    {
      id: "5",
      authorId: "3",
      content: "Hot take: Learning to play opposite-colored bishop endgames properly will gain you more rating points than memorizing 20 moves of opening theory. Fight me in the comments 😄",
      timestamp: new Date(2026, 2, 12, 12, 30),
      likes: 51,
      isLiked: false,
      commentItems: [
        { id: "c5-1", authorName: "Marcus Johnson", text: "Both matter, but I agree endgames compound over years.", likes: 18, dislikes: 3 },
        { id: "c5-2", authorName: "Alexandra Chen", text: "Opening prep wins games too — it's not either/or 😄", likes: 11, dislikes: 1 },
        { id: "c5-3", authorName: "David Kim", text: "OCB endgames separate the patient from the rest.", likes: 6, dislikes: 0 },
      ],
    },
  ];
  
  export function getUserById(id: string): User | undefined {
    return users.find(u => u.id === id);
  }
  
  export function getUserByUsername(username: string): User | undefined {
    return users.find(u => u.username === username);
  }
  
  export function getPostsByUserId(userId: string): Post[] {
    return posts.filter(p => p.authorId === userId);
  }
  