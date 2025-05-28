CREATE TABLE "links" (
	"id" text PRIMARY KEY NOT NULL,
	"urlShort" text NOT NULL,
	"urlDestination" text NOT NULL,
	"countAccess" integer DEFAULT 0 NOT NULL
);
