// Load career data.
fetch("data/career.json").then(response => {
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


// Load projects data.
fetch("data/project.json").then(response => {
    if (!response.ok) throw new Error("File not found.");
    return response.json();
})
.then(data => {
    const projectLength = data.data.length;
    
    // Get component to display projects.
    const projectComp = document.getElementById("project");
    for (let i = 1; i <= projectLength; i++) {
        
        // Get project data.
        const projectData = data.data[i - 1];
        const projectName = projectData.title;
        const projectDesc = projectData.desc;
        const projectLink = projectData.link

        const projectImgList = projectData.images;
        const projectImgLength = projectImgList.length;

        const projectVideoList = projectData.videos;
        const projectVideoLength = projectVideoList.length;

        // Create block to display the project.
        const projectBlock = document.createElement("div");
        projectBlock.className = `projectBlock`;

        const projectNameBlock = document.createElement("div");
        const ul = document.createElement("ul");
        const projectNameText = document.createElement("li");
        const projectLinkText = document.createElement("a");

        const projectDescBlock = document.createElement("div");
        projectDescBlock.className = `projectDesc`;

        // Set project content.
        projectNameText.textContent = projectName;
        projectLinkText.href = projectLink;
        projectLinkText.target = "_blank"; // Open link in a new tab.
        projectLinkText.appendChild(projectNameText);

        ul.appendChild(projectLinkText);
        projectNameBlock.appendChild(ul);
        projectBlock.appendChild(projectNameBlock);

        projectDescBlock.textContent = projectDesc;

        if (projectImgLength > 0 || projectVideoLength > 0) {
            // Create image elements for each project image.
            if (projectImgLength > 0) {
                const projectImgBlock = document.createElement("div");
                for (let j = 0; j < projectImgLength; j++) {
                    const projectImg = document.createElement("img");
                    projectImg.src = projectImgList[j];
                    projectImgBlock.appendChild(projectImg);
                }
                projectDescBlock.appendChild(projectImgBlock);
                projectBlock.appendChild(projectDescBlock);
            }
    
            // Create video elements for each project video.
            if (projectVideoLength > 0) {
                const projectVideoBlock = document.createElement("div");
                for (let j = 0; j < projectVideoLength; j++) {
                    const projectVideo = document.createElement("video");
                    projectVideo.src = projectVideoList[j];
                    projectVideo.controls = true;
                    projectVideoBlock.appendChild(projectVideo);
                }
                projectDescBlock.appendChild(projectVideoBlock);
                projectBlock.appendChild(projectDescBlock);
            }
        } else {
            projectBlock.appendChild(projectDescBlock);
        }

        // Append the project block to the project component.
        projectComp.appendChild(projectBlock);
    }

}).catch(error => {
    console.error("Fetch error: ", error.message);
});
