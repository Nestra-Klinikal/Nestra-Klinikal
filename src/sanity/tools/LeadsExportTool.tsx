"use client";

import { useCallback, useState } from "react";
import { Box, Button, Card, Flex, Heading, Stack, Text } from "@sanity/ui";
import { useClient } from "sanity";
import { apiVersion } from "../env";

type LeadRow = {
  _id: string;
  email?: string;
  name?: string;
  phone?: string;
  organisation?: string;
  organisationSize?: string;
  leadType?: string;
  sourcePage?: string;
  programmeTitle?: string;
  consentGiven?: boolean;
  consentTimestamp?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  createdAt?: string;
  message?: string;
};

const COLUMNS: { key: keyof LeadRow; label: string }[] = [
  { key: "email", label: "Email" },
  { key: "name", label: "Name" },
  { key: "phone", label: "Phone" },
  { key: "organisation", label: "Organisation" },
  { key: "organisationSize", label: "Organisation size" },
  { key: "leadType", label: "Type" },
  { key: "programmeTitle", label: "Programme of interest" },
  { key: "sourcePage", label: "Source page" },
  { key: "consentGiven", label: "Consent given" },
  { key: "consentTimestamp", label: "Consent timestamp" },
  { key: "utmSource", label: "UTM source" },
  { key: "utmMedium", label: "UTM medium" },
  { key: "utmCampaign", label: "UTM campaign" },
  { key: "message", label: "Message" },
  { key: "createdAt", label: "Received" },
];

const QUERY = `*[_type == "lead"] | order(createdAt desc){
  _id, email, name, phone, organisation, organisationSize, leadType, sourcePage,
  consentGiven, consentTimestamp, utmSource, utmMedium, utmCampaign, message, createdAt,
  "programmeTitle": programmeOfInterest->title
}`;

/**
 * Escapes a value for CSV. A leading =, +, - or @ is prefixed with a quote so
 * spreadsheet software treats it as text rather than a formula.
 */
function toCsvCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  let str = typeof value === "boolean" ? (value ? "yes" : "no") : String(value);
  if (/^[=+\-@]/.test(str)) str = `'${str}`;
  return `"${str.replace(/"/g, '""')}"`;
}

export function LeadsExportTool() {
  const client = useClient({ apiVersion });
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExport = useCallback(async () => {
    setBusy(true);
    setError(null);
    setStatus(null);
    try {
      const rows = await client.fetch<LeadRow[]>(QUERY);

      if (!rows.length) {
        setStatus("There are no email leads to export yet.");
        return;
      }

      const header = COLUMNS.map((c) => toCsvCell(c.label)).join(",");
      const body = rows
        .map((row) => COLUMNS.map((c) => toCsvCell(row[c.key])).join(","))
        .join("\n");
      // The byte order mark makes Excel open UTF-8 correctly.
      const csv = `﻿${header}\n${body}`;

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const stamp = new Date().toISOString().slice(0, 10);
      link.href = url;
      link.download = `nestra-klinikal-leads-${stamp}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setStatus(`Downloaded ${rows.length} email lead${rows.length === 1 ? "" : "s"}.`);
    } catch (err) {
      setError(
        err instanceof Error
          ? `The export could not be completed: ${err.message}`
          : "The export could not be completed.",
      );
    } finally {
      setBusy(false);
    }
  }, [client]);

  return (
    <Box padding={5}>
      <Stack space={5} style={{ maxWidth: 640 }}>
        <Stack space={3}>
          <Heading size={3}>Export email leads</Heading>
          <Text size={2} muted>
            Downloads every captured email address as a CSV file you can open in Excel or Google
            Sheets, or upload to an email marketing tool.
          </Text>
        </Stack>

        <Card padding={4} radius={2} tone="primary" border>
          <Stack space={3}>
            <Text size={1} weight="semibold">
              Before you send marketing email
            </Text>
            <Text size={1} muted>
              The file includes a consent column. Under the Nigeria Data Protection Act you should
              only send marketing to people whose consent column reads &ldquo;yes&rdquo;.
            </Text>
          </Stack>
        </Card>

        <Flex gap={3}>
          <Button
            text={busy ? "Preparing…" : "Download CSV"}
            tone="primary"
            disabled={busy}
            onClick={handleExport}
          />
        </Flex>

        {status ? (
          <Card padding={3} radius={2} tone="positive" border>
            <Text size={1}>{status}</Text>
          </Card>
        ) : null}

        {error ? (
          <Card padding={3} radius={2} tone="critical" border>
            <Text size={1}>{error}</Text>
          </Card>
        ) : null}
      </Stack>
    </Box>
  );
}

export default LeadsExportTool;
