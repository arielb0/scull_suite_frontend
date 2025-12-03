export interface RecipeModel {
  id?: number,
  user?: number,
  image: string,
  title: string,
  ingredients: string,
  tools: string,
  description: string,
  private: boolean
}
