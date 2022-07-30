/*
  Warnings:

  - A unique constraint covering the columns `[classUrl]` on the table `Class` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Class_classUrl_key" ON "Class"("classUrl");
