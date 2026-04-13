import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SkillSense" },
    { name: "description", content: "Welcome to SkillSense!" },
  ];
}

export default function Home() {
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <section className="main-section">
      <div className="page-heading">
        <h1>Track Your Applications & Resume Ratings</h1>
        <h2>Review Your Submissions & Check AI-Powered Feedback.</h2>
      </div>
    </section>
  </main>
}
