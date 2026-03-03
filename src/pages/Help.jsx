import { useState } from 'react';
import { motion } from 'framer-motion';
import { faqs } from '../data/faqs';

const initialForm = {
  codeName: '',
  email: '',
  report: '',
};

function Help() {
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setForm(initialForm);
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:px-12">
      <h1 className="mb-10 font-dossier text-4xl tracking-[0.25em] md:text-5xl">HELP DESK</h1>

      <section className="mb-14 rounded border border-sand/20 bg-black/35 p-6">
        <h2 className="mb-6 font-dossier text-3xl tracking-[0.18em]">FAQ</h2>
        <div className="space-y-4">
          {faqs.map((item, index) => {
            const active = openFaq === index;
            return (
              <div key={item.q} className="rounded border border-olive/45 bg-vault/60">
                <button
                  type="button"
                  onClick={() => setOpenFaq(index)}
                  className="w-full px-4 py-4 text-left font-body text-xl text-sand"
                >
                  {item.q}
                </button>
                {active ? <p className="border-t border-sand/10 px-4 py-4 font-body text-lg text-sand/80">{item.a}</p> : null}
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded border border-blood/45 bg-black/40 p-6">
        <h2 className="font-dossier text-3xl tracking-[0.15em] text-blood">SUBMIT CLASSIFIED REPORT</h2>
        <p className="mt-2 font-body text-lg text-sand/75">Frontend demo only. Data is not sent to a backend.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="text"
            name="codeName"
            value={form.codeName}
            onChange={onChange}
            placeholder="Code Name"
            className="w-full border border-sand/35 bg-vault/70 px-4 py-3 font-body text-lg text-sand outline-none transition focus:border-sand"
            required
          />
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Secure Email"
            className="w-full border border-sand/35 bg-vault/70 px-4 py-3 font-body text-lg text-sand outline-none transition focus:border-sand"
            required
          />
          <motion.textarea
            whileFocus={{ scale: 1.01 }}
            name="report"
            value={form.report}
            onChange={onChange}
            placeholder="Classified report details"
            rows={5}
            className="w-full resize-none border border-sand/35 bg-vault/70 px-4 py-3 font-body text-lg text-sand outline-none transition focus:border-sand"
            required
          />
          <button
            type="submit"
            className="rounded border border-blood px-6 py-3 font-body text-sm tracking-[0.28em] text-blood transition hover:bg-blood hover:text-sand"
          >
            TRANSMIT REPORT
          </button>
          {submitted ? <p className="font-body text-lg text-sand/80">Report logged in local archive queue.</p> : null}
        </form>
      </section>
    </div>
  );
}

export default Help;
