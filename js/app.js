const btnContainer = document.getElementById("btn-container");
let categoryId = 1000;

const loadData = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const { data } = await res.json();
  createButton(data);
};
/**
 *
 * @param {Array} data
 */
const createButton = (data) => {
  data.forEach((btn) => {
    // console.log(btn);
    const button = document.createElement("button");
    button.innerText = btn.category;
    button.dataset.id = btn.category_id;
    button.classList = `py-2 px-5 rounded-md ${
      btn.category === "All"
        ? "bg-primary text-white"
        : "bg-gray-300 text-black"
    }`;
    btnContainer.appendChild(button);
    handleCategoryButton(button);
  });
};

const handleCategoryButton = (button) => {
  const categoryId = button.dataset.id;
  button.addEventListener("click", (e) => {
    loadDataByCategory(categoryId, false);
    handleCategoryButtonColor(e)
  });
};
/**
 * 
 * @param {Event} e 
 */
const handleCategoryButtonColor = (e)=>{
    const allButtons = btnContainer.querySelectorAll("button");
    allButtons.forEach((btn) => {
      if (btn.classList.contains("bg-primary")) {
        btn.classList.remove("bg-primary", "text-white");
        btn.classList.add("bg-gray-300", "text-black");
      }
      e.target.classList.remove("bg-gray-300", "text-black");
      e.target.classList.add("bg-primary", "text-white");
    });
}

/**
 *
 * @param {Array} video
 */

const showPublishDate = (video) => {
  let publish;
  const publishDate = parseFloat(video?.others?.posted_date);
  if (publishDate && typeof publishDate === "number") {
    const hour = Math.floor(publishDate / 3600000) % 24;
    const min = Math.floor(publishDate / 60000) % 60;
    const sec = Math.floor(publishDate / 1000) % 60;

    if (min > 0) {
      publish = `<p class='absolute bg-black/80 text-white px-4 py-1 rounded-2xl bottom-[7%] right-[4%]'><span>${hour
        .toString()
        .padStart(2, 0)}</span>hr <span>${min
        .toString()
        .padStart(2, 0)}</span>min <span>${sec}</span>sec ago</p>`;
    }
  }
  return publish;
};

/**
 * sort video by views
 * @param {Array} data
 * @param {Boolean} isSort
 *
 */
const sortByView = (data, isSort) => {
  if (isSort) {
    return data.sort((a, b) => {
      const video1 = parseFloat(a.others.views.replace("K", "")) || 0;
      const video2 = parseFloat(b.others.views.replace("K", "")) || 0;
      return video2 - video1;
    });
  }
};

/**
 *
 * @param {Array} data
 */
const showPlaceholder = (data) => {
  if (data.length === 0) {
    document.getElementById("video-placeholder").classList.remove("hidden");
  } else {
    document.getElementById("video-placeholder").classList.add("hidden");
  }
};

/**
 * display youtube video
 * @param {Array} data
 * @param {Boolean} isSort
 */
const displayVideo = (data, isSort) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  // show placeholder when no video available in category
  showPlaceholder(data);
  // sort video by button click
  sortByView(data, isSort);

  data.forEach((video) => {
    //conditionally show publish date
    let publish = showPublishDate(video);

    const verify = video?.authors[0]?.verified;
    const div = document.createElement("div");
    div.innerHTML = `
   <div class="card card-compact  bg-gray-200 shadow-xl">
     <figure class='relative'>
      <img class="h-[200px] w-full" src="${video?.thumbnail}" alt="Shoes" />
        ${publish ? publish : ""}
      </figure>
  <div class="px-4 pb-6">
    <div class="flex items-start gap-4 mt-5">
        <img class="size-10 rounded-full object-cover" src="${
          video?.authors[0]?.profile_picture
        }"/>
        <div class="space-y-[10px]">
        <h3 class="font-bold text-black/80 leading-6 ">${video.title}</h3>
         <div class="flex items-center text-black/80 gap-3">
         <p>${video?.authors[0]?.profile_name}</p>
          ${verify ? `<img src="../image/verify.png"/>` : ""}
         </div>
         <p class="text-black/80"><span>${video.others?.views}</span> views</p>
        </div>
    </div>
</div>
        `;

    videoContainer.appendChild(div);
  });
};

const sortVideoByView = () => {
  loadDataByCategory(categoryId, true);
};

const loadDataByCategory = async (id, isSort) => {
  categoryId = id;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const { data } = await res.json();
  displayVideo(data, isSort);
};
loadDataByCategory(categoryId, false);
loadData();

