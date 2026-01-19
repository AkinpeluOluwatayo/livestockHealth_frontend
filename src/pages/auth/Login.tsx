import React, { useState } from 'react';
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader2, ShieldCheck, Github, Linkedin, Chrome } from 'lucide-react';

const Login = () => {
    const { isLoaded, signIn, setActive } = useSignIn();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const signInWithSocial = async (strategy: string) => {
        if (!isLoaded) return;
        setError('');

        try {
            await signIn.authenticateWithRedirect({
                strategy: strategy as any,
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/dashboard",
            });
        } catch (err: any) {
            console.error('OAuth error:', err);
            setError(err?.errors?.[0]?.longMessage || 'Failed to authenticate. Please try again.');
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;
        setIsLoading(true);
        setError('');

        try {
            const result = await signIn.create({
                identifier: email,
                password,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                navigate("/dashboard");
            }
        } catch (err: any) {
            setError(err.errors[0].longMessage || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden px-4">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />

            <div className="w-full max-w-md z-10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/10 rounded-2xl mb-4 border border-emerald-500/20 shadow-inner">
                        <ShieldCheck className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">AniHealth</h1>
                    <p className="text-slate-400 mt-2 font-light">Secure Livestock Management</p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl">

                    {/* Updated Social Grid: LinkedIn, GitHub, Google */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <button
                            onClick={() => signInWithSocial('oauth_linkedin_oidc')}
                            className="flex items-center justify-center py-3 bg-slate-950/50 border border-slate-700 rounded-2xl hover:bg-slate-800 transition-all text-slate-300 hover:text-white"
                            title="Login with LinkedIn"
                        >
                            <Linkedin className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => signInWithSocial('oauth_github')}
                            className="flex items-center justify-center py-3 bg-slate-950/50 border border-slate-700 rounded-2xl hover:bg-slate-800 transition-all text-slate-300 hover:text-white"
                            title="Login with GitHub"
                        >
                            <Github className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => signInWithSocial('oauth_google')}
                            className="flex items-center justify-center py-3 bg-slate-950/50 border border-slate-700 rounded-2xl hover:bg-slate-800 transition-all text-slate-300 hover:text-white"
                            title="Login with Google"
                        >
                            <Chrome className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#111927] px-2 text-slate-500 tracking-widest">Or continue with</span></div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm text-center">{error}</div>}

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                                <input
                                    type="email"
                                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-950/50 border border-slate-700 rounded-2xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                    placeholder="name@farm.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                                <input
                                    type="password"
                                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-950/50 border border-slate-700 rounded-2xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 rounded-2xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;