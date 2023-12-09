import Image from 'next/image';
import Link from 'next/link';

import { Recipe } from 'models/recipe';
import FavoriteButton from './FavoriteButton';
import ShortInfo from './ShortInfo';

interface RecipeCardProps {
  recipe: Recipe;
}

function RecipeCard({
  recipe: {
    cookingTime,
    description,
    favorite,
    id,
    rating,
    servings,
    title,
    imageId,
  },
}: RecipeCardProps) {
  return (
    <Link
      href={`/recipes/${id}`}
      key={id}
      className="bg-white-500 flex w-full max-w-3xl cursor-pointer flex-col justify-center rounded-md text-gray-700 shadow-xl transition-shadow hover:shadow-2xl"
    >
      {imageId && (
        <div className="relative h-96 w-full">
          <Image
            src={`http://127.0.0.1:3000/files/${imageId}`}
            alt={title}
            className="rounded-t-md"
            fill
          />
        </div>
      )}
      <div className="p-3">
        <FavoriteButton favorite={favorite} recipeId={id} />
        <h1 className="text-2xl font-medium">{title}</h1>
        <p className="mb-1 text-base">{description}</p>
        <ShortInfo
          cookingTime={cookingTime}
          rating={rating}
          servings={servings}
        />
      </div>
    </Link>
  );
}

export default RecipeCard;
