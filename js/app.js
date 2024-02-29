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
    console.log(btn);
    console.log(btn);
    const div = document.createElement("div");
    div.innerHTML = `
        <button class="font-medium btn bg-gray-300 text-black hover:bg-gray-400">${btn.category}</button>
        `;
    btnContainer.appendChild(div);
  });
};

loadData();
