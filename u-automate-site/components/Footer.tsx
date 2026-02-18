import { site } from "@/lib/site";

export function Footer() {
    return (
        <footer className="mt-14 border-t border-slate-900/60 py-10 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} {site.brand}
        </footer>
    );
}
