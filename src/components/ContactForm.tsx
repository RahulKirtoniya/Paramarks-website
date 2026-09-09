"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/types";
import { site } from "@/lib/site";
import { CheckIcon, ArrowIcon } from "./icons/Icons";

type Fields = "name" | "company" | "email" | "country" | "message";

export default function ContactForm({ dict }: { dict: Dictionary["contact"]["form"] }) {
  const [values, setValues] = useState<Record<Fields, string>>({
    name: "",
    company: "",
    email: "",
    country: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<Fields, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function update(field: Fields, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<Fields, string>> = {};
    if (!values.name.trim()) next.name = dict.required;
    if (!values.email.trim()) next.email = dict.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = dict.invalidEmail;
    if (!values.message.trim()) next.message = dict.required;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    // Front-end demo: open the visitor's mail client with a prefilled message.
    // Replace with a POST to your API / form service in production.
    const subject = encodeURIComponent(`Website inquiry — ${values.name}`);
    const body = encodeURIComponent(
      `Name: ${values.name}\nCompany: ${values.company}\nEmail: ${values.email}\nCountry: ${values.country}\n\n${values.message}`,
    );
    window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  const textFields: { name: Fields; label: string; type?: string; half?: boolean }[] = [
    { name: "name", label: dict.name, half: true },
    { name: "company", label: dict.company, half: true },
    { name: "email", label: dict.email, type: "email", half: true },
    { name: "country", label: dict.country, half: true },
  ];

  if (submitted) {
    return (
      <div className="flex items-start gap-4 rounded-2xl border border-gold-300 bg-gold-100/60 p-6">
        <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-gold-500 text-plum-950">
          <CheckIcon className="h-4 w-4" />
        </span>
        <p className="text-base text-plum-700">{dict.success}</p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="grid grid-cols-1 gap-5 sm:grid-cols-2"
    >
      {textFields.map((f) => (
        <div key={f.name} className={f.half ? "sm:col-span-1" : "sm:col-span-2"}>
          <Label htmlFor={f.name} required={f.name === "name" || f.name === "email"}>
            {f.label}
          </Label>
          <input
            id={f.name}
            name={f.name}
            type={f.type ?? "text"}
            value={values[f.name]}
            onChange={(e) => update(f.name, e.target.value)}
            aria-invalid={!!errors[f.name]}
            aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
            className={inputClass(!!errors[f.name])}
          />
          <FieldError id={`${f.name}-error`} message={errors[f.name]} />
        </div>
      ))}

      <div className="sm:col-span-2">
        <Label htmlFor="message" required>
          {dict.message}
        </Label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={inputClass(!!errors.message)}
        />
        <FieldError id="message-error" message={errors.message} />
      </div>

      <div className="sm:col-span-2">
        <button type="submit" className="btn-gold w-full sm:w-auto">
          {dict.submit}
          <ArrowIcon className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-sm font-medium text-plum-700"
    >
      {children}
      {required && <span className="ml-1 text-gold-600">*</span>}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-red-700">
      {message}
    </p>
  );
}

function inputClass(hasError: boolean): string {
  return [
    "w-full rounded-xl border bg-sand-50 px-4 py-3 text-base text-ink-700",
    "placeholder:text-ink-400 transition-colors",
    "focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30",
    hasError ? "border-red-400" : "border-plum-200",
  ].join(" ");
}
