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
        <div className="mt-7 flex flex-wrap gap-3">
            <Link
                href={primaryHref}
                className="rounded-2xl bg-sky-400 px-5 py-3 font-semibold text-slate-950 hover:bg-sky-300"
            >
                {primaryText}
            </Link>
            <Link
                href={secondaryHref}
                className="rounded-2xl border border-slate-700 px-5 py-3 font-semibold hover:border-slate-500"
            >
                {secondaryText}
            </Link>
        </div>
    );
}
