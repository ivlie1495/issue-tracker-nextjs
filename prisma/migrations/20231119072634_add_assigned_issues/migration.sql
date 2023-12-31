-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "assignedToUserId" VARCHAR(255),
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_assignedToUserId_fkey" FOREIGN KEY ("assignedToUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
