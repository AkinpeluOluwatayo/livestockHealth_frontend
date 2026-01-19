import { UserButton, useUser } from "@clerk/clerk-react";
import { LayoutDashboard, Activity, Bell, Settings } from 'lucide-react';

const Dashboard = () => {
    const { user } = useUser();

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 flex">
            <aside className="w-64 bg-slate-900/50 border-r border-slate-800 p-6 hidden md:flex flex-col">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                        <Activity className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">AniHealth</span>
                </div>
                <nav className="space-y-2 flex-1">
                    <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active />
                    <NavItem icon={<Activity size={20} />} label="Live Health" />
                    <NavItem icon={<Bell size={20} />} label="Alerts" />
                    <NavItem icon={<Settings size={20} />} label="Settings" />
                </nav>
            </aside>

            <main className="flex-1 flex flex-col">
                <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/30 backdrop-blur-md">
                    <h2 className="font-semibold text-lg text-white">Dashboard Overview</h2>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-400 hidden sm:inline">Welcome, {user?.firstName ?? 'Farmer'}</span>
                        <UserButton afterSignOutUrl="/login" />
                    </div>
                </header>

                <section className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <StatCard title="Total Animals" value="128" change="+4% from last month" />
                        <StatCard title="Active Alerts" value="3" change="Critical status" urgent />
                        <StatCard title="System Health" value="99.9%" change="Sensors online" />
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 h-64 flex items-center justify-center">
                        <p className="text-slate-500 italic font-light">Animal metrics visualization coming soon...</p>
                    </div>
                </section>
            </main>
        </div>
    );
};

const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}>
        {icon}
        <span className="font-medium">{label}</span>
    </button>
);

const StatCard = ({ title, value, change, urgent = false }: { title: string, value: string, change: string, urgent?: boolean }) => (
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl hover:border-slate-700 transition-colors">
        <h3 className="text-slate-500 text-sm font-medium mb-2 uppercase tracking-wider">{title}</h3>
        <p className="text-3xl font-bold text-white mb-1">{value}</p>
        <p className={`text-xs ${urgent ? 'text-red-400 font-bold' : 'text-emerald-500'}`}>{change}</p>
    </div>
);

export default Dashboard;