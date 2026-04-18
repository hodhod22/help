import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiPaperAirplane } from 'react-icons/hi2'
import { useSubmitContactMutation } from '../features/api/contactApi'

const initial = { name: '', email: '',phone: '', company: '', message: '' }

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState(initial)
  const [submitContact, { isLoading, isSuccess, isError, error, reset }] =
    useSubmitContactMutation()

  const errMsg =
    error?.data?.error || (isError ? t('contact.errorGeneric') : '')

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await submitContact(form).unwrap()
      setForm(initial)
    } catch {
      /* RTK Query sets error */
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-slate-900">
            {t("contact.title")}
          </h1>
          <p className="mt-4 text-slate-600">{t("contact.intro")}</p>
          <p className="mt-4 text-sm text-slate-500">
            {t("contact.apiNote")}{" "}
            <code className="rounded bg-slate-200/80 px-1.5 py-0.5 text-xs text-slate-800">
              /api/contact
            </code>
            .
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          {isSuccess && (
            <p
              className="mb-4 rounded-lg bg-teal-50 px-4 py-3 text-sm text-teal-900"
              role="status"
            >
              {t("contact.success")}
            </p>
          )}
          {isError && errMsg && (
            <div
              className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-900"
              role="alert"
            >
              <span>{errMsg}</span>
              <button
                type="button"
                className="text-xs font-semibold underline"
                onClick={() => reset()}
              >
                {t("contact.dismiss")}
              </button>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-800"
              >
                {t("contact.name")}
              </label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 shadow-inner outline-none ring-teal-500/0 transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-800"
              >
                {t("contact.email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 shadow-inner outline-none ring-teal-500/0 transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
              />
            </div>
            <div>
              <label>{t("contact.phone")}</label>
              <input
                type="tel"
                value={form.phone}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 shadow-inner outline-none ring-teal-500/0 transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                required
                placeholder="t.ex. 0701234567"
              />
            </div>
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-slate-800"
              >
                {t("contact.company")}{" "}
                <span className="font-normal text-slate-500">
                  {t("contact.companyOptional")}
                </span>
              </label>
              <input
                id="company"
                name="company"
                autoComplete="organization"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 shadow-inner outline-none ring-teal-500/0 transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                value={form.company}
                onChange={(e) =>
                  setForm((f) => ({ ...f, company: e.target.value }))
                }
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-slate-800"
              >
                {t("contact.message")}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="mt-1 w-full resize-y rounded-lg border border-slate-200 px-3 py-2 text-slate-900 shadow-inner outline-none ring-teal-500/0 transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isLoading ? (
              t("contact.submitting")
            ) : (
              <>
                {t("contact.submit")}
                <HiPaperAirplane
                  className="h-5 w-5 rtl:-scale-x-100"
                  aria-hidden
                />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
