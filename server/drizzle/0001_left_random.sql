CREATE TYPE "public"."status" AS ENUM('PAID', 'PENDING');--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN "status" "status" DEFAULT 'PENDING';