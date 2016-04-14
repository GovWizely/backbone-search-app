# Styles

Naming convention of classes are loosely based on [BEM](https://en.bem.info/).

```css
    // Base CSS for Header component
    .mi-header { ... }
    .mi-header__title { ... }
    .mi-header__version { ... }

    // Customize CSS for Header component in Index container
    .mi-index {
      ...
      .mi-header {
        font-size: 25px;
        ...
      }
      ...
    }
```

## [Blocks](/styles/blocks)

Every block is prefixed with a `mi-` to avoid conflicts for CSS class names. Every React container and component has its own CSS block.

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
