import Link from "next/link";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { CTA } from "@/components/CTA";
import { site } from "@/lib/site";

export default function Home() {
    return (
        <main>
            <section className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(56,189,248,0.25),transparent_55%),radial-gradient(700px_circle_at_80%_30%,rgba(34,197,94,0.16),transparent_55%)]" />
                <Container>
                    <div className="py-14">
                        <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                            <Badge>{site.location}</Badge>
                            <Badge>{site.availability}</Badge>
                            <Badge>VBA / GAS / AI</Badge>
                        </div>

                        <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                            {site.headline}
                        </h1>
                        <p className="mt-4 max-w-2xl text-slate-300">{site.subheadline}</p>

                        <CTA
                            primaryHref="/contact"
                            primaryText="無料で相談する"
                            secondaryHref="/work"
                            secondaryText="ポートフォリオを見る"
                        />

                        <div className="mt-10 grid gap-4 md:grid-cols-3">
                            {site.services.map((s) => (
                                <Card key={s.title} title={s.title} desc={s.desc} />
                            ))}
                        </div>

                        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/35 p-6">
                            <div className="text-sm font-semibold">よくある相談</div>
                            <ul className="mt-3 grid gap-2 text-sm text-slate-300 md:grid-cols-2">
                                <li>・CSV/Excelの月次集計が手作業でつらい</li>
                                <li>・レポート作成が毎回同じ作業</li>
                                <li>・会議メモからタスク化が漏れる</li>
                                <li>・更新通知やデータ連携を自動化したい</li>
                            </ul>
                        </div>

                        <div className="mt-10 flex items-center justify-between gap-4">
                            <h2 className="text-xl font-semibold">Work（抜粋）</h2>
                            <Link href="/work" className="text-sm text-sky-300 hover:text-sky-200">
                                一覧を見る →
                            </Link>
                        </div>

                        <div className="mt-4 grid gap-4 md:grid-cols-3">
                            {site.portfolio.slice(0, 3).map((p) => (
                                <Card key={p.title} eyebrow={p.tech} title={p.title} desc={p.impact} />
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            <section className="py-10">
                <Container>
                    <div className="rounded-3xl border border-slate-800 bg-slate-900/25 p-8">
                        <h2 className="text-xl font-semibold">進め方</h2>
                        <div className="mt-4 grid gap-4 md:grid-cols-4">
                            {[
                                ["ヒアリング", "業務と課題を短時間で整理"],
                                ["提案/概算", "自動化範囲と効果を提示"],
                                ["試作", "小さく作ってすぐ確認"],
                                ["納品/引継ぎ", "使い方・保守方針まで整理"],
                            ].map(([t, d]) => (
                                <Card key={t} title={t} desc={d} />
                            ))}
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
