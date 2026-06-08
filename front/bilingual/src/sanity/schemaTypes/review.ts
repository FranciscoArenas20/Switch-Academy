import { defineType, defineField } from "sanity";
import { CommentIcon } from "@sanity/icons";

export const review = defineType({
  name: "review",
  title: "Review",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "studentName",
      title: "Student Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    defineField({
      name: "photoUrl",
      title: "External Photo URL",
      type: "url",
      description:
        "Fallback photo URL used when no photo is uploaded (e.g. Unsplash).",
    }),
    defineField({
      name: "text",
      title: "Review text",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "English", value: "English" },
          { title: "French", value: "French" },
          { title: "Spanish", value: "Spanish" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "studentName",
      subtitle: "language",
      media: "photo",
    },
  },
});
