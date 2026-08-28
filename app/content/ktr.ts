export interface KtrHeroContent {
  eyebrow: string;
  headline: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
}

export interface KtrEducationFact {
  title: string;
  body: string;
  accent: string;
  detail: {
    subtitle: string;
    sections: {
      heading: string;
      content: string;
    }[];
    highlights: string[];
    preventionTip: string;
  };
}

export interface KtrSetting {
  id: string;
  name: string;
  description: string;
  examples: string[];
  image: string;
}

export interface KtrRegulationContent {
  title: string;
  summary: string;
  source: string;
  prohibitions: string[];
  sanctions: string[];
  verificationNote: string;
}

export interface KtrReportType {
  value: string;
  label: string;
}

export interface KtrReportContent {
  types: KtrReportType[];
  evidenceGuidance: string[];
  privacyNote: string;
}

export interface KtrStatus {
  name: string;
  description: string;
  tone: 'pending' | 'active' | 'done' | 'rejected';
}

export interface KtrContactContent {
  manager: string;
  whatsapp: string;
  email: string;
  address: string;
  configured: boolean;
}

export const KTR_HERO: KtrHeroContent = {
  eyebrow: 'Portal Kawasan Tanpa Rokok',
  headline: 'Wujudkan ruang publik bebas asap rokok.',
  description:
    'Pelajari hak atas udara bersih dan ikut menjaga Kawasan Tanpa Rokok. Laporkan dugaan pelanggaran secara aman—tanpa harus menunggu orang lain bertindak.',
  primaryCta: 'Laporkan Pelanggaran',
  secondaryCta: 'Pantau Laporan',
};

export const KTR_EDUCATION_FACTS: KtrEducationFact[] = [
  {
    title: 'Asap tangan kedua',
    body: 'Paparan asap rokok dari orang lain dapat mengganggu saluran pernapasan, memicu ISPA dan asma, serta meningkatkan risiko penyakit serius.',
    accent: 'secondhand smoke',
    detail: {
      subtitle: 'Paparan Pasif yang Mematikan di Ruang Bersama',
      sections: [
        {
          heading: 'Bagaimana Asap Pasif Bekerja?',
          content: 'Asap sampingan (side-stream smoke) yang keluar langsung dari ujung rokok yang terbakar mengandung konsentrasi zat beracun yang lebih tinggi daripada asap utama yang dihirup perokok. Paparan selama 30 menit saja sudah cukup merusak fungsi pembuluh darah.',
        },
        {
          heading: 'Risiko Kesehatan Utama',
          content: 'Menghirup asap pasif secara terus-menerus meningkatkan risiko penyakit jantung sebesar 25–30%, kanker paru-paru sebesar 20–30%, serta serangan ISPA berulang pada anak-anak.',
        },
      ],
      highlights: [
        'Lebih dari 4.000 zat kimia berbahaya terpancar di udara.',
        'Tidak ada tingkat paparan asap pasif yang aman.',
        'Sistem ventilasi atau kipas angin tidak bisa menghilangkan partikel asap.',
      ],
      preventionTip: 'Selalu terapkan 100% Bebas Asap Rokok di dalam ruangan tanpa kompromi.',
    },
  },
  {
    title: 'Residu yang tertinggal',
    body: 'Thirdhand smoke adalah residu racun yang menempel pada pakaian, perabot, dinding, dan permukaan ruangan setelah asap terlihat hilang.',
    accent: 'thirdhand smoke',
    detail: {
      subtitle: 'Ancaman Tak Terlihat yang Menempel Bertahun-tahun',
      sections: [
        {
          heading: 'Apa itu Thirdhand Smoke?',
          content: 'Partikel nikotin dan racun rokok mengendap pada permukaan karpet, pakaian, dinding, dan mainan anak. Partikel ini bereaksi dengan polutan udara membentuk senyawa karsinogenik baru yang menetap berbulan-bulan.',
        },
        {
          heading: 'Siapa yang Paling Terancam?',
          content: 'Balita yang merangkak di lantai dan sering memasukkan tangan ke mulut memiliki tingkat paparan 20 kali lebih tinggi terhadap racun residu ini dibanding orang dewasa.',
        },
      ],
      highlights: [
        'Residu racun tidak bisa hilang hanya dengan menyapu atau membuka jendela.',
        'Menempel erat pada pakaian perokok yang masuk ke rumah.',
        'Meningkatkan risiko kanker dan kerusakan DNA pada sel tubuh.',
      ],
      preventionTip: 'Jangan izinkan siapapun merokok di dalam gedung atau kendaraan pribadi.',
    },
  },
  {
    title: 'Lindungi yang rentan',
    body: 'Bayi, anak-anak, ibu hamil, dan lansia lebih rentan mengalami gangguan pernapasan, kekambuhan asma, dan dampak kesehatan lainnya.',
    accent: 'kelompok rentan',
    detail: {
      subtitle: 'Hak Atas Udara Bersih bagi Generasi & Kelompok Rentan',
      sections: [
        {
          heading: 'Dampak pada Ibu Hamil & Janin',
          content: 'Paparan racun menurunkan suplai oksigen ke janin, meningkatkan risiko berat badan lahir rendah (BBLR), kelahiran prematur, hingga sindrom kematian bayi mendadak (SIDS).',
        },
        {
          heading: 'Dampak pada Anak & Lansia',
          content: 'Paru-paru anak yang masih berkembang sangat rentan mengalami infeksi telinga tengah, asma berat, dan penurunan fungsi paru kronis saat dewasa.',
        },
      ],
      highlights: [
        'Anak dari perokok membolos sekolah 2x lebih sering akibat sakit pernapasan.',
        'Lansia penderita penyakit jantung riskan memicu serangan mendadak.',
        'Perlindungan KTR adalah investasi kesehatan generasi mendatang.',
      ],
      preventionTip: 'Kawasan Tanpa Rokok memastikan tempat umum aman untuk semua kelompok usia.',
    },
  },
  {
    title: 'Tiga zat berbahaya',
    body: 'Tar membawa banyak zat karsinogenik, nikotin menyebabkan ketergantungan, dan karbon monoksida mengurangi kemampuan darah membawa oksigen.',
    accent: 'tar · nikotin · CO',
    detail: {
      subtitle: 'Segitiga Racun Pembunuh Utama dalam Setiap Isapan',
      sections: [
        {
          heading: '1. Tar (Zat Karsinogenik)',
          content: 'Partikel padat yang mengendap di paru-paru, melapisi alveolus, dan memicu mutasi sel menjadi kanker.',
        },
        {
          heading: '2. Nikotin (Zat Adiktif)',
          content: 'Zat kimia psikoaktif yang menjangkau otak dalam 7 detik, memicu kecanduan berat, meningkatkan denyut jantung, dan mempersempit pembuluh darah.',
        },
        {
          heading: '3. Karbon Monoksida / CO (Gas Beracun)',
          content: 'Gas tanpa warna dan bau yang mengikat hemoglobin darah 200x lebih kuat dibanding oksigen, menyebabkan organ tubuh kekurangan oksigen.',
        },
      ],
      highlights: [
        'Tar merusak silia pembersih alami di saluran pernapasan.',
        'Nikotin mempercepat pengerasan pembuluh darah (Aterosklerosis).',
        'CO membuat jantung bekerja 2 kali lebih keras.',
      ],
      preventionTip: 'Berhenti merokok memulihkan kadar CO darah menjadi normal hanya dalam 12 jam.',
    },
  },
];

