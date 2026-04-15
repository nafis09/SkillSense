import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { Link, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SkillSense" },
    { name: "description", content: "Welcome to SkillSense!" },
  ];
}

export default function Home() {
    const { auth, kv } = usePuterStore();
    const navigate = useNavigate();
    const [resumes, setResumes] = useState<Resume[]>([])
    const [loadingResumes, setLoadingResumes] = useState(false)

    useEffect(() => {
      if(!auth.isAuthenticated) navigate('/auth?next=/')
    }, [auth.isAuthenticated])

    useEffect(() => {
      const loadResumes = async () => {
        setLoadingResumes(true)
        
        const resumes = (await kv.list('resume:*', true)) as KVItem[]

        const parsedResumes = resumes?.map((resume) => (
          JSON.parse(resume.value) as Resume
        ))

        console.log(parsedResumes)

        setResumes(parsedResumes || [])
        setLoadingResumes(false)
      }

      loadResumes()
    }, [])

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
    <section className="main-section py-16">
      <div className="page-heading">
        <h1>Track Your Applications & Resume Ratings</h1>
        {!loadingResumes && resumes?.length === 0 ? (
          <h2>No Resumes Found. Upload a Resume to Get Started.</h2>
        ): (
          <h2>Review Your Submissions & Check AI-Powered Feedback.</h2>
        )}

      </div>

      {loadingResumes && (
        <div className="flex flex-col items-center justify-center">
          <img src="/images/resume-scan-2.gif" alt="loading" className="w-[200px]" />
        </div>
      )}

      {!loadingResumes && resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
      ))}
      </div>
    )}

    {!loadingResumes && resumes?.length === 0 && (
      <div className="flex flex-col items-center justify-center mt-10 gap-4">
        <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
          Upload Resume
        </Link>
      </div>
    )}

    </section>
  </main>
}
