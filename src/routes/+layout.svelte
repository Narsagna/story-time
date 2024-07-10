<script lang="ts">
    import type { LayoutData } from './$types';
    
    export let data: LayoutData;
    import "../app.css";

</script>

<div class="flex bg-secondary min-h-screen min-w-screen items-center" style="font-family: story-font-body;">
<slot />
</div>