import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, integer, varchar } from 'drizzle-orm/pg-core';


const timestamps = {
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(()=> new Date()).notNull(),
}

// export const users = pgTable('users', {
//   id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
//   fullname: text('fullname').notNull(),
//   username: text('username').notNull().unique(),
//   email: text('email').notNull().unique(),
//   password: text('password').notNull(),
//   ...timestamps
// });


// tables
export const departments = pgTable('departments', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    code: varchar('code', {length: 50}).notNull().unique(),
    name: varchar('name', {length: 255}).notNull(),
    description: varchar('description', {length: 255}),
    ...timestamps
})

export const subjects = pgTable('subjects', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  departmentId: integer('department_id').notNull().references(()=> departments.id, {onDelete: 'restrict'}),
  code: varchar('code', {length: 255}).notNull().unique(),
  name: varchar('name').notNull(),
  description: varchar('description', {length: 255}),
  ...timestamps
});
// relations

export const departmentRelations = relations(departments, ({many})=> ({subjects: many(subjects)}))

export const subjectsRelations = relations(subjects, ({one}) => ({
    department: one(departments, {
        fields: [subjects.departmentId],
        references: [departments.id]
    })
}))

export type Department = typeof departments.$inferSelect
export type NewDepartment = typeof departments.$inferInsert

export type Subject = typeof subjects.$inferSelect
export type NewSubject = typeof subjects.$inferInsert