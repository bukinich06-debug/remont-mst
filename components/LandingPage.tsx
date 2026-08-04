"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";

const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "Почему мы", href: "#why" },
  { label: "Как работаем", href: "#process" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contact" },
];

const SERVICES = [
  {
    icon: "🫧",
    title: "Ремонт стиральных машин",
    items: [
      "Замена подшипников и сальников",
      "Ремонт и замена ТЭНа",
      "Устранение утечек воды",
      "Замена насоса и помпы",
      "Ремонт модуля управления",
      "Замена ремня и амортизаторов",
    ],
    color: "#dbeafe",
    accent: "#1d6fc4",
  },
  {
    icon: "❄️",
    title: "Ремонт холодильников",
    items: [
      "Заправка хладагентом",
      "Устранение утечки фреона",
      "Замена компрессора",
      "Ремонт системы No Frost",
      "Замена терморегулятора",
      "Устранение посторонних шумов",
    ],
    color: "#dcfce7",
    accent: "#16a34a",
  },
];

const ADVANTAGES = [
  {
    icon: "⚡",
    title: "Выезд в день обращения",
    text: "Приедем в удобное для вас время — без лишних ожиданий.",
  },
  {
    icon: "🛠️",
    title: "Ремонт на дому",
    text: "Вам не нужно никуда везти технику — мастер приезжает сам.",
  },
  {
    icon: "📋",
    title: "Честная диагностика",
    text: "Бесплатная диагностика при выполнении ремонта. Без скрытых платежей.",
  },
  {
    icon: "🔒",
    title: "Гарантия 6 месяцев",
    text: "На все выполненные работы и установленные запчасти.",
  },
  {
    icon: "🔧",
    title: "Оригинальные запчасти",
    text: "Используем только качественные детали от проверенных поставщиков.",
  },
  {
    icon: "💳",
    title: "Доступные цены",
    text: "Стоимость озвучиваем до начала работ. Без сюрпризов в счёте.",
  },
];

const STEPS = [
  { num: "01", title: "Позвоните нам", text: "Опишите проблему по телефону или в мессенджере — это займёт минуту." },
  { num: "02", title: "Мастер приедет", text: "Согласуем удобное время и приедем к вам домой в Мстиславле." },
  { num: "03", title: "Диагностика", text: "Определим причину поломки и назовём точную стоимость ремонта." },
  { num: "04", title: "Ремонт и гарантия", text: "Устраним неисправность на месте и выдадим гарантийный талон." },
];

const REVIEWS = [
  {
    name: "Елена Сорокина",
    text: "Вызвала мастера по поводу стиральной машины — не сливала воду. Приехал через час, быстро нашёл причину, всё починил. Цена оказалась очень разумной. Спасибо!",
    stars: 5,
    date: "Март 2025",
  },
  {
    name: "Игорь Павлов",
    text: "Перестал морозить холодильник. Думал, придётся покупать новый. Мастер приехал, сказал что утечка фреона, заправил и всё заработало. Прошло уже 4 месяца — держит температуру отлично.",
    stars: 5,
    date: "Январь 2025",
  },
  {
    name: "Нина Климова",
    text: "Очень довольна! Вежливый, аккуратный мастер. Объяснил что и почему сломалось, показал старую деталь. Гарантию дал на полгода. Рекомендую всем знакомым!",
    stars: 5,
    date: "Апрель 2025",
  },
];

