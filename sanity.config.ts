"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { Download } from "lucide-react";

import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemas";
import { structure } from "@/sanity/structure";
import { LeadsExportTool } from "@/sanity/tools/LeadsExportTool";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "Nestra Klinikal",
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    {
      name: "leads-export",
      tools: [
        {
          name: "leads-export",
          title: "Export leads",
          icon: Download,
          component: LeadsExportTool,
        },
      ],
    },
  ],
});
