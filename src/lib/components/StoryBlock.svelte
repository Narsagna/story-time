<script lang="ts">
      import { writable } from "svelte/store";
    export let sectionName = "section-name";
    export let sectionContent = "section-content";
    export let sectionFeedback = "section-feedback";

    async function generate() {
    // API call to generate setion response
    }
    async function regenerate(e: SubmitEvent) {
    e.preventDefault();
    // API call to regenerate setion response
    }

    $: sectionFeedbackIsValid = $formData.sectionFeedback.length > 0;

    const formData = writable({
        sectionFeedback,
    });


</script>

<details class="collapse collapse-plus bg-accent outline-[#2E2D2D] hover:outline-secondary">
    <summary class="collapse-title collapse-arrow text-xl font-medium">{sectionName} </summary>
    <div class="collapse-content">
      <p>{sectionContent}</p>
      <div class="flex gap-4 my-4">
        <button type="submit" class="btn btn-primary" on:click={generate}
  >Generate</button
>
<button type="button" class="btn btn-outline btn-primary"
  >Accept</button
>
  </div> 
      <div class="collapse collapse-arrow bg-accent outline-[#2E2D2D] hover:outline-primary">
        <input type="checkbox" />
        <div class="collapse-title">Want to modify this section?</div>
        <div class="collapse-content">
            <form
            on:submit|preventDefault={regenerate}
            class="bg-secondary p-6 w-full mx-auto rounded-xl"
          >
            <div class="flex flex-col gap-4">        
              <textarea
                class="textarea textarea-primary input input-sm text-black"
                placeholder="Define the competency"
                bind:value={sectionFeedback}
              ></textarea>
             
            </div>
            <div class="my-4">
              {#if !sectionFeedbackIsValid}
                <p class="text-error text-xs">Must enter a valid feedback for this section</p>
              {/if}
            </div>
        <div class="flex gap-4 my-4">
                      <button type="submit" class="btn btn-primary" disabled={!sectionFeedbackIsValid}
                >Submit & Regenerate</button
              >
              <!-- <button type="button" class="btn btn-outline" on:click={cancelEdit}
                >Cancel</button
              > -->
                </div>
              </form>
        </div>
      </div>
    </div>
</details>