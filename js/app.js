const categoryId = 1000;

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
  const btnContainer = document.getElementById("btn-container");
  data.forEach((btn) => {
    // console.log(btn);
    // console.log(btn);
    const div = document.createElement("div");
    div.innerHTML = `
        <button onclick="loadDataByCategory('${btn.category_id}')" class="font-medium btn bg-gray-300 text-black hover:bg-gray-400">${btn.category}</button>
        `;
    btnContainer.appendChild(div);
  });
};

/**
 *
 * @param {Array} data
 */
const displayVideo = (data) => {
  const videoContainer = document.getElementById("video-container");
  data.forEach((video) => {
    console.log(video);
    const div = document.createElement("div");
    div.innerHTML = `
   <div class="card card-compact w-96 bg-base-100 shadow-xl">
     <figure>
      <img src="${video?.thumbnail}" alt="Shoes" />
      </figure>
  <div class="px-4 pb-6">
    <div class="flex items-start gap-4 mt-5">
        <img class="size-10 rounded-full object-cover" src="${video?.authors[0]?.profile_picture}"/>
        <div class="space-y-[10px]">
        <h3 class="font-bold text-white leading-6 ">${video.title}</h3>
         <div class="flex items-center gap-3">
         <p>${video?.authors[0]?.profile_name}</p>
          <img src="../image/verify.png"/>
         </div>
         <p><span>${video.others?.views}</span> views</p>
        </div>
    </div>
</div>
        `;

    videoContainer.appendChild(div);
  });
};

const loadDataByCategory = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const { data } = await res.json();
  displayVideo(data);
};
loadDataByCategory(categoryId);
loadData();


