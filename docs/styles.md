# Styles

## [uikit](http://getuikit.com/)

uikit is used as the base for styling, customization of uikit can be done by editing `src/scss/_uikit.scss`.

## React Components

Every React component has its own stylesheet of the same name in `src/scss/components`, and its own CSS class, to reduce the possibility of being overridden.

To include a new React component CSS class into the build, edit `src/scss/style.scss`.

## Icon Fonts

Icon Fonts are generated using [IcoMoon](https://icomoon.io/) to reduce fonts filesize. The downside of this approach is all existing icons need to be selected when generating a new set of icon fonts.

To generate a new set of icon fonts, follow the below instructions:

1. Head over to [IcoMoon App](https://icomoon.io/app/#/select).
2. Select the icons needed + icons in used, generate and download the fonts.
3. Copy the fonts into `src/fonts`.
4. Add the new icon as css class in `src/scss/_font.scss`.

To use the icons, add the `mi-icon` prefix and the icon name, i.e.:

```html
  <i class="mi-icon mi-icon-search"></i>
```