export const KTR_SETTINGS: KtrSetting[] = [
  {
    id: 'fasyankes',
    name: 'Fasilitas Pelayanan Kesehatan',
    description: 'Lingkungan medis yang wajib steril dari asap rokok demi mempercepat pemulihan pasien dan menjaga kesehatan pengunjung.',
    examples: ['Rumah Sakit', 'Puskesmas', 'Klinik Medis', 'Apotek', 'Laboratorium'],
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pendidikan',
    name: 'Tempat Proses Belajar Mengajar',
    description: 'Area sekolah & kampus yang aman dari paparan asap rokok serta promosi zat adiktif bagi peserta didik.',
    examples: ['Sekolah (SD–SMA)', 'Universitas & Kampus', 'Madrasah', 'Tempat Bimbel'],
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'anak',
    name: 'Tempat Anak Bermain',
    description: 'Ruang khusus tumbuh kembang anak yang wajib dilindungi dari racun rokok dan sisa residu berbahaya.',
    examples: ['Taman Bermain Anak', 'Daycare', 'PAUD & TK', 'Area Rekreasi Anak'],
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ibadah',
    name: 'Tempat Ibadah',
    description: 'Tempat suci tempat beribadah dan berkumpulnya warga dengan suasana yang bersih, tenang, dan sehat.',
    examples: ['Masjid & Musala', 'Gereja', 'Pura', 'Vihara', 'Klenteng'],
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'angkutan',
    name: 'Angkutan Umum',
    description: 'Moda transportasi publik tempat bertemunya berbagai lapisan masyarakat dari balita hingga lansia.',
    examples: ['Bus Kota & Angkot', 'Kereta Api / MRT', 'Kapal Feri', 'Stasiun & Halte'],
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'kerja',
    name: 'Tempat Kerja',
    description: 'Perkantoran dan pabrik yang menjamin lingkungan kerja produktif dan terlindung dari paparan asap pasif.',
    examples: ['Kantor Pemerintah', 'Gedung Perkantoran', 'Area Industri Dalam Ruang', 'Ruang Rapat'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'umum',
    name: 'Tempat Umum & Area Publik',
    description: 'Fasilitas umum indoor dan pusat perbelanjaan yang ditetapkan sebagai area bebas rokok oleh pemerintah daerah.',
    examples: ['Pusat Perbelanjaan / Mall', 'Hotel & Restoran Restro', 'GOR / Stadion Indoor', 'Destinasi Wisata'],
    image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80',
  },
];

export const KTR_REGULATION: KtrRegulationContent = {
  title: 'Aturan harus hadir di setiap ruang bersama.',
  summary:
    'Kawasan Tanpa Rokok ditetapkan untuk melindungi masyarakat dari asap rokok. Dasar hukum nasional dan peraturan daerah perlu dibaca bersama sesuai wilayah kewenangannya.',
  source: 'UU No. 17 Tahun 2023 tentang Kesehatan — rujukan umum, perlu dilengkapi aturan daerah target.',
  prohibitions: [
    'Merokok di area yang ditetapkan sebagai Kawasan Tanpa Rokok.',
    'Memproduksi, menjual, atau menyediakan produk tembakau di area yang dilarang oleh aturan setempat.',
    'Mengiklankan, mempromosikan, atau mensponsori produk rokok di area KTR.',
    'Membiarkan fasilitas merokok, asbak, atau media promosi rokok di lokasi yang seharusnya bebas asap.',
  ],
  sanctions: [
    'Sanksi bagi perorangan yang merokok di KTR mengikuti ketentuan peraturan daerah setempat.',
    'Pimpinan atau pengelola dapat dikenai sanksi apabila membiarkan pelanggaran atau tidak memasang tanda larangan yang diwajibkan.',
  ],
  verificationNote:
    'Nominal denda, sanksi sosial, kewenangan penindakan, dan Perda/Perbup/Perwali target belum diisi karena wilayah portal belum ditentukan. Verifikasi sebelum publikasi.',
};

export const KTR_REPORT: KtrReportContent = {
  types: [
    { value: 'smoking', label: 'Aktivitas merokok / vape di lokasi terlarang' },
    { value: 'selling', label: 'Penjualan atau penyediaan produk tembakau' },
    { value: 'promotion', label: 'Iklan, reklame, atau sponsor produk rokok' },
    { value: 'signage', label: 'Ketiadaan tanda / rambu larangan merokok' },
    { value: 'ashtray', label: 'Penyediaan asbak / tempat merokok terlarang' },
  ],
  evidenceGuidance: [
    'Foto atau video harus jelas dan membantu menunjukkan lokasi, waktu, serta tindakan yang dilaporkan.',
    'Hindari membahayakan diri atau melakukan konfrontasi demi mengambil bukti.',
    'Batas unggahan pada tahap formulir ini: Max 10 MB, format JPG, PNG, atau WEBP.',
  ],
  privacyNote:
    'Identitas pelapor dijamin 100% rahasia dan anonim (hanya ditampilkan dalam bentuk inisial). Data hanya digunakan untuk keperluan verifikasi Satgas KTR.',
};

export const KTR_STATUSES: KtrStatus[] = [
  { name: 'Menunggu review', description: 'Laporan telah masuk ke antrean satgas.', tone: 'pending' },
  { name: 'Diproses', description: 'Tim verifikasi atau petugas lapangan sedang menindaklanjuti lokasi.', tone: 'active' },
  { name: 'Selesai', description: 'Penertiban atau peneguran telah dilakukan.', tone: 'done' },
  { name: 'Ditolak', description: 'Bukti tidak valid atau lokasi berada di luar kewenangan KTR.', tone: 'rejected' },
];

export interface KtrSavedReport {
  ticketId: string;
  reporterInitials: string;
  reportTypeLabel: string;
  settingCategoryLabel: string;
  locationName: string;
  description: string;
  evidenceName?: string;
  evidenceUrl?: string;
  createdAt: string;
  status: 'Menunggu review' | 'Diproses' | 'Selesai' | 'Ditolak';
  notes?: string;
}

export const DEMO_REPORTS: Record<string, KtrSavedReport> = {
  'KTR-8F2A-2026': {
    ticketId: 'KTR-8F2A-2026',
    reporterInitials: 'A.R.',
    reportTypeLabel: 'Aktivitas merokok / vape di lokasi terlarang',
    settingCategoryLabel: 'Fasilitas Pelayanan Kesehatan',
    locationName: 'RSUD Karawang — Lantai 2 Gedung Poliklinik',
    description: 'Terlihat pengunjung merokok di dekat ruang tunggu anak.',
    evidenceName: 'foto_pelanggaran_rsud.jpg',
    createdAt: '28 Agu 2026, 10:15 WIB',
    status: 'Diproses',
    notes: 'Petugas kebersihan & Satpam sedang menuju lokasi untuk peneguran.',
  },
  'KTR-3B9C-2026': {
    ticketId: 'KTR-3B9C-2026',
    reporterInitials: 'N.N.',
    reportTypeLabel: 'Penyediaan asbak / tempat merokok terlarang',
    settingCategoryLabel: 'Tempat Proses Belajar Mengajar',
    locationName: 'Kantin Sekolah SD Negeri 01 Karawang',
    description: 'Terdapat tempat pembuangan puntung rokok di dekat meja makan.',
    evidenceName: 'bukti_asbak_kantin.png',
    createdAt: '27 Agu 2026, 14:30 WIB',
    status: 'Selesai',
    notes: 'Fasilitas asbak telah disita & pihak pengelola kantin diberikan surat teguran tertulis.',
  },
};

export const KTR_CONTACT: KtrContactContent = {
  manager: 'Nama dinas / Satgas KTR daerah — menunggu konfirmasi',
  whatsapp: 'Nomor WhatsApp resmi — menunggu konfirmasi',
  email: 'Email pengaduan — menunggu konfirmasi',
  address: 'Alamat kantor operasional — menunggu konfirmasi',
  configured: false,
};
