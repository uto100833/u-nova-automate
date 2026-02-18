import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { site } from "@/lib/site";

export default function CardPage() {
    return (
        <main className="py-10">
            <Container>
                <div className="mx-auto max-w-xl">
                    <Card eyebrow={site.brand} title="名刺QRページ（スマホ最適）" desc="まずは状況を聞かせてください。壁打ちでもOKです。">
                        <div className="mt-4 grid gap-3">
                            <a
                                href={`mailto:${site.email}`}
                                className="rounded-2xl bg-sky-400 px-4 py-3 text-center font-semibold text-slate-950 hover:bg-sky-300"
                            >
                                メールで相談する
                            </a>
                            <a
                                href={site.linkedin}
                                className="rounded-2xl border border-slate-700 px-4 py-3 text-center font-semibold hover:border-slate-500"
                            >
                                LinkedInを見る
                            </a>
                            <a
                                href="/work"
                                className="rounded-2xl border border-slate-700 px-4 py-3 text-center font-semibold hover:border-slate-500"
                            >
                                ポートフォリオを見る
                            </a>
                        </div>

                        <div className="mt-5 text-xs text-slate-400">
                            対応時間：{site.availability}
                        </div>
                    </Card>
                </div>
            </Container>
        </main>
    );
}
