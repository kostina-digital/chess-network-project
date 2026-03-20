-- AlterTable (nullable first for existing rows)
ALTER TABLE "User" ADD COLUMN "userName" TEXT;

UPDATE "User" SET "userName" = 'user_' || "id"::text WHERE "userName" IS NULL;

ALTER TABLE "User" ALTER COLUMN "userName" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");
