-- CreateTable
CREATE TABLE "Principal" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Principal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sub" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "released" BOOLEAN NOT NULL DEFAULT false,
    "principalId" INTEGER,

    CONSTRAINT "Sub_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Principal_email_key" ON "Principal"("email");

-- AddForeignKey
ALTER TABLE "Sub" ADD CONSTRAINT "Sub_principalId_fkey" FOREIGN KEY ("principalId") REFERENCES "Principal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
