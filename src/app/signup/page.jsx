"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";

const MAX_IMAGE_MB = 5;

const highlights = [
  { title: "Live availability", text: "See open hours for every facility before you book." },
  { title: "Book in under a minute", text: "Pick a slot, confirm, and you are set." },
  { title: "Everything in one place", text: "Track and manage all your bookings from your account." },
];

const inputClass =
  "w-full h-11 pl-10 pr-4 rounded-xl border text-sm outline-none transition-colors " +
  "focus:border-[var(--k-brand)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--k-brand)_25%,transparent)]";

const fieldStyle = {
  background: "var(--k-surface)",
  borderColor: "var(--k-border)",
  color: "var(--k-text)",
};

async function uploadToImgbb(file) {
  const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!key) throw new Error("Missing NEXT_PUBLIC_IMGBB_API_KEY in .env.local");

  const body = new FormData();
  body.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body });
  const json = await res.json();
  if (!res.ok || !json?.success) throw new Error(json?.error?.message || "Image upload failed");
  return json.data.url;
}

const Field = ({ label, htmlFor, icon: Icon, error, children }) => (
  <div>
    <label htmlFor={htmlFor} className="block text-sm font-semibold mb-1.5" style={{ color: "var(--k-text)" }}>
      {label}
    </label>
    <div className="relative">
      <Icon
        aria-hidden="true"
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg pointer-events-none"
        style={{ color: "var(--k-muted)" }}
      />
      {children}
    </div>
    {error && (
      <p role="alert" className="mt-1.5 text-xs font-medium" style={{ color: "var(--k-brand)" }}>
        {error}
      </p>
    )}
  </div>
);

