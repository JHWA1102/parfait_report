export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-[#f9f9f9]">
      <div className="mx-auto max-w-7xl px-4 py-4 text-center text-sm text-slate-500">
        <p>
          Contact :
          <a
            href="mailto:parfaitreport1234@gmail.com"
            className="ml-1 text-blue-600 hover:underline"
          >
            parfaitreport1234@gmail.com
          </a>
        </p>
        <p className="mt-1">
          © {new Date().getFullYear()} Parfait. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
