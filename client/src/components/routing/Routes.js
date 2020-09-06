import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../auth/login/Login';
import Register from '../auth/register/Register';
import RecipeForm from '../recipes/recipeForm/RecipeForm';
import Recipes from '../recipes/recipes/Recipes';
import Recipe from '../recipe/Recipe';

const Routes = () => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/create-recipe" component={RecipeForm} />
        <Route exact path="/recipes" component={Recipes} />
        <Route exact path="/recipe" component={Recipe} />
      </Switch>
    </section>
  )
}

export default Routes;