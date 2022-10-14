export default function getIngredientMeasure(recipe) {
  const recipeArray = Object.entries(recipe);
  const measureArray = recipeArray.map((key) => {
    if (!key[0].includes('easure')) {
      return null;
    }
    return key[1];
  }).filter((measure) => measure !== null);
  const measureFillter = measureArray.filter((measure) => measure !== '');
  return measureFillter;
}
