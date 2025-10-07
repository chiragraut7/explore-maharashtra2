import CategoryPageClient from "./CategoryPageClient";
interface CategoryPageProps {
  params: { category: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Await params as required by Next.js 15 dynamic API behavior
  const { category } = await params;

  // Pass category prop to client component
  return <CategoryPageClient category={category} />;
}
