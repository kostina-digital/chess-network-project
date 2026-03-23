"use client";

import { useState } from "react";
import { PostCard } from "@/components/PostCard";
import {
  posts as initialPosts,
  type Post,
  type PostComment,
} from "@/app/data/mockData";
import { Send } from "lucide-react";

export default function FeedPage() {
  const [postContent, setPostContent] = useState("");
  const [feedPosts, setFeedPosts] = useState<Post[]>(initialPosts);

  const handlePublish = () => {
    if (!postContent.trim()) return;

    const newPost = {
      id: String(Date.now()),
      authorId: "1",
      content: postContent,
      timestamp: new Date(),
      likes: 0,
      isLiked: false,
      commentItems: [] as PostComment[],
    };

    setFeedPosts([newPost, ...feedPosts]);
    setPostContent("");
  };

  return (
    <div className="min-h-screen bg-background">
      
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Post Composer */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="mb-4 text-foreground">Share Your Chess Insights</h2>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="What's on your chess mind? Share a game analysis, tactical insight, or chess thought..."
            className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground resize-none"
            rows={4}
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={handlePublish}
              disabled={!postContent.trim()}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              Publish
            </button>
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-6">
          {feedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
