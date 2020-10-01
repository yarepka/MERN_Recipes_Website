import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import RecipeItem from '../recipeItem/RecipeItem';
import Spinner from '../../layout/Spinner';
import { loadPage } from '../../../redux/actions/recipe';
import { removeAllAlerts } from '../../../redux/actions/alert';

const Recipes = ({
  loadPage,
  removeAllAlerts,
  recipe: { recipes, loading, hasMore, date, page },
}) => {
  console.log('[Recipes]: rendering');

  const loadRecipes = () => {
    loadPage(++page, date !== null ? date : new Date().getTime());
  };

  useEffect(() => {
    removeAllAlerts();
    loadRecipes();
  }, []);

  const recipeItems = recipes.map((recipe) => {
    return <RecipeItem recipe={recipe} key={recipe.id} />;
  });

  return (
    <Fragment>
      <h1 className='text-large text-success text-center my-2'>All Recipes</h1>

      <p className='lead text-center'>Share your recipes with the World!</p>

      <div className='line-small'></div>

      {loading ? (
        <Spinner />
      ) : (
        <div className='recipes'>
          <InfiniteScroll hasMore={hasMore} loadMore={loadRecipes}>
            {recipeItems}
          </InfiniteScroll>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  recipe: state.recipe,
});

export default connect(mapStateToProps, { loadPage, removeAllAlerts })(Recipes);
