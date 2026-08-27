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
}

export interface KtrSetting {
  id: string;
  name: string;
  description: string;
  examples: string[];
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
  },
  {
    title: 'Residu yang tertinggal',
    body: 'Thirdhand smoke adalah residu racun yang menempel pada pakaian, perabot, dinding, dan permukaan ruangan setelah asap terlihat hilang.',
    accent: 'thirdhand smoke',
  },
  {
    title: 'Lindungi yang rentan',
    body: 'Bayi, anak-anak, ibu hamil, dan lansia lebih rentan mengalami gangguan pernapasan, kekambuhan asma, dan dampak kesehatan lainnya.',
    accent: 'kelompok rentan',
  },
  {
    title: 'Tiga zat berbahaya',
    body: 'Tar membawa banyak zat karsinogenik, nikotin menyebabkan ketergantungan, dan karbon monoksida mengurangi kemampuan darah membawa oksigen.',
    accent: 'tar · nikotin · CO',
  },
];

export const KTR_SETTINGS: KtrSetting[] = [
  {
    id: 'fasyankes',
    name: 'Fasilitas pelayanan kesehatan',
    description: 'Lingkungan yang harus mendukung pemulihan dan perlindungan pasien, tenaga kesehatan, serta pengunjung.',
    examples: ['Rumah sakit', 'Puskesmas', 'Klinik', 'Apotek', 'Laboratorium medis'],
  },
  {
    id: 'pendidikan',
    name: 'Tempat proses belajar mengajar',
    description: 'Ruang belajar yang aman dari paparan asap dan promosi produk tembakau bagi peserta didik.',
    examples: ['SD–SMA', 'Universitas dan kampus', 'Madrasah', 'Tempat bimbingan belajar'],
  },
  {
    id: 'anak',
    name: 'Tempat anak bermain',
    description: 'Area tumbuh dan bermain anak yang perlu dijaga dari asap rokok dan residu beracun.',
    examples: ['Taman bermain anak', 'Daycare', 'PAUD dan TK'],
  },
  {
    id: 'ibadah',
    name: 'Tempat ibadah',
    description: 'Tempat masyarakat beribadah dan berkumpul dengan lingkungan yang bersih serta nyaman.',
    examples: ['Masjid dan musala', 'Gereja', 'Pura', 'Vihara', 'Klenteng'],
  },
  {
    id: 'angkutan',
    name: 'Angkutan umum',
    description: 'Moda dan simpul transportasi yang digunakan bersama oleh masyarakat dari berbagai kelompok usia.',
    examples: ['Bus kota dan angkot', 'Kereta api', 'Kapal feri', 'Halte, stasiun, terminal'],
  },
  {
    id: 'kerja',
    name: 'Tempat kerja',
    description: 'Ruang kerja yang melindungi pekerja, tamu, dan masyarakat dari paparan asap rokok.',
    examples: ['Kantor pemerintahan', 'Gedung BUMN/BUMD', 'Perkantoran swasta', 'Area pabrik dalam ruangan'],
  },
  {
    id: 'umum',
    name: 'Tempat umum dan tempat tertentu',
    description: 'Ruang publik dan destinasi keluarga yang digunakan bersama dan ditetapkan sebagai KTR oleh aturan setempat.',
    examples: ['Pusat perbelanjaan', 'Hotel', 'Restoran tertutup', 'Gelanggang olahraga', 'Destinasi wisata keluarga'],
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
    { value: 'smoking', label: 'Merokok di area KTR (termasuk vape)' },
    { value: 'selling', label: 'Penjualan atau penyediaan produk tembakau di area KTR' },
    { value: 'promotion', label: 'Iklan, promosi, atau sponsor rokok di area KTR' },
    { value: 'signage', label: 'Tidak ada tanda atau rambu larangan merokok' },
    { value: 'ashtray', label: 'Penyediaan asbak atau fasilitas merokok terlarang' },
  ],
  evidenceGuidance: [
    'Foto atau video harus jelas dan membantu menunjukkan lokasi, waktu, serta tindakan yang dilaporkan.',
    'Hindari membahayakan diri atau melakukan konfrontasi demi mengambil bukti.',
    'Batas unggahan pada tahap formulir ini: 10 MB per berkas, format JPG, PNG, atau MP4.',
  ],
  privacyNote:
    'Identitas pelapor akan diperlakukan sebagai informasi terbatas untuk keperluan verifikasi. Jaminan kerahasiaan, retensi, dan akses data harus mengikuti kebijakan resmi pengelola setelah kanal backend ditetapkan.',
};

export const KTR_STATUSES: KtrStatus[] = [
  { name: 'Menunggu review', description: 'Laporan telah masuk ke antrean satgas.', tone: 'pending' },
  { name: 'Diproses', description: 'Tim verifikasi atau petugas lapangan sedang menindaklanjuti lokasi.', tone: 'active' },
  { name: 'Selesai', description: 'Penertiban atau peneguran telah dilakukan.', tone: 'done' },
  { name: 'Ditolak', description: 'Bukti tidak valid atau lokasi berada di luar kewenangan KTR.', tone: 'rejected' },
];

export const KTR_CONTACT: KtrContactContent = {
  manager: 'Nama dinas / Satgas KTR daerah — menunggu konfirmasi',
  whatsapp: 'Nomor WhatsApp resmi — menunggu konfirmasi',
  email: 'Email pengaduan — menunggu konfirmasi',
  address: 'Alamat kantor operasional — menunggu konfirmasi',
  configured: false,
};
