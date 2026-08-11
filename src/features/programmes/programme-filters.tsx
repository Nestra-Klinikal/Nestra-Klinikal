"use client";

import { parseAsString, useQueryStates } from "nuqs";
import { X } from "lucide-react";

import { ProgrammeCard } from "@/features/programmes/programme-card";
import { Button } from "@/components/ui/button";
import { PROGRAMME_CATEGORIES, PROGRAMME_LEVELS, cn } from "@/lib/utils";
import type { Programme } from "@/types/content";

/**
 * Filters live in the URL rather than component state, so a filtered view can be
 * shared or bookmarked — which matters when programmes are promoted over
 * WhatsApp.
 */
export function ProgrammeFilters({ programmes }: { programmes: Programme[] }) {
  const [filters, setFilters] = useQueryStates(
    {
      category: parseAsString.withDefault(""),
      level: parseAsString.withDefault(""),
    },
    { history: "replace", shallow: true },
  );

  const filtered = programmes.filter((programme) => {
    if (filters.category && programme.category !== filters.category) return false;
    if (filters.level && programme.level !== filters.level) return false;
    return true;
  });

  const hasFilters = Boolean(filters.category || filters.level);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <FilterRow
          label="Category"
          options={PROGRAMME_CATEGORIES}
          value={filters.category}
          onChange={(value) => void setFilters({ category: value })}
        />
        <FilterRow
          label="Level"
          options={PROGRAMME_LEVELS}
          value={filters.level}
          onChange={(value) => void setFilters({ level: value })}
        />
      </div>

      <div className="flex items-center justify-between gap-4 border-y border-border py-3">
        <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
          Showing {filtered.length} of {programmes.length} programmes
        </p>
        {hasFilters ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => void setFilters({ category: "", level: "" })}
          >
            <X aria-hidden="true" />
            Clear filters
          </Button>
        ) : null}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((programme) => (
            <ProgrammeCard key={programme._id} programme={programme} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border p-12 text-center">
          <p className="font-semibold">No programmes match those filters</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try clearing a filter, or message us and we will point you to the right programme.
          </p>
          <Button
            className="mt-6"
            variant="outline"
            onClick={() => void setFilters({ category: "", level: "" })}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <span className="shrink-0 text-eyebrow font-bold uppercase text-muted-foreground">
        {label}
      </span>
      <div className="scroll-x flex gap-2 pb-1">
        <FilterChip active={value === ""} onClick={() => onChange("")}>
          All
        </FilterChip>
        {options.map((option) => (
          <FilterChip
            key={option.value}
            active={value === option.value}
            onClick={() => onChange(value === option.value ? "" : option.value)}
          >
            {option.label}
          </FilterChip>
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
