export const tags = {
  "2402428c-1d7e-401a-b3b0-9225c4ea3ce2": "Security",
  "5b0c48dd-ac98-4c5c-9b14-226b486bfbf8": "Cloud",
  "632bf880-3ea3-4ebf-b2df-e6dcdb365a83": "UI/UX",
  "6527ccfd-3ea3-4ce6-8b6a-22a8d22784b5": "Algorithms",
  "69e23e02-b3ad-40ec-8943-0d669538fa30": "AI",
  "82d2c032-f4e8-4e3b-b662-9d6dc7f5ccf8": "Mobile",
  "85e7bdf3-2aef-4f0c-aa54-0de1d9b45d58": "Frontend",
  "8f1c11f6-8d48-493d-981e-6ba9a1317d5f": "IoT",
  "911128ec-76b1-490d-a1ed-48d825fc5f3c": "Python",
  "96b04e08-9ef1-4d5f-8c74-0b304d4991ea": "GameDev",
  "a82d8cb8-82f2-4642-9267-4398dcac3e18": "DevOps",
  "a9b23834-ae48-4eaf-a4fe-eccd526df246": "Backend",
  "acd41984-2712-486b-b369-ea0798562f1b": "Testing",
  "bce3ecde-ef3e-4937-b01b-1a82fdea473b": "C#",
  "cd048c50-997f-4783-94e7-31f864af9379": "ML",
  "d55e6dda-5d82-42dc-b8bf-087c42a8be4c": "JavaScript",
  "d70b7f68-e7c0-4166-9b4e-312d994da59b": "DataScience",
  "e8eb785f-ce8d-40eb-bb3a-5e24e67efde5": "Blockchain",
  "ed106e6d-45df-4541-bc13-8ad47473d22e": "Ruby",
  "f91ec361-2778-4ce4-bf86-07e4235cca7c": "Networking"
} as const;

export type TagId = keyof typeof tags;
export type TagLabel = typeof tags[TagId];


export const labelToIdMap = Object.entries(tags).reduce<
  Record<TagLabel, TagId>>((acc, [id, label]) => {
  acc[label as TagLabel] = id as TagId;
  return acc;
}, {} as Record<TagLabel, TagId>);