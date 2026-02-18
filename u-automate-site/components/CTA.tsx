import Link from "next/link";

export function CTA({
    primaryHref,
    primaryText,
    secondaryHref,
    secondaryText,
}: {
    primaryHref: string;
    primaryText: string;
    secondaryHref: string;
    secondaryText: string;
}) {
    return (
        <div className="mt-8 flex flex-wrap gap-3">
            <Link
                href={primaryHref}
                className="group relative inline-flex items-center justify-center rounded-2xl bg-sky-400 px-6 py-3 font-semibold text-slate-950 shadow-[0_12px_30px_-18px_rgba(56,189,248,0.85)] transition hover:bg-sky-300"
            >
                <span className="absolute inset-0 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.55),transparent_60%)]" />
                {primaryText}
                <span className="ml-2 transition-transform group-hover:translate-x-0.5">→</span>
            </Link>

            <Link
                href={secondaryHref}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-800/80 bg-slate-950/30 px-6 py-3 font-semibold text-slate-100 transition hover:border-slate-700/80 hover:bg-slate-950/50"
            >
                {secondaryText}
            </Link>
        </div>
    );
}
