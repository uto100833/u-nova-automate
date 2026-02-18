import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { site } from "@/lib/site";

export default function Contact() {
    return (
        <main className="py-10">
            <Container>
                <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
                <p className="mt-2 text-slate-300">
                    相談内容が固まってなくてもOKです。状況を聞いて、自動化できる範囲を一緒に整理します。
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <Card title="連絡先">
                        <div className="mt-2 space-y-2 text-sm text-slate-300">
                            <div>📩 Email：{site.email}</div>
                            <div>🔗 LinkedIn：{site.linkedin}</div>
                            <div>💻 GitHub：{site.github}</div>
                            {site.x && <div>✖ X：{site.x}</div>}
                        </div>
                    </Card>

                    <Card title="フォーム（任意）" desc="Googleフォーム等を貼ると、問い合わせが増えやすいです。">
                        {site.contactFormUrl ? (
                            <a
                                href={site.contactFormUrl}
                                className="inline-flex rounded-2xl bg-sky-400 px-4 py-3 font-semibold text-slate-950 hover:bg-sky-300"
                            >
                                フォームを開く
                            </a>
                        ) : (
                            <div className="text-sm text-slate-400">
                                まだ未設定です（site.contactFormUrl にURLを入れるとボタンが出ます）
                            </div>
                        )}
                    </Card>
                </div>

                <div className="mt-6">
                    <Card
                        title="お願い（スムーズに進めるため）"
                        desc="以下の情報があると、概算と方針がすぐ出せます。"
                    >
                        <ul className="mt-3 grid gap-2 text-sm text-slate-300 md:grid-cols-2">
                            <li>・対象業務（例：月次集計）</li>
                            <li>・現状の手順（ざっくりでOK）</li>
                            <li>・データ形式（Excel/CSV/Sheets）</li>
                            <li>・頻度（毎日/毎月など）</li>
                            <li>・理想の出力（レポ/通知など）</li>
                            <li>・期限感</li>
                        </ul>
                    </Card>
                </div>
            </Container>
        </main>
    );
}
