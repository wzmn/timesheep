'use client'
import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';


// --- Pure SVG Icons (Replacing Lucide) ---
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const FeatureIcon = ({ path }: { path: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d={path} />
  </svg>
);

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle Navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-blue-100">

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-5'
        }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-blue-600 p-2 rounded-xl transition-transform group-hover:rotate-12">
              <ClockIcon />
            </div>
            <span className="text-xl font-bold tracking-tight">TimeSheep</span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-medium">
            <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="/login" className="text-slate-600 hover:text-blue-600 transition-colors">Sign In</a>
            <Link href="/register" className="bg-slate-900 text-white px-6 py-2.5 rounded-full hover:bg-blue-600 transition-all active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        {/* Simple CSS-only Background Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-indigo-100/50 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Work hours, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              perfectly tracked.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-12 leading-relaxed">
            Introducing <span className="font-semibold text-slate-900">TimeSheep</span>, the cutting-edge timesheet application designed to monitor attendance and productivity from anywhere, anytime.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/login" className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-blue-200 transition-all hover:-translate-y-1">
              Start Tracking Now
            </Link>
            <button className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
              Schedule Demo
            </button>
          </div>

          {/* Browser Mockup / Visual */}
          <div className="mt-20 mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-blue-100">
            <div className="rounded-xl bg-slate-50 border border-slate-100 aspect-video flex items-center justify-center">
              <Image
                src={"/image.png"}
                width={1000}
                height={550}
                alt="Dashboard Preview"
                priority
                unoptimized={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Feature 1 */}
            <div className="group">
              <div className="mb-6 inline-block p-4 rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <FeatureIcon path="M12 2v20M2 12h20" /> {/* Example paths */}
              </div>
              <h3 className="text-2xl font-bold mb-4">Effortless Tracking</h3>
              <p className="text-slate-600 leading-relaxed">
                Designed to revolutionize how you manage work hours with a seamless, user-first interface.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group">
              <div className="mb-6 inline-block p-4 rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <FeatureIcon path="M21 12V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Real-time Monitoring</h3>
              <p className="text-slate-600 leading-relaxed">
                Monitor employee attendance and productivity from anywhere, using any internet-connected device.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group">
              <div className="mb-6 inline-block p-4 rounded-2xl bg-slate-50 text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                <FeatureIcon path="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Secure Access</h3>
              <p className="text-slate-600 leading-relaxed">
                Your data is protected with high-grade encryption, ensuring productivity remains private and safe.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
          <div className="flex items-center gap-2 grayscale opacity-70">
            <ClockIcon />
            <span className="font-bold">TimeSheep</span>
          </div>
          <p>© 2026 TimeSheep Inc. Revolutionizing the way the world works.</p>
        </div>
      </footer>
    </div>
  );
}