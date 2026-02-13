import Hero from '@/components/Hero';
import ProblemSolution from '@/components/ProblemSolution';
import Features from '@/components/Features';
import AppScreens from '@/components/AppScreens';
import WaitlistForm from '@/components/WaitlistForm';
import TargetAudience from '@/components/TargetAudience';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-primary selection:text-white">
      <Hero />
      <ProblemSolution />
      <Features />
      <AppScreens />
      <WaitlistForm />
      <TargetAudience />
      <Footer />
    </main>
  );
}
