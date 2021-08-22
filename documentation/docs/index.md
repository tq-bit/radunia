<script setup>
import { useData } from 'vitepress'
const {site} = useData()
</script>

# {{site.title}}

{{site.description}}

> To be frank, this is just my personal alzheimer website for projects. If you stumble across it, feel free to browse through.



## Component collection

Components are grouped by purpose. Each resides in its own directory and has an equivalent inside the Components - directory of the main Radunia project.

### UI Components

Anything that requires user interaction without meaningful feedback *. Includes items such as:



[Link to UI Components](./showcase/UI/index.md)

<small> *No app-wide state-changing action is triggered by this component</small>

### Form Components

Anything that is part of a web formular. Form components range from smaller text-inputs over selections up till a bigger and more complex upload section items.

[Link to Form Components](./showcase/Form/index.md);

### Layout Components

Components that provide structure to a website, using grids or flexboxes

[Link to Layout Components](./showcase/Layout/index.md);

## Global styles

All components within this project require a global style. These have to be defined in a separate css file or declared inside the `App.vue` component.