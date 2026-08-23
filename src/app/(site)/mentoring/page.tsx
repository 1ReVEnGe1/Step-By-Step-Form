"use client";

import { useState } from "react";
import { BiArrowBack, BiLeftArrowAlt } from "react-icons/bi";

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  telegram: string;
  message: string;
};

type Step = {
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  items?: string[];
  highlight?: string;
  isForm?: boolean;
};

const steps: Step[] = [
  {
    label: "شروع",
    eyebrow: "مشاوره رایگان یارندی ایونت",
    title: "بیایید درباره رویدادی که در ذهن دارید صحبت کنیم.",
    description:
      "گاهی قبل از شروع یک رویداد، فقط به یک گفتگوی درست نیاز دارید تا مسیر شفاف‌تر شود. در این مشاوره اولیه، درباره ایده، نیازها و چالش‌های رویداد شما صحبت می‌کنیم.",
    highlight:
      "یک گفتگوی کوتاه می‌تواند مسیر تصمیم‌گیری شما برای رویداد را خیلی شفاف‌تر کند.",
  },
  {
    label: "دغدغه شما",
    eyebrow: "چه چیزی شما را متوقف کرده؟",
    title: "هر رویداد از یک سؤال یا مسئله شروع می‌شود.",
    description:
      "ممکن است هنوز پاسخ همه سؤال‌ها را ندانید؛ این کاملاً طبیعی است. ببینید کدام مورد به شرایط فعلی شما نزدیک‌تر است.",
    items: [
      "نمی‌دانم از کجا برنامه‌ریزی رویداد را شروع کنم.",
      "ایده دارم اما نمی‌دانم چطور آن را اجرا کنم.",
      "برای انتخاب لوکیشن یا خدمات مناسب مردد هستم.",
      "می‌خواهم تجربه متفاوت‌تری برای مهمان‌ها بسازم.",
      "بین چند مسیر مختلف برای اجرای رویداد مانده‌ام.",
      "نمی‌دانم دقیقاً به چه خدماتی نیاز دارم.",
    ],
  },
  {
    label: "خروجی",
    eyebrow: "بعد از گفتگو",
    title: "هدف، شفاف‌تر شدن قدم بعدی شماست.",
    description:
      "در این گفتگو تلاش می‌کنیم وضعیت فعلی، دغدغه اصلی و مسیر احتمالی پیش روی شما را بهتر بررسی کنیم.",
    items: [
      "شفاف‌تر شدن هدف اصلی رویداد",
      "شناخت بهتر اولویت‌های اجرایی",
      "بررسی اولیه ایده و نیازهای شما",
      "دریافت مسیر پیشنهادی برای شروع",
      "پاسخ به سؤال‌ها و ابهام‌های مهم",
    ],
  },
  {
    label: "درخواست",
    eyebrow: "آخرین مرحله",
    title: "حالا کمی بیشتر از خودتان بگویید.",
    description:
      "اطلاعات شما به ما کمک می‌کند قبل از گفتگو، شناخت بهتری از نیاز و دغدغه‌تان داشته باشیم.",
    isForm: true,
  },
];

export default function MentoringPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    telegram: "",
    message: "",
  });

  const step = steps[currentStep];

  const progress = showReview
    ? 100
    : ((currentStep + 1) / steps.length) * 100;

  const fullName =
    `${formData.firstName} ${formData.lastName}`.trim() || "—";

  const requestText = `سلام تیم یارندی ایونت 👋

برای دریافت مشاوره درباره برگزاری یک رویداد درخواست دارم.

نام و نام خانوادگی: ${fullName}

شماره تماس: ${formData.phone || "—"}

آیدی تلگرام: ${formData.telegram || "—"}

توضیحات:
${formData.message || "—"}

ممنونم.`;

  const updateForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      alert("لطفاً نام خود را وارد کنید.");
      return false;
    }

    if (!formData.lastName.trim()) {
      alert("لطفاً نام خانوادگی خود را وارد کنید.");
      return false;
    }

    if (!formData.phone.trim()) {
      alert("لطفاً شماره تماس خود را وارد کنید.");
      return false;
    }

    if (!formData.message.trim()) {
      alert("لطفاً درباره نیاز یا رویدادتان توضیح کوتاهی بنویسید.");
      return false;
    }

    return true;
  };

  const submitRequest = () => {
    if (!validateForm()) return;

    setShowReview(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const copyRequest = async () => {
    try {
      await navigator.clipboard.writeText(requestText);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch {
      alert("امکان کپی متن وجود ندارد.");
    }
  };

  const sendToTelegram = () => {
    const telegramUsername = "Cubeeee1";

    const telegramUrl = `https://t.me/${telegramUsername}?text=${encodeURIComponent(
      requestText
    )}`;

    window.open(telegramUrl, "_blank", "noopener,noreferrer");
  };

  const nextStep = () => {
    if (currentStep >= steps.length - 1) return;

    setCurrentStep((prev) => prev + 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const previousStep = () => {
    if (currentStep <= 0) return;

    setCurrentStep((prev) => prev - 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const backToForm = () => {
    setShowReview(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#e9efed] px-4 py-5 text-[#172321] sm:px-6 sm:py-8 lg:px-10"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#006558]/20 blur-[110px]" />
        <div className="absolute -bottom-40 -left-32 h-[500px] w-[500px] rounded-full bg-[#70bdb2]/25 blur-[130px]" />
        <div className="absolute left-[35%] top-[30%] h-[300px] w-[300px] rounded-full bg-white/70 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.8),transparent_45%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Mobile Header */}
        <div className="mb-5 lg:hidden">
          <div className="flex items-center justify-between rounded-[24px] border border-white/70 bg-white/45 px-5 py-4 shadow-[0_12px_40px_rgba(20,70,62,0.08)] backdrop-blur-2xl">
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] text-[#006558]">
                YARANDI EVENT
              </p>

              <p className="mt-1 text-xs font-medium text-[#4d5e5a]">
                {showReview ? "بررسی درخواست" : "مشاوره اولیه رویداد"}
              </p>
            </div>

            <div className="flex h-11 min-w-11 items-center justify-center rounded-full border border-white/80 bg-white/50 px-3 text-xs font-bold text-[#006558] shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)] backdrop-blur-xl">
              {showReview ? "✓" : `${currentStep + 1} / ${steps.length}`}
            </div>
          </div>

          <div className="mt-4 rounded-full border border-white/70 bg-white/35 p-1 backdrop-blur-xl">
            <div
              className="h-1.5 rounded-full bg-[#006558] shadow-[0_0_14px_rgba(0,101,88,0.35)] transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="grid gap-6 lg:grid-cols-[270px_1fr] lg:gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-8">
              <div className="mb-8 px-2">
                <div className="mb-5 flex h-14 w-fit px-4 items-center justify-center rounded-2xl border border-white/80 bg-white/45 text-sm font-bold text-[#006558] shadow-[0_12px_30px_rgba(20,70,62,0.08)] backdrop-blur-xl">
                  <img className="w-20 h-14 object-contain" src={'/pics/yarandi-event-logo.webp'} />
                </div>

                <p className="text-xs font-bold tracking-[0.18em] text-[#006558]">
                  YARANDI EVENT
                </p>

                <h2 className="mt-3 text-xl font-bold leading-8 text-[#172321]">
                  درخواست
                  <br />
                  مشاوره رویداد
                </h2>

                <p className="mt-3 max-w-[220px] text-sm leading-7 text-[#52625E]">
                  چند مرحله کوتاه تا شروع یک گفتگوی بهتر درباره رویداد شما.
                </p>
              </div>

              {/* Steps */}
              <div className="rounded-[28px] border border-white/75 bg-white/35 p-3 shadow-[0_20px_50px_rgba(30,80,70,0.09)] backdrop-blur-2xl">
                {steps.map((item, index) => {
                  const isActive = index === currentStep && !showReview;
                  const isCompleted = index < currentStep || showReview;

                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        if (!showReview) {
                          setCurrentStep(index);
                        }
                      }}
                      className={`group relative flex w-full items-center gap-4 rounded-[20px] px-4 py-4 text-right transition-all duration-300 ${
                        isActive
                          ? "border border-white/80 bg-white/60 shadow-[0_8px_25px_rgba(20,70,62,0.08)] backdrop-blur-xl"
                          : "border border-transparent hover:bg-white/30"
                      }`}
                    >
                      {index < steps.length - 1 && (
                        <span
                          className={`absolute right-[29px] top-[55px] h-5 w-px ${
                            isCompleted
                              ? "bg-[#006558]/50"
                              : "bg-[#61736e]/15"
                          }`}
                        />
                      )}

                      <span
                        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-all ${
                          isActive || isCompleted
                            ? "bg-[#006558] text-white shadow-[0_6px_18px_rgba(0,101,88,0.25)]"
                            : "border border-white/70 bg-white/35 text-[#60706c] shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)]"
                        }`}
                      >
                        {isCompleted ? "✓" : `0${index + 1}`}
                      </span>

                      <span
                        className={`text-sm font-semibold ${
                          isActive ? "text-[#006558]" : "text-[#566560]"
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}

                {/* Review Step */}
                <div
                  className={`relative flex items-center gap-4 rounded-[20px] px-4 py-4 ${
                    showReview
                      ? "border border-white/80 bg-white/60 shadow-[0_8px_25px_rgba(20,70,62,0.08)]"
                      : "border border-transparent"
                  }`}
                >
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#006558] text-[11px] font-bold text-white shadow-[0_6px_18px_rgba(0,101,88,0.25)]">
                    {showReview ? "✓" : "05"}
                  </span>

                  <span
                    className={`text-sm font-semibold ${
                      showReview ? "text-[#006558]" : "text-[#566560]"
                    }`}
                  >
                    بررسی درخواست
                  </span>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="mt-5 rounded-[25px] border border-white/70 bg-white/30 p-5 shadow-[0_15px_40px_rgba(20,70,62,0.06)] backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#006558]/10 text-[#006558]">
                    ✦
                  </span>

                  <div>
                    <p className="text-xs font-bold text-[#006558]">
                      مشاوره اولیه
                    </p>

                    <p className="mt-1 text-xs text-[#62716D]">رایگان</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <section className="min-w-0 pb-24 lg:pb-0">
            <div className="relative overflow-hidden rounded-[34px] border border-white/80 bg-white/40 shadow-[0_25px_80px_rgba(20,70,62,0.10)] backdrop-blur-3xl sm:rounded-[40px]">
              {/* Glass shine */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white" />
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/45 blur-3xl" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[#006558]/5 blur-3xl" />

              {/* =====================================================
                  REVIEW PAGE
              ===================================================== */}

              {showReview ? (
                <div className="relative min-h-[650px] p-6 sm:p-10 lg:p-14">
                  {/* Top Meta */}
                  <div className="mb-9 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#006558] shadow-[0_0_10px_rgba(0,101,88,0.5)]" />

                      <span className="text-xs font-bold tracking-wide text-[#006558]">
                        بررسی درخواست
                      </span>
                    </div>

                    <span className="hidden text-xs font-medium text-[#64736F] sm:block">
                      05 / 05
                    </span>
                  </div>

                  <h1 className="max-w-2xl text-[24px] font-bold leading-[1.35] tracking-[-0.02em] text-[#16221F] sm:text-[34px] lg:text-[33px]">
                    درخواست شما آماده ارسال است.
                  </h1>

                  <p className="mt-5 max-w-2xl text-[14px] font-medium leading-6 text-[#4B5C57] sm:text-base">
                    متن زیر همان پیامی است که می‌توانید برای تیم یارندی ایونت
                    ارسال کنید. اگر اطلاعات درست است، آن را کپی کنید یا مستقیماً
                    در تلگرام ادامه دهید.
                  </p>

                  {/* Request Preview */}
                  <div className="relative mt-9 max-w-3xl overflow-hidden rounded-[28px] border border-white/80 bg-white/45 shadow-[0_15px_40px_rgba(20,70,62,0.08)] backdrop-blur-xl">
                    <div className="absolute right-0 top-0 h-full w-1 bg-[#006558]" />

                    <div className="border-b border-[#006558]/10 px-5 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-[#006558]">
                            متن درخواست
                          </p>

                          <p className="mt-1 text-[11px] text-[#71807B]">
                            آماده ارسال به یارندی ایونت
                          </p>
                        </div>

                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#006558]/10 text-sm text-[#006558]">
                          ✓
                        </span>
                      </div>
                    </div>

                    <div className="px-5 py-6 sm:px-6 whitespace-pre-wrap break-words  text-sm font-medium leading-6 text-[#354641]">
                      
                        {requestText}
                      
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 grid max-w-3xl gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={copyRequest}
                      className="group rounded-[20px] border border-white/80 bg-white/35 px-5 py-4 text-sm font-bold text-[#43534E] shadow-[0_8px_25px_rgba(20,70,62,0.06)] backdrop-blur-xl transition-all hover:bg-white/55 active:scale-[0.98]"
                    >
                      <span className="transition-colors group-hover:text-[#006558]">
                        {copied ? "✓ متن کپی شد" : "کپی متن درخواست"}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={sendToTelegram}
                      className="relative overflow-hidden rounded-[20px] bg-[#006558] px-5 py-4 text-sm font-bold text-white shadow-[0_12px_30px_rgba(0,101,88,0.25)] transition-all hover:-translate-y-0.5 hover:bg-[#007364] active:translate-y-0"
                    >
                      <span className="relative z-10">
                        ارسال این متن در تلگرام
                      </span>

                      <span className="absolute inset-x-0 top-0 h-px bg-white/50" />
                    </button>
                  </div>

                  {/* Back */}
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={backToForm}
                      className="text-sm flex gap-2 justify-center font-semibold text-[#667570] transition hover:text-[#006558]"
                    >
                      <BiArrowBack className="text-xl rotate-180" /> بازگشت و ویرایش اطلاعات
                    </button>
                  </div>

                  <p className="mt-7 max-w-3xl text-center text-[11px] leading-6 text-[#71807B]">
                    با انتخاب «ارسال این متن در تلگرام»، تلگرام در یک پنجره جدید
                    باز می‌شود و متن درخواست برای شما آماده خواهد بود.
                  </p>
                </div>
              ) : (
                /* =====================================================
                   NORMAL STEPS
                ===================================================== */

                <div
                  key={currentStep}
                  className="relative min-h-[650px] p-6 sm:p-10 lg:p-14"
                >
                  {/* Top Meta */}
                  <div className="mb-9 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#006558] shadow-[0_0_10px_rgba(0,101,88,0.5)]" />

                      <span className="text-xs font-bold tracking-wide text-[#006558]">
                        {step.eyebrow}
                      </span>
                    </div>

                    <span className="hidden text-xs font-medium text-[#64736F] sm:block">
                      {String(currentStep + 1).padStart(2, "0")} /{" "}
                      {String(steps.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="max-w-2xl text-[24px] font-bold leading-[1.35] tracking-[-0.02em] text-[#16221F] sm:text-[34px] lg:text-[33px]">
                    {step.title}
                  </h1>

                  {/* Description */}
                  <p className="mt-5 max-w-2xl text-[14px] font-medium leading-6 text-[#4B5C57] sm:text-base">
                    {step.description}
                  </p>

                  {/* Highlight */}
                  {step.highlight && (
                    <div className="relative mt-8 max-w-2xl overflow-hidden rounded-[22px] border border-white/80 bg-white/35 px-5 py-5 shadow-[0_10px_30px_rgba(20,70,62,0.06)] backdrop-blur-xl">
                      <div className="absolute right-0 top-0 h-full w-1 bg-[#006558]" />

                      <div className="flex items-center gap-4">
                        <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#006558]/10 text-sm text-[#006558]">
                          ✦
                        </span>

                        <p className="text-sm font-semibold leading-7 text-[#3E4F4A]">
                          {step.highlight}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Items */}
                  {step.items && (
                    <div className="mt-9 grid max-w-3xl gap-3 sm:grid-cols-2">
                      {step.items.map((item, index) => (
                        <div
                          key={item}
                          className="group flex items-center gap-4 rounded-[22px] border border-white/75 bg-white/30 p-4 shadow-[0_8px_25px_rgba(20,70,62,0.05)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/45 hover:shadow-[0_12px_30px_rgba(20,70,62,0.08)]"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/45 text-[13px] font-bold text-[#006558] shadow-[0_4px_12px_rgba(20,70,62,0.06)]">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <p className="text-sm font-medium leading-7 text-[#4D5D59]">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Form */}
                  {step.isForm && (
                    <div className="mt-9 max-w-3xl space-y-5">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <GlassInput
                          label="نام"
                          name="firstName"
                          value={formData.firstName}
                          onChange={updateForm}
                          placeholder="نام شما"
                        />

                        <GlassInput
                          label="نام خانوادگی"
                          name="lastName"
                          value={formData.lastName}
                          onChange={updateForm}
                          placeholder="نام خانوادگی شما"
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <GlassInput
                          label="شماره تماس"
                          name="phone"
                          type="tel"
                          dir="ltr"
                          value={formData.phone}
                          onChange={updateForm}
                          placeholder="0912..."
                        />

                        <GlassInput
                          label="آیدی تلگرام"
                          name="telegram"
                          dir="ltr"
                          value={formData.telegram}
                          onChange={updateForm}
                          placeholder="@username"
                          optional
                        />
                      </div>

                      <div>
                        <label className="mb-2.5 block text-sm font-bold text-[#354641]">
                          کمی درباره نیاز یا رویدادتان بنویسید
                        </label>

                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={updateForm}
                          rows={5}
                          placeholder="چه نوع رویدادی در نظر دارید و مهم‌ترین دغدغه شما چیست؟"
                          className="w-full resize-none rounded-[22px] border border-white/80 bg-white/35 px-5 py-4 text-sm font-medium leading-7 text-[#263632] outline-none shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_8px_25px_rgba(20,70,62,0.04)] backdrop-blur-xl transition placeholder:text-[#71807B] focus:border-[#006558]/30 focus:bg-white/50 focus:ring-4 focus:ring-[#006558]/5"
                        />
                      </div>

                      {/* ONLY SUBMIT BUTTON */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={submitRequest}
                          className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-[20px] bg-[#006558] px-5 py-4 text-sm font-bold text-white shadow-[0_12px_30px_rgba(0,101,88,0.25)] transition-all hover:-translate-y-0.5 hover:bg-[#007364] active:translate-y-0"
                        >
                          <span className="relative z-10">
                            ارسال درخواست
                          </span>

                          <BiLeftArrowAlt className="relative z-10 text-2xl transition-transform duration-300 group-hover:-translate-x-1" />

                          <span className="absolute inset-x-0 top-0 h-px bg-white/50" />
                        </button>
                      </div>

                      <p className="text-center text-[11px] leading-6 text-[#71807B]">
                        در مرحله بعد متن نهایی درخواست را بررسی می‌کنید و سپس
                        می‌توانید آن را در تلگرام ارسال کنید.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            {!showReview && (
              <div className="mt-5 hidden items-center justify-between lg:flex">
                <button
                  type="button"
                  onClick={previousStep}
                  disabled={currentStep === 0}
                  className="cursor-pointer rounded-2xl flex justify-center gap-2 border border-white/70 bg-white/25 px-5 py-3 text-sm font-semibold text-[#60706B] backdrop-blur-xl transition hover:bg-white/45 hover:text-[#006558] disabled:pointer-events-none disabled:opacity-0"
                >
                  <BiArrowBack className="text-lg rotate-180" /> مرحله قبل
                </button>

                {!step.isForm && (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-white/80 bg-white/55 px-6 py-3.5 text-sm font-bold text-[#006558] shadow-[0_10px_25px_rgba(20,70,62,0.08)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:bg-white/75"
                  >
                    ادامه

                    <span className="transition-transform duration-300 group-hover:-translate-x-1">
                      <BiLeftArrowAlt className="text-2xl" />
                    </span>
                  </button>
                )}

                {step.isForm && (
                  <span className="text-xs text-[#71807B]">
                    اطلاعات را کامل کنید و «ارسال درخواست» را بزنید.
                  </span>
                )}
              </div>
            )}

            {/* Review Desktop Navigation */}
            {showReview && (
              <div className="mt-5 hidden items-center justify-start lg:flex">
                <button
                  type="button"
                  onClick={backToForm}
                  className="cursor-pointer rounded-2xl border border-white/70 bg-white/25 px-5 py-3 text-sm font-semibold text-[#60706B] backdrop-blur-xl transition hover:bg-white/45 hover:text-[#006558]"
                >
                  → بازگشت و ویرایش
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* =========================================================
          MOBILE FIXED NAVIGATION
      ========================================================= */}

      {!showReview && (
        <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(12px+env(safe-area-inset-bottom))] lg:hidden">
          <div className="relative mx-auto flex max-w-lg items-center justify-between gap-3 overflow-hidden rounded-[24px] border border-white/80 bg-white/65 px-3 py-3 shadow-[0_-10px_40px_rgba(20,70,62,0.12),0_10px_40px_rgba(20,70,62,0.08)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/90" />

            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-white/50 blur-2xl" />

            <div className="pointer-events-none absolute -bottom-10 -left-10 h-20 w-20 rounded-full bg-[#006558]/10 blur-2xl" />

            {/* Previous */}
            <button
              type="button"
              onClick={previousStep}
              disabled={currentStep === 0}
              className="relative z-10 flex min-h-[48px] flex-1 items-center justify-center rounded-[17px] border border-white/80 bg-white/45 px-3 text-xs font-bold text-[#60706B] shadow-[0_5px_15px_rgba(20,70,62,0.05)] backdrop-blur-xl transition active:scale-[0.97] disabled:pointer-events-none disabled:opacity-30"
            >
              <span className="ml-2 text-base">→</span>
              مرحله قبل
            </button>

            {/* Step indicator */}
            <div className="relative z-10 flex min-w-[58px] flex-col items-center justify-center">
              <span className="text-[10px] font-medium text-[#71807B]">
                مرحله
              </span>

              <span className="mt-0.5 text-sm font-bold text-[#006558]">
                {currentStep + 1}
                <span className="mx-1 text-[#A1AAA7]">/</span>
                {steps.length}
              </span>
            </div>

            {/* Next */}
            {!step.isForm ? (
              <button
                type="button"
                onClick={nextStep}
                className="group relative z-10 flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-[17px] bg-[#006558] px-3 text-xs font-bold text-white shadow-[0_8px_20px_rgba(0,101,88,0.25)] transition active:scale-[0.97]"
              >
                ادامه

                <span className="text-base transition-transform group-active:-translate-x-1">
                  ←
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={submitRequest}
                className="relative z-10 flex min-h-[48px] flex-1 items-center justify-center rounded-[17px] bg-[#006558] px-3 text-xs font-bold text-white shadow-[0_8px_20px_rgba(0,101,88,0.25)] transition active:scale-[0.97]"
              >
                ارسال درخواست
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Review Bottom Navigation */}
      {showReview && (
        <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(12px+env(safe-area-inset-bottom))] lg:hidden">
          <div className="relative mx-auto flex max-w-lg items-center gap-3 overflow-hidden rounded-[24px] border border-white/80 bg-white/65 px-3 py-3 shadow-[0_-10px_40px_rgba(20,70,62,0.12),0_10px_40px_rgba(20,70,62,0.08)] backdrop-blur-2xl">
            <button
              type="button"
              onClick={backToForm}
              className="flex min-h-[50px] flex-1 items-center justify-center rounded-[17px] border border-white/80 bg-white/45 px-3 text-xs font-bold text-[#60706B] shadow-[0_5px_15px_rgba(20,70,62,0.05)] backdrop-blur-xl transition active:scale-[0.97]"
            >
              ویرایش اطلاعات
            </button>

            <button
              type="button"
              onClick={sendToTelegram}
              className="flex min-h-[50px] flex-1 items-center justify-center rounded-[17px] bg-[#006558] px-3 text-xs font-bold text-white shadow-[0_8px_20px_rgba(0,101,88,0.25)] transition active:scale-[0.97]"
            >
              ارسال در تلگرام
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

/* ===============================================================
   GLASS INPUT
================================================================ */

type GlassInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  dir?: "ltr" | "rtl";
  optional?: boolean;
};

function GlassInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  dir = "rtl",
  optional = false,
}: GlassInputProps) {
  return (
    <div>
      <label className="mb-2.5 flex items-center gap-2 text-sm font-bold text-[#354641]">
        {label}

        {optional && (
          <span className="text-[10px] font-medium text-[#788681]">
            اختیاری
          </span>
        )}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        dir={dir}
        className="w-full rounded-[20px] border border-white/80 bg-white/35 px-5 py-4 text-sm font-medium text-[#263632] outline-none shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_8px_25px_rgba(20,70,62,0.04)] backdrop-blur-xl transition placeholder:text-[#71807B] focus:border-[#006558]/30 focus:bg-white/50 focus:ring-4 focus:ring-[#006558]/5"
      />
    </div>
  );
}