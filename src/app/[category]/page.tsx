import CategoryPageClient from "./CategoryPageClient";

interface CategoryPageProps {
  params: { category: string };
}

// Server component just passes params to client component
export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;

  return <CategoryPageClient category={category} />;
}
