import { relations } from "drizzle-orm";
import { date, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const professors = pgTable("professors", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  avatarUrl: text(),
  email: text().notNull().unique(),
  password: text().notNull(),
  academicTitle: text(),
  createdAt: timestamp().defaultNow(),
});

export const students = pgTable("students", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  avatarUrl: text(),
  email: text().notNull().unique(),
  password: text().notNull(),
  RA: text().notNull().unique(),
  createdAt: timestamp().defaultNow(),
});

export const courses = pgTable("courses", {
  id: uuid().primaryKey().defaultRandom(),
  professorId: uuid().notNull(),
  name: text().notNull(),
  code: text().notNull().unique(),
  slug: text().notNull().unique(),
  createdAt: timestamp().defaultNow(),
});

export const enrollments = pgTable("enrollments", {
  id: uuid().primaryKey().defaultRandom(),
  courseId: uuid().notNull(),
  studentId: uuid().notNull(),
  createdAt: timestamp().defaultNow(),
});

export const lessons = pgTable("lessons", {
  id: uuid().primaryKey().defaultRandom(),
  courseId: uuid().notNull(),
  title: text().notNull(),
  description: text().notNull(),
  dueDate: date(),
  createdAt: timestamp().defaultNow(),
});

export const lessonFiles = pgTable("lesson_files", {
  id: uuid().primaryKey().defaultRandom(),
  lessonId: uuid().notNull(),
  url: text().notNull(),
  filename: text().notNull(),
  size: text().notNull(),
  uploadedByStudentId: uuid(),
  uploadedByProfessorId: uuid(),
  createdAt: timestamp().defaultNow(),
});

export const submissions = pgTable("submissions", {
  id: uuid().primaryKey().defaultRandom(),
  lessonId: uuid().notNull(),
  studentId: uuid().notNull(),
  submittedAt: timestamp().defaultNow(),
  correctedAt: timestamp(),
  grade: text(),
  feedback: text(),
  createdAt: timestamp().defaultNow(),
});

export const professorsRelations = relations(professors, ({ many }) => ({
  courses: many(courses),
  lessonFiles: many(lessonFiles),
}));

export const studentsRelations = relations(students, ({ many }) => ({
  enrollments: many(enrollments),
  submissions: many(submissions),
  lessonFiles: many(lessonFiles),
}));

export const coursesRelations = relations(courses, ({ one, many }) => ({
  professor: one(professors, {
    fields: [courses.professorId],
    references: [professors.id],
  }),
  lessons: many(lessons),
  enrollments: many(enrollments),
}));

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  course: one(courses, {
    fields: [enrollments.courseId],
    references: [courses.id],
  }),
  student: one(students, {
    fields: [enrollments.studentId],
    references: [students.id],
  }),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  course: one(courses, {
    fields: [lessons.courseId],
    references: [courses.id],
  }),
  lessonFiles: many(lessonFiles),
  submissions: many(submissions),
}));

export const lessonFilesRelations = relations(lessonFiles, ({ one }) => ({
  lesson: one(lessons, {
    fields: [lessonFiles.lessonId],
    references: [lessons.id],
  }),
  uploadedByStudent: one(students, {
    fields: [lessonFiles.uploadedByStudentId],
    references: [students.id],
  }),
  uploadedByProfessor: one(professors, {
    fields: [lessonFiles.uploadedByProfessorId],
    references: [professors.id],
  }),
}));

export const submissionsRelations = relations(submissions, ({ one }) => ({
  lesson: one(lessons, {
    fields: [submissions.lessonId],
    references: [lessons.id],
  }),
  student: one(students, {
    fields: [submissions.studentId],
    references: [students.id],
  }),
}));
