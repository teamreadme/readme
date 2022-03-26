-- CreateTable
CREATE TABLE "ReadMe" (
    "id" TEXT NOT NULL,
    "text" TEXT,
    "user_Id" TEXT NOT NULL,

    CONSTRAINT "ReadMe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReadMe_user_Id_key" ON "ReadMe"("user_Id");

-- AddForeignKey
ALTER TABLE "ReadMe" ADD CONSTRAINT "ReadMe_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
