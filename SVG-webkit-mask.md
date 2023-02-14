## CSS Masking

#### Gradients & image

- check the examples: [css maskin](https://www.w3schools.com/css/css3_masking.asp)

<br>
<br>

### In my code

- To obtain a blueish oval shape, you can make it with the code below, but ⚠️ , if it doesn't work, its because some parent contains a background color, in my case i didnt have any background color just because i know that when applying **the mix blend mode** colors are tricky, so **AVOID** to have any background color until you finish to play with the settings below

```scss
  // ** gradient

  &:before,
  &:after {
    position: fixed;
    inset: 0;
    z-index: -1;

    //
    -webkit-mask-image: radial-gradient(red, transparent 70%);
    mask-image: radial-gradient(red, transparent 70%);
    //
    mix-blend-mode: color;
    content: " ";
  }
  &::before {
    background-color: #000;
    filter: url(#svgFillterr);
  }
  &::after {
    background: linear-gradient(navy, aqua);
  }
`;

```

<br>
<br>

### Trying to replicate the effect below

- Unfortunately some properties are incompatible with all the browser **(its recommended not to use it on production due to incompatibilities)** , check the link below:

https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-mask-composite

<br>

### Anyway I am curios about the result

#### from this:

```javascript
// from this: --grad: radial-gradient(at 25%, red, #{rgba(red, 0.2)} 50%,
transparent 70%); --mask: var(--grad), var(--grad); -webkit-mask: var(--mask);
-webkit-mask-composite: source-in;
```

#### to this:

- I replaced the following, because of: [deprecated](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-mask-composite)

> -webkit-mask: var(--mask); // 🛑
> -webkit-mask-composite: source-in; // 🛑

<br>

- the following code will not work if you are using **styled components**

```scss
$grad: radial-gradient(at 25%, red, #{$red-with-opacity} 50%, transparent 70%);
$mask: $grad, $grad;

--grad: $grad;
--mask: $mask;

-webkit-mask: var(--mask);
mask: var(--mask);
mask-composite: intersect;
```

<br>

> In this example, we define two nested variables: $grad, which holds the radial gradient value, and $mask, which holds the comma-separated list of two $grad values. <br> We then define the CSS custom properties --grad and --mask to hold the values of the $grad and $mask variables, respectively.
> <br>Finally, we apply the --mask custom property as the mask of the element, using the standard mask property, and set the mask-composite property to intersect.

<br>

### dont work

- I dont know why this dont work,

```javascript
// ** related to the gradient
const redWithOpacity = "rgba(red, 0.2)";
const grad = `radial-gradient(
  at 25%,
  red,
  ${redWithOpacity} 50%,
  transparent 70%
)`;
const maski = `${grad}, ${grad}`;

const WrapperSectionHome = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  // ** gradient
  &:before,
  &:after {
    position: fixed;
    inset: 0;
    z-index: -1;

    --grad: ${grad};
    --mask: ${maski};

    -webkit-mask-image: var(--mask);
    mask: var(--mask);
    mask-composite: intersect;
    mix-blend-mode: color;
    content: " ";
  }
  &::before {
    background-color: #000;
    filter: url(#f);
  }
  &::after {
    background: linear-gradient(navy, aqua);
  }
`;
```

<br>

```javascript
 return (
    <>
      <WrapperSectionHome>
        <svg style={{ position: "absolute" }}>
          <filter id="f">
            {/* https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/ */}
            <feTurbulence type="fractalNoise" baseFrequency="8.5" />
          </filter>
        </svg>

        <WrapperContainer>
```

<br>
<br>

### Works

```javascript
const WrapperSectionHome = styled.div`
  $red-with-opacity: rgba(red, 0.2);

  // ** gradient
  &::before,
  &::after {
    position: fixed;
    inset: 0;
    z-index: -1;
    //
    // https://medium.com/@nana8/css-box-shadow-what-is-difference-between-blur-and-spread-c3a3de92a126
    box-shadow: inset 5px 10px 400px #fafafa;

    mask-image: radial-gradient(at -35% 15%, red, transparent 75%);
    mask-composite: intersect;
    //
    //
    mix-blend-mode: color;
    content: "";
  }
  &::before {
    background-color: #000;
    filter: url(#f);
  }
  &::after {
    background: linear-gradient(30deg, purple, navy 80%, aqua);
  }
`;
```

https://user-images.githubusercontent.com/58809268/218857266-e93c39af-50b4-4af8-9e0b-c5ab01dd3ede.mp4


