-- CreateTable
CREATE TABLE "Files" (
    "id" BIGSERIAL NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_data" BYTEA NOT NULL,

    CONSTRAINT "Files_pkey" PRIMARY KEY ("id")
);
