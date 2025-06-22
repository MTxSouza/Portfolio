// Load career data.
fetch("career.json").then(response => {
    if (!response.ok) throw new Error("File not found.");
    return response.json();
})
.then(data => {
    const careerLength = data.data.length;
    
    // Get component to display career.
    const careerComp = document.getElementById("career");
    for (let i = 1; i <= careerLength; i++) {

        // Get role data.
        const roleData = data.data[i - 1];
        const companyName = roleData.company;
        let title = roleData.title;
        const description = roleData.desc;
        const picPath = roleData.pic;

        const date = roleData.date;
        const dateStart = date.start;
        const dateEnd = date.end || { month: "Present", year: "" };

        // Add date to the role.
        title = `${title} | ${dateStart.month} ${dateStart.year} - ${dateEnd.month} ${dateEnd.year}`;

        // Create block to display the role.
        const careerBlock = document.createElement("div");
        careerBlock.className = `careerBlock`;

        const roleImg = document.createElement("img");

        const roleInfo = document.createElement("div");
        roleInfo.id = `roleInfo`;

        const ul = document.createElement("ul");
        const companyTitle = document.createElement("li");
        const roleSubTitle = document.createElement("div");

        const roleDescBlock = document.createElement("div");
        roleDescBlock.id = `roleDesc`;

        // Set role content.
        roleImg.src = picPath;
        careerBlock.appendChild(roleImg);

        companyTitle.textContent = companyName;
        roleSubTitle.textContent = title;
        ul.appendChild(companyTitle);
        ul.appendChild(roleSubTitle);
        roleInfo.appendChild(ul);

        roleDescBlock.textContent = description;
        roleInfo.appendChild(roleDescBlock);

        careerBlock.appendChild(roleInfo);
        careerComp.appendChild(careerBlock);
    }
})
.catch(error => {
    console.error("Fetch error: ", error.message);
});
