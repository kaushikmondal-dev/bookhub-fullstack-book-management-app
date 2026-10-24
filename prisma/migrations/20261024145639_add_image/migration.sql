/*
  Warnings:

  - Made the column `image` on table `book` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "image" TEXT NOT NULL,
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
INSERT INTO "new_book" ("author", "category", "createdById", "description", "id", "image", "isbn", "language", "pages", "price", "publishedYear", "title") SELECT "author", "category", "createdById", "description", "id", "image", "isbn", "language", "pages", "price", "publishedYear", "title" FROM "book";
DROP TABLE "book";
ALTER TABLE "new_book" RENAME TO "book";
CREATE UNIQUE INDEX "book_image_key" ON "book"("image");
CREATE UNIQUE INDEX "book_isbn_key" ON "book"("isbn");
CREATE INDEX "book_createdById_idx" ON "book"("createdById");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
