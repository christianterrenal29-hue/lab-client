import { Link } from 'react-router-dom';
import { ClipboardList, FileText, Package, QrCode, ShieldCheck, UserCog, Users, UserRound, Wrench } from 'lucide-react';
import Button from '../components/ui/Button';

const features = [
  { title: 'Inventory Management', icon: Package },
  { title: 'Borrowing Tracking', icon: ClipboardList },
  { title: 'QR Code Tracking', icon: QrCode },
  { title: 'Maintenance Monitoring', icon: Wrench },
  { title: 'Reports Generation', icon: FileText },
  { title: 'Activity Logs', icon: ShieldCheck },
];

const roles = [
  {
    title: 'Administrator',
    icon: UserCog,
    description: 'Manages users, inventory, reports, activity logs, and full laboratory workflows.',
  },
  {
    title: 'Staff',
    icon: Users,
    description: 'Tracks inventory, processes borrowing requests, monitors maintenance, and prepares reports.',
  },
  {
    title: 'Student',
    icon: UserRound,
    description: 'Views available equipment, submits borrow requests, and checks borrowing history.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-school-light text-school-dark">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-school-dark text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img src="/toplink-logo.jpg" alt="Top Link Global College logo" className="h-12 w-12 rounded-full border border-school-gold bg-white object-contain p-0.5" />
            <div>
              <p className="font-semibold text-white">Top Link Global College</p>
              <p className="text-xs text-primary-100">Laboratory Inventory and Tracking System</p>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section
          className="relative isolate overflow-hidden bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/toplink-building.jpg')" }}
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-school-light/95 via-school-light/88 to-white/72" />
          <div className="absolute inset-0 -z-10 bg-school-dark/10" />
          <div className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl content-center items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[minmax(0,1.05fr)_minmax(260px,0.95fr)] lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-4 inline-flex rounded-full bg-school-gold px-4 py-1 text-sm font-semibold text-school-dark">
                Top Link Global College
              </p>
              <h1 className="text-4xl font-bold tracking-normal text-school-dark sm:text-5xl lg:text-6xl">
                Laboratory Inventory and Tracking System
              </h1>
              <p className="mt-6 text-xl font-semibold text-primary-700">Top Link Global College</p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-gray-700 sm:text-lg">
                A school-based system for monitoring laboratory equipment, borrowing, maintenance, QR tracking, and reports.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/login">
                  <Button size="lg" className="w-full sm:w-auto">Login</Button>
                </Link>
                <a href="#features">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">View Features</Button>
                </a>
              </div>
            </div>
            <div className="relative mx-auto flex w-full max-w-[min(72vw,500px)] items-center justify-center md:justify-self-center">
              <div className="absolute h-[78%] w-[78%] rounded-full bg-school-gold/25 blur-3xl" />
              <img
                src="/toplink-logo.jpg"
                alt="Top Link Global College logo"
                className="relative aspect-square w-full max-w-[300px] rounded-full bg-white/95 object-contain p-3 opacity-95 shadow-2xl ring-2 ring-school-gold/60 sm:max-w-[360px] md:max-w-[420px] lg:max-w-[460px]"
                style={{
                  imageRendering: 'auto',
                  filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.4)) drop-shadow(0 18px 28px rgba(31, 63, 42, 0.28))',
                }}
              />
            </div>
          </div>
        </section>

        <section id="features" className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-school-dark">Features</h2>
              <p className="mt-3 text-gray-600">
                Built for daily laboratory operations, from equipment records to accountable borrowing workflows.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="rounded-lg border border-primary-100 bg-school-light p-5">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary-500 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-school-dark">{feature.title}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-school-dark">About the System</h2>
            <p className="mt-4 text-base leading-7 text-gray-700">
              This system helps school personnel keep laboratory equipment organized, track item locations, process
              student borrowing requests, monitor maintenance work, and prepare reports for accountable laboratory
              management.
            </p>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-school-dark">User Roles</h2>
              <p className="mt-3 text-gray-600">
                Role-based access keeps school laboratory workflows organized and appropriate for each user.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <div key={role.title} className="rounded-lg border border-primary-100 bg-school-light p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-school-teal text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-school-dark">{role.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-700">{role.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-primary-100 bg-school-dark py-6 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>Top Link Global College</span>
          <span>Laboratory Inventory and Tracking System</span>
        </div>
      </footer>
    </div>
  );
}
