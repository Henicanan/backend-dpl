/*
  Warnings:

  - A unique constraint covering the columns `[folderId]` on the table `Document` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Document_folderId_key" ON "Document"("folderId");
