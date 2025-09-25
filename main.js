document.getElementById("findBtn").addEventListener("click", async () => {
  const ing = document.getElementById("ingredients").value.trim();

  if (!ing) {
    alert("Please enter ingredients!");
    return;
  }

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "<p class='muted'>Searching...</p>";

  try {
    const res = await fetch("https://smart-recipe-finder-using-ai-6.onrender.com/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "ingredients": ing })
    });

    const data = await res.json();
    let html = "";

    if (data.recipe && data.recipe.length > 0) {
      html = `<div class='recipe-card'>
                <pre>${data.recipe.join("\n")}</pre>
              </div>`;
    } else if (data.error) {
      html = `<p class='muted'>Error: ${data.error}</p>`;
    } else {
      html = "<p class='muted'>No recipe found.</p>";
    }

    resultsDiv.innerHTML = html;

  } catch (err) {
    console.error(err);
    resultsDiv.innerHTML = "<p class='muted'>Failed to fetch recipe. Check server or network.</p>";
  }
});
