// app/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white mt-12 py-4">
      <div className="container px-4 text-center text-sm">
        <p  className=" mx-5 ">&nbsp; weatherapi.com تم جلب البيانات من موقع </p>
        <p>© {new Date().getFullYear()}  .تم التطوير من قبل محمد الكاف  & حسن الحداد سكاي كاست</p>
      </div>
    </footer>
  );
}