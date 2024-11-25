/*
  Warnings:

  - You are about to drop the column `folderId` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the `Folder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_folderId_fkey";

-- DropIndex
DROP INDEX "Document_folderId_key";

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "folderId";

-- DropTable
DROP TABLE "Folder";
