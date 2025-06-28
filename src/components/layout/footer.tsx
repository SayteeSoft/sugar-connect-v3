import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full border-t bg-card">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row md:px-6">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} SugarConnect. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-sm hover:underline underline-offset-4">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
