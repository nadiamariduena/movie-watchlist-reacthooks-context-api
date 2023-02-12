### Img inside SVG blob

```javascript
<svg
  id="10015.io"
  viewBox="0 0 480 480"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <defs>
    <clipPath id="blob">
      <path
        fill="#474bff"
        d="M369,331Q345,422,256.5,393.5Q168,365,123,302.5Q78,240,116,166Q154,92,247,79.5Q340,67,366.5,153.5Q393,240,369,331Z"
      />
    </clipPath>
  </defs>
  <image
    x="0"
    y="0"
    width="100%"
    height="100%"
    clip-path="url(#blob)"
    xlink:href="https://images.unsplash.com/photo-1535979014625-490762ceb2ff?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=MnwzNjMxMDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzYxOTExMzE&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1080"
    preserveAspectRatio="xMidYMid slice"
  ></image>
</svg>
```

<br>

### 🔴 error when applying it to react

- modify the following

```javascript
// https://stackoverflow.com/questions/59820954/syntaxerror-unknown-namespace-tags-are-not-supported-by-default
//
sketch:type TO sketchType
    xmlns:xlink TO xmlnsXlink
    xlink:href  TO xlinkHref
```

<br>

### Apply it to the api section

- it looks ugly but can work better with animation

```javascript
<ResultCard>
  <H3 onClick={() => setOpenMovieModalee(!openMovieModalee)}>
    {moviearg.title}
  </H3>

  {moviearg.poster_path ? (
    <>
      <svg
        id="10015.io"
        viewBox="0 0 480 480"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <clipPath id="blob">
            <path
              fill="#474bff"
              d="M369,331Q345,422,256.5,393.5Q168,365,123,302.5Q78,240,116,166Q154,92,247,79.5Q340,67,366.5,153.5Q393,240,369,331Z"
            />
          </clipPath>
        </defs>
        <image
          x="0"
          y="0"
          width="100%"
          height="100%"
          clip-path="url(#blob)"
          xlinkHref={`https://image.tmdb.org/t/p/w200${moviearg.poster_path}`}
          preserveAspectRatio="xMidYMid slice"
        ></image>
      </svg>
    </>
  ) : null}
</ResultCard>
```
