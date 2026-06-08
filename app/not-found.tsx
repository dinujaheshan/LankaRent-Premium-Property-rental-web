export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4 page-enter">
      <div>
        <div className="font-outfit font-black text-8xl text-gold-500/20 mb-4">404</div>
        <h1 className="section-title text-3xl mb-4">Page Not Found</h1>
        <p className="text-theme-secondary font-inter mb-8">The page you are looking for does not exist or has been moved.</p>
        <a href="/" className="btn-gold text-sm">
          <i className="uil uil-home-alt" />
          Back to Home
        </a>
      </div>
    </div>
  );
}
