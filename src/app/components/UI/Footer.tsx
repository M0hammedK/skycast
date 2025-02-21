// app/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white mt-12 py-4">
      <div className="container mx-auto px-4 text-center text-sm">
        <p>© {new Date().getFullYear()} SkyCast. Created by Mohammed Alkaf & Hasan Alhddad</p>
        <p className="mt-1">&nbsp; Weather data provided by weatherapi.com</p>
      </div>
    </footer>
  );
}