"use client";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <main>
      <section className="panel">
        <h1>Dashboard unavailable</h1>
        <p>{error.message}</p>
      </section>
    </main>
  );
}
