export function tagRecipeDifficulty(recipe){
    if(recipe.needOven && recipe.needSpecificTools && recipe.isExotic){
        return "hard"
    }
    if(recipe.needOven || recipe.needSpecificTools || recipe.isExotic){
        return "medium"
    }
    return "easy"
}