<script lang="ts">
  import StoryBlock from "$lib/components/StoryBlock.svelte";
  import { writable } from "svelte/store";

  let outputData = {
    hook: "",
    promise: "",
    progress: "",
    payoff: "",
  };

  let loading = false;

  const formDefaults = {
    title: "",
    targetAudience: "",
    outcomes: "",
    format: "",
    dataDump: "",
  };

  const formData = writable(formDefaults);

  const generateScript = async () => {
    loading = true;
    const response = await fetch("https://genius.juspay.in/api/v1/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: JSON.stringify({
          metadata: {
            title: $formData.title,
            target_audience: $formData.targetAudience,
            outcomes: $formData.outcomes,
            format: $formData.format,
          },
          core_ideas: $formData.dataDump,
        }),
        product: "Storytime",
        cache_enabled: false,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const capture = /```json\n([\s\S]*)\n```/gm.exec(data.answer);
    if (capture && capture.length > 1) {
      outputData = JSON.parse(capture[1]);
    }
    console.log("Story response", outputData);
    loading = false;
  };
</script>

<div class="flex flex-col w-full p-10 gap-4 items-center justify-center">
  <div class="card bg-primary w-full shadow-xl">
    <div class="card-body">
      <h2
        class="card-title text-2xl justify-between"
        style="font-family: story-font-header;"
      >
        Story Time <svg
          data-src="https://unpkg.com/heroicons/20/solid/squares-2x2.svg"
          class="h-5 w-5"
        ></svg>
      </h2>
    </div>
  </div>
  <div class="card bg-accent w-full shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Let's get started</h2>
      <div class="flex gap-4">
        <div class="flex flex-col gap-2 w-1/2">
          <div class="label">
            <span class="label-text">Metadata</span>
          </div>
          <label
            class="input input-bordered flex items-center gap-2 text-black"
          >
            Title:
            <input
              type="text"
              class="grow"
              placeholder="Payment Page"
              bind:value={$formData.title}
            />
          </label>
          <label
            class="input input-bordered flex items-center gap-2 text-black"
          >
            Target Audience:
            <input
              type="text"
              class="grow"
              placeholder="developers"
              bind:value={$formData.targetAudience}
            />
          </label>
          <label class="input input-bordered flex items-center gap-2 text-black"
            >Outcomes:
            <input
              type="text"
              class="grow"
              placeholder="Improve conversion and checkout experience"
              bind:value={$formData.outcomes}
            />
          </label>
          <label class="input input-bordered flex items-center gap-2 text-black"
            >Format:
            <input
              type="text"
              class="grow"
              placeholder="Short video ~1 min"
              bind:value={$formData.format}
            />
            <span class="badge badge-info">Optional</span>
          </label>
        </div>
        <label class="form-control w-1/2 text-black gap-2">
          <div class="label">
            <span class="label-text">Core ideas</span>
          </div>
          <textarea
            class="textarea textarea-bordered h-full"
            placeholder="Data dump"
            bind:value={$formData.dataDump}
          ></textarea>
        </label>
      </div>
      <div class="mt-5">
        <button class="btn btn-primary cursor-pointer" on:click={generateScript}
          >{#if loading}
            Generating
          {:else}
            Generate
          {/if}
        </button>
      </div>
      <!-- <p>If a dog chews shoes whose shoes does he choose?</p> -->
    </div>
  </div>
  <StoryBlock sectionName="Hook" sectionContent={outputData.hook} bind:data={outputData}/>
  <StoryBlock sectionName="Promise" sectionContent={outputData.promise} bind:data={outputData}/>
  <StoryBlock sectionName="Progress" sectionContent={outputData.progress} bind:data={outputData}/>
  <StoryBlock sectionName="Payoff" sectionContent={outputData.payoff} bind:data={outputData}/>
</div>
