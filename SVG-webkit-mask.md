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
