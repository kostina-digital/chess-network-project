"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

type FormState = {
  fullName: string;
  username: string;
  bio: string;
  rating: string;
  favoriteOpening: string;
  avatarUrl: string;
};

export default function EditProfilePage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    username: "",
    bio: "",
    rating: "",
    favoriteOpening: "",
    avatarUrl: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/auth/profile");
      if (res.status === 401) {
        router.replace("/login");
        return;
      }
      if (!res.ok) {
        setLoadError("Could not load profile");
        setLoaded(true);
        return;
      }
      const data = (await res.json()) as FormState & { username: string };
      setFormData({
        fullName: data.fullName ?? "",
        username: data.username ?? "",
        bio: data.bio ?? "",
        rating: data.rating ?? "",
        favoriteOpening: data.favoriteOpening ?? "",
        avatarUrl: data.avatarUrl ?? "",
      });
      setLoaded(true);
    })();
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (
      formData.rating &&
      (isNaN(Number(formData.rating)) || Number(formData.rating) < 0)
    ) {
      newErrors.rating = "Rating must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validateForm()) return;

    const res = await fetch("/api/auth/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: formData.fullName.trim(),
        username: formData.username.trim(),
        bio: formData.bio,
        rating: formData.rating.trim(),
        favoriteOpening: formData.favoriteOpening.trim(),
        avatarUrl: formData.avatarUrl.trim(),
      }),
    });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) {
      setSubmitError(data.error ?? "Save failed");
      return;
    }
    router.push("/dashboard");
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  if (!loaded) {
    return (
      <div className="min-h-screen bg-background px-4 py-16 text-center text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-background px-4 py-16 text-center">
        <p className="text-destructive">{loadError}</p>
        <Link href="/dashboard" className="mt-4 inline-block underline">
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Link>
        </div>

        <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
          <h1 className="mb-6 text-foreground">Edit Profile</h1>

          {submitError ? (
            <p className="mb-4 text-sm text-destructive" role="alert">
              {submitError}
            </p>
          ) : null}

          <form onSubmit={(e) => void handleSubmit(e)} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="fullName" className="mb-2 block text-foreground">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-input-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                    errors.fullName ? "border-destructive" : "border-border"
                  }`}
                />
                {errors.fullName ? (
                  <p className="mt-1 text-sm text-destructive">{errors.fullName}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="username" className="mb-2 block text-foreground">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-input-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                    errors.username ? "border-destructive" : "border-border"
                  }`}
                />
                {errors.username ? (
                  <p className="mt-1 text-sm text-destructive">{errors.username}</p>
                ) : null}
              </div>
            </div>

            <div>
              <label htmlFor="bio" className="mb-2 block text-foreground">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className="w-full resize-none rounded-lg border border-border bg-input-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Tell us about yourself and your chess journey..."
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="rating" className="mb-2 block text-foreground">
                  Chess Rating
                </label>
                <input
                  id="rating"
                  name="rating"
                  type="number"
                  value={formData.rating}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-input-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                    errors.rating ? "border-destructive" : "border-border"
                  }`}
                />
                {errors.rating ? (
                  <p className="mt-1 text-sm text-destructive">{errors.rating}</p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="favoriteOpening"
                  className="mb-2 block text-foreground"
                >
                  Favorite Opening
                </label>
                <input
                  id="favoriteOpening"
                  name="favoriteOpening"
                  type="text"
                  value={formData.favoriteOpening}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div>
              <label htmlFor="avatarUrl" className="mb-2 block text-foreground">
                Avatar URL
              </label>
              <input
                id="avatarUrl"
                name="avatarUrl"
                type="text"
                value={formData.avatarUrl}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-input-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="https://example.com/avatar.jpg"
              />
              <p className="mt-1 text-sm text-muted-foreground">
                Enter a URL for your avatar image
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-lg bg-secondary px-6 py-3 text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
