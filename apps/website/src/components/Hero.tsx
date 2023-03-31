import LogInButton from "./LogInButton";
export default function Hero() {
  return (
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold text-primary">Welcome to <span className="text-accent">SyllaScan</span></h1>
      <p className="text-xl font-medium py-6">A simple way to detect bias in Syllabi</p>
      <LogInButton/>
    </div>
  </div>
</div>
  );
}