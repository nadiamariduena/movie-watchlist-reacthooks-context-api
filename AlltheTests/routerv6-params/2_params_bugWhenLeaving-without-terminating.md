### 🔴 There is a bug when leaving the movie without terminating the process, it happens when clicking the "watchlist or watched" routes instead of clicking the round button

<br>
<br>

- The solution for now is to add the same function i had on the **MovieDetails.js** to the **navigation**

<br>

```javascript
const Navigation = () => {
  const {
    setVideoId,
    //  resize video
  } = useContext(MovieeContext);

  const handleCloseModal = (e) => {
    e.preventDefault(e);

    //
    // if you don't add this setVideoId(), when you will click in another movie, you will see the same previous video, and not only that, it will be launched without even have to click on "play", which is not good. so kill the process by adding the setVideoId() or setVideoId(null)
    setVideoId(); 🔴
  };

  return (
    <>
      <Header>
        <Nav>
          <Left>
        //   🔴 add the function to each route
            <Brand onClick={handleCloseModal}>
              <Link to="/" className="logo">
                MUBII:
              </Link>
            </Brand>
          </Left>
          {/* ---------------- */}
          <Right>
            <Ul className="nav-links">
            //  🔴
              <Li onClick={handleCloseModal}>
                <NavbarLink to="/watchlist">Watch list</NavbarLink>
              </Li>
            //    🔴
              <Li onClick={handleCloseModal}>
                <NavbarLink to="/watched">Watched</NavbarLink>
              </Li>
            </Ul>
          </Right>
        </Nav>
      </Header>
    </>
  );
};

export default Navigation;
```

https://user-images.githubusercontent.com/58809268/220320951-75a07a82-8efb-4c83-83b7-fdd7061f4c09.mp4

