import Link from 'next/link';
import { ArrowRight, Leaf, Droplets, Shield, Sun } from 'lucide-react';

const values = [
  {
    icon: <Leaf className="w-5 h-5" />,
    title: 'Purity',
    body: 'Only the finest, cleanest botanical ingredients — no unnecessary fillers or synthetic shortcuts.',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Integrity',
    body: 'Transparent labelling, honest formulations, and a commitment to never overstating a claim.',
  },
  {
    icon: <Droplets className="w-5 h-5" />,
    title: 'Sustainability',
    body: 'Eco-conscious practices at every step: sourcing, production, packaging and delivery.',
  },
  {
    icon: <Sun className="w-5 h-5" />,
    title: 'Effectiveness',
    body: 'Botanicals selected for proven efficacy, not for trend or aesthetic appeal.',
  },
];

const team = [
  {
    name: 'Arijit Patra',
    role: 'Founder & CEO',
    bio: 'Visionary behind Swan Botanicals, passionate about bridging the gap between traditional plant wisdom and modern skincare science.',
  },
  {
    name: 'Saksham Kumar',
    role: 'Co-Founder & CFO',
    bio: 'Drives the business with a focus on sustainable growth, ethical sourcing partnerships, and community impact.',
  },
  {
    name: 'Sangita Chowdhury',
    role: 'Chief Botanist & COO',
    bio: 'Oversees all formulation work, ensuring every product meets our exacting standards for purity, safety, and performance.',
  },
];

export const metadata = {
  title: 'Our Story',
  description: 'Learn about Swan Botanicals — born from a passion for nature\'s healing power and a belief that the best skincare starts with the land.',
};

export default function About() {
  return (
    <div className="bg-ivory">
      {/* Hero */}
      <section className="bg-cream border-b border-sand py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-sage mb-4">Our Story</p>
          <h1 className="font-display text-4xl md:text-5xl text-charcoal mb-6 leading-tight">
            Founded on Pure Beauty
          </h1>
          <p className="font-body text-stone text-lg leading-relaxed">
            Born from a passion for nature&rsquo;s healing power, Swan Botanicals represents
            the harmony between botanical wisdom and modern skincare science.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="animate-fade-in-up">
            <h2 className="font-display text-3xl text-charcoal mb-6">How it began</h2>
            <div className="space-y-5 font-body text-stone leading-relaxed">
              <p>
                Swan Botanicals was founded in 2018 with a simple yet profound mission:
                to harness the transformative power of botanicals in skincare. Our journey
                began when our founder, inspired by generations of herbal wisdom passed down
                through his family, realised that nature holds the key to radiant, healthy skin.
              </p>
              <p>
                Every product in our collection is crafted with meticulous attention to
                detail, using only the finest botanical ingredients sourced from sustainable
                farms. We believe that true beauty comes from embracing nature&rsquo;s wisdom —
                not overriding it.
              </p>
              <p>
                Today, Swan Botanicals continues to grow as a testament to the power of
                natural skincare, serving customers who value purity, sustainability,
                and effectiveness in their daily routines.
              </p>
            </div>
          </div>

          <div className="bg-white border border-sand rounded-2xl p-8 animate-fade-in">
            <h3 className="font-display text-xl text-charcoal mb-6">Our Values</h3>
            <div className="space-y-5">
              {values.map((v) => (
                <div key={v.title} className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-forest/10 rounded-xl flex items-center justify-center shrink-0 text-forest">
                    {v.icon}
                  </div>
                  <div>
                    <h4 className="font-body font-semibold text-charcoal mb-0.5">{v.title}</h4>
                    <p className="font-body text-sm text-stone leading-relaxed">{v.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-forest py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-sage-light mb-4">Mission</p>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-8 max-w-2xl mx-auto leading-tight">
            To make premium botanical skincare accessible, honest, and sustainable
          </h2>
          <p className="font-body text-white/70 text-lg max-w-3xl mx-auto mb-14 leading-relaxed">
            We create botanical skincare that celebrates the pure beauty of nature,
            while promoting sustainable practices and empowering everyone to embrace
            their natural radiance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              {
                title: 'Natural Sourcing',
                body: 'We partner with certified sustainable farms to source the highest quality botanical ingredients from around the world.',
              },
              {
                title: 'Scientific Formulation',
                body: 'Our products blend traditional botanical wisdom with modern formulation science to deliver genuine, measurable results.',
              },
              {
                title: 'Community & Planet',
                body: 'A portion of every purchase supports environmental conservation efforts and the farming communities we partner with.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white/10 rounded-2xl p-6">
                <h3 className="font-display text-lg text-white mb-3">{item.title}</h3>
                <p className="font-body text-sm text-white/75 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-sage mb-3">The people behind the plants</p>
          <h2 className="font-display text-3xl md:text-4xl text-charcoal">Meet the Team</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.name} className="bg-white border border-sand rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-forest/10 rounded-full mx-auto mb-5 flex items-center justify-center">
                <span className="font-display text-2xl font-semibold text-forest">
                  {member.name.charAt(0)}
                </span>
              </div>
              <h3 className="font-display text-lg text-charcoal mb-1">{member.name}</h3>
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-sage mb-4">{member.role}</p>
              <p className="font-body text-sm text-stone leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cream border border-sand rounded-3xl p-12 text-center">
          <h2 className="font-display text-3xl text-charcoal mb-4">Ready to start your ritual?</h2>
          <p className="font-body text-stone mb-8 max-w-md mx-auto">
            Explore our complete collection of botanical formulas and find the right fit for your skin.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2.5 bg-forest text-white font-body font-semibold text-sm px-8 py-4 rounded-xl hover:bg-forest-dark active:scale-[0.97] transition-all duration-200"
          >
            Shop the Collection
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
