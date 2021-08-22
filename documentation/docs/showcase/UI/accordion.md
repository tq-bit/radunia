<script setup>
import QAccordion from '../../components/UI/Accordion/QAccordion.vue'
import QAccordionItem from '../../components/UI/Accordion/QAccordionItem.vue'
</script>

<style>
@import '../../assets/main.css'
</style>

# QAccordion component

Accordions are useful when toggling a large amount of content. Radunia's implementation uses no Javascript to calculate the height of the item's content, but a `max-height` transition, together with `overflow-hidden`. It adds accessibility by binding `:aria-expanded="isExpanded"` to each created child element and makes use of the composition API.

## Requirements

| Type                      | Path / Version        | Purpose             | Optional |
| ------------------------- | --------------------- | ------------------- | -------- |
| **Vue version**           | Vue 3                 | Composition API     | No       |
| **Styles**                | ../../assets/main.css | CSS Variables       | Yes      |
| **Composition Functions** | ../../use/uuid        | Assign ids to items | No       |


## Usage

### Single element usage

Each accordion item can be used independently from one another. It handles toggling internally by assigning unique ids to each element.

<QAccordionItem title="Item one">
<p>
  At vero eos et accusamus et iusto odio dignissimos ducimus qui
  blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
  et quas molestias excepturi sint occaecati cupiditate non provident,
  similique sunt in culpa qui officia deserunt mollitia animi, id est
  asperiores repellat.
</p>
</QAccordionItem>

```vue
<QAccordionItem title="Item one">
<p>
  At vero eos et accusamus et iusto odio dignissimos ducimus qui
  blanditiis praesentium voluptatum ...
</p>
</QAccordionItem>
```

#### Rounded borders

Whether used standalone or in groups, this component often looks better with rounded borders.

<QAccordionItem title="Item one" :roundedTop="true" :roundedBottom="true">
<p>
  At vero eos et accusamus et iusto odio dignissimos ducimus qui
  blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
  et quas molestias excepturi sint occaecati cupiditate non provident,
  similique sunt in culpa qui officia deserunt mollitia animi, id est
  asperiores repellat.
</p>
</QAccordionItem>

```vue
<QAccordionItem title="Item one" :roundedTop="true" :roundedBottom="true">
<p>
  At vero eos et accusamus et iusto odio dignissimos ducimus qui
  blanditiis praesentium voluptatum ...
</p>
</QAccordionItem>
```


### Multiple element usage

<QAccordion header="Accordion wrapper title">
  <QAccordionItem title="Item one">
  </QAccordionItem>
  <QAccordionItem title="Item two">
  </QAccordionItem>
  <QAccordionItem title="Item three">
  </QAccordionItem>
</QAccordion>


### Custom icon

<QAccordionItem title="Item one" icon="❯" :baseRotation="0" :targetRotation="90">
<p>
  At vero eos et accusamus et iusto odio dignissimos ducimus qui
  blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
  et quas molestias excepturi sint occaecati cupiditate non provident,
  similique sunt in culpa qui officia deserunt mollitia animi, id est
  asperiores repellat.
</p>
</QAccordionItem>

```vue
<QAccordionItem title="Item one" icon="❯" :baseRotation="0" :targetRotation="90">
<p>
  At vero eos et accusamus et iusto odio dignissimos ducimus qui
  blanditiis praesentium voluptatum ...
</p>
</QAccordionItem>
```