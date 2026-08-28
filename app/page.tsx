"use client";

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import EducationSection from "./components/EducationSection";
import EducationModal from "./components/EducationModal";
import SettingsSection from "./components/SettingsSection";
import RegulationSection from "./components/RegulationSection";
import ReportFormSection from "./components/ReportFormSection";
import ReportTrackingSection from "./components/ReportTrackingSection";
import Footer from "./components/Footer";
import ScrollHud from "./components/ScrollHud";
import {
  KTR_EDUCATION_FACTS,
  KTR_REPORT,
  KTR_SETTINGS,
  DEMO_REPORTS,
  KtrSavedReport,
} from "./content/ktr";

interface LenisInterface {
  start: () => void;
  stop: () => void;
  destroy: () => void;
  raf: (time: number) => void;
}

export default function Home() {
  // Form states
  const [reporterInitials, setReporterInitials] = useState("");
  const [reportType, setReportType] = useState(KTR_REPORT.types[0].value);
  const [settingCategory, setSettingCategory] = useState(KTR_SETTINGS[0].id);
  const [locationName, setLocationName] = useState("");
  const [description, setDescription] = useState("");
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [generatedTicketId, setGeneratedTicketId] = useState("");
  const [qrDetected, setQrDetected] = useState(false);
  const [spamErrorMessage, setSpamErrorMessage] = useState("");

  // Tracking state
  const [searchTicketId, setSearchTicketId] = useState("");
  const [searchedReport, setSearchedReport] = useState<KtrSavedReport | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Selected Fact Modal state
  const [selectedFact, setSelectedFact] = useState<typeof KTR_EDUCATION_FACTS[0] | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(1);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const lokasiParam = urlParams.get("lokasi") || urlParams.get("location");
    if (lokasiParam) {
      setTimeout(() => {
        setLocationName(lokasiParam);
        setQrDetected(true);
      }, 0);
    }
  }, []);

  useEffect(() => {
    let lenisInstance: LenisInterface | null = null;

    import("lenis")
      .then((LenisModule) => {
        const Lenis = LenisModule.default;
        lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });

        function raf(time: number) {
          lenisInstance?.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      })
      .catch(() => {
      });

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = Math.min(1, Math.max(0, currentScroll / (totalHeight || 1)));
      setScrollProgress(progress);

      const totalSections = 5;
      const calculatedIndex = Math.min(
        totalSections,
        Math.max(1, Math.floor(progress * totalSections) + 1)
      );
      setActiveSectionIndex(calculatedIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, []);

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setSpamErrorMessage("");

    // Anti-Spam Check 1: Rate limiting via LocalStorage (Limit 1 submission every 30 seconds per device)
    const lastSubmitTime = localStorage.getItem("ktr_last_submit_timestamp");
    const now = Date.now();
    if (lastSubmitTime && now - parseInt(lastSubmitTime, 10) < 30000) {
      const remainingSecs = Math.ceil((30000 - (now - parseInt(lastSubmitTime, 10))) / 1000);
      setSpamErrorMessage(`Proteksi Anti-Spam: Mohon tunggu ${remainingSecs} detik sebelum mengirimkan laporan berikutnya.`);
      return;
    }

    // Anti-Spam Check 2: Validation on mandatory fields
    if (!reporterInitials.trim() || !locationName.trim() || !description.trim()) {
      setSpamErrorMessage("Mohon lengkapi seluruh isian wajib (Inisial Pelapor, Lokasi, dan Deskripsi).");
      return;
    }

    if (description.trim().length < 10) {
      setSpamErrorMessage("Deskripsi kronologi terlalu pendek (minimal 10 karakter untuk menghindari spam).");
      return;
    }

    setIsUploading(true);
    let uploadedEvidenceUrl: string | undefined = undefined;
    let uploadedEvidenceName: string | undefined = undefined;

    // Unggah file ke API Vercel Blob jika ada berkas yang dipilih
    if (evidenceFile) {
      try {
        const formData = new FormData();
        formData.append("file", evidenceFile);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const uploadData = await response.json();
          uploadedEvidenceUrl = uploadData.url;
          uploadedEvidenceName = uploadData.isMock
            ? `${evidenceFile.name} (Simulasi)`
            : evidenceFile.name;
        } else {
          uploadedEvidenceName = evidenceFile.name;
        }
      } catch (err) {
        console.error("Gagal mengunggah berkas:", err);
        uploadedEvidenceName = evidenceFile.name;
      }
    }

    // Direct save to PostgreSQL Database via Next.js Serverless API Route
    let ticketId = "";
    const selectedTypeObj = KTR_REPORT.types.find((t) => t.value === reportType);
    const selectedSettingObj = KTR_SETTINGS.find((s) => s.id === settingCategory);

    try {
      const apiResponse = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reporterInitials: reporterInitials.trim().toUpperCase(),
          violationType: selectedTypeObj ? selectedTypeObj.label : reportType,
          settingCategory: selectedSettingObj ? selectedSettingObj.name : settingCategory,
          violationLocation: locationName.trim(),
          description: description.trim(),
          evidenceUrl: uploadedEvidenceUrl || uploadedEvidenceName || null,
        }),
      });

      if (apiResponse.ok) {
        const data = await apiResponse.json();
        ticketId = data.ticketId;
      }
    } catch (err) {
      console.warn("API report submit fallback to client state:", err);
    }

    if (!ticketId) {
      const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
      ticketId = `KTR-${randomHex}-2026`;
    }

    setIsUploading(false);

    const newReport: KtrSavedReport = {
      ticketId,
      reporterInitials: reporterInitials.trim().toUpperCase(),
      reportTypeLabel: selectedTypeObj ? selectedTypeObj.label : reportType,
      settingCategoryLabel: selectedSettingObj ? selectedSettingObj.name : settingCategory,
      locationName: locationName.trim(),
      description: description.trim(),
      evidenceName: uploadedEvidenceName,
      createdAt: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }) + " WIB",
      status: "Menunggu review",
      notes: "Laporan Anda berhasil masuk ke antrean verifikasi petugas satgas setempat.",
    };

    // Save to local in-memory store & local storage timestamp
    DEMO_REPORTS[ticketId] = newReport;
    localStorage.setItem("ktr_last_submit_timestamp", now.toString());

    setGeneratedTicketId(ticketId);
    setIsSubmitted(true);
  };

  const handleTrackTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const cleanId = searchTicketId.trim().toUpperCase();

    // 1. Try checking Serverless PostgreSQL Database via API Route
    try {
      const response = await fetch(`/api/reports?ticketId=${encodeURIComponent(cleanId)}`);
      if (response.ok) {
        const data = await response.json();
        if (data.found && data.report) {
          const selectedTypeObj = KTR_REPORT.types.find((t) => t.value === data.report.violationType);
          const selectedSettingObj = KTR_SETTINGS.find((s) => s.id === data.report.settingCategory);

          setSearchedReport({
            ticketId: data.report.ticketId,
            reporterInitials: data.report.reporterInitials,
            reportTypeLabel: selectedTypeObj ? selectedTypeObj.label : data.report.violationType,
            settingCategoryLabel: selectedSettingObj ? selectedSettingObj.name : data.report.settingCategory,
            locationName: data.report.violationLocation,
            description: data.report.description,
            evidenceName: data.report.evidenceUrl || undefined,
            status: data.report.status,
            notes: data.report.notes,
            createdAt: data.report.createdAt,
          });
          return;
        }
      }
    } catch (err) {
      console.warn("DB lookup fallback to local state:", err);
    }

    // 2. Fallback to demo state
    if (DEMO_REPORTS[cleanId]) {
      setSearchedReport(DEMO_REPORTS[cleanId]);
    } else {
      setSearchedReport(null);
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setReporterInitials("");
    setLocationName("");
    setDescription("");
    setEvidenceFile(null);
    setGeneratedTicketId("");
    setSpamErrorMessage("");
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-200 selection:text-slate-900 font-sans antialiased">

      <Header />

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-20">
        {/* Section 1: Edukasi Bahaya Utama */}
        <EducationSection onSelectFact={setSelectedFact} />

        {/* Section 2: 7 Tatanan KTR */}
        <SettingsSection />

        {/* Section 3: Regulasi Hukum */}
        <RegulationSection />

        {/* Section 4: Formulir Pengaduan Pelanggaran KTR */}
        <ReportFormSection
          reporterInitials={reporterInitials}
          setReporterInitials={setReporterInitials}
          reportType={reportType}
          setReportType={setReportType}
          settingCategory={settingCategory}
          setSettingCategory={setSettingCategory}
          locationName={locationName}
          setLocationName={setLocationName}
          description={description}
          setDescription={setDescription}
          evidenceFile={evidenceFile}
          setEvidenceFile={setEvidenceFile}
          qrDetected={qrDetected}
          isSubmitted={isSubmitted}
          isUploading={isUploading}
          generatedTicketId={generatedTicketId}
          spamErrorMessage={spamErrorMessage}
          onSubmit={handleSubmitReport}
          onReset={handleResetForm}
        />

        {/* Section 5: Pemantauan Laporan */}
        <ReportTrackingSection
          searchTicketId={searchTicketId}
          setSearchTicketId={setSearchTicketId}
          searchedReport={searchedReport}
          hasSearched={hasSearched}
          onSearch={handleTrackTicket}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Detail Modal Edukasi Bahaya Rokok */}
      <EducationModal
        selectedFact={selectedFact}
        onClose={() => setSelectedFact(null)}
      />

      {/* Blueprint Scrollbar HUD */}
      <ScrollHud
        activeSectionIndex={activeSectionIndex}
        scrollProgress={scrollProgress}
      />
    </div>
  );
}