const BRANDS = ["Samsung", "LG", "Bosch", "Indesit", "Whirlpool", "Atlant", "Beko", "Gorenje", "Electrolux", "Candy"];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#f97316">
          <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z" />
        </svg>
      ))}
    </div>
  );
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "", website: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          message: formData.message,
          website: formData.website,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setError(data.error || "Не удалось отправить заявку. Попробуйте позже.");
        return;
      }

      setSent(true);
      setFormData({ name: "", phone: "", message: "", website: "" });
    } catch {
      setError("Не удалось отправить заявку. Проверьте соединение и попробуйте снова.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8faff] text-slate-800">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1d6fc4] flex items-center justify-center text-white text-lg font-black font-display">
              М
            </div>
            <div>
              <div className="font-extrabold text-slate-800 leading-tight text-sm">МастерСервис</div>
              <div className="text-xs text-slate-500 leading-tight">Мстиславль</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-600 text-slate-600 hover:text-[#1d6fc4] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="tel:+375296187313"
            className="hidden md:flex items-center gap-2 bg-[#1d6fc4] text-white px-4 py-2 rounded-xl text-sm font-700 hover:bg-[#1659a0] transition-colors"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.53 2 2 0 0 1 3.59 1.36h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            +375 (29) 618-73-13
          </a>

          <button type="button" className="md:hidden p-2 text-slate-600" onClick={() => setMenuOpen((v) => !v)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-600 text-slate-700 py-1"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="tel:+375296187313"
              className="mt-2 flex items-center justify-center gap-2 bg-[#1d6fc4] text-white py-2.5 rounded-xl text-sm font-700"
            >
              📞 +375 (29) 618-73-13
            </a>
          </div>
        )}
      </header>

      <section className="relative overflow-hidden pt-16 pb-20 px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue-100/60 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-sky-100/50 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1d6fc4] text-xs font-700 px-3 py-1.5 rounded-full mb-5 border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Работаем в Мстиславле и районе
            </div>
            <h1 className="text-4xl md:text-5xl font-900 text-slate-800 leading-tight mb-5 font-display">
              Ремонт стиральных машин
              <br />
              <span className="text-[#1d6fc4]">и холодильников</span>
            </h1>
            <p className="text-lg text-slate-500 font-500 leading-relaxed mb-8 max-w-md">
              Опытный мастер приедет к вам домой. Быстрая диагностика, честная цена, гарантия на все работы.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a
                href="tel:+375296187313"
                className="flex items-center justify-center gap-2 bg-[#1d6fc4] text-white px-6 py-3.5 rounded-xl font-700 text-base hover:bg-[#1659a0] transition-all shadow-lg shadow-blue-200"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.53 2 2 0 0 1 3.59 1.36h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Позвонить мастеру
              </a>
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-3.5 rounded-xl font-700 text-base hover:border-[#1d6fc4] hover:text-[#1d6fc4] transition-all"
              >
                Оставить заявку
              </a>
            </div>

            <div className="flex flex-wrap gap-5">
              {[
                { val: "10+", label: "лет опыта" },
                { val: "500+", label: "ремонтов" },
                { val: "6 мес", label: "гарантия" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-900 text-[#1d6fc4] font-display">{s.val}</div>
                  <div className="text-xs text-slate-500 font-600">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-100 aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=525&fit=crop&auto=format"
                alt="Мастер по ремонту бытовой техники"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-xl">✅</div>
              <div>
                <div className="text-xs font-800 text-slate-700">Гарантия работ</div>
                <div className="text-xs text-slate-400">6 месяцев</div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-xl">⚡</div>
              <div>
                <div className="text-xs font-800 text-slate-700">Выезд сегодня</div>
                <div className="text-xs text-slate-400">с 8:00 до 20:00</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-xs font-700 text-slate-400 uppercase tracking-widest mb-5">
            Ремонтируем технику любых марок
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {BRANDS.map((b) => (
              <span
                key={b}
                className="text-slate-400 font-700 text-sm hover:text-[#1d6fc4] transition-colors cursor-default"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-700 text-[#1d6fc4] uppercase tracking-widest mb-3">Услуги</div>
            <h2 className="text-3xl md:text-4xl font-900 text-slate-800 font-display">Что мы ремонтируем</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-xl font-800 text-slate-800 mb-5">{s.title}</h3>
                <ul className="space-y-2.5">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600 font-500">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="8" fill={s.color} />
                        <path
                          d="M5 8l2 2 4-4"
                          stroke={s.accent}
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-700 text-[#1d6fc4] hover:gap-3 transition-all"
                >
                  Вызвать мастера
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M2 7h10M8 3l4 4-4 4" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-700 text-[#1d6fc4] uppercase tracking-widest mb-3">Преимущества</div>
            <h2 className="text-3xl md:text-4xl font-900 text-slate-800 font-display">Почему выбирают нас</h2>
            <p className="mt-3 text-slate-500 font-500 max-w-md mx-auto">
              Мы ценим ваше время и предлагаем честный, качественный сервис.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ADVANTAGES.map((a) => (
              <div
                key={a.title}
                className="group p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-default"
              >
                <div className="text-3xl mb-4">{a.icon}</div>
                <h3 className="font-800 text-slate-800 mb-2">{a.title}</h3>
                <p className="text-sm text-slate-500 font-500 leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="py-20 px-4 bg-[#f8faff]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-700 text-[#1d6fc4] uppercase tracking-widest mb-3">Как работаем</div>
            <h2 className="text-3xl md:text-4xl font-900 text-slate-800 font-display">
              Всего 4 шага до рабочей техники
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <div key={step.num} className="relative">
                {i < STEPS.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-7 left-full w-full h-px bg-blue-100 z-0"
                    style={{ width: "calc(100% - 2rem)" }}
                  />
                )}
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#1d6fc4] text-white flex items-center justify-center font-900 text-lg mb-4 font-display">
                    {step.num}
                  </div>
                  <h3 className="font-800 text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 font-500 leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#1d6fc4]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-900 mb-4 font-display">Техника сломалась? Не ждите!</h2>
          <p className="text-blue-100 font-500 mb-8 text-lg">
            Позвоните прямо сейчас — мастер приедет сегодня и устранит поломку на месте.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="tel:+375296187313"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#1d6fc4] px-7 py-3.5 rounded-xl font-800 text-base hover:bg-blue-50 transition-colors shadow-lg"
            >
              📞 +375 (29) 618-73-13
            </a>
            <a
              href="https://t.me/masterservice_mstsislaw"
              className="inline-flex items-center justify-center gap-2 bg-blue-500/30 border border-white/30 text-white px-7 py-3.5 rounded-xl font-700 text-base hover:bg-blue-500/50 transition-colors"
            >
              ✉️ Написать в Telegram
            </a>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-700 text-[#1d6fc4] uppercase tracking-widest mb-3">Отзывы</div>
            <h2 className="text-3xl md:text-4xl font-900 text-slate-800 font-display">Что говорят клиенты</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-[#f8faff] rounded-2xl p-6 border border-slate-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#1d6fc4] text-white flex items-center justify-center font-800 text-sm">
                    {r.name[0]}
                  </div>
                  <StarRating count={r.stars} />
                </div>
                <p className="text-sm text-slate-600 font-500 leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div className="font-700 text-slate-700 text-sm">{r.name}</div>
                  <div className="text-xs text-slate-400">{r.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-[#f8faff]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-700 text-[#1d6fc4] uppercase tracking-widest mb-3">Контакты</div>
            <h2 className="text-3xl md:text-4xl font-900 text-slate-800 font-display">Свяжитесь с нами</h2>
            <p className="mt-3 text-slate-500 font-500 max-w-md mx-auto">
              Оставьте заявку или позвоните — ответим быстро.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-5">
              {[
                {
                  icon: "📞",
                  title: "Телефон",
                  lines: ["+375 (29) 618-73-13"],
                  link: "tel:+375296187313",
                  linkText: "Позвонить",
                },
                {
                  icon: "📍",
                  title: "Район обслуживания",
                  lines: ["г. Мстиславль и Мстиславский район", "Выезд бесплатно при ремонте"],
                  link: null,
                  linkText: null,
                },
                {
                  icon: "🕐",
                  title: "Время работы",
                  lines: ["Пн–Пт: 8:00 – 20:00", "Сб–Вс: 9:00 – 18:00"],
                  link: null,
                  linkText: null,
                },
                {
                  icon: "✉️",
                  title: "Мессенджеры",
                  lines: ["Telegram", "Viber"],
                  link: "https://t.me/masterservice_mstsislaw",
                  linkText: "Написать",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <div className="text-2xl w-10 flex-shrink-0">{item.icon}</div>
                  <div className="flex-1">
                    <div className="font-700 text-slate-700 text-sm mb-1">{item.title}</div>
                    {item.lines.map((l) => (
                      <div key={l} className="text-sm text-slate-500 font-500">
                        {l}
                      </div>
                    ))}
                    {item.link && (
                      <a
                        href={item.link}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-700 text-[#1d6fc4] hover:underline"
                      >
                        {item.linkText} →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-800 text-slate-800 mb-2">Заявка отправлена!</h3>
                  <p className="text-slate-500 font-500 text-sm">Мы свяжемся с вами в ближайшее время.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setError("");
                    }}
                    className="mt-6 text-sm font-700 text-[#1d6fc4] hover:underline"
                  >
                    Отправить ещё одну заявку
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-800 text-slate-800 mb-6">Оставить заявку</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div
                      className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                      aria-hidden="true"
                    >
                      <label htmlFor="contact-website">Сайт</label>
                      <input
                        id="contact-website"
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.website}
                        onChange={(e) => setFormData((v) => ({ ...v, website: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-700 text-slate-600 mb-1.5">Ваше имя</label>
                      <input
                        type="text"
                        required
                        disabled={loading}
                        maxLength={100}
                        placeholder="Иван Иванович"
                        value={formData.name}
                        onChange={(e) => setFormData((v) => ({ ...v, name: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-500 text-slate-700 placeholder-slate-300 focus:outline-none focus:border-[#1d6fc4] focus:ring-2 focus:ring-blue-100 transition-all disabled:opacity-60"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-700 text-slate-600 mb-1.5">Номер телефона</label>
                      <input
                        type="tel"
                        required
                        disabled={loading}
                        maxLength={40}
                        placeholder="+375 (__)  ___-__-__"
                        value={formData.phone}
                        onChange={(e) => setFormData((v) => ({ ...v, phone: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-500 text-slate-700 placeholder-slate-300 focus:outline-none focus:border-[#1d6fc4] focus:ring-2 focus:ring-blue-100 transition-all disabled:opacity-60"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-700 text-slate-600 mb-1.5">Опишите проблему</label>
                      <textarea
                        rows={4}
                        disabled={loading}
                        maxLength={1000}
                        placeholder="Например: стиральная машина не сливает воду / холодильник не морозит..."
                        value={formData.message}
                        onChange={(e) => setFormData((v) => ({ ...v, message: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-500 text-slate-700 placeholder-slate-300 focus:outline-none focus:border-[#1d6fc4] focus:ring-2 focus:ring-blue-100 transition-all resize-none disabled:opacity-60"
                      />
                    </div>
                    {error && (
                      <p className="text-sm text-red-600 font-500 text-center" role="alert">
                        {error}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#1d6fc4] text-white py-3.5 rounded-xl font-700 text-sm hover:bg-[#1659a0] transition-colors shadow-md shadow-blue-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? "Отправка..." : "Отправить заявку"}
                    </button>
                    <p className="text-xs text-center text-slate-400 font-500">
                      Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-800 text-slate-400 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#1d6fc4] flex items-center justify-center text-white font-black text-sm font-display">
                  М
                </div>
                <div className="font-800 text-white text-sm">МастерСервис</div>
              </div>
              <p className="text-xs leading-relaxed">
                Профессиональный ремонт бытовой техники в Мстиславле. Быстро, качественно, с гарантией.
              </p>
            </div>
            <div>
              <div className="font-700 text-white text-sm mb-3">Услуги</div>
              <ul className="space-y-1.5 text-xs">
                <li>Ремонт стиральных машин</li>
                <li>Ремонт холодильников</li>
                <li>Диагностика бесплатно</li>
                <li>Гарантия 6 месяцев</li>
              </ul>
            </div>
            <div>
              <div className="font-700 text-white text-sm mb-3">Контакты</div>
              <ul className="space-y-1.5 text-xs">
                <li>📞 +375 (29) 618-73-13</li>
                <li>📍 г. Мстиславль</li>
                <li>🕐 Пн–Вс: 8:00 – 20:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-6 text-center text-xs">
            © 2025 МастерСервис — Мстиславль. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
