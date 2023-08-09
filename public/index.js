'use strict';

/**
 * Initializes functions when the window is loaded.
 */
(function() {

  window.addEventListener('load', init);

  let currentUser;

  /**
   * Initializes functions when the window is loaded.
   */
  function init() {
    id('home-btn').addEventListener('click', homePage);
    id('search-btn').addEventListener('click', searchGame);
    id('cart-btn').addEventListener('click', seeCart);
    id('signin-form').addEventListener('submit', function(event) {
      event.preventDefault();
      let email = id('username').value;
      let password = id('password').value;
      checkEmailPassword(email, password);
    });
    manageSignInModal();
    featuredGamesBtn();
    featuredGames();
    allGames();
  }

  function homePage() {
    id('fGames').style.display = "block";
    id('aGames').style.display = "block";
    id('cart').style.display = "none";
    id('cart-items').replaceChildren();
  }

  /**
   * This function is used to handle the scrolling of the featured games
   * container. It associates click event listeners to the 'prev-btn' and
   * 'next-btn' elements which handle the scrolling of the 'game-container'
   * by 200 pixels to the left or right respectively.
   */
  function featuredGamesBtn() {
    let prevBtn = id("prev-btn");
    let nextBtn = id("next-btn");
    let gameContainer = id("game-container");

    nextBtn.addEventListener('click', function() {
      gameContainer.scrollLeft += 200;
    });

    prevBtn.addEventListener('click', function() {
      gameContainer.scrollLeft -= 200;
    });
  }

  async function featuredGames() {
    try {
      let games = await fetch('/featured');
      await statusCheck(games);
      let gamesInJson = await games.json();
      addFeaturedGames(gamesInJson);
    } catch (err) {
      console.log(err);
    }
  }

  function addFeaturedGames(featuredGames) {
    let gameContainer = id('game-container');
    for(let i = 0; i < featuredGames.length; i++) {
      let article = gen('article');
      article.setAttribute('id',featuredGames[i].shortName);
      article.classList.add('game');
      let image = gen('img');
      image.src = '/imgs/' + featuredGames[i].shortName + '.jpeg';
      image.alt = featuredGames[i].shortName;
      image.addEventListener('click', grabName);
      article.appendChild(image);
      let passage = gen('p');
      passage.textContent = 'Image Credit: ' + 'placeholder';
      article.appendChild(passage);
      let header3 = gen('h3');
      header3.textContent = featuredGames[i].title;
      header3.addEventListener('click', grabName);
      article.appendChild(header3);
      let descrip = gen('p');
      descrip.textContent = featuredGames[i].description;
      article.appendChild(descrip);
      let addBtn = gen('button');
      addBtn.textContent = 'Add to cart';
      addBtn.addEventListener('click', addCartBtn1);
      article.appendChild(addBtn);
      gameContainer.appendChild(article);
    }
  }

  async function allGames() {
    try {
      let allGames = await fetch('/allgames');
      await statusCheck(allGames);
      let allGamesJson = await allGames.json();
      addAllGames(allGamesJson);
    } catch (err) {
      console.log(err);
    }
  }

  function addAllGames(allGJson) {
    for(let i = 0; i < allGJson.length; i++) {
      let article = gen('article');
      article.setAttribute('id',allGJson[i].shortName);
      article.classList.add('gg');
      let image = gen('img');
      image.src = '/imgs/' + allGJson[i].shortName + '.jpeg';
      image.alt = allGJson[i].shortName;
      image.addEventListener('click', grabName);
      article.appendChild(image);
      let passage = gen('p');
      passage.textContent = 'Image Credit: ' + 'placeholder';
      article.appendChild(passage);
      let header3 = gen('h3');
      header3.textContent = allGJson[i].title;
      header3.addEventListener('click', grabName);
      article.appendChild(header3);
      let genre = gen('p');
      genre.textContent = allGJson[i].genre;
      article.appendChild(genre);
      let platform = gen('p');
      platform.textContent = allGJson[i].platform;
      article.appendChild(platform);
      id('allG-container').appendChild(article);
    }
  }

  function grabName() {
    let modal = id("myModal");
    let span = id("close");
    let text = id("modal-text");

    if (this.nodeName == "H3") {
      gameDetail2(this.textContent);
    } else {
      gameDetail(this.alt);
    }

    modal.style.display = "block";

    span.onclick = function() {
      modal.style.display = "none";
      text.replaceChildren();
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
        text.replaceChildren();
      }
    }
  }

  async function gameDetail(shortName) {
    try {
      let gameInfo = await fetch('/detail/' + shortName);
      await statusCheck(gameInfo);
      let s = await gameInfo.json();
      getGame(s);
    } catch (err) {
      console.log(err);
    }
  }

  async function gameDetail2(fullName) {
    try {
      let gameInfo = await fetch('/detail2/' + fullName);
      await statusCheck(gameInfo);
      let s = await gameInfo.json();
      getGame(s);
    } catch (err) {
      console.log(err);
    }
  }

  function getGame(info) {
    let title = gen('h3');
    title.textContent = info.title;
    let img = gen('img');
    img.src = '/imgs/' + info.shortName + '.jpeg';
    img.alt = info.shortName;
    let des = gen('p');
    des.textContent = info.description;
    let genre = gen('p');
    genre.textContent = info.genre;
    let platform = gen('p');
    platform.textContent = info.platform;
    let price = gen('p');
    price.textContent = '$' + info.price;
    let rate = gen('p');
    rate.textContent = info.rating + "\u2B50";
    let release = gen('p');
    release.textContent = "Publish Date: " + info.release_date;
    let addBtn = gen('button');
    addBtn.textContent = 'Add to cart';
    addBtn.addEventListener('click', addCartBtn2);

    let modal = id('modal-text');
    modal.appendChild(title);
    modal.appendChild(img);
    modal.appendChild(des);
    modal.appendChild(genre);
    modal.appendChild(platform);
    modal.appendChild(price);
    modal.appendChild(rate);
    modal.appendChild(release);
    modal.appendChild(addBtn);
    modal.parentElement.setAttribute('id', title.textContent);
  }

  async function searchGame() {
    try {
      let searchWord = id('search-term').value;
      let gameSearch = await fetch('/search/?search=' + searchWord.trim());
      await statusCheck(gameSearch);
      let response = await gameSearch.json();
      if (response.length > 0) {
        console.log(response[0]);
        let modal = id("myModal");
        let span = id("close");
        let text = id("modal-text");

        getGame(response[0]);

        modal.style.display = "block";

        span.onclick = function() {
          modal.style.display = "none";
          text.replaceChildren();
        }

        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
            text.replaceChildren();
          }
        }
      } else {
        let modal = id("myModal");
        let span = id("close");
        let text = id("modal-text");
        let res = gen('h1');
        res.textContent = "Sorry, we couldn't find this game";
        text.appendChild(res);

        modal.style.display = "block";

        span.onclick = function() {
          modal.style.display = "none";
          text.replaceChildren();
        }

        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
            text.replaceChildren();
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function seeCart() {
    try {
      if(id('sign-btn').textContent == "Sign In"){
        showMyModal('You need to sign in first!!');
      } else {
        let totalPrice = 0;
        let lookup = await fetch ('/lookup/?uid=' + currentUser);
        await statusCheck(lookup);
        let resp = await lookup.json();
        for (let i = 0; i < resp.length; i++){
          genCartItem(resp[i]);
          totalPrice += resp[i].price;
        }
        id('cart-total-price').textContent = '$' + totalPrice;
        id('cart').style.display = "block";
        id('fGames').style.display = "none";
        id('aGames').style.display = "none";
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function addCartBtn1() {
    try {
      if(id('sign-btn').textContent == "Sign In"){
        showMyModal('You need to sign in first!!');
      } else {
        let currentGame = this.previousSibling.previousSibling.textContent;
        let gameInfo = await fetch ('/search/?search=' + currentGame.trim());
        await statusCheck(gameInfo);
        let resp = await gameInfo.json();
        let params = new FormData();
        params.append('id', currentUser);
        params.append('product', resp[0].title);
        params.append('value', resp[0].price);
        params.append('sName', resp[0].shortName);
        let addToCart = await fetch('/order', {method: "POST", body: params});
        await statusCheck(addToCart);
        let response = await addToCart.text();
        showMyModal("Success!! " + currentGame + " is added to your cart!");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function addCartBtn2() {
    try {
      if(id('sign-btn').textContent == "Sign In"){
        showMyModal('You need to sign in first!!');
      } else {
        let currentGame = this.parentElement.parentElement.id;
        let gameInfo = await fetch ('/search/?search=' + currentGame.trim());
        await statusCheck(gameInfo);
        let resp = await gameInfo.json();
        let params = new FormData();
        params.append('id', currentUser);
        params.append('product', resp[0].title);
        params.append('value', resp[0].price);
        params.append('sName', resp[0].shortName);
        let addToCart = await fetch('/order', {method: "POST", body: params});
        await statusCheck(addToCart);
        let response = await addToCart.text();
        showMyModal("Success!! " + currentGame + " is added to your cart!");
      }
    } catch (err) {
      console.log(err);
    }
  }

  function genCartItem(item) {
    let d1 = gen('div');
    d1.className = 'cart-item';
    let img = gen('img');
    img.src = '/imgs/' + item.shortName + '.jpeg';
    img.alt = item.shortName;
    let d2 = gen('div');
    d2.className = 'cart-item-details';
    let title = gen('p');
    title.className = 'cart-item-title';
    title.textContent = item.productname;
    let price = gen('p');
    price.className = 'cart-item-price';
    price.textContent = item.price;

    d2.appendChild(title);
    d2.appendChild(price);
    d1.appendChild(img);
    d1.appendChild(d2);
    id('cart-items').appendChild(d1);
  }


  function manageSignInModal() {
    let modal = document.getElementById("signinModal");
    let btn = document.getElementById("sign-btn");
    let span = document.getElementsByClassName("close")[0];
    let errorMessage = id('error-msg');

    btn.addEventListener("click", function() {
        if(id('sign-btn').textContent == "Sign In"){
          modal.style.display = "block";
        } else {
          showMyModal("You've already signed in!!");
        }
    });

    span.addEventListener("click", function() {
        modal.style.display = "none";
        errorMessage.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            errorMessage.style.display = "none";
        }
    });
}

  function showMyModal(text) {
    let myModal = id("myModal");
    let myModalText = id("modal-text");
    let myModalSpan = id("close");

    myModalText.textContent = text;
    myModal.style.display = "block";

    myModalSpan.onclick = function() {
      myModal.style.display = "none";
      myModalText.replaceChildren();
    }

    window.onclick = function(event) {
      if (event.target == myModal) {
        myModal.style.display = "none";
        myModalText.replaceChildren();
      }
    }
  }

  async function checkEmailPassword(email, password) {
    try {
      let params = new FormData();
      params.append('email', email);
      params.append('password', password);
      let accInfo = await fetch('/signin', {method: "POST", body: params});
      await statusCheck(accInfo);
      let response = await accInfo.json();
      currentUser = response[0].u_id;
      id("error-msg").style.display = "none";
      id("success-msg").style.display = "block";
      setTimeout(() => {
        id("success-msg").style.display = "none";
        id("signinModal").style.display = "none";
      }, 2000);
      id('sign-btn').textContent = response[0].username;
    } catch (err) {
      id("error-msg").style.display = "block";
    }
  }

  /**
 * Checks the status of a response. Throws an error if the response status is not ok.
 * @param {Object} res - The response to check the status of.
 * @throws {Error} If the response status is not ok.
 * @returns {Object} The response if its status is ok.
 */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * This helper function creates a new element with the specified tag name.
   * @param {string} tagName The tag name of the element to be created.
   * @returns {Element} A new element with the specified tag name.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

  /**
   * Gets an HTMLElement by its id.
   * @param {string} id The id of the element to find.
   * @returns {HTMLElement} The element with the given id.
   */
  function id(id) {
    return document.getElementById(id);
  }
})();