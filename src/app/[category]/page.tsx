import CategoryPageClient from "./CategoryPageClient";

// Next.js passes `params` automatically to dynamic routes
export default function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;

  return <CategoryPageClient category={category} />;
}
