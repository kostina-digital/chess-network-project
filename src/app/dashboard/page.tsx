
import { useParams, Link } from "react-router";
import { Navigation } from "../components/Navigation";
import { PostCard } from "../components/PostCard";
import { getUserByUsername, getPostsByUserId, currentUser } from "../data/mockData";
import { UserPlus, UserMinus, Edit2, FileText, Users, UserCheck } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const user = username ? getUserByUsername(username) : undefined;
  const isOwnProfile = user?.id === currentUser.id;
  const [isFollowing, setIsFollowing] = useState(user?.isFollowing || false);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="mb-4 text-foreground">User Not Found</h1>
          <p className="text-muted-foreground mb-6">The user you're looking for doesn't exist.</p>
          <Link 
            to="/feed" 
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Back to Feed
          </Link>
        </div>
      </div>
    );
  }

  const userPosts = getPostsByUserId(user.id);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <img 
              src={user.avatarUrl} 
              alt={user.fullName}
              className="w-24 h-24 rounded-full flex-shrink-0"
            />
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <h1 className="mb-1 text-foreground">{user.fullName}</h1>
                  <p className="text-muted-foreground">@{user.username}</p>
                </div>
                
                {isOwnProfile ? (
                  <Link
                    to="/profile/edit"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </Link>
                ) : (
                  <button
                    onClick={handleFollowToggle}
                    className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg transition-colors ${
                      isFollowing
                        ? 'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground'
                        : 'bg-primary text-primary-foreground hover:opacity-90'
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <UserMinus className="w-4 h-4" />
                        Unfollow
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        Follow
                      </>
                    )}
                  </button>
                )}
              </div>
              
              <p className="text-foreground mb-4 leading-relaxed">{user.bio}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div className="bg-muted/50 rounded-lg px-4 py-3">
                  <p className="text-sm text-muted-foreground mb-1">Rating</p>
                  <p className="font-semibold text-foreground">{user.rating}</p>
                </div>
                <div className="bg-muted/50 rounded-lg px-4 py-3 col-span-2 sm:col-span-1">
                  <p className="text-sm text-muted-foreground mb-1">Opening</p>
                  <p className="font-semibold text-foreground text-sm">{user.favoriteOpening}</p>
                </div>
              </div>
              
              <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">
                    <span className="font-semibold">{user.postsCount}</span> posts
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">
                    <span className="font-semibold">{user.followersCount}</span> followers
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">
                    <span className="font-semibold">{user.followingCount}</span> following
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Posts */}
        <div className="mb-6">
          <h2 className="mb-4 text-foreground">Posts by {user.fullName}</h2>
        </div>
        
        <div className="space-y-6">
          {userPosts.length > 0 ? (
            userPosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No posts yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
