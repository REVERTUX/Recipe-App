import { fetchRecipe } from 'app/lib/data';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const recipe = await fetchRecipe(params.id);
  return null;
}
