import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import { RECIPE_LOAD_PAGE_RESET } from '../../../redux/actions/types';
import { loadPage } from '../../../redux/actions/recipeActions';
import RecipeItem from '../recipeItem/RecipeItem';
import Spinner from '../../layout/Spinner';

const Recipes = ({}) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const recipeLoadPage = useSelector((state) => state.recipeLoadPage);
  const { hasMore, recipes, loading, loadingPage } = recipeLoadPage;

  const recipeCreate = useSelector((state) => state.recipeCreate);
  const { success } = recipeCreate;

  useEffect(() => {
    loadRecipes();
  }, []);

  useEffect(() => {
    return () => {
      dispatch({ type: RECIPE_LOAD_PAGE_RESET });
    };
  }, []);

  const loadRecipes = () => {
    if (!loadingPage && !success) {
      dispatch(loadPage());
    }
  };

  const recipeItems = recipes.map((recipe) => {
    return <RecipeItem recipe={recipe} key={recipe.id} disabled={!userInfo} />;
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

export default Recipes;
