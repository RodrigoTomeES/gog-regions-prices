<script>
  const PAGE_SIZE = 24;

  import { onMount } from "svelte";

  export let searchResult = [];
  export let searchTerm = "";

  export let games = [];
  export let sales = [];
  export let lastUpdated = "";
  export let totalPages = -1;
  export let currentPage = -1;
  $: pageContent = searchResult.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  onMount(async () => {
    await fetch("/sales.json")
      .then((response) => response.json())
      .then((data) => {
        sales = data.sort((a, b) => a.title.localeCompare(b.title));
        searchResult = sales;
        totalPages = Math.floor(sales.length / PAGE_SIZE) + 1;
        currentPage = 1;
      });

    await fetch("/lastUpdate.json")
      .then((response) => response.json())
      .then((data) => {
        const last = data.last;
        const day = last.substr(8, 2);
        const month = last.substr(5, 2);
        const hour = last.substr(11, 5);
        lastUpdated = `${day}/${month} - ${hour}`;
      });
  });

  async function search() {
    if (searchTerm.trim() == "") {
      searchResult = sales;
    } else {
      if (games.length === 0) {
        await fetch("/games.json")
          .then((r) => r.json())
          .then((data) => {
            games = data.sort((a, b) => a.title.localeCompare(b.title));
          });
      }

      searchResult = games.filter((game) =>
        game.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
      totalPages = Math.floor(searchResult.length / PAGE_SIZE) + 1;
      currentPage = 1;
    }
  }

  const onKeyPress = (e) => {
    if (e.charCode === 13) search();
  };

  const moveOnKeyPress = (e) => {
    if (e.target.id === "searchterm") return;
    if (e.keyCode === 37) previousPage();
    if (e.keyCode === 39) nextPage();
  };

  const openLink = (url) => {
    let win = window.open(`https://www.gog.com${url}`, "_blank");
    win.focus();
  };

  function nextPage() {
    if (currentPage < totalPages) movePage(1);
  }
  function previousPage() {
    if (currentPage > 1) movePage(-1);
  }

  function movePage(direction) {
    currentPage = currentPage + direction;
    document.getElementById("games").scrollIntoView();
  }
</script>

<svelte:window on:keydown={moveOnKeyPress} />

<main class="container mx-auto px-3">
  <div class="flex flex-wrap justify-center items-center">
    <div class="w-full flex justify-center">
      <!-- HEADER -->
      <div class="block space-y-3 w-full md:w-1/3 py-3">
        <!-- TITLE -->
        <div class="justify-center w-full">
          <h1 class="text-center text-3xl font-extrabold text-gray-900 ">
            GOG Regions Prices
          </h1>
          <p class="text-sm text-gray-700 text-center">
            If your country has a different price report it in
            <a
              class="text-blue-700 underline"
              href="https://github.com/RodrigoTomeES/gog-regions-prices"
              >Github</a
            >
          </p>

          {#if lastUpdated}
            <p class="text-sm text-gray-700 text-center pt-1">
              Last update:
              {lastUpdated}
            </p>
          {/if}
        </div>
        <!-- END TITLE -->

        <!-- SEARCH -->
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="searchterm" class="sr-only">Search Term</label>
            <input
              bind:value={searchTerm}
              on:keypress={onKeyPress}
              id="searchterm"
              name="searchterm"
              type="text"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Search for your game!"
            />
          </div>
        </div>

        <div>
          <button
            on:click={search}
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3" />
            Search!
          </button>
        </div>
        <!-- END SEARCH -->
      </div>
      <!-- END HEADER -->
    </div>

    <!-- RESULTS -->
    <div class="flex w-full" id="games">
      <div class="flex flex-wrap w-full" role="list">
        {#each pageContent as game}
          <div
            on:click={openLink(game.url)}
            class="cursor-pointer flex flex-col w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 px-1 pb-3"
            role="listitem"
          >
            <div
              class="rounded overflow-hidden hover:shadow-lg border-r border-b border-l border-gray-300 flex-1"
            >
              <img
                class="w-full"
                src={game.image + "_200.jpg"}
                alt={game.title}
                title={game.title}
                loading="lazy"
              />
              <div class="px-2 py-2">
                <div class="font-bold text-md">{game.title}</div>
                <div class="text-sm text-gray-600">{game.category}</div>
              </div>
              <!-- PRICES -->
              <div class="pl-3 space-y-3 pb-3">
                {#each Object.values(game.country) as country}
                  <div class="flex flex-inline h-5">
                    <img
                      class="h-full"
                      src={`/flags/${country.toLowerCase()}.svg`}
                      alt={`${country} Flag`}
                    />
                    {#if game.sale}
                      <span class="font-medium text-blue-700 pl-2 self-center"
                        >{game.sale[country]}$</span
                      >
                      <span
                        class="text-sm text-red-700 line-through pl-2 self-center"
                        >{game.price[country]}$</span
                      >
                    {:else}
                      <span class="font-medium pl-2 self-center"
                        >{game.price[country]}$</span
                      >
                    {/if}
                  </div>
                {/each}
              </div>
              <!-- END PRICES -->
            </div>
          </div>
        {/each}
      </div>
    </div>
    <!-- END RESULTS-->

    <!-- PAGINATION -->
    <div class="flex flex-inline w-full mb-2">
      <div class="w-1/3 px-1 ">
        <button
          on:click={previousPage}
          disabled={currentPage <= 1}
          class="disabled:opacity-50 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          &lt;&lt; Previous</button
        >
      </div>

      <div class="w-1/3 px-1 ">
        <div
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {currentPage}
          /
          {totalPages}
        </div>
      </div>

      <div class="w-1/3 px-1 ">
        <button
          on:click={nextPage}
          disabled={currentPage >= totalPages}
          class="disabled:opacity-50 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Next &gt;&gt;</button
        >
      </div>
    </div>

    <!-- END PAGINATION -->
  </div>
</main>
