import CategoryPageClient from "./CategoryPageClient";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params; // Access params directly
  return <CategoryPageClient category={category} />;
}
