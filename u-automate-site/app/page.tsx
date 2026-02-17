import Link from "next/link";

const services = [
  { title: "Excel自動化（VBA）", desc: "CSV集計、月次レポート、データ整形をボタン1つに。" },
  { title: "Google Sheets自動化（GAS）", desc: "スプレッドシート処理、通知、各種連携を実装。" },
  { title: "AI業務自動化", desc: "会議メモ→ToDo、問い合わせ文の要約/分類などを自動化。" },
];

const works = [
  { title: "フォルダ内CSV一括集計ツール", effect: "月次集計 3h → 10min（想定）", tech: "VBA", href: "/work" },
  { title: "会議メモ→ToDo抽出（AI）", effect: "タスク化の抜け漏れを削減", tech: "AI + Excel", href: "/work" },
  { title: "スプレッドシート通知自動化", effect: "手動連絡を自動化し対応速度UP", tech: "GAS", href: "/work" },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <header className="flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">U-Automate</Link>
        <nav className="flex gap-4 text-sm text-slate-300">
          <Link href="/work" className="hover:text-white">Work</Link>
          <Link href="/card" className="hover:text-white">Card</Link>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
      </header>

      <section className="mt-14 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-10 shadow-lg">
        <p className="text-sm text-slate-300">業務自動化ツール開発 / 導入支援</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight">
          Excel・Google Sheets・AIで<br />“手作業”を自動化します
        </h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          中小企業・個人事業主向けに、VBA / GAS / AI を活用して日常業務の自動化を実装します。
          まずは小さく試作し、短期間で効果が出る形にします。
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <a href="#contact" className="rounded-xl bg-sky-400 px-5 py-3 font-semibold text-slate-950 hover:bg-sky-300">
            無料で相談する
          </a>
          <Link href="/work" className="rounded-xl border border-slate-700 px-5 py-3 font-semibold hover:border-slate-500">
            ポートフォリオを見る
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 text-xs text-slate-400">
          <span className="rounded-full border border-slate-800 px-3 py-1">VBA</span>
          <span className="rounded-full border border-slate-800 px-3 py-1">Google Apps Script</span>
          <span className="rounded-full border border-slate-800 px-3 py-1">Python</span>
          <span className="rounded-full border border-slate-800 px-3 py-1">AI（文章処理/分類/抽出）</span>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">提供サービス</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <h3 className="font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold">ポートフォリオ（抜粋）</h2>
          <Link href="/work" className="text-sm text-sky-300 hover:text-sky-200">一覧を見る →</Link>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {works.map((w) => (
            <Link key={w.title} href={w.href} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 hover:border-slate-600">
              <div className="text-xs text-slate-400">{w.tech}</div>
              <div className="mt-2 font-semibold">{w.title}</div>
              <div className="mt-2 text-sm text-slate-300">{w.effect}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/30 p-8">
        <h2 className="text-xl font-semibold">進め方</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-4">
          {[
            ["ヒアリング", "現状業務と課題を短時間で整理"],
            ["提案/概算", "自動化の範囲と効果を提示"],
            ["試作", "小さく作ってすぐ確認"],
            ["納品/引継ぎ", "使い方・保守方針まで整理"],
          ].map(([t, d]) => (
            <li key={t} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <div className="font-semibold">{t}</div>
              <div className="mt-2 text-sm text-slate-300">{d}</div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12" id="contact">
        <h2 className="text-xl font-semibold">お問い合わせ</h2>
        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <p className="text-sm text-slate-300">
            まずは「どこを自動化できそうか」壁打ちでもOKです。平日19:00以降・土日対応。
          </p>
          <div className="mt-4 grid gap-2 text-sm">
            <div>📩 Email：<span className="text-slate-200">your@email.com</span></div>
            <div>🔗 LinkedIn：<span className="text-slate-200">https://linkedin.com/in/yourusername</span></div>
            <div>💻 GitHub：<span className="text-slate-200">https://github.com/yourusername</span></div>
          </div>
        </div>
      </section>

      <footer className="mt-14 pb-10 text-center text-xs text-slate-500">
        © 2026 U-Automate
      </footer>
    </main>
  );
}
