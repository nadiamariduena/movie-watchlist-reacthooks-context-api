## In case of no img

### snipped

```javascript
<VideoContainerr>
  <VideoBoxWrapper>
    <VideoBoxContainer
      style={
        // ✋ if there is an img in the API related to the movie, show the BACKDROP_PATH, if not show the img inside the url(${defaultImg})`
        moviearg.backdrop_path
          ? {
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),  url(${BACKDROP_PATH}${moviearg.backdrop_path})`,
            }
          : {
              backgroundImage: ` linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)),  url(${defaultImg})`,
            }
      }
    >
      // <div className="poster"></div>
    </VideoBoxContainer>
  </VideoBoxWrapper>
</VideoContainerr>
```

<br>
<br>

```javascript
const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280";

//
const defaultImg =
  "https://images.pexels.com/photos/4286932/pexels-photo-4286932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
//
```
