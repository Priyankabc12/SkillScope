import { relations } from "drizzle-orm";
import { jobs } from "./jobs.schema.js";
import { users } from "./user.schema.js";

export const usersRelations = relations(users, ({ many }) => ({
    jobs: many(jobs),
}));

export const jobsRelations = relations(jobs, ({ one }) => ({
    user: one(users, {
        fields: [jobs.userId],
        references: [users.id],
    }),
}));