
# D2-UI Changelog

## 0.0.21 (HEAD)
###### _Not yet released_

##### Changed

- `HeaderBar` will no longer wrap long profile names to a second line
- `Sidebar` icons can now be plain strings
  - String icons will be treated as Material Icon ligatures and converted to
    `<FontIcon/>` elements


##### Documentation

- Examples that use the DHIS 2 API will read dev server configuration from
  `DHIS2_HOME/config.js[on]`, just like the other front end apps. This file
  should export and object with two properties: `baseUrl` and `authorization`.




## 0.0.20
###### _April 21st 2016_

No significant changes.




## 0.0.19
###### _April 19th 2016_

##### Changed

- `FormBuilder` has new styling props:
  - `style` is applied to the element that contains the entire `FormBuilder` component
  - `fieldWrapStyle` is applied to the element that wraps each form field




## 0.0.18
###### _April 18th 2016_

##### Breaking changes

- `Validators.isNumber()` now accepts numbers, numeric strings, the empty string and
  `undefined` (see [#34](../../issues/34))
- `FormBuilder` component behavior has changed (needs to be documented)
- `Sidebar` width has increased from `256px` to `295px`

##### Added

- `TreeView` component
- `OrgUnitTree` component and `OrgUnitTreeMultipleRoots` wrapper component
- `Validators.isPositiveNumber()` - Thanks [@adhbh](https://github.com/adhbh)
  (fixes [#36](../../issues/36))
- `GroupEditorWithOrdering` component
  - Wraps the `GroupEditor` component and adds ordering buttons

##### Changed

- `FormBuilder` will now run synchronous validators on every `onChange` event even
  for fields that have `changeEvent="onBlur"`. Async validators are still only
  executed on `onBlur` events.
- `DataTable` context menu is available from a menu icon button in addition to right click
- `Sidebar` component now has support for icons using the `section.icon` prop
- `HeaderBar` component displays the full profile name in stead of the string `"Profile"`

##### Documentation

- Added `TreeView` examples
- Added `OrgUnitTree` examples
- Added `Sidebar` examples - Thanks [@caixiaojia](https://github.com/caixiaojia)
- Minor changes to `DataTable` example




## 0.0.17
###### _March 4th, 2016_

- [Minor] Upgrade dependencies




## 0.0.16
###### _February 26th, 2016_

- [Minor] Upgrade to React 0.14




## 0.0.15
###### _February 24th, 2016_

- [Minor] Code style - new eslint config




## 0.0.14
###### _February 18th, 2016_

##### Added

- `FormBuilder` component
- CHANGELOG.md