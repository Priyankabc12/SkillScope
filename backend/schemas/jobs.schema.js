import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./user.schema.js";

export const jobs = pgTable("jobs", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.id),
    company: varchar("company"),
    location: varchar("location"),
    description: text("description"),
    salary_max: varchar("salary_max"),
    salary_min: varchar("salary_min"),
    apply_url: varchar("apply_url"),
    title: varchar("title")
});

export const jobsSchema = jobs;

