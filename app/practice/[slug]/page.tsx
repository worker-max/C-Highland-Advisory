import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  DIVISIONS,
  getDivisionBySlug,
  getNextDivision,
  programCopy,
} from "@/lib/content/divisions";
import { SiteFooter } from "@/components/sections/SiteFooter";

type Params = { slug: string };

export function generateStaticParams() {
  return DIVISIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(props: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const d = getDivisionBySlug(slug);
  if (!d) return {};
  return {
    title: d.name,
    description: d.lede,
  };
}

export default async function DivisionPage(props: {
  params: Promise<Params>;
}) {
  const { slug } = await props.params;
  const division = getDivisionBySlug(slug);
  if (!division) notFound();

  const next = getNextDivision(slug);
  const firstNameWord = division.name.split(" ")[0].toUpperCase();
  const hasItalicSplit = division.name.includes(" — ");
  const [headPart, italicPart] = hasItalicSplit
    ? division.name.split(" — ")
    : [division.name, ""];

  return (
    <div className="division-page">
      <section className="division-hero">
        <div className="crumbs">
          <Link href="/">C Highland Advisory</Link>
          <span>/</span>
          <Link href="/#divisions">Divisions</Link>
          <span>/</span>
          <span className="num">{division.num}</span>
        </div>
        <div className="stripe-row">
          <div
            className="stripe"
            style={{ background: division.color }}
            aria-hidden="true"
          />
          <span className="mono" style={{ color: "var(--color-silt)" }}>
            {division.num} / 07 · {firstNameWord}
          </span>
        </div>
        <h1>
          {headPart}
          {hasItalicSplit && (
            <>
              <br />
              <em>— {italicPart}</em>
            </>
          )}
        </h1>
        <p className="lede">{division.lede}</p>
        <div className="meta-strip">
          {division.metrics.map((m) => (
            <div className="meta-cell" key={m.lbl}>
              <span className="lbl">{m.lbl}</span>
              <span className="val">{m.val}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="programs-section">
        <span className="eyebrow">
          <span className="marker" />
          <span className="num">{division.num}.A</span> Discipline
        </span>
        <h2 style={{ marginTop: 16 }}>{division.blurb}</h2>
        {division.longCopy.map((para, i) => (
          <p
            className="lede-sm"
            key={i}
            style={{ marginTop: i === 0 ? 16 : 4 }}
          >
            {para}
          </p>
        ))}

        <div style={{ height: 64 }} />

        <span className="eyebrow">
          <span className="marker" />
          <span className="num">{division.num}.B</span> Named programs
        </span>
        <h2 style={{ marginTop: 16, marginBottom: 32 }}>
          What lives inside this division.
        </h2>
        <div className="programs-grid">
          {division.programs.map((p, i) => (
            <div className="program-card" key={p}>
              <div className="top">
                <span>Program · {String(i + 1).padStart(2, "0")}</span>
                <span className="pill-tag">Active</span>
              </div>
              <h3>{p}</h3>
              <p style={{ flex: 1 }}>{programCopy(p)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="next-division">
        <span className="eyebrow">
          <span className="marker" /> Next division
        </span>
        <Link href={`/practice/${next.slug}`} style={{ marginTop: 32 }}>
          <span className="next-num">{next.num} / 07</span>
          <span className="next-name">{next.name}</span>
          <span className="next-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
}
