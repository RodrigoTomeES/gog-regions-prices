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
  export let userCountry = null;
  $: pageContent = searchResult.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  onMount(async () => {
    await fetch("./sales.json")
      .then((response) => response.json())
      .then((data) => {
        sales = data.sort((a, b) => a.title.localeCompare(b.title));
        searchResult = sales;
        totalPages = Math.floor(sales.length / PAGE_SIZE) + 1;
        currentPage = 1;
      });

    await fetch("./lastUpdate.json")
      .then((response) => response.json())
      .then((data) => {
        const last = data.last;
        const day = last.substr(8, 2);
        const month = last.substr(5, 2);
        const hour = last.substr(11, 5);
        lastUpdated = `${day}/${month} - ${hour}`;
      });

    let deferredPrompt;
    const prompt = document.getElementById("BlockInstall");
    const button = document.getElementById("BlockInstallButton");
    const close = document.getElementById("BlockInstallClose");

    button.addEventListener("click", async () => {
      prompt.classList.add("hidden");
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      deferredPrompt = null;
    });

    close.addEventListener("click", async () => {
      prompt.classList.add("hidden");
      deferredPrompt = null;
    });

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      prompt.classList.remove("hidden");
      console.log(`'beforeinstallprompt' event was fired.`);
    });

    window.addEventListener("appinstalled", () => {
      prompt.classList.add("hidden");
      deferredPrompt = null;
      console.log("PWA was installed");
    });

    userCountry = navigator.language?.split("-")[1];
  });

  const search = async () => {
    if (searchTerm.trim() == "") {
      searchResult = sales;
    } else {
      if (games.length === 0) {
        await fetch("./games.json")
          .then((r) => r.json())
          .then((data) => {
            games = data.sort((a, b) => a.title.localeCompare(b.title));
          });
      }

      searchResult = games.filter((game) =>
        game.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    }

    totalPages = Math.floor(searchResult.length / PAGE_SIZE) + 1;
    currentPage = 1;
  };

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

  const nextPage = () => {
    if (currentPage < totalPages) movePage(1);
  };

  const previousPage = () => {
    if (currentPage > 1) movePage(-1);
  };

  const movePage = (direction) => {
    setPage(currentPage + direction);
  };

  const setPage = (page) => {
    currentPage = page;
    document.getElementById("games").scrollIntoView();
  };

  const percentOfDiscount = (countryPrice, userCountryPrice) =>
    Math.round(
      (100 - (countryPrice * 100) / userCountryPrice + Number.EPSILON) * 100
    ) / 100;

  const isCheaper = (countryPrice, userCountryPrice) =>
    parseFloat(countryPrice) < parseFloat(userCountryPrice);
</script>

<svelte:window on:keydown={moveOnKeyPress} />

<main class="container mx-auto px-3">
  <div
    class="hidden bg-white shadow-2xl fixed bottom-0 left-0 right-0 z-50 p-4"
    id="BlockInstall"
  >
    <div class="flex items-center justify-between gap-2">
      <div class="text-4xl" id="BlockInstallClose">x</div>
      <div class="w-12">
        <img
          src="./icons/android/android-launchericon-48-48.png"
          alt="GOG Regions Price logo"
        />
      </div>
      <div class="max-w-[175px]">
        <span class="block font-bold">GOG Regions Price</span>
        <span class="block text-xs">
          Compare GOG's prices between all countries (in dollars)
        </span>
      </div>
      <div>
        <button
          id="BlockInstallButton"
          class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Install
        </button>
      </div>
    </div>
  </div>

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
            If you know of any missing game, report it on
            <a
              class="text-blue-700 underline"
              href="https://github.com/RodrigoTomeES/gog-regions-prices"
            >
              Github
            </a>.
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
            on:keypress={openLink(game.url)}
            class="cursor-pointer flex flex-col w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 px-1 pb-3"
            role="listitem"
          >
            <div
              class="rounded overflow-hidden hover:shadow-lg border-r border-b border-l border-gray-300 flex-1 flex flex-col"
            >
              <img
                class="w-full"
                src={game.image + "_200.jpg"}
                alt={game.title}
                title={game.title}
                loading="lazy"
              />
              <div class="px-2 py-2 flex-grow">
                <div class="font-bold text-md line-clamp-2">{game.title}</div>
                <div class="text-sm text-gray-600">{game.category}</div>
              </div>
              <!-- PRICES -->
              <div class="px-3 space-y-3 pb-3">
                {#each Object.keys(game.price).slice(0, 4) as country}
                  <div class="flex flex-inline h-5">
                    <img
                      class="h-full"
                      src={`./flags/${country.toLowerCase()}.svg`}
                      alt={`${country} Flag`}
                      title={`${country} Flag`}
                    />
                    {#if game.sale}
                      <span class="font-medium text-blue-700 pl-2 self-center">
                        {game.sale[country]}$
                      </span>
                      <span
                        class="text-sm text-red-700 line-through pl-2 self-center"
                      >
                        {game.price[country]}$
                      </span>

                      {#if userCountry && game.price[userCountry]}
                        <span
                          class="text-sm {isCheaper(
                            game.price[country],
                            game.price[userCountry]
                          )
                            ? 'text-green-700'
                            : 'text-red-700'} pl-2 self-center"
                        >
                          {game.sale
                            ? `${
                                isCheaper(
                                  game.price[country],
                                  game.price[userCountry]
                                )
                                  ? "-"
                                  : "+"
                              }${percentOfDiscount(
                                game.sale[country],
                                game.sale[userCountry]
                              )}`
                            : `${
                                isCheaper(
                                  game.price[country],
                                  game.price[userCountry]
                                )
                                  ? "-"
                                  : "+"
                              }${percentOfDiscount(
                                game.price[country],
                                game.price[userCountry]
                              )}`}%
                        </span>
                      {/if}
                    {:else}
                      <span class="font-medium pl-2 self-center">
                        {game.price[country]}$
                      </span>
                    {/if}
                  </div>
                {/each}

                {#if userCountry && game.price[userCountry]}
                  <div class="h-[1px] bg-slate-300 w-full" />

                  <div class="flex flex-inline h-5">
                    <img
                      class="h-full"
                      src={`./flags/${userCountry.toLowerCase()}.svg`}
                      alt={`${userCountry} Flag`}
                      title={`${userCountry} Flag`}
                    />
                    {#if game.sale}
                      <span class="font-medium text-blue-700 pl-2 self-center">
                        {game.sale[userCountry]}$
                      </span>
                      <span
                        class="text-sm text-red-700 line-through pl-2 self-center"
                      >
                        {game.price[userCountry]}$
                      </span>
                    {:else}
                      <span class="font-medium pl-2 self-center">
                        {game.price[userCountry]}$
                      </span>
                    {/if}
                  </div>
                {/if}
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
      <div class="w-1/3 px-1 inline-flex gap-1">
        <button
          on:click={() => setPage(1)}
          disabled={currentPage <= 1}
          class="disabled:opacity-50 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          &lt;&lt;
        </button>

        <button
          on:click={previousPage}
          disabled={currentPage <= 1}
          class="disabled:opacity-50 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          &lt;
        </button>
      </div>

      <div class="w-1/3 px-1">
        <div
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {currentPage}
          /
          {totalPages}
        </div>
      </div>

      <div class="w-1/3 px-1 inline-flex gap-1">
        <button
          on:click={nextPage}
          disabled={currentPage >= totalPages}
          class="disabled:opacity-50 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          &gt;
        </button>

        <button
          on:click={() => setPage(totalPages)}
          disabled={currentPage >= totalPages}
          class="disabled:opacity-50 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          &gt;&gt;
        </button>
      </div>
    </div>

    <!-- END PAGINATION -->
  </div>
</main>
