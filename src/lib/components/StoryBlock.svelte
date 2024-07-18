<script lang="ts">
  import { writable } from "svelte/store";
  import SvelteMarkdown from 'svelte-markdown'

  export let sectionName = "section-name";
  export let sectionContent: string | null = null;
  export let sectionFeedback = "section-feedback";
  export let accepted = false;
  export let data = {};

  let loading = false;

  $: collapsed = !sectionContent;

  async function regenerate(e: SubmitEvent) {
    e.preventDefault();

    loading = true;
    const response = await fetch("https://genius.juspay.in/api/v1/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: JSON.stringify({feedback: sectionFeedback, feedbackSection: sectionName}),
        product: "Storytime",
        cache_enabled: false,
        temperature: 0.7,
        history: [
          JSON.stringify(data)
        ]
      }),
    });

    const responseData = await response.json();
    const capture = /```json\n([\s\S]*)\n```/gm.exec(responseData.answer);
    if (capture && capture.length > 1) {
      data = {...data, [sectionName.toLowerCase()]: JSON.parse(capture[1])[sectionName.toLowerCase()]};
    }
    console.log("Story response", data);
    loading = false;
    sectionFeedback = "";
  }

  $: sectionFeedbackIsValid = $formData.sectionFeedback.length > 0;

  const formData = writable({
    sectionFeedback,
  });
</script>

<details
  class="collapse collapse-plus bg-accent outline-[#2E2D2D] hover:outline-secondary"
  open={!collapsed}
>
  <summary class="collapse-title collapse-arrow text-xl font-medium"
    >{sectionName}
  </summary>
  <div class="collapse-content">
    <p><SvelteMarkdown source={sectionContent} /></p>
    {#if !accepted}
      <div class="flex gap-4 ml-3 my-4">
        <button
          type="button"
          class="btn btn-outline btn-primary"
          on:click={() => (accepted = true)}>Accept</button
        >
      </div>
    {/if}
    {#if !accepted}
      <div
        class="collapse collapse-arrow bg-accent outline-[#2E2D2D] hover:outline-primary"
      >
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
                <p class="text-error text-xs">
                  Must enter a valid feedback for this section
                </p>
              {/if}
            </div>
            <div class="flex gap-4 my-4">
              <button
                type="submit"
                class="btn btn-primary"
                disabled={!sectionFeedbackIsValid}>
                  {#if !loading}
                    Submit & Regenerate
                  {:else}
                    Regenerating...
                  {/if}
              </button>
              <!-- <button type="button" class="btn btn-outline" on:click={cancelEdit}
                  >Cancel</button
                > -->
            </div>
          </form>
        </div>
      </div>
    {/if}
  </div>
</details>
