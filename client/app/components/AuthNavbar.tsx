export default function AuthNavbar() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-lg font-semibold tracking-tight text-white">
          VaultX
        </div>

        <a
          href="/"
          className="text-sm text-zinc-400 hover:text-white transition"
        >
          Back to home
        </a>
      </div>
    </div>
  );
}
