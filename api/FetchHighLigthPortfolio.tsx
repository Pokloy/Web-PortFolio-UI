// Helper function to fetch portfolio data from the API
export async function fetchPortfolioData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/work/get-work`);
    const data = await res.json();
  
    // Format the data
    const formattedData = data.getallWork.map((item: any) => ({
      ...item,
      picture: item.picture
        .replace(
          "https://drive.google.com/file/d/",
          "https://drive.google.com/uc?export=view&id="
        )
        .replace("/view?usp=sharing", ""),
    }));
  
    // Randomize and slice the data
    return formattedData.sort(() => 0.5 - Math.random()).slice(0, 8);
  }
  