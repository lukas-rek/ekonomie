"use client";
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

export default function SidebarWrapper() {
  const pathname = usePathname();
  
  // Pokud jsme na domovské stránce, Sidebar nevracíme
  if (pathname === '/') return null;

  // Také ho můžeme skrýt na stránkách jako "O mně", pokud chceš
  if (pathname === '/o-autorovi') return null;
  if (pathname === '/materialy') return null;

  return <Sidebar />;
}