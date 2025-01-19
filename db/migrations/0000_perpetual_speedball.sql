CREATE TYPE "public"."role" AS ENUM('coach', 'client', 'both');--> statement-breakpoint
CREATE TABLE "users" (
	"id" char(36) PRIMARY KEY NOT NULL,
	"role" "role"
);
