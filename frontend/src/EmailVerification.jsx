import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, MailCheck, ShieldCheck } from 'lucide-react'

export default function EmailVerification() {
    const location = useLocation()
    const navigate = useNavigate()
    const email = new URLSearchParams(location.search).get('email')

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-10 sm:px-6">
            <div className="absolute inset-0 overflow-hidden bg-navy">
                <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full border-[34px] border-white/5" />
                <div className="absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-yelo/10 blur-sm" />
                <div className="absolute bottom-[-8rem] left-1/3 h-80 w-80 rounded-full border-[38px] border-yelo/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_35%)]" />
            </div>

            <div className="relative z-10 w-full max-w-xl">
                <section className="overflow-hidden rounded-[1.75rem] bg-white shadow-2xl shadow-black/20">
                    <div className="relative flex justify-center bg-gradient-to-br from-yelo to-amber-400 px-6 pb-12 pt-8">
                        <div className="absolute left-8 top-6 h-3 w-3 rounded-full bg-white/70" />
                        <div className="absolute right-12 top-10 h-2 w-2 rounded-full bg-white/60" />
                        <div className="absolute bottom-4 left-1/2 h-12 w-12 -translate-x-1/2 rounded-full border border-white/30" />
                        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-yelo shadow-xl ring-8 ring-white/20">
                            <MailCheck className="h-10 w-10" strokeWidth={1.8} />
                        </div>
                    </div>

                    <div className="-mt-6 rounded-t-[1.75rem] bg-white px-6 pb-7 pt-6 text-center sm:px-9 sm:pb-9">
                        <div className="mx-auto max-w-lg">
                            <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">Verify your email address</h1>
                            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
                                Your learning space is almost ready. Confirm your address using the secure link we sent.
                            </p>

                            <div className="mt-6 flex items-center gap-4 rounded-2xl border border-yelo/20 bg-gradient-to-r from-amber-50 to-orange-50 p-4 text-left">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-yelo shadow-sm ring-1 ring-yelo/10">
                                    <MailCheck className="h-5 w-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Verification email sent to</p>
                                    <p className="mt-1 truncate text-sm font-bold text-navy">{email || 'your email address'}</p>
                                </div>
                                <span className="ml-auto hidden shrink-0 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 ring-1 ring-yelo/20 sm:inline-flex">Check inbox</span>
                            </div>

                            <div className="mt-8 grid gap-3 text-left sm:grid-cols-3">
                                <div className="group rounded-2xl border border-gray-100 bg-slate-50/80 p-4 transition duration-200 hover:-translate-y-1 hover:border-yelo/30 hover:bg-white hover:shadow-lg hover:shadow-navy/5">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-yelo shadow-sm ring-1 ring-gray-100"><MailCheck className="h-4 w-4" /></div>
                                    <p className="mt-3 text-sm font-bold text-navy">Check your inbox</p>
                                    <p className="mt-1 text-xs leading-5 text-gray-500">Look for an email from AWCHEMISTRY.</p>
                                </div>
                                <div className="group rounded-2xl border border-gray-100 bg-slate-50/80 p-4 transition duration-200 hover:-translate-y-1 hover:border-yelo/30 hover:bg-white hover:shadow-lg hover:shadow-navy/5">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-yelo shadow-sm ring-1 ring-gray-100"><CheckCircle2 className="h-4 w-4" /></div>
                                    <p className="mt-3 text-sm font-bold text-navy">Click the link</p>
                                    <p className="mt-1 text-xs leading-5 text-gray-500">Use the button inside the email to verify.</p>
                                </div>
                                <div className="group rounded-2xl border border-gray-100 bg-slate-50/80 p-4 transition duration-200 hover:-translate-y-1 hover:border-yelo/30 hover:bg-white hover:shadow-lg hover:shadow-navy/5">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-yelo shadow-sm ring-1 ring-gray-100"><ShieldCheck className="h-4 w-4" /></div>
                                    <p className="mt-3 text-sm font-bold text-navy">Start learning</p>
                                    <p className="mt-1 text-xs leading-5 text-gray-500">Return here and sign in securely.</p>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                                <button
                                    type="button"
                                    onClick={() => navigate('/login')}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-navy/15 transition duration-200 hover:-translate-y-0.5 hover:bg-navy/90 hover:shadow-xl"
                                >
                                    Continue to login
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                                <Link
                                    to="/signup"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition duration-200 hover:-translate-y-0.5 hover:border-yelo hover:bg-amber-50/40 hover:text-navy"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to signup
                                </Link>
                            </div>

                            <div className="mx-auto mt-7 flex max-w-md items-start gap-2.5 rounded-xl bg-slate-50 px-4 py-3 text-left">
                                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                                <p className="text-xs leading-5 text-gray-500"><span className="font-semibold text-gray-600">No email yet?</span> Check your spam or promotions folder. It can take a few minutes to arrive.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}
