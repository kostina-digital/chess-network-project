-- Idempotent: add blog columns if missing (e.g. DB never migrated or partial apply).
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'Post'
      AND column_name = 'title'
  ) THEN
    ALTER TABLE "Post" ADD COLUMN "title" TEXT NOT NULL DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'Post'
      AND column_name = 'imageUrls'
  ) THEN
    ALTER TABLE "Post" ADD COLUMN "imageUrls" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
  END IF;
END $$;
