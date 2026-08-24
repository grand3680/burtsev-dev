-- CreateEnum
CREATE TYPE "ExperienceKind" AS ENUM ('Job', 'Project');

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "kind" "ExperienceKind" NOT NULL DEFAULT 'Job',
    "companyRu" TEXT NOT NULL,
    "companyEn" TEXT NOT NULL,
    "roleRu" TEXT NOT NULL,
    "roleEn" TEXT NOT NULL,
    "locationRu" TEXT NOT NULL,
    "locationEn" TEXT NOT NULL,
    "periodRu" TEXT NOT NULL,
    "periodEn" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "bulletsRu" TEXT[],
    "bulletsEn" TEXT[],
    "stack" TEXT[],
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "categoryRu" TEXT NOT NULL,
    "categoryEn" TEXT NOT NULL,
    "itemsRu" TEXT[],
    "itemsEn" TEXT[],
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Experience_kind_order_idx" ON "Experience"("kind", "order");

-- CreateIndex
CREATE INDEX "Skill_order_idx" ON "Skill"("order");

-- CreateIndex
CREATE INDEX "Contact_createdAt_idx" ON "Contact"("createdAt");
