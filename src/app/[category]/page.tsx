import CategoryPageClient from "./CategoryPageClient";

interface CategoryPageProps {
  params: { category: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;

  return <CategoryPageClient category={category} />;
}
