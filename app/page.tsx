"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const alerts = [
  {
    label: "Lameness detected in 2 cows",
    detail: "Mobility index dropped by 14% in Group Delta",
  },
  {
    label: "Somatic cell count trending up",
    detail: "Lot 4 herd average +180k cells/mL in 48h",
  },
];

const initialLinearTraits = [
  { name: "Body Depth", value: 7, signal: "+12% vs herd avg" },
  { name: "Rump Angle", value: 5, signal: "Balanced" },
  { name: "Rear Leg Angle", value: 6, signal: "+4% flex" },
];

const initialSummaryMetrics = [
  { label: "Cows monitored", value: "312", helper: "Live sensor feeds" },
  { label: "AI confidence", value: "97.2%", helper: "Last 12h" },
  { label: "Daily alerts", value: "6", helper: "3 resolved · 3 open" },
  { label: "Avg. locomotion", value: "7.8 / 9", helper: "Herd mobility" },
];



export default function Home() {
  const [linearTraits, setLinearTraits] = useState(initialLinearTraits);
  const [summaryMetrics, setSummaryMetrics] = useState(initialSummaryMetrics);

  useEffect(() => {
    // Evolve values over lifetime (simulate gradual changes)
    const evolveInterval = setInterval(() => {
      setLinearTraits((prev) =>
        prev.map((trait) => {
          const change = (Math.random() - 0.5) * 0.1;
          const newValue = Math.max(1, Math.min(9, trait.value + change));
          return { ...trait, value: Number(newValue.toFixed(1)) };
        })
      );

      setSummaryMetrics((prev) =>
        prev.map((metric) => {
          if (metric.label === "AI confidence") {
            const current = parseFloat(metric.value);
            const change = (Math.random() - 0.5) * 0.2;
            const newValue = Math.max(90, Math.min(99.9, current + change));
            return { ...metric, value: `${newValue.toFixed(1)}%` };
          }
          if (metric.label === "Avg. locomotion") {
            const current = parseFloat(metric.value.split(" / ")[0]);
            const change = (Math.random() - 0.5) * 0.1;
            const newValue = Math.max(5, Math.min(9, current + change));
            return { ...metric, value: `${newValue.toFixed(1)} / 9` };
          }
          return metric;
        })
      );
    }, 3000);

    return () => {
      clearInterval(evolveInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[#0f2748]">
      <header className="bg-[#004685] px-6 py-5 shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center gap-4">
        <Image
            src="/crv-logo.jpg"
            alt="CRV Logo"
          width={100}
            height={50}
            className="h-auto w-auto object-contain"
          priority
        />
          <div className="border-l border-white/20 pl-4">
            <h1 className="text-xl font-semibold text-white sm:text-2xl">
              AI Health & Trait Monitor
          </h1>
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">
              CRVisionairs
            </p>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <section className="rounded-3xl border border-[#f0c2ca] bg-white px-6 py-5 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="mt-1 h-3 w-3 rounded-full bg-[#E60029] shadow-[0_0_0_6px_rgba(230,0,41,0.15)]" />
              <div>
                <p className="text-lg font-semibold text-[#E60029]">
                  Live alerts
                </p>
                <p className="text-sm text-[#5c6b85]">
                  Computer vision flags require vet validation within 4 hours.
                </p>
              </div>
            </div>
            <button className="rounded-full border border-[#004685]/20 px-5 py-2 text-sm font-semibold text-[#004685] transition hover:bg-[#004685] hover:text-white">
              Export report
            </button>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {alerts.map((alert) => (
              <div
                key={alert.label}
                className="rounded-2xl bg-[#fef1f3] px-4 py-3 text-sm text-[#b01c2b]"
              >
                <p className="font-semibold text-[#E60029]">{alert.label}</p>
                <p className="text-[#b93b47]">{alert.detail}</p>
              </div>
            ))}
            </div>
          </section>

          <section className="rounded-3xl border border-[#d0deef] bg-white p-8 shadow-[0_18px_50px_rgba(15,39,72,0.08)]">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between mb-8">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#5c6b85] mb-2">
                  Computer vision
                </p>
                <h2 className="text-3xl font-semibold text-[#004685] mb-2">
                  Mobility & lameness detection
                </h2>
                <p className="text-sm text-[#5c6b85]">
                  YOLO pose pipeline · 120 fps · biomechanical stride analysis
                </p>
              </div>
              <div className="rounded-2xl bg-[#004685] px-6 py-4 text-white shadow-lg">
                <p className="text-xs uppercase tracking-[0.25em] text-white/70 mb-1">
                  Status
                </p>
                <p className="text-xl font-semibold">Critical review</p>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
              <div className="relative h-[500px] rounded-3xl bg-gradient-to-r from-[#e6eff8] via-[#d1e2f6] to-[#b9d4f5] p-6 overflow-hidden">
                <div className="absolute inset-6 rounded-3xl border border-white/60 bg-white/40 backdrop-blur-sm" />
                <div className="relative h-full w-full flex items-center justify-center">
                  <div className="relative" style={{ width: '400px', height: '400px' }}>
                    <Image
                      src="/cow.png"
                      alt="Cow"
                      width={400}
                      height={400}
                      className="object-contain"
                      style={{
                        filter: 'drop-shadow(0 8px 12px rgba(0, 0, 0, 0.15))',
                      }}
                    />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#004685] shadow-lg">
                  Gait variance · 18.4°
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl border border-[#d0deef] bg-[#f7fbff] p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-[#5c6b85] mb-4">
                    Anomaly focus
                  </p>
                  <div className="flex items-baseline gap-3 mb-4">
                    <p className="text-5xl font-semibold text-[#E60029]">2</p>
                    <span className="text-base text-[#5c6b85]">
                      cows with acute stride irregularities
                    </span>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-sm text-[#5c6b85] mb-2">
                    <span>Stride stability</span>
                    <span className="font-semibold text-[#004685]">74%</span>
                  </div>
                  <div className="h-3 rounded-full bg-white">
                    <div className="h-full w-[74%] rounded-full bg-[#004685]" />
                  </div>
                </div>
                <div className="rounded-2xl border border-[#d0deef] bg-white p-6">
                  <p className="text-base font-semibold text-[#004685] mb-2">
                    Intervention window
                  </p>
                  <p className="text-sm text-[#5c6b85] mb-4">
                    Optimal treatment within <span className="font-semibold">6h 30m</span>
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between py-2 border-b border-[#e2eaf6]">
                      <span className="text-[#5c6b85]">Thermal imaging</span>
                      <span className="font-semibold text-[#004685]">Ready</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-[#5c6b85]">Vet dispatch</span>
                      <span className="font-semibold text-[#E60029]">Pending</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-[#d0deef] bg-white p-6">
                  <h3 className="text-lg font-semibold text-[#004685] mb-4">
                    Cow overview summary
                  </h3>
                  <div className="space-y-4">
                    {summaryMetrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-xl border border-[#e2eaf6] px-4 py-3 bg-[#f7fbff]"
                      >
                        <p className="text-xs uppercase tracking-[0.2em] text-[#5c6b85] mb-1">
                          {metric.label}
                        </p>
                        <p className="text-2xl font-semibold text-[#004685]">
                          {metric.value}
                        </p>
                        <p className="text-xs text-[#5c6b85] mt-1">{metric.helper}</p>
                      </div>
                    ))}
                  </div>
                  <button className="mt-6 w-full rounded-2xl bg-[#004685] py-3 text-sm font-semibold text-white transition hover:bg-[#00376a]">
                    Open herd timeline
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-[#d0deef] bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-2 mb-6">
              <p className="text-sm uppercase tracking-[0.3em] text-[#5c6b85]">
                Linear traits
              </p>
              <h3 className="text-2xl font-semibold text-[#004685]">
                Structural evaluation · scale 1 – 9
              </h3>
              <p className="text-sm text-[#5c6b85]">
                Indexed vs. CRV reference population · recalculated nightly.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {linearTraits.map((trait) => (
                <div key={trait.name} className="space-y-4 rounded-2xl border border-[#e3eaf5] p-6 bg-[#f7fbff]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold text-[#0f2748]">
                        {trait.name}
                      </p>
                      <p className="text-xs uppercase tracking-[0.3em] text-[#5c6b85] mt-1">
                        {trait.signal}
                      </p>
                    </div>
                    <span className="rounded-full bg-white px-4 py-2 text-base font-semibold text-[#004685] border border-[#d0deef]">
                      {trait.value}/9
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#d0d8e9]">
                      {[1, 3, 5, 7, 9].map((step) => (
                        <span key={step} className={Math.round(trait.value) === step ? "text-[#004685]" : ""}>
                          {step}
                        </span>
                      ))}
                    </div>
                    <div className="h-4 rounded-full bg-white">
                      <div
                        className="h-full rounded-full bg-[#004685] transition-all duration-300"
                        style={{ width: `${(trait.value / 9) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <footer className="border-t border-[#d0deef] bg-white px-4 py-12 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-4">
            <Image
                  src="/crv-logo.jpg"
                  alt="CRV Logo"
                  width={100}
                  height={50}
                  className="h-auto w-auto object-contain"
                />
                <div>
                  <h3 className="text-lg font-semibold text-[#004685]">
                    CRVisionairs
                  </h3>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#5c6b85]">
                    AI Health & Trait Monitor
                  </p>
                </div>
              </div>
              <p className="text-sm text-[#5c6b85] max-w-md">
                Advanced computer vision and AI-powered analytics for dairy cattle health monitoring,
                mobility assessment, and trait evaluation.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[#004685] mb-4 uppercase tracking-[0.2em]">
                Platform
              </h4>
              <ul className="space-y-2 text-sm text-[#5c6b85]">
                <li>
                  <a href="#" className="hover:text-[#004685] transition-colors">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#004685] transition-colors">
                    Analytics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#004685] transition-colors">
                    Reports
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#004685] transition-colors">
                    API Docs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[#004685] mb-4 uppercase tracking-[0.2em]">
                Support
              </h4>
              <ul className="space-y-2 text-sm text-[#5c6b85]">
                <li>
                  <a href="#" className="hover:text-[#004685] transition-colors">
            Documentation
          </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#004685] transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#004685] transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#004685] transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#e2eaf6] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#5c6b85]">
              © {new Date().getFullYear()} CRVisionairs. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-[#5c6b85]">
              <span>Version 1.0.0</span>
              <span>·</span>
              <span>Last updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

