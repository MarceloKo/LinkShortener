-- CreateTable
CREATE TABLE "Links" (
    "id" TEXT NOT NULL,
    "urlShort" TEXT NOT NULL,
    "urlDestination" TEXT NOT NULL,
    "countAccess" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Links_urlShort_key" ON "Links"("urlShort");
