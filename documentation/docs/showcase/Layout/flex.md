<script setup>
import QFlexContainer from '../../components/Layout/Flex/QFlexContainer.vue'
import QFlexColumn from '../../components/Layout/Flex/QFlexColumn.vue'
</script>

<style>
@import '../../.vitepress/theme/main.css'
</style>

# QFlex components

Whenever the layouts QGrid provides are not sufficient, QFlex provides a more customizable approach. It extends the maximum count of columns from 4 to 12 and includes a powerful & responsive column component.

## Requirements

| Type       | Path / Version        | Purpose       | Optional |
| ---------- | --------------------- | ------------- | -------- |
| **Styles** | ../../assets/main.css | CSS Variables | No       |

## Usage

Import the following component/s:

```javascript
import QFlexContainer from '../../components/Layout/Flex/QFlexContainer.vue'
import QFlexColumn from '../../components/Layout/Flex/QFlexColumn.vue'
```

### Basic usage

Flex columns scale automatically depending on how many elements are nested within its parent component. That means that if no column attribute is bound, columns will take up all the remaining space within.

:::tip Full size container
Just like it's grid counterpart, flex containers can be expanded to their full size by setting its attribute `:fluid="true"`
:::

<q-flex-container :fluid="true">
  <q-flex-column style="padding: 0.5rem; background-color: #aaa; text-align: center">Column 1 / 3</q-flex-column>
  <q-flex-column style="padding: 0.5rem; background-color: #888; text-align: center">Column 2 / 3</q-flex-column>
  <q-flex-column style="padding: 0.5rem; background-color: #aaa; text-align: center">Column 3 / 3</q-flex-column>
</q-flex-container>

<q-flex-container :fluid="true">
  <q-flex-column style="padding: 0.5rem; background-color: #aaa; text-align: center">Column 1 / 6</q-flex-column>
  <q-flex-column style="padding: 0.5rem; background-color: #888; text-align: center">Column 2 / 6</q-flex-column>
  <q-flex-column style="padding: 0.5rem; background-color: #aaa; text-align: center">Column 3 / 6</q-flex-column>
  <q-flex-column style="padding: 0.5rem; background-color: #888; text-align: center">Column 4 / 6</q-flex-column>
  <q-flex-column style="padding: 0.5rem; background-color: #aaa; text-align: center">Column 5 / 6</q-flex-column>
  <q-flex-column style="padding: 0.5rem; background-color: #888; text-align: center">Column 6 / 6</q-flex-column>
</q-flex-container>

**Example**

```vue
<q-flex-container :fluid="true">
  <q-flex-column>Column 1 / 3</q-flex-column>
  <q-flex-column>Column 2 / 3</q-flex-column>
  <q-flex-column>Column 3 / 3</q-flex-column>
</q-flex-container>

<q-flex-container :fluid="true">
  <q-flex-column>Column 1 / 6</q-flex-column>
  <q-flex-column>Column 2 / 6</q-flex-column>
  <q-flex-column>Column 3 / 6</q-flex-column>
  <q-flex-column>Column 4 / 6</q-flex-column>
  <q-flex-column>Column 5 / 6</q-flex-column>
  <q-flex-column>Column 6 / 6</q-flex-column>
</q-flex-container>
```

## Full component's code

### QFlexContainer

<<< @/components/Layout/Flex/QFlexContainer.vue

### QFlexColumn

<<< @/components/Layout/Flex/QFlexColumn.vue