const SignUpPage = () => {
  const router = useRouter();

  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // avatar (hosted on imgbb)
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const pw = values.password;
  const rules = [
    { label: "8+ characters", ok: pw.length >= 8 },
    { label: "1 uppercase letter", ok: /[A-Z]/.test(pw) },
    { label: "1 number", ok: /\d/.test(pw) },
  ];

  const handleAvatar = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((er) => ({ ...er, image: "Please choose an image file." }));
      return;
    }
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      setErrors((er) => ({ ...er, image: `Image must be smaller than ${MAX_IMAGE_MB} MB.` }));
      return;
    }

    setErrors((er) => ({ ...er, image: undefined }));
    setAvatarPreview(URL.createObjectURL(file));
    setAvatarUrl("");
    setUploading(true);
    try {
      setAvatarUrl(await uploadToImgbb(file));
    } catch (err) {
      setAvatarPreview("");
      setErrors((er) => ({ ...er, image: err.message }));
    } finally {
      setUploading(false);
    }
  };

  const removeAvatar = () => {
    setAvatarPreview("");
    setAvatarUrl("");
  };

  const validate = () => {
    const er = {};
    if (values.name.trim().length < 2) er.name = "Enter your full name.";
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) er.email = "Enter a valid email address.";
    if (!rules.every((r) => r.ok)) er.password = "Password does not meet all the requirements.";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (uploading) return toast.info("Wait for your photo to finish uploading.");
    if (!validate()) return;

    setIsLoading(true);
    try {
      const { data, error } = await authClient.signUp.email({
        name: values.name.trim(),
        email: values.email.trim().toLowerCase(),
        password: values.password,
        image: avatarUrl || undefined,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Sign up failed. Try again.");
        return;
      }
      if (data) {
        toast.success("Account created. Welcome to Khalahobe!");
        router.push("/");
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    } catch {
      toast.error("Google sign up is unavailable right now.");
    }
  };

  const initials = values.name.trim().split(" ").filter(Boolean).slice(0, 2).map((n) => n[0]).join("").toUpperCase();

  return (
    <main
      className="min-h-screen w-full flex items-center justify-center p-4 md:p-8"
      style={{ background: "var(--k-bg)" }}
    >
      <div
        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-2xl border"
        style={{ background: "var(--k-surface)", borderColor: "var(--k-border)" }}
      >
        {/* ---------- Left: brand panel ---------- */}
        <aside className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-12 text-white overflow-hidden bg-[#0f0f12]">
          <div
            aria-hidden="true"
            className="absolute -top-28 -left-24 w-96 h-96 rounded-full blur-3xl opacity-40"
            style={{ background: "var(--k-gradient)" }}
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-32 -right-24 w-96 h-96 rounded-full blur-3xl opacity-25"
            style={{ background: "var(--k-gradient)" }}
          />

          <Link href="/" className="relative z-10 flex items-center gap-3 w-fit" aria-label="Khalahobe home">
            <span
              className="relative w-10 h-10 rounded-xl overflow-hidden p-1.5 shadow-lg"
              style={{ background: "var(--k-gradient)" }}
            >
              <Image src="/khela-hobe.png" alt="" width={40} height={40} className="w-full h-full object-contain" />
            </span>
            <span className="text-xl font-extrabold tracking-tight">Khalahobe</span>
          </Link>

          <div className="relative z-10 my-12">
            <h2 className="text-4xl font-black leading-[1.1] tracking-tight">
              Your next game starts with a{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--k-gradient)" }}>
                free account.
              </span>
            </h2>

            <ul className="mt-10 space-y-6">
              {highlights.map((h) => (
                <li key={h.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-1 w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: "var(--k-amber)" }}
                  />
                  <div>
                    <p className="font-bold">{h.title}</p>
                    <p className="text-sm text-white/65 mt-0.5 max-w-xs">{h.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="relative z-10 text-xs text-white/50">Football, cricket, badminton and more, all bookable online.</p>
        </aside>

        {/* ---------- Right: form ---------- */}
        <section className="lg:col-span-7 p-6 sm:p-10 md:p-14">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <span
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black"
              style={{ background: "var(--k-gradient)" }}
              aria-hidden="true"
            >
              K
            </span>
            <span className="text-lg font-extrabold" style={{ color: "var(--k-text)" }}>
              Khalahobe
            </span>
          </div>

          <h1 className="text-3xl font-black tracking-tight" style={{ color: "var(--k-text)" }}>
            Create your account
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--k-muted)" }}>
            It takes less than a minute. No payment needed to sign up.
          </p>

          <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
            {/* Avatar upload */}
            <div className="flex items-center gap-4">
              <div
                className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 flex items-center justify-center text-white font-black text-xl"
                style={{ background: "var(--k-gradient)" }}
              >
                {avatarPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarPreview} alt="Your profile preview" className="w-full h-full object-cover" />
                ) : (
                  initials || <HiOutlineUser aria-hidden="true" />
                )}
                {uploading && (
                  <span className="absolute inset-0 bg-black/55 flex items-center justify-center text-[11px] font-semibold">
                    Uploading
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold" style={{ color: "var(--k-text)" }}>
                  Profile photo <span style={{ color: "var(--k-muted)" }} className="font-normal">(optional)</span>
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <label
                    htmlFor="avatar"
                    className="cursor-pointer px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-colors hover:bg-[var(--k-surface-2)] focus-within:ring-2"
                    style={{ borderColor: "var(--k-border)", color: "var(--k-text)" }}
                  >
                    {avatarPreview ? "Change photo" : "Upload photo"}
                  </label>
                  <input id="avatar" type="file" accept="image/*" onChange={handleAvatar} className="sr-only" />
                  {avatarPreview && !uploading && (
                    <button
                      type="button"
                      onClick={removeAvatar}
                      className="text-xs font-semibold underline underline-offset-2"
                      style={{ color: "var(--k-brand)" }}
                    >
                      Remove
                    </button>
                  )}
                </div>
                {errors.image ? (
                  <p role="alert" className="mt-1.5 text-xs font-medium" style={{ color: "var(--k-brand)" }}>
                    {errors.image}
                  </p>
                ) : (
                  <p className="mt-1.5 text-xs" style={{ color: "var(--k-muted)" }}>
                    JPG, PNG or WebP, up to {MAX_IMAGE_MB} MB.
                  </p>
                )}
              </div>
            </div>

            <Field label="Full name" htmlFor="name" icon={HiOutlineUser} error={errors.name}>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={onChange}
                placeholder="Rahim Ahmed"
                className={inputClass}
                style={fieldStyle}
              />
            </Field>

            <Field label="Email" htmlFor="email" icon={HiOutlineMail} error={errors.email}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={onChange}
                placeholder="you@example.com"
                className={inputClass}
                style={fieldStyle}
              />
            </Field>

            <div>
              <Field label="Password" htmlFor="password" icon={HiOutlineLockClosed} error={errors.password}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={values.password}
                  onChange={onChange}
                  placeholder="Create a password"
                  className={`${inputClass} pr-11`}
                  style={fieldStyle}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md"
                  style={{ color: "var(--k-muted)" }}
                >
                  {showPassword ? <HiOutlineEyeOff className="text-lg" /> : <HiOutlineEye className="text-lg" />}
                </button>
              </Field>

              <ul className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1" aria-label="Password requirements">
                {rules.map((r) => (
                  <li
                    key={r.label}
                    className="text-xs font-medium flex items-center gap-1.5"
                    style={{ color: r.ok ? "var(--k-text)" : "var(--k-muted)" }}
                  >
                    <span
                      aria-hidden="true"
                      className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] text-white"
                      style={{ background: r.ok ? "#16a34a" : "var(--k-border)" }}
                    >
                      {r.ok ? "✓" : ""}
                    </span>
                    {r.label}
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="submit"
              disabled={isLoading || uploading}
              className="w-full h-12 rounded-xl text-sm font-bold text-white shadow-lg transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: "var(--k-gradient)" }}
            >
              {isLoading ? "Creating account…" : uploading ? "Uploading photo…" : "Create account"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t" style={{ borderColor: "var(--k-border)" }} />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 text-xs" style={{ background: "var(--k-surface)", color: "var(--k-muted)" }}>
                or continue with
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            className="w-full h-12 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2.5 transition-colors hover:bg-[var(--k-surface-2)]"
            style={{ borderColor: "var(--k-border)", color: "var(--k-text)", background: "var(--k-surface)" }}
          >
            <FcGoogle className="text-xl" />
            Sign up with Google
          </button>

          <p className="mt-7 text-center text-sm" style={{ color: "var(--k-muted)" }}>
            Already have an account?{" "}
            <Link href="/login" className="font-bold hover:underline underline-offset-4" style={{ color: "var(--k-brand)" }}>
              Sign in
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default SignUpPage;