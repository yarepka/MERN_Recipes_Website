import React, { Fragment } from 'react';

import RecipeItem from '../recipeItem/RecipeItem';

import FoodOneImage from '../../../img/food/food_1.jpeg';
import FoodTwoImage from '../../../img/food/food_2.jpeg';
import FoodThreeImage from '../../../img/food/food_3.jpeg';
import FoodFourImage from '../../../img/food/food_4.jpeg';
import FoodFiveImage from '../../../img/food/food_5.jpeg';
import FoodSixImage from '../../../img/food/food_6.jpeg';
import FoodSevenImage from '../../../img/food/food_7.jpeg';

const Recipes = () => {
  console.log('[Recipes]: rendering');

  const recipe = {
    id: '123',
    title: 'Title',
    description: 'Description',
    user: {
      id: 'user',
      name: 'John'
    },
    likes: 24,
    dislikes: 3
  };

  return (
    <Fragment>
      <h1 className="text-large text-success text-center my-2">All Recipes</h1>

      <p className="lead text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea consequatur aperiam nam eaque illo ducimus ab ut
        excepturi ullam voluptates.
      </p>

      <div className="line-small"></div>

      <div className="recipes">
        <RecipeItem recipe={recipe} image={FoodOneImage} />
        <RecipeItem recipe={recipe} image={FoodTwoImage} />
        <RecipeItem recipe={recipe} image={FoodThreeImage} />
        <RecipeItem recipe={recipe} image={FoodFourImage} />
        <RecipeItem recipe={recipe} image={FoodFiveImage} />
        <RecipeItem recipe={recipe} image={FoodSixImage} />
        <RecipeItem recipe={recipe} image={FoodSevenImage} />
      </div>

    </Fragment>
  );
}

export default Recipes;