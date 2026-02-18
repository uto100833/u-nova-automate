import Link from "next/link";
import { site } from "@/lib/site";

export function Nav() {
    return (
        <header className="sticky top-0 z-10 border-b border-slate-900/60 bg-slate-950/70 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
                <Link href="/" className="font-semibold tracking-tight">
                    {site.brand}
                </Link>
                <nav className="flex gap-4 text-sm text-slate-300">
                    <Link href="/work" className="hover:text-white">
                        Work
                    </Link>
                    <Link href="/card" className="hover:text-white">
                        Card
                    </Link>
                    <Link href="/contact" className="hover:text-white">
                        Contact
                    </Link>
                </nav>
            </div>
        </header>
    );
}
