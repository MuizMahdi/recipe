export interface Recipe
{
    name: string;
    description: string;
    imagesrc: string;
    upvotes: number;
    upvoted: boolean;
    ingredientsNames: string[];
    ingredientsAmounts: number[];
    comments: string[];
}