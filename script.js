const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const moodEl = document.getElementById("mood");
const btn = document.getElementById("btn");

//  API_KEY
const API_KEY = "E9BjXxjoYhc5MBsM8h75Hw==xr7g9TPC7y6vs2Al";

//   mood → category mapping
const moodCategoryMap = {
    happy: "hope",
    sad: "failure",
    motivation: "success",
    wisdom: "wisdom"
};

btn.addEventListener("click", generateQuote);

async function generateQuote() {
    const mood = moodEl.value;
    const category = moodCategoryMap[mood];

    //  avoid same quote
    const offset = Math.floor(Math.random() * 40);

    quoteEl.textContent = "Loading...";
    authorEl.textContent = "";

    try {
        const response = await fetch(
            `https://api.api-ninjas.com/v2/quotes?category=${category}&limit=1&offset=${offset}`,
            {
                headers: {
                    "X-Api-Key": API_KEY
                }
            }
        );

        if (!response.ok) throw new Error("API Error");

        const data = await response.json();
        if (!data.length) throw new Error("No quote found");

        const quoteData = data[0];

        // restart animation
        quoteEl.style.animation = "none";
        quoteEl.offsetHeight;
        quoteEl.style.animation = "fadeIn 0.6s forwards";

        quoteEl.textContent = `"${quoteData.quote}"`;
        authorEl.textContent = `— ${quoteData.author}`;

    } catch (error) {
        quoteEl.textContent = "❌ Failed to load quote";
        authorEl.textContent = "";
    }
}
