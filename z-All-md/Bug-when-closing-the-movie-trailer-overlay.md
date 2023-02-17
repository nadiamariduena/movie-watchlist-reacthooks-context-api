## Bug when closing the <u>movie trailer</u> overlay

<br>

- I am fetching the **movies** and related **movie trailers** from the **themoviedb API** using two different functions that are inside a useEffect hook.

<br>

> Everything works fine, but there is a **bug** that occurs when I type something into the **search input**.

-The API renders the results and shows them inside an overlay with the path "ResultCardsHome".

<br>

- When I click on an image in the search results, it opens another overlay that displays the movie's description, along with a button to close the overlay and a button to launch the trailer.

<br>

#### 🔴 the issue

> The problem is that when I click the play button to launch the trailer, it works and plays the movie, but if I close the overlay and select another movie, the overlay opens with the correct movie description, but if I click the play button with the code mentioned before, it will play the previous movie. However, if I click the play button again, it will play the current movie.

<br>
