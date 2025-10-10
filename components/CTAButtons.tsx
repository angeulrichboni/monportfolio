import Link from "next/link";

export function CTAButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      <Link href="/cv.pdf" className="btn btn-primary" prefetch={false}>
        Télécharger CV
      </Link>
      <Link
        href="https://github.com/angeulrichboni"
        className="btn btn-outline"
        target="_blank"
        rel="noreferrer"
        prefetch={false}
      >
        GitHub
      </Link>
      <Link
        href="https://www.linkedin.com/in/acobe-ange-ulrich-boni/"
        className="btn btn-outline"
        target="_blank"
        rel="noreferrer"
        prefetch={false}
      >
        LinkedIn
      </Link>
    </div>
  );
}
