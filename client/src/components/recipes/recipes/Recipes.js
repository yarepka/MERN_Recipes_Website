import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import RecipeItem from '../recipeItem/RecipeItem';
import Spinner from '../../layout/Spinner';
import { getRecipes } from '../../../redux/actions/recipe';

const Recipes = ({ getRecipes, recipe: { recipes, loading } }) => {
  console.log('[Recipes]: rendering');

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  const recipeItems = recipes.map(recipe => {
    return (
      <RecipeItem recipe={recipe} key={recipe.id} />
    );
  });

  return (
    <Fragment>
      <h1 className="text-large text-success text-center my-2">All Recipes</h1>

      <p className="lead text-center">
        Share your recipes with the World!
      </p>

      <div className="line-small"></div>

      {loading ? <Spinner /> : (
        <div className="recipes">
          {recipeItems}
        </div>
      )}
    </Fragment>
  );
}

const mapStateToProps = state => ({
  recipe: state.recipe
});

export default connect(mapStateToProps, { getRecipes })(Recipes);