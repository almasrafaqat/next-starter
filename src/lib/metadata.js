// Make sure this is a pure function with no imports that could cause circularity
export function generateMetadata({ title, description, noIndex = false }) {
  return {
    title: `${title} | Export Pocket`,
    description: description || 'Your export in your pocke',
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: `${title} | Export Pocket`,
      description: description || 'Your export in your pocke',
    },
  };
}