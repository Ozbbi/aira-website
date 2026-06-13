'use client';

export default function Home() {
        return (
                  <div className="min-h-screen bg-[#020205] text-[#F0F0FF] overflow-hidden">
                        {/* Hero Section */}
                        <section className="relative pt-32 pb-20 px-4 md:px-8 border-b border-[#1E1E2E]">
                                <div className="max-w-6xl mx-auto">
                                          <div className="mb-8 inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#4488FF]/20 to-[#8844FF]/20 border border-[#4488FF]/30">
                                                      <span className="text-sm font-medium text-[#8888AA]">AI-Powered Learning Revolution</span>span>
                                          </div>div>
                                          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                                                      Master Any Subject<br/>With <span className="bg-gradient-to-r from-[#4488FF] to-[#8844FF] bg-clip-text text-transparent">AI Mentoring</span>span>
                                          </h1>h1>
                                          <p className="text-xl text-[#8888AA] mb-12 max-w-2xl leading-relaxed">
                                                      Neuroscience-backed study methods combined with intelligent AI tutoring and focus-enhancing ambient audio. Learn smarter, not harder.
                                          </p>p>
                                          <div className="flex gap-4 flex-wrap">
                                                      <a href="https://boamir.lemonsqueezy.com/checkout/buy/985b69f3-b126-4452-bd49-129c9429d11a" className="px-8 py-4 bg-gradient-to-r from-[#4488FF] to-[#6666FF] rounded-lg font-semibold hover:opacity-90 transition">
                                                                    Start Learning Free
                                                      </a>a>
                                                      <button className="px-8 py-4 border border-[#1E1E2E] rounded-lg font-semibold hover:bg-[#0B0B10] transition">
                                                                    Watch Demo
                                                      </button>button>
                                          </div>div>
                                </div>div>
                        </section>section>
                  
                        {/* Features Section */}
                        <section className="py-20 px-4 md:px-8 border-b border-[#1E1E2E]">
                                <div className="max-w-6xl mx-auto">
                                          <h2 className="text-4xl font-bold mb-16 text-center">Why Choose AIRA Mentor</h2>h2>
                                          <div className="grid md:grid-cols-3 gap-8">
                                                {[
                        { icon: '🧠', title: 'Neuroscience-Backed', desc: 'Methods proven by cognitive science research for optimal retention' },
                        { icon: '🤖', title: 'AI Tutoring', desc: 'Get instant answers with the Socratic method for deeper understanding' },
                        { icon: '🎵', title: 'Focus Music', desc: 'Ambient soundscapes scientifically designed to enhance concentration' },
                        { icon: '⏰', title: 'Smart Scheduling', desc: 'Spaced repetition algorithm optimizes your study timeline' },
                        { icon: '📊', title: 'Progress Tracking', desc: 'Real-time insights into your learning velocity and weak areas' },
                        { icon: '✨', title: 'Premium Features', desc: 'Ad-free experience with priority AI support and custom audio' }
                                    ].map((feature, i) => (
                                                        <div key={i} className="p-6 rounded-xl bg-[#0B0B10] border border-[#1E1E2E] hover:border-[#4488FF]/30 transition">
                                                                        <div className="text-4xl mb-4">{feature.icon}</div>div>
                                                                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>h3>
                                                                        <p className="text-[#8888AA]">{feature.desc}</p>p>
                                                        </div>div>
                                                      ))}
                                          </div>div>
                                </div>div>
                        </section>section>
                  
                        {/* How It Works */}
                        <section className="py-20 px-4 md:px-8 border-b border-[#1E1E2E]">
                                <div className="max-w-6xl mx-auto">
                                          <h2 className="text-4xl font-bold mb-16 text-center">Your Learning Journey</h2>h2>
                                          <div className="grid md:grid-cols-4 gap-6">
                                                {[
                        { num: '01', title: 'Choose Subject', desc: 'Select from 100+ subjects and topics' },
                        { num: '02', title: 'Study Smart', desc: 'AI guides you through active recall' },
                        { num: '03', title: 'Get Feedback', desc: 'Instant analysis of your progress' },
                        { num: '04', title: 'Master It', desc: 'Achieve deeper understanding' }
                                    ].map((step, i) => (
                                                        <div key={i} className="relative">
                                                                        <div className="text-6xl font-bold text-[#4488FF]/20 mb-4">{step.num}</div>div>
                                                                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>h3>
                                                                        <p className="text-[#8888AA]">{step.desc}</p>p>
                                                        </div>div>
                                                      ))}
                                          </div>div>
                                </div>div>
                        </section>section>
                  
                        {/* Subject Areas */}
                        <section className="py-20 px-4 md:px-8 border-b border-[#1E1E2E]">
                                <div className="max-w-6xl mx-auto">
                                          <h2 className="text-4xl font-bold mb-16 text-center">Master Any Subject</h2>h2>
                                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                {['Mathematics', 'Science', 'Languages', 'History', 'Literature', 'Programming', 'Business', 'Arts'].map((subject, i) => (
                                      <div key={i} className="p-4 rounded-lg bg-[#0B0B10] border border-[#1E1E2E] text-center hover:border-[#8844FF]/30 transition">
                                                      <p className="font-semibold">{subject}</p>p>
                                      </div>div>
                                    ))}
                                          </div>div>
                                </div>div>
                        </section>section>
                  
                        {/* Pricing Section */}
                        <section className="py-20 px-4 md:px-8 border-b border-[#1E1E2E]">
                                <div className="max-w-6xl mx-auto">
                                          <h2 className="text-4xl font-bold mb-4 text-center">Simple, Transparent Pricing</h2>h2>
                                          <p className="text-center text-[#8888AA] mb-16">Start free, upgrade anytime. No credit card required.</p>p>
                                          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                                                      <div className="p-8 rounded-xl bg-[#0B0B10] border border-[#1E1E2E]">
                                                                    <h3 className="text-2xl font-bold mb-4">Free</h3>h3>
                                                                    <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-[#8888AA]">/month</span>span></div>div>
                                                                    <ul className="space-y-3 mb-8 text-[#8888AA]">
                                                                                    <li>✓ 5 subjects</li>li>
                                                                                    <li>✓ Basic AI tutoring</li>li>
                                                                                    <li>✓ Community features</li>li>
                                                                    </ul>ul>
                                                                    <button className="w-full px-6 py-3 border border-[#1E1E2E] rounded-lg font-semibold hover:bg-[#0B0B10] transition">
                                                                                    Get Started
                                                                    </button>button>
                                                      </div>div>
                                                      <div className="p-8 rounded-xl bg-gradient-to-br from-[#4488FF]/10 to-[#8844FF]/10 border border-[#4488FF]/30">
                                                                    <h3 className="text-2xl font-bold mb-4">Premium</h3>h3>
                                                                    <div className="text-4xl font-bold mb-6">$10<span className="text-lg text-[#8888AA]">/month</span>span></div>div>
                                                                    <div className="inline-block px-3 py-1 rounded-full bg-[#4488FF]/20 text-sm font-medium text-[#4488FF] mb-6">Free 7-day trial</div>div>
                                                                    <ul className="space-y-3 mb-8 text-[#8888AA]">
                                                                                    <li>✓ Unlimited subjects</li>li>
                                                                                    <li>✓ Advanced AI tutoring</li>li>
                                                                                    <li>✓ Custom focus music</li>li>
                                                                                    <li>✓ Priority support</li>li>
                                                                                    <li>✓ Offline mode</li>li>
                                                                    </ul>ul>
                                                                    <a href="https://boamir.lemonsqueezy.com/checkout/buy/985b69f3-b126-4452-bd49-129c9429d11a" className="w-full block px-6 py-3 bg-gradient-to-r from-[#4488FF] to-[#8844FF] rounded-lg font-semibold text-center hover:opacity-90 transition">
                                                                                    Start Free Trial
                                                                    </a>a>
                                                      </div>div>
                                          </div>div>
                                </div>div>
                        </section>section>
                  
                        {/* FAQ Section */}
                        <section className="py-20 px-4 md:px-8 border-b border-[#1E1E2E]">
                                <div className="max-w-3xl mx-auto">
                                          <h2 className="text-4xl font-bold mb-16 text-center">Frequently Asked Questions</h2>h2>
                                          <div className="space-y-6">
                                                {[
                        { q: 'How does the AI tutoring work?', a: 'Our AI uses the Socratic method to guide you to answers rather than giving them directly, promoting deeper understanding.' },
                        { q: 'Can I use it on mobile?', a: 'Yes! AIRA Mentor works perfectly on mobile devices with a fully responsive interface and offline capabilities.' },
                        { q: 'What if I want to cancel?', a: 'Cancel anytime with no questions asked. You maintain access through the end of your billing period.' },
                        { q: 'Do you offer refunds?', a: 'Yes, 30-day money-back guarantee if you\'re not satisfied with your learning progress.' }
                                    ].map((item, i) => (
                                                        <div key={i} className="p-6 rounded-lg bg-[#0B0B10] border border-[#1E1E2E]">
                                                                        <h3 className="text-lg font-semibold mb-3">{item.q}</h3>h3>
                                                                        <p className="text-[#8888AA]">{item.a}</p>p>
                                                        </div>div>
                                                      ))}
                                          </div>div>
                                </div>div>
                        </section>section>
                  
                        {/* CTA Section */}
                        <section className="py-20 px-4 md:px-8">
                                <div className="max-w-4xl mx-auto text-center">
                                          <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Learning?</h2>h2>
                                          <p className="text-xl text-[#8888AA] mb-12">Join thousands of students mastering subjects with AI-powered learning</p>p>
                                          <a href="https://boamir.lemonsqueezy.com/checkout/buy/985b69f3-b126-4452-bd49-129c9429d11a" className="inline-block px-12 py-4 bg-gradient-to-r from-[#4488FF] to-[#8844FF] rounded-lg font-semibold text-lg hover:opacity-90 transition">
                                                      Start Your Free Trial Today
                                          </a>a>
                                          <p className="text-[#8888AA] mt-6">No credit card required. 7-day free trial included.</p>p>
                                </div>div>
                        </section>section>
                  
                        {/* Footer */}
                        <footer className="border-t border-[#1E1E2E] py-12 px-4 md:px-8">
                                <div className="max-w-6xl mx-auto text-center text-[#8888AA]">
                                          <p>© 2024 AIRA Mentor. All rights reserved. Powered by neuroscience and AI.</p>p>
                                </div>div>
                        </footer>footer>
                  </div>div>
                );
}</div>
