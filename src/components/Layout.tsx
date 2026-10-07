import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileMenu } from './MobileMenu';

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // We need to attach the menu toggle to the header button
  // A simple way without context is to listen to a custom event
  useEffect(() => {
    // Let's modify Header slightly in another step to fire this, or just pass it via context.
    // Wait, simpler: I'll just change Header to use a custom event or context.
    // For now, let's just listen for clicks on elements with a specific class or id.
    const handleClick = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest('.mobile-menu-btn')) {
        setIsMobileMenuOpen(true);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
