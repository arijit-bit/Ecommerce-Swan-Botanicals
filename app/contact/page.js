'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '../components/Toast';

const faqs = [
  {
    q: 'Are your products suitable for sensitive skin?',
    a: 'Yes, all our products are formulated with gentle, plant-derived ingredients. We recommend performing a patch test before first use, especially if you have a known sensitivity.',
  },
  {
    q: 'Do you offer international shipping?',
    a: 'Currently we ship within the United States. We\'re actively working on expanding our shipping options to serve international customers in the near future.',
  },
  {
    q: 'How long do your products last?',
    a: 'Our products have a shelf life of 12–18 months when stored correctly away from direct sunlight and heat. Each product carries an expiry date on the packaging.',
  },
  {
    q: 'Are your products cruelty-free?',
    a: 'Absolutely. We are committed to cruelty-free practices and never test on animals at any stage of development or production.',
  },
];

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-sand last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="font-body font-medium text-charcoal">{faq.q}</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-stone shrink-0" aria-hidden="true" />
          : <ChevronDown className="w-4 h-4 text-stone shrink-0" aria-hidden="true" />
        }
      </button>
      {open && (
        <p className="font-body text-sm text-stone leading-relaxed pb-5 animate-fade-in">
          {faq.a}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const { show } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      show('Message sent! We\'ll respond within 1–2 business days.', 'success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setSubmitting(false);
    }, 1500);
  }

  return (
    <div className="bg-ivory">
      {/* Header */}
      <section className="bg-cream border-b border-sand py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-sage mb-4">Get in Touch</p>
          <h1 className="font-display text-4xl md:text-5xl text-charcoal mb-6">We&rsquo;d love to hear from you</h1>
          <p className="font-body text-stone text-lg leading-relaxed">
            Questions about our products, an order, or just want to say hello? Send us a message
            and we&rsquo;ll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Form */}
          <div className="animate-fade-in-up">
            <h2 className="font-display text-2xl text-charcoal mb-8">Send a message</h2>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block font-body text-sm font-medium text-charcoal mb-1.5">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name" name="name" type="text" required
                    value={form.name} onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 border border-sand rounded-xl text-sm font-body text-charcoal bg-white placeholder:text-mist focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest/40"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-body text-sm font-medium text-charcoal mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email" name="email" type="email" required
                    value={form.email} onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-sand rounded-xl text-sm font-body text-charcoal bg-white placeholder:text-mist focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest/40"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block font-body text-sm font-medium text-charcoal mb-1.5">Subject</label>
                <input
                  id="subject" name="subject" type="text"
                  value={form.subject} onChange={handleChange}
                  placeholder="What is your message about?"
                  className="w-full px-4 py-3 border border-sand rounded-xl text-sm font-body text-charcoal bg-white placeholder:text-mist focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest/40"
                />
              </div>
              <div>
                <label htmlFor="message" className="block font-body text-sm font-medium text-charcoal mb-1.5">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message" name="message" required rows={6}
                  value={form.message} onChange={handleChange}
                  placeholder="Tell us how we can help…"
                  className="w-full px-4 py-3 border border-sand rounded-xl text-sm font-body text-charcoal bg-white placeholder:text-mist focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest/40 resize-y min-h-[140px]"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-forest text-white font-body font-semibold text-sm py-4 rounded-xl hover:bg-forest-dark active:scale-[0.97] transition-all duration-200 disabled:opacity-60"
              >
                {submitting ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="animate-fade-in space-y-8">
            <div>
              <h2 className="font-display text-2xl text-charcoal mb-8">Contact Information</h2>
              <div className="space-y-6">
                {[
                  {
                    icon: <MapPin className="w-5 h-5" />,
                    title: 'Visit Us',
                    lines: ['123 Botanical Lane', 'Nature Valley, NV 12345', 'United States'],
                  },
                  {
                    icon: <Phone className="w-5 h-5" />,
                    title: 'Call Us',
                    lines: ['+1 (555) 123-4567'],
                  },
                  {
                    icon: <Mail className="w-5 h-5" />,
                    title: 'Email Us',
                    lines: ['hello@swanbotanicals.com', 'support@swanbotanicals.com'],
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-forest/10 rounded-xl flex items-center justify-center shrink-0 text-forest">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-body font-semibold text-charcoal mb-1">{item.title}</h3>
                      {item.lines.map((l) => (
                        <p key={l} className="font-body text-sm text-stone">{l}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Business hours */}
            <div className="bg-cream border border-sand rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-forest" aria-hidden="true" />
                <h3 className="font-body font-semibold text-charcoal">Business Hours</h3>
              </div>
              <div className="space-y-2 font-body text-sm">
                {[
                  ['Monday – Friday', '9:00 AM – 6:00 PM EST'],
                  ['Saturday',        '10:00 AM – 4:00 PM EST'],
                  ['Sunday',          'Closed'],
                ].map(([day, hrs]) => (
                  <div key={day} className="flex justify-between">
                    <span className="text-stone">{day}</span>
                    <span className="text-charcoal font-medium">{hrs}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-cream border-t border-sand py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-sage mb-3">FAQ</p>
            <h2 className="font-display text-3xl text-charcoal">Frequently Asked Questions</h2>
          </div>
          <div className="bg-white border border-sand rounded-2xl px-6 divide-y divide-sand">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} faq={faq} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
