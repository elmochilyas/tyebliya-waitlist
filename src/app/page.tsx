import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';

// Below-the-fold sections: lazy-loaded to reduce initial JS bundle
const ProblemSolution = dynamic(() => import('@/components/ProblemSolution'));
const Features = dynamic(() => import('@/components/Features'));
const AppScreens = dynamic(() => import('@/components/AppScreens'));
const TargetAudience = dynamic(() => import('@/components/TargetAudience'));
const WaitlistForm = dynamic(() => import('@/components/WaitlistForm'));
const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-primary selection:text-white">
      <Hero />
      <ProblemSolution />
      <Features />
      <AppScreens />
      <TargetAudience />
      <WaitlistForm />
      <Footer />
    </main>
  );
}
