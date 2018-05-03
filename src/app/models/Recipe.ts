export interface Recipe
{
    RID: string;
    name: string;
    makerName: string;
    description: string;
    imagesrc: string;
    upvotes: number;
    upvoted: boolean;
    recipeIngredients: any[];
    comments: string[];
    upvoters: string[];
}