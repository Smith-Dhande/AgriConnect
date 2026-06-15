// ELEMENTS

const preview = document.getElementById("preview");
const browseBtn = document.getElementById("browseBtn");
const fileInput = document.getElementById("fileInput");
const dropZone = document.getElementById("dropZone");

const diseaseName = document.getElementById("diseaseName");

const diseaseDescription = document.getElementById("diseaseDescription");
const uploadbox = document.getElementById("dropZone");
const fertilizerList = document.getElementById("fertilizerList");


// data object 

const cropDatabase = {

    "leaf-blight": {
        disease: "Leaf Blight",

        description: "Leaf blight can reduce crop yield and affect plant growth.",

        fertilizers: [
            "NPK 20:20:20",
            "DAP",
            "Urea"
        ]
    },

    "yellow-leaf": {
        disease: "Yellow Leaf Disease",

        description: "Nutrient deficiency causing yellowing of leaves.",

        fertilizers: [
            "Zinc Sulphate",
            "NPK 19:19:19"
        ]
    },

    "rust": {
        disease: "Wheat Rust",

        description: "Fungal infection affecting wheat leaves.",

        fertilizers: [
            "Potash",
            "DAP"
        ]
    },

    "powdery-mildew": {
        disease: "Powdery Mildew",

        description: "A fungal disease that appears as white powdery spots on leaves and stems.",

        fertilizers: [
            "NPK 19:19:19",
            "Potash",
            "Micronutrient Mix"
        ]
    },

    "leaf-spot": {
        disease: "Leaf Spot Disease",

        description: "Dark brown or black spots on leaves leading to leaf drop.",

        fertilizers: [
            "Urea",
            "Potash",
            "NPK 12:32:16"
        ]
    },

    "nitrogen-deficiency": {
        disease: "Nitrogen Deficiency",

        description: "Causes yellow leaves, weak growth and low yield.",

        fertilizers: [
            "Urea",
            "Ammonium Sulphate",
            "NPK 20:20:20"
        ]
    },

    "root-rot": {
        disease: "Root Rot",

        description: "Damages roots and reduces nutrient uptake.",

        fertilizers: [
            "DAP",
            "Potash",
            "Organic Compost"
        ]
    }

};


// BROWSE BUTTON

browseBtn.addEventListener("click", () => {
    fileInput.click();
    uploadbox.style.display="none";

});


// FILE INPUT

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    preview.style.display = "block";
    preview.src = URL.createObjectURL(file);

    dropZone.style.display = "none"; // hide after image chosen

    simulateAnalysis(file);
});


// DRAG & DROP

dropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropZone.style.borderColor = "#2D6A4F";
        // uploadbox.style.display="none";


});

dropZone.addEventListener("dragleave", () => {
    dropZone.style.borderColor = "";
    uploadbox.style.display="none";
});

dropZone.addEventListener("drop", (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    if (!file) return;

    preview.style.display = "block";
    preview.src = URL.createObjectURL(file);

    dropZone.style.display = "none";

    simulateAnalysis(file);
});

// DISEASE ANALYSIS

function simulateAnalysis(file) {

    const fileName = file.name.toLowerCase();

    let result;

    if (fileName.includes("blight")) {
        result = cropDatabase["leaf-blight"];
    } 
    else if (fileName.includes("yellow")) {
        result = cropDatabase["yellow-leaf"];

    } else if (fileName.includes("rust")) {

        result = cropDatabase["rust"];

    } else if (fileName.includes("powder")) {

        result = cropDatabase["powdery-mildew"];

    } else if (fileName.includes("spot")) {

        result = cropDatabase["leaf-spot"];

    } else if (fileName.includes("nitrogen")) {

        result = cropDatabase["nitrogen-deficiency"];

    } else if (fileName.includes("root")) {

        result = cropDatabase["root-rot"];

    } else {

        alert(
            "Disease not recognized. "
        );

        return;

    }

    displayResult(result);

}


// DISPLAY RESULT

function displayResult(result) {

    diseaseName.textContent =
        result.disease;

    diseaseDescription.textContent =
        result.description;

    fertilizerList.innerHTML = "";

    result.fertilizers.forEach((fertilizer) => {

        fertilizerList.innerHTML +=
            `<li>${fertilizer}</li>`;

    });

}