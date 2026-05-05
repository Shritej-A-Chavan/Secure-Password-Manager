import LoginForm from '../../components/LoginForm'

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col  bg-zinc-950">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 relative">
        {/* Background Glow */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-125 h-125 bg-purple-600/20 blur-[120px] rounded-full" />
        </div>

        <LoginForm />
      </div>
    </div>
  )
}