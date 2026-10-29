import { defineConfig } from "tinacms";

const stringField = (name: string, label: string, required = true) => ({
  type: "string" as const,
  name,
  label,
  required,
});

const textField = (name: string, label: string) => ({
  type: "string" as const,
  name,
  label,
  ui: { component: "textarea" as const },
});

const imageField = (name: string, label: string) => ({
  type: "image" as const,
  name,
  label,
});

const listOfStrings = (name: string, label: string) => ({
  type: "string" as const,
  name,
  label,
  list: true,
});

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads/tina",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "homepage",
        label: "Homepage",
        path: "content/pages",
        format: "json",
        ui: {
          filename: {
            readonly: true,
            slugify: () => "home",
          },
        },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              ...[stringField("headlineLine1", "Headline line 1"), stringField("headlineLine2", "Highlighted word"), textField("description", "Description")],
              { type: "object", name: "primaryCta", label: "Primary button", fields: [stringField("label", "Label"), stringField("href", "URL")] },
              { type: "object", name: "secondaryCta", label: "Secondary button", fields: [stringField("label", "Label"), stringField("href", "URL")] },
            ],
          },
          {
            type: "object",
            name: "about",
            label: "About Traverse",
            fields: [stringField("headingLine1", "Heading line 1"), stringField("headingLine2", "Heading line 2"), stringField("headingLine3", "Heading line 3"), textField("copy", "Paragraph")],
          },
          {
            type: "object",
            name: "servicesSection",
            label: "VPN Protection",
            fields: [stringField("heading", "Heading"), textField("intro", "Intro"), {
              type: "object", name: "items", label: "Services", list: true,
              fields: [stringField("number", "Number"), stringField("title", "Title"), textField("description", "Description"), stringField("price", "Short detail"), listOfStrings("tags", "Features"),
                { type: "object", name: "images", label: "Images", list: true, fields: [imageField("src", "Image"), stringField("alt", "Alt text")] }],
            }],
          },
          {
            type: "object",
            name: "journey",
            label: "Your Journey",
            fields: [stringField("heading", "Heading"), textField("intro", "Intro"), textField("quote", "Quote"), {
              type: "object", name: "steps", label: "Steps", list: true,
              fields: [stringField("year", "Step label"), textField("title", "Title"), textField("description", "Description"), imageField("image", "Image")],
            }],
          },
          {
            type: "object",
            name: "features",
            label: "How Traverse Protects You",
            fields: [textField("intro", "Intro"), stringField("heading", "Heading"), stringField("privacyHeading", "Privacy card heading"), textField("privacyCopy", "Privacy card copy"), listOfStrings("benefits", "Benefits"),
              stringField("usersMetric", "Users metric"), stringField("usersLabel", "Users label"), stringField("serversMetric", "Servers metric"), stringField("serversLabel", "Servers label"), stringField("encryptionMetric", "Encryption metric"), stringField("encryptionLabel", "Encryption label"),
              { type: "object", name: "cards", label: "Feature cards", list: true, fields: [stringField("title", "Title"), textField("copy", "Copy"), imageField("image", "Image"), stringField("alt", "Alt text")] }],
          },
          {
            type: "object",
            name: "testimonials",
            label: "Testimonials",
            fields: [stringField("headingLine1", "Heading line 1"), stringField("headingLine2", "Heading line 2"), {
              type: "object", name: "items", label: "Stories", list: true,
              fields: [textField("quote", "Quote"), stringField("accent", "Card style")],
            }],
          },
          {
            type: "object",
            name: "pricing",
            label: "Pricing",
            fields: [stringField("heading", "Heading"), {
              type: "object", name: "plans", label: "Plans", list: true,
              fields: [stringField("name", "Plan name"), textField("audience", "Description"), stringField("monthly", "Monthly price"), stringField("annual", "Annual monthly price"), stringField("interval", "Billing interval"), listOfStrings("features", "Included features")],
            }],
          },
          {
            type: "object",
            name: "faq",
            label: "FAQ",
            fields: [stringField("headingLine1", "Heading line 1"), stringField("headingLine2", "Heading line 2"), textField("intro", "Intro"), {
              type: "object", name: "items", label: "Questions", list: true,
              fields: [stringField("question", "Question"), textField("answer", "Answer")],
            }],
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [stringField("eyebrow", "Eyebrow"), stringField("headlineLine1", "Headline line 1"), stringField("headlineLine2", "Headline line 2"),
              { type: "object", name: "primaryCta", label: "Primary button", fields: [stringField("label", "Label"), stringField("href", "URL")] },
              { type: "object", name: "secondaryCta", label: "Secondary button", fields: [stringField("label", "Label"), stringField("href", "URL")] }],
          },
        ],
      },
    ],
  },
});
