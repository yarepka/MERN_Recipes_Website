import React, { Fragment } from 'react';

import './Recipe.css';
import FirstFoodImage from '../../img/food/food_1.jpeg'
import SecondFoodImage from '../../img/food/food_2.jpeg'
import ThirdFoodImage from '../../img/food/food_3.jpeg'

const Recipe = () => {
  return <Fragment>
    <div className="single-recipe">
      <h1 className="text-center my-2">Baked Chicken and Rice Chimichangas</h1>

      <div className="single-recipe-content">
        <div className="time-info">
          <p className="hide-on-pad"><i className="fas fa-stopwatch"></i><span><strong>Prep: </strong> 10 mins</span></p>
          <p className="hide-on-pad"><i className="far fa-clock"></i><span><strong>Cook: </strong> 30 mins</span></p>
          <p className="hide-on-mobile"><i className="fas fa-smile"></i><span><strong>Servings: </strong> 4</span></p>
          <p className="show-on-pad"><i className="far fa-clock"></i><span><strong>Cook: </strong> 30 mins</span></p>
        </div>

        <div className="single-recipe-rating">
          <a href="like">
            <i className="fas fa-thumbs-up"></i><span className="single-comment-likes">25</span>
          </a>

          <a href="dislike">
            <i className="fas fa-thumbs-down"></i><span className="single-comment-likes">3</span>
          </a>

        </div>

        <div className="line-small"></div>

        <img src={FirstFoodImage} alt="recipe-image" />

        <div className="chonk single-recipe-author">
          <span className="author-top">
            author
          </span>
          <a className="single-recipe-author-link" href="./profile.html"> John Doe </a>
        </div>

        <div className="single-recipe-description">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, magni aliquid nobis, fuga numquam
          laudantium
          quisquam deserunt delectus laboriosam officiis, reprehenderit sunt! Ducimus explicabo non reprehenderit vero
          id suscipit nisi dicta praesentium voluptatum quae quibusdam quo recusandae, eligendi eaque, dolore earum,
          optio repudiandae sunt. Doloribus maiores, at accusantium maxime, recusandae cum esse vero molestias
          consequuntur et tenetur sint, adipisci magnam ipsam dicta dolorum est? Iure nostrum nam architecto molestiae
          maiores sapiente vero fuga. Laboriosam eaque et a accusantium quas dolores asperiores sint eius animi
          eveniet,
          blanditiis iste totam commodi iure possimus quam, modi voluptas ad necessitatibus quia nesciunt aut ea?
          Voluptas maiores mollitia, architecto culpa nostrum nam quos debitis sapiente rem ad, expedita eveniet
          dolores
          rerum unde quisquam veritatis eligendi at delectus ipsum, tempora perferendis error dolor natus aut?
          Voluptatum odio aspernatur nemo, deserunt error est asperiores repellendus eveniet? Officia consequatur
          quibusdam magni ut impedit doloremque consequuntur quasi voluptatum. Numquam magnam delectus totam corporis
          reiciendis corrupti vero et similique laborum porro earum voluptates nam provident alias sit, iure enim
          nostrum vitae in eveniet. In tempore ea dolores dolor, aliquid provident similique dignissimos odio porro
          aut
          numquam, illo quasi, temporibus possimus. Debitis eveniet non maiores magni numquam modi aperiam similique
          voluptas itaque, tenetur facere, eaque dolores nemo sequi id voluptatem. Adipisci, nemo? Unde assumenda
          reiciendis minus modi eligendi ex, libero praesentium aliquid quam eaque recusandae eos exercitationem rem
          nemo eveniet delectus ad nihil culpa maiores veritatis. Repellendus incidunt facere repudiandae adipisci
          vero
          maiores architecto velit, autem quae, dolores omnis cum ab? Libero suscipit architecto impedit aliquam quas
          esse vitae minus tempora iure aliquid harum nobis laborum molestiae, explicabo fuga nostrum, voluptatum
          earum
          sint nulla quis nemo quasi, rem vel quia. Nesciunt repellendus delectus amet quod fugiat ad eius nobis quae,
            ex, obcaecati debitis esse. Id neque quae cum esse iusto similique!</p>
        </div>

        <ul className="chonk ingredients-list">
          <span>Ingredients</span>
          <li>
            <p>1 ½ cups cooked shredded chicken</p>
          </li>
          <li>
            <p>⅔ cup salsa</p>
          </li>
          <li>
            <p>1 ½ teaspoons ground cumin</p>
          </li>
          <li>
            <p>1 teaspoon dried oregano</p>
          </li>
          <li>
            <p>1 tablespoon canola oil</p>
          </li>
          <li>
            <p>4 (10 inch) burrito-size flour tortillas</p>
          </li>
        </ul>

        <ul className="chonk directions-list">
          <span>Directions</span>
          <li>
            <strong>1.</strong>
            <span>Preheat oven to 425 degrees F (220 degrees C). Line a baking sheet with parchment paper.</span>
          </li>

          <li>
            <strong>2.</strong>
            <span>Combine the cooked shredded chicken with salsa, cumin, and oregano in a large bowl.</span>
          </li>

          <li>
            <strong>3.</strong>
            <span>Prepare Knorr® Fiesta Sides™ - Mexican Rice according to package directions. Remove from the
              heat.</span>
          </li>

          <li>
            <strong>4.</strong>
            <span>Stir rice and shredded cheese into the chicken mixture. Divide the mixture among flour tortillas; wrap
            and
              place seam-side down on a lined baking sheet. Brush with oil.</span>
          </li>

          <li>
            <strong>5.</strong>
            <span>Bake in preheated oven until golden brown and crispy, about 20 minutes. Serve, if desired, with your
              favorite toppings.</span>
          </li>
        </ul>
      </div>
    </div>

    {/* Comments */}
    <div className="comments">
      <div className="comment">
        <div className="comment-top">
          <div className="comment-author">
            <div className="comment-author-image" style={{ backgroundImage: "url(" + FirstFoodImage + ")" }}></div>

            <div className="name-and-date">
              <span className="comment-author-name">John Doe</span>
              <span className="comment-date">29.07.2020</span>
            </div>

          </div>
        </div>
        <div className="comment-content">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus, eos corporis perspiciatis dolore
            facilis mollitia architecto ipsa ipsam nemo corrupti?</p>
        </div>
      </div>


      <div className="comment">
        <div className="comment-top">
          <div className="comment-author">
            <div className="comment-author-image" style={{ backgroundImage: "url(" + SecondFoodImage + ")" }}></div>

            <div className="name-and-date">
              <span className="comment-author-name">John Doe</span>
              <span className="comment-date">14.06.2020</span>
            </div>

          </div>
        </div>
        <div className="comment-content">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae praesentium dolores natus sapiente
          obcaecati itaque, deleniti hic voluptates odit suscipit consectetur dolore similique harum recusandae enim
          deserunt quos accusantium neque, et architecto porro eum dolor ipsam! Blanditiis eligendi maiores porro quo
          eius eaque eveniet! Necessitatibus cupiditate, temporibus aspernatur debitis deserunt iste adipisci ducimus
            sit animi, ab quo cumque alias expedita.</p>
        </div>
      </div>


      <div className="comment">
        <div className="comment-top">
          <div className="comment-author">
            <div className="comment-author-image" style={{ backgroundImage: "url(" + ThirdFoodImage + ")" }}></div>

            <div className="name-and-date">
              <span className="comment-author-name">John Doe</span>
              <span className="comment-date">05.05.2020</span>
            </div>

          </div>
        </div>
        <div className="comment-content">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum tenetur magni culpa eaque enim neque
          recusandae facilis nisi praesentium commodi consequuntur fuga, hic impedit illo architecto eos corporis
          doloribus est quibusdam aut animi iste debitis ut cupiditate? Incidunt tempora dolore illum, quis quia
          corporis adipisci magnam ipsam sunt? Voluptatem, repellat, quisquam itaque dolore animi repellendus
          necessitatibus commodi, dolorem mollitia rerum ipsum omnis doloribus. Ratione, placeat omnis exercitationem
          quis aspernatur quisquam ducimus nisi expedita, quo minus autem. Sint, ad laudantium iure exercitationem
          sit, maiores totam voluptatem odio natus debitis praesentium dolorem doloremque reiciendis corporis
            voluptate, itaque expedita! Sed dolorum nulla ipsum?</p>
        </div>
      </div>
    </div>

    <form className="add-comment-form">
      <textarea cols="30" rows="5" placeholder="Add new comment"></textarea>
      <button className="btn">send</button>
    </form>
  </Fragment>
}

export default Recipe;