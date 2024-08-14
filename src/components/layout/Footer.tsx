import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          © 2024 LemoBoards. All rights reserved.
        </p>
        <nav>
          <Link
            href="/about"
            className="text-sm text-gray-600 hover:text-gray-800 mr-4"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-gray-600 hover:text-gray-800 mr-4"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}
