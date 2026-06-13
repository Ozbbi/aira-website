'use client';

import { useState, useEffect } from 'react';

export default function Home() {
      const [scroll, setScroll] = useState(false);
      const [menu, setMenu] = useState(false);
      const checkoutUrl = 'https://boamir.lemonsqueezy.com/checkout/buy/985b69f3-b126-4452-bd49-129c9429d11a';

  useEffect(() => {
          const handleScroll = () => setScroll(window.scrollY > 50);
          window.addEventListener('scroll', handleScroll);
          return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
          <div className="min-h-screen bg-[#020205] text-[#F0F0FF] font-sans">
              {/* Navigation */}
                <nav className={`fixed top-0 w-full z-50 transition-all ${scroll ? 'bg-[#020205]/95 border-b border-[#1E1E2E]' : 'bg-[#020205]/80'} backdrop-blur-md`}>
                        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                                  <div className="text-2xl font-bold bg-gradient-to-r from-[#4488FF] to-[#8844FF] bg-clip-text text-transparent">AIRA</div>div>
                                  <div className="hidden md:flex gap-8">
                                              <a href="#how" className="text-[#8888AA] hover:text-[#F0F0FF] transition-colors">How it Works</a>a>
                                              <a href="#pricing" className="text-[#8888AA] hover:text-[#F0F0FF] transition-colors">Pricing</a>a>
                                              <a href="#faq" className="text-[#8888AA] hover:text-[#F0F0FF] transition-colors">FAQ</a>a>
                                  </div>div>
                                  <a href={checkoutUrl} className="hidden md:block px-6 py-2 rounded-full bg-gradient-to-r from-[#4488FF] to-[#8844FF] hover:shadow-lg hover:shadow-[#4488FF]/50 transition-all text-sm font-semibold">Start Free</a>a>
                                  <button className="md:hidden text-2xl" onClick={() => setMenu(!menu)}>{menu ? '✕' : '☰'}</button>button>
                        </div>div>
                </nav>nav>
          
              {/* Hero Section */}
                <section className="pt-32 pb-20 px-6 min-h-screen flex items-center justify-center text-center">
                        <div className="max-w-3xl">
                                  <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">Get into <span className="bg-gradient-to-r from-[#4488FF] to-[#8844FF] bg-clip-text text-transparent">flow</span>span></h1>h1>
                                  <p className="text-xl text-[#8888AA] mb-8 leading-relaxed">AI-powered study platform combining Pomodoro technique, spaced repetition, and intelligent mentoring. Same neuroscience rigor as Brain.fm, better for learning.</p>p>
                                  <a href={checkoutUrl} className="inline-block px-8 py-4 bg-gradient-to-r from-[#4488FF] to-[#8844FF] rounded-lg font-bold hover:shadow-lg hover:shadow-[#4488FF]/50 transition-all text-lg">Start Free Trial</a>a>
                        </div>div>
                </section>section>
          
              {/* Science Section */}
                <section className="py-20 px-6 bg-[#080809] border-t border-[#1E1E2E]">
                        <div className="max-w-6xl mx-auto">
                                  <h2 className="text-4xl font-bold text-center mb-16">Backed by <span className="bg-gradient-to-r from-[#4488FF] to-[#8844FF] bg-clip-text text-transparent">neuroscience</span>span></h2>h2>
                                  <div className="grid md:grid-cols-3 gap-8">
                                              <div className="p-8 rounded-lg border border-[#1E1E2E] hover:border-[#4488FF]/50 transition-colors">
                                                            <div className="text-4xl mb-4">🧠</div>div>
                                                            <h3 className="text-xl font-bold mb-2">Spaced Repetition</h3>h3>
                                                            <p className="text-[#8888AA]">Research-backed optimal recall intervals increase retention by up to 80%.</p>p>
                                              </div>div>
                                              <div className="p-8 rounded-lg border border-[#1E1E2E] hover:border-[#4488FF]/50 transition-colors">
                                                            <div className="text-4xl mb-4">⚡</div>div>
                                                            <h3 className="text-xl font-bold mb-2">Active Recall</h3>h3>
                                                            <p className="text-[#8888AA]">Test-driven learning reinforces neural pathways faster than passive review.</p>p>
                                              </div>div>
                                              <div className="p-8 rounded-lg border border-[#1E1E2E] hover:border-[#4488FF]/50 transition-colors">
                                                            <div className="text-4xl mb-4">🎵</div>div>
                                                            <h3 className="text-xl font-bold mb-2">Focus Audio</h3>h3>
                                                            <p className="text-[#8888AA]">Binaural beats and ambient soundscapes optimize the brain's theta frequency for deep focus.</p>p>
                                              </div>div>
                                  </div>div>
                        </div>div>
                </section>section>
          
              {/* Pricing Section */}
                <section className="py-20 px-6" id="pricing">
                        <div className="max-w-4xl mx-auto text-center">
                                  <h2 className="text-4xl font-bold mb-4">Simple, <span className="bg-gradient-to-r from-[#4488FF] to-[#8844FF] bg-clip-text text-transparent">transparent</span>span> pricing</h2>h2>
                                  <p className="text-[#8888AA] text-lg mb-16">7-day free trial. No credit card required. Cancel anytime.</p>p>
                                  <div className="bg-[#080809] border border-[#1E1E2E] rounded-2xl p-8 max-w-md mx-auto">
                                              <h3 className="text-2xl font-bold mb-2">AIRA Mentor Pro</h3>h3>
                                              <p className="text-5xl font-bold bg-gradient-to-r from-[#4488FF] to-[#8844FF] bg-clip-text text-transparent mb-1">$10</p>p>
                                              <p className="text-[#8888AA] mb-8">/month after 7-day free trial</p>p>
                                              <a href={checkoutUrl} className="w-full block px-8 py-3 bg-gradient-to-r from-[#4488FF] to-[#8844FF] rounded-lg font-bold hover:shadow-lg hover:shadow-[#4488FF]/50 transition-all mb-6">Start Free Trial</a>a>
                                              <ul className="text-left space-y-4">
                                                            <li className="text-[#8888AA]">✓ Unlimited study sessions</li>li>
                                                            <li className="text-[#8888AA]">✓ AI Socratic mentoring</li>li>
                                                            <li className="text-[#8888AA]">✓ Spaced repetition engine</li>li>
                                                            <li className="text-[#8888AA]">✓ Focus timer + ambient audio</li>li>
                                                            <li className="text-[#8888AA]">✓ Performance analytics</li>li>
                                              </ul>ul>
                                  </div>div>
                        </div>div>
                </section>section>
          
              {/* FAQ */}
                <section className="py-20 px-6 bg-[#080809] border-t border-[#1E1E2E]" id="faq">
                        <div className="max-w-3xl mx-auto">
                                  <h2 className="text-4xl font-bold text-center mb-16"><span className="bg-gradient-to-r from-[#4488FF] to-[#8844FF] bg-clip-text text-transparent">Frequently</span>span> asked</h2>h2>
                                  <div className="space-y-6">
                                              <div className="p-6 rounded-lg border border-[#1E1E2E]">
                                                            <h3 className="text-xl font-bold mb-2">How is AIRA different from Brain.fm?</h3>h3>
                                                            <p className="text-[#8888AA]">AIRA adds intelligent AI mentoring via Socratic method alongside focus audio, making it ideal for active learning and exam prep.</p>p>
                                              </div>div>
                                              <div className="p-6 rounded-lg border border-[#1E1E2E]">
                                                            <h3 className="text-xl font-bold mb-2">Can I try AIRA free?</h3>h3>
                                                            <p className="text-[#8888AA]">Yes! All users get 7 days free. No credit card required. Cancel anytime.</p>p>
                                              </div>div>
                                              <div className="p-6 rounded-lg border border-[#1E1E2E]">
                                                            <h3 className="text-xl font-bold mb-2">What subjects are supported?</h3>h3>
                                                            <p className="text-[#8888AA]">AIRA supports any subject: STEM, languages, humanities, professional certifications, and more. The AI adapts to your learning style.</p>p>
                                              </div>div>
                                  </div>div>
                        </div>div>
                </section>section>
          
              {/* CTA Footer */}
                <section className="py-20 px-6 text-center border-t border-[#1E1E2E]">
                        <div className="max-w-2xl mx-auto">
                                  <h2 className="text-4xl font-bold mb-6">Ready to master your studies?</h2>h2>
                                  <p className="text-[#8888AA] text-lg mb-8">Join thousands transforming how they learn.</p>p>
                                  <a href={checkoutUrl} className="inline-block px-10 py-4 bg-gradient-to-r from-[#4488FF] to-[#8844FF] rounded-lg font-bold hover:shadow-lg hover:shadow-[#4488FF]/50 transition-all text-lg">Start Your Free Trial</a>a>
                        </div>div>
                </section>section>
          </div>div>
        );
}</div>
