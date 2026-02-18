export function Card({
    title,
    desc,
    eyebrow,
    children,
}: {
    title?: string;
    desc?: string;
    eyebrow?: string;
    children?: React.ReactNode;
}) {
    return (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/35 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            {eyebrow && <div className="text-xs text-slate-400">{eyebrow}</div>}
            {title && <div className="mt-2 text-lg font-semibold">{title}</div>}
            {desc && <p className="mt-2 text-sm text-slate-300">{desc}</p>}
            {children && <div className="mt-4">{children}</div>}
        </div>
    );
}
