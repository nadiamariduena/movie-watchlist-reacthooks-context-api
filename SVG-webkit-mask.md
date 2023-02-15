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

### Doesn't work

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

    //
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

<br>
<>

https://user-images.githubusercontent.com/58809268/218857266-e93c39af-50b4-4af8-9e0b-c5ab01dd3ede.mp4

<br>
<br>

### 🌈 This also works

<br>

<br>

```javascript
const WrapperSectionHome = styled.div`
  // ** styled variable Tests
  /* background: ${(props) => props.theme.redWithOpacity};
   border-left: 20px solid ${(props) => props.theme.redWithOpacity};
*/

  //
  &::before,
  &::after {
    position: fixed;
    inset: 0;
    z-index: -1;
    //
    mask: radial-gradient(
      at -35% 15%,
      ${(props) => props.theme.redOnly},
      ${(props) => props.theme.redWithOpacity} 50%,
      transparent 70%
    );

    //
    //
    mask-composite: intersect;
    mix-blend-mode: color;
    content: "";
  }
  &::before {
    background-color: #000;
    filter: url(#f);
  }
  &::after {
    background-color: $red-with-opacity;
    background: linear-gradient(180deg, purple, navy 80%, aqua);
  }
`;

WrapperSectionHome.defaultProps = {
  theme: {
    greenOnlyTest: "green",
    redOnly: "red",
    redWithOpacity: "rgba(255, 0, 45, 0.2)",
    //  redWithOpacity: "rgba(red, 0.2)", // this "red" dont work, you have to put the decimals
    // 255, 0, 45 // red
  },
};
```

<br>

### I need 2 shades of red

- one pure red and the other with some opacity

```javascript
${(props) => props.theme.redOnly},

//
      ${(props) => props.theme.redWithOpacity} 50%,


      //
      //  ** Based on this:
      WrapperSectionHome.defaultProps = {
  theme: {
    greenOnlyTest: "green",
    redOnly: "red",
    redWithOpacity: "rgba(255, 0, 45, 0.2)",
    //  redWithOpacity: "rgba(red, 0.2)", // this "red" doesn't work, you have to put the decimals
    // 255, 0, 45 // red
  },
};

```

https://user-images.githubusercontent.com/58809268/218945813-395edfab-dfcc-4c0a-9ede-82c98b3df6d5.mp4

<br>

https://user-images.githubusercontent.com/58809268/218945865-f1b462c6-71cc-40f5-846a-29b221a5df0f.mp4

<br>

<br>

<br>

https://styled-components.com/docs/faqs#destructure-props

https://codesandbox.io/s/l2vvl67l9q

https://stackoverflow.com/questions/43502813/using-javascript-variables-with-styled-components

https://styled-components.com/docs/faqs#destructure-props

<br>

<br>

---

<br>

### 🍓 Other examples: colors from the data.js

```javascript
  {
    id: 0,

    bg: "B4BCDC",
    fColor: "ffffff",
    mobileFColor: "F8F8F8",

    borderButton: "ffffff",

  },
```

<br>
<br>

```javascript
 {sliderItems.map((items) => (
          <Slide
            bg={items.bg}
            fColor={items.fColor}
            mobileFColor={items.mobileFColor}
            key={items.id}
            small={items.img}
          >
            <ImgContainer>
              <Image src={items.img} />
            </ImgContainer>

            <InfoContainer>
              <Title
                fColor={items.fColor}
                mobileFColor={items.mobileFColor}
                borderButton={items.borderButton}
              >
```

<br>
<br>

```javascript
const Slide = styled.div`

  //color PROPS
  background-color: #${(props) => props.bg};
  color: #${(props) => props.fColor};
  //opacity for images background in smaller devices

  ${mobileM({


    color: (props) => `#${props.mobileFColor}`,
  })}
```



<br>
<br>


## Manipulating the Svg I created using figma

- i changed the **stroke** and the **stroke-width**
 


```javascript
<svg id="eDqzi1UGeQZ1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"><g transform="matrix(1.288665 0 0 1.329448-43.29975-38.116897)"><ellipse rx="65.349203" ry="51.87514" transform="translate(150 194)" fill="none" stroke="#fafafa2b" stroke-width="0.5"/><ellipse rx="65.349203" ry="51.87514" transform="translate(150 142)" fill="none" stroke="#fafafa2b" stroke-width="0.5"/><ellipse rx="65.349203" ry="51.87514" transform="translate(150 89)" fill="none" stroke="#fafafa2b" stroke-width="0.5"/></g></svg>

```

https://user-images.githubusercontent.com/58809268/219047794-c8011371-3615-4fbd-97a9-00c660a63d7b.mp4


