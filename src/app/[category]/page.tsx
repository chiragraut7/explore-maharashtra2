import CategoryPageClient from "./CategoryPageClient";

interface CategoryPageProps {
  params: { category: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params; // no await needed

  // Pass category prop to client component
  return <CategoryPageClient category={category} />;
}
