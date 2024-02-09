const APIKey="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"
const submitIcon = document.querySelector("#submit-icon")
const inputElement = document.querySelector("input")
const imageSection =document.querySelector('.images-section')


 async function getImages() {
    const options = {
        method: "POST",
        headers: {
            "Authorisation": `Bearer ${APIKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: inputElement.value,
            n: 4,
            size: "1024x1024"
        })
    }
    try {
        const resposne = await fetch("https://api.openai.com/v1/images/generations")
        const data = await Response.json()
        console.log(data)
        method:"POST",
        data?.data.forEach(imageObject => {
            const imageContainer = document.createElement("div")
            imageContainer.classList.add("image-container")
            const imageElement = document.createElement("img")
            imageElement.setAttribute("src", imageObject.url)
            imageContainer.append(imageElement)
            imageSection.append(imageContainer)


        })
    }
    catch (error) {
        console.error(error)
    }
}

submitIcon.addEventListener('click' , getImages)