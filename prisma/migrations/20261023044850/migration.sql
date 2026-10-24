-- CreateTable
CREATE TABLE "book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "image" TEXT,
    "isbn" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "publishedYear" INTEGER NOT NULL,
    "pages" INTEGER NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'English',
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    CONSTRAINT "book_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "book_isbn_key" ON "book"("isbn");

-- CreateIndex
CREATE INDEX "book_createdById_idx" ON "book"("createdById");
