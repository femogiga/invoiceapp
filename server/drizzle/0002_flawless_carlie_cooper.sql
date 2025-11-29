CREATE TABLE "invoices_to_customers" (
	"invoice_id" integer NOT NULL,
	"customer_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "invoices_to_customers_invoice_id_customer_id_pk" PRIMARY KEY("invoice_id","customer_id")
);
--> statement-breakpoint
ALTER TABLE "invoices_to_customers" ADD CONSTRAINT "invoices_to_customers_invoice_id_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices_to_customers" ADD CONSTRAINT "invoices_to_customers_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;