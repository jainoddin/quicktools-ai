import React from 'react';
import { Metadata } from 'next';
import PricingClient from '@/components/pricing/PricingClient';

export const metadata: Metadata = {
  title: 'Pricing | QuickTools.ai',
  description: 'Simple, transparent pricing for everyone. Start free and upgrade anytime to access premium AI generation features.',
  alternates: {
    canonical: 'https://quicktools.ai/pricing',
  }
};

export default function PricingPage() {
  return (
    <div className="flex-grow bg-[#F8FAFC] font-sans selection:bg-[#6D5EF8] selection:text-white">
      <PricingClient />
    </div>
  );
}
