const API_KEY = "579b464db66ec23bdd0000018884ebea4db54f5e63ba95d0357d1920";

const url =`https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24?api-key=${API_KEY}&format=json&limit=100`;

async function getMarketData(){

    try{
        const response = await fetch(url);
        const data = await response.json();
        const records = data.records;
        if(records.length === 0){
            throw new Error("No records found");
        }
        updateFeaturedCommodity(records);
        updateMarketSummary(records);
    }

    catch(error){
        console.error(error);
    }

}
//featured section

function updateFeaturedCommodity(records){
    const featuredCommodity = records.reduce((highest,current) => {
        return Number(current.Modal_Price) > Number(highest.Modal_Price)? current: highest;
    });

    const commodityImages = {

        Potato:"images/potato.jpg",
        Onion:"images/onion.png",
        Wheat:"images/wheat.png",
        Rice:"images/rice.png",
        Soybean:"images/soybean.png",
        Cotton:"images/cotton.png",
        "Green Peas":"images/peas.jpg"

    };

    document.getElementById("commodityName").textContent = featuredCommodity.Commodity;
    document.getElementById("commodityLocation").textContent = `${featuredCommodity.Market}, ${featuredCommodity.State}`;
    document.getElementById("commodityVariety").textContent = featuredCommodity.Variety;
    document.getElementById("commodityDistrict").textContent = featuredCommodity.District;
    document.getElementById("commodityMarket").textContent = featuredCommodity.Market;
    document.getElementById("minPrice").textContent = `₹${featuredCommodity.Min_Price}/qtl`;
    document.getElementById("maxPrice").textContent = `₹${featuredCommodity.Max_Price}/qtl`;
    document.getElementById("modalPrice").textContent = `₹${featuredCommodity.Modal_Price}/qtl`;
    
    console.log(featuredCommodity.Commodity);
    const imagePath = commodityImages[featuredCommodity.Commodity];
    document.getElementById("featuredImage").src = imagePath || "images/defaultCrop.jpg";

}

//summary section

function updateMarketSummary(records){
    const highestCommodity = records.reduce((highest,current) => {
        return Number(current.Modal_Price) > Number(highest.Modal_Price)? current: highest;
    });

    const lowestCommodity = records.reduce((lowest,current) => {
        return Number(current.Modal_Price) <Number(lowest.Modal_Price)? current: lowest;

    });

    const states = new Set(records.map(record => record.State));

    document.getElementById("highestCommodity").textContent =highestCommodity.Commodity;
    document.getElementById("highestPrice").textContent =`₹${highestCommodity.Modal_Price}/qtl`;
    document.getElementById("lowestCommodity").textContent =lowestCommodity.Commodity;
    document.getElementById("lowestPrice").textContent =`₹${lowestCommodity.Modal_Price}/qtl`;
    document.getElementById("stateCount").textContent =states.size;

}

getMarketData();