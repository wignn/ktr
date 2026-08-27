import { SylvaHero } from './components/sylva/SylvaHero';

export default function Home() {
  return (
    <div className="w-full min-h-screen relative overflow-x-hidden bg-[#141a12]">
      <SylvaHero initialVariant="living-green" />
    </div>
  );
}
