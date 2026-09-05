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
    title: 'Kawasan Tanpa Rokok (KTR)',
    body: 'Jangan merokok, jangan menyalakan rokok, dan jangan membiarkan asap rokok mencemari udara di sekitar kita. Hormati hak setiap orang untuk mendapatkan udara yang bersih dan sehat.',
    accent: 'kawasan tanpa rokok',
    detail: {
      subtitle: 'Lindungi Diri dan Orang di Sekitar Kita dari Bahaya Asap Rokok',
      sections: [
        {
          heading: 'Ciptakan Lingkungan Bebas Asap Rokok',
          content:
            'Menciptakan lingkungan bebas asap rokok merupakan salah satu upaya penting untuk melindungi kesehatan masyarakat. Oleh karena itu, penerapan Kawasan Tanpa Rokok (KTR) diperlukan agar setiap orang dapat memperoleh lingkungan yang lebih bersih, sehat, dan aman.',
        },
        {
          heading: 'Asap Rokok Bukan Hanya Merugikan Perokok',
          content:
            'Rokok bukan hanya berdampak pada orang yang merokok, tetapi juga dapat membahayakan orang-orang di sekitarnya. Paparan tembakau dan asap rokok dapat menimbulkan berbagai gangguan kesehatan serta meningkatkan risiko penyakit serius.',
        },
        {
          heading: 'Mengapa KTR Itu Penting?',
          content:
            'Penerapan Kawasan Tanpa Rokok bukan hanya bertujuan untuk melarang seseorang merokok. KTR bertujuan untuk melindungi masyarakat dari paparan asap rokok dan menciptakan lingkungan yang lebih sehat. KTR penting karena setiap orang memiliki hak untuk menghirup udara yang bersih tanpa harus terpapar asap rokok dari orang lain. Lingkungan yang benar-benar bebas asap rokok merupakan perlindungan yang paling efektif terhadap paparan asap rokok. Ventilasi atau pemisahan ruangan saja tidak dapat memberikan perlindungan yang sama seperti lingkungan yang sepenuhnya bebas asap rokok.',
        },
      ],
      highlights: [
        'KTR melindungi semua orang dari paparan asap rokok.',
        'Paparan asap rokok dapat menyebabkan gangguan kesehatan meskipun seseorang bukan perokok aktif.',
        'Asap rokok meningkatkan risiko berbagai penyakit.',
      ],
      preventionTip: 'Hormati hak setiap orang untuk mendapatkan udara yang bersih dan sehat dengan tidak merokok di area KTR.',
    },
  },
  {
    title: 'Bahaya Rokok Bagi Kesehatan',
    body: 'Rokok dapat merusak berbagai organ tubuh dan meningkatkan risiko penyakit serius. Jangan tunggu sampai dampaknya terasa! Berhenti merokok dan lindungi orang di sekitar dari asap rokok.',
    accent: 'bahaya kesehatan',
    detail: {
      subtitle: 'Asapnya Singkat, Dampaknya Berkepanjangan.',
      sections: [
        {
          heading: 'Apa Saja yang Rusak Karena Rokok?',
          content:
            'Tembakau dapat merusak hampir seluruh organ tubuh dan meningkatkan risiko berbagai penyakit. Penggunaan tembakau dapat menyebabkan atau meningkatkan risiko penyakit jantung, stroke, penyakit paru-paru, gangguan sistem pernapasan, kanker, serta gangguan kesehatan lainnya.',
        },
        {
          heading: 'Dampaknya Tidak Selalu Terlihat Langsung',
          content:
            'Bahaya rokok tidak selalu langsung dirasakan. Dampaknya dapat terjadi secara perlahan dan meningkatkan risiko munculnya penyakit dalam jangka panjang.',
        },
        {
          heading: 'Dampak Rokok Bagi Kesehatan Antara Lain:',
          content:
            '1. Meningkatkan risiko penyakit jantung.\n2. Meningkatkan risiko stroke.\n3. Menyebabkan penyakit dan gangguan pada paru-paru.\n4. Meningkatkan risiko berbagai jenis kanker.\n5. Melemahkan sistem kekebalan tubuh.',
        },
      ],
      highlights: [
        'Setiap batang rokok meningkatkan risiko penyakit serius.',
        'Semua bentuk penggunaan tembakau berbahaya bagi kesehatan.',
        'Berhenti merokok hari ini adalah investasi untuk kesehatan di masa depan.',
      ],
      preventionTip: 'Berhenti merokok hari ini untuk memulihkan fungsi paru dan sirkulasi darah Anda.',
    },
  },
  {
    title: 'Risiko Kesehatan Bagi Perokok Pasif',
    body: 'Tidak merokok bukan berarti sepenuhnya aman apabila masih sering terpapar asap rokok dari orang lain.',
    accent: 'perokok pasif',
    detail: {
      subtitle: 'Terpapar Asap, Terpapar Risiko.',
      sections: [
        {
          heading: 'Apa Itu Perokok Pasif?',
          content:
            'Perokok pasif adalah orang yang tidak merokok, tetapi menghirup asap rokok dari orang lain atau dari rokok yang sedang menyala.',
        },
        {
          heading: 'Asap Rokok Bukan Sekadar Asap',
          content:
            'Asap rokok mengandung berbagai zat kimia berbahaya yang dapat masuk ke dalam tubuh saat terhirup. Bukan hanya perokok yang terkena dampaknya, orang yang tidak merokok juga dapat mengalami gangguan kesehatan jika sering terpapar asap rokok, terutama ketika berada di rumah, kendaraan, atau lingkungan tertutup bersama perokok.',
        },
        {
          heading: 'Sedikit Paparan, Tetap Ada Risikonya',
          content:
            'Tidak ada tingkat paparan asap rokok yang benar-benar aman bagi kesehatan. Paparan dalam waktu singkat sekalipun dapat memberikan dampak buruk, dan paparan yang terjadi berulang kali dapat meningkatkan risiko berbagai gangguan kesehatan dalam jangka panjang.',
        },
      ],
      highlights: [
        'Tidak ada paparan asap rokok yang sepenuhnya aman.',
        'Perokok pasif berisiko mengalami penyakit jantung, stroke, dan gangguan pernapasan.',
        'Anak-anak dan ibu hamil lebih rentan terhadap dampak asap rokok.',
      ],
      preventionTip: 'Hindari berada di satu ruangan dengan perokok aktif dan dukung penetapan KTR di tempat umum.',
    },
  },
  {
    title: 'Lindungi Mereka yang Rentan',
    body: 'Bayi, anak-anak, ibu hamil, dan lansia lebih rentan mengalami gangguan pernapasan, kekambuhan asma, dan dampak kesehatan lainnya.',
    accent: 'kelompok rentan',
    detail: {
      subtitle: 'Hak Atas Udara Bersih bagi Generasi & Kelompok Rentan',
      sections: [
        {
          heading: 'Dampak pada Ibu Hamil & Janin',
          content:
            'Paparan asap rokok selama kehamilan dapat menyebabkan ibu menghirup berbagai zat berbahaya, termasuk nikotin dan karbon monoksida. Karbon monoksida dapat mengurangi kemampuan darah membawa oksigen sehingga suplai oksigen ke janin dapat terganggu. Hal ini dapat meningkatkan risiko berat badan lahir rendah (BBLR), kelahiran prematur, hingga sindrom kematian bayi mendadak (SIDS). Ibu hamil sebaiknya tidak hanya menghindari merokok, tetapi juga menghindari lingkungan yang memungkinkan terjadinya paparan asap rokok.',
        },
        {
          heading: 'Dampak pada Bayi & Anak-Anak',
          content:
            'Bayi dan anak-anak memiliki saluran pernapasan yang masih berkembang sehingga lebih mudah terdampak oleh polutan dan asap rokok. Paparan berulang dapat mengganggu kesehatan paru-paru dan meningkatkan risiko berbagai penyakit. Anak yang sering terpapar asap rokok lebih berisiko mengalami batuk dan sesak napas berulang, bronkitis dan pneumonia serta infeksi saluran pernapasan. Paparan asap rokok juga dapat menyebabkan anak lebih sering sakit sehingga aktivitas belajar, bermain, dan kehadiran di sekolah dapat terganggu. Rumah bebas asap rokok merupakan salah satu langkah penting untuk melindungi tumbuh kembang anak.',
        },
        {
          heading: 'Dampak pada Lansia',
          content:
            'Lansia sering memiliki kondisi kesehatan yang membuat tubuh lebih rentan terhadap paparan asap rokok. Paparan asap rokok dapat memperburuk penyakit yang sudah ada, terutama penyakit pada jantung dan paru-paru. Pada lansia, paparan asap rokok dapat memperburuk penyakit paru kronis, meningkatkan gangguan pernapasan, hingga menurunkan kualitas hidup dan kemampuan melakukan aktivitas sehari-hari.',
        },
      ],
      highlights: [
        'Ciptakan rumah dan lingkungan dengan udara yang bersih dan sehat.',
        'Anak dari perokok membolos sekolah 2x lebih sering akibat sakit pernapasan.',
        'Lansia penderita penyakit jantung riskan memicu serangan mendadak.',
        'Perlindungan KTR adalah investasi kesehatan generasi mendatang.',
      ],
      preventionTip: 'Kawasan Tanpa Rokok menjamin tempat tumbuh kembang dan ruang publik aman untuk semua kelompok usia.',
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
    name: 'Tempat Bermain Anak',
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
  title: 'Payung Hukum Resmi Kawasan Tanpa Rokok (KTR)',
  summary:
    'Penerapan Kawasan Tanpa Rokok (KTR) memiliki landasan hukum yang kuat mulai dari Peraturan Daerah (Perda) Kabupaten Karawang hingga Undang-Undang Kesehatan Republik Indonesia untuk menjamin hak atas udara bersih bagi seluruh warga.',
  source: 'Perda Kab. Karawang No. 5 Tahun 2016 tentang KTR & UU No. 17 Tahun 2023 tentang Kesehatan',
  prohibitions: [
    'Merokok atau mengisap vape/rokok elektrik di area 7 Tatanan Kawasan Tanpa Rokok.',
    'Menjual atau menyediakan produk tembakau/rokok di fasilitas pelayanan kesehatan, tempat pendidikan, tempat bermain anak, dan tempat ibadah.',
    'Mengiklankan, mempromosikan, atau memasang spanduk/reklame produk rokok di area KTR.',
    'Membiarkan fasilitas asbak atau tempat merokok di lokasi terlarang tanpa izin resmi.',
  ],
  sanctions: [
    'Sanksi perorangan yang terbukti merokok di area KTR dikenakan sanksi denda administratif hingga pidana kurungan sesuai ketentuan Perda setempat.',
    'Sanksi bagi pimpinan/pengelola gedung yang membiarkan pelanggaran berupa teguran tertulis, denda administratif, hingga pembekuan izin usaha.',
  ],
  verificationNote:
    'Peraturan Daerah Kabupaten Karawang No. 5 Tahun 2016 juncto Peraturan Bupati Karawang.',
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
