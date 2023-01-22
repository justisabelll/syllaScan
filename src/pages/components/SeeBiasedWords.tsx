export default function SeeBiasedWords({ potentiallyBiasedWords }:{ potentiallyBiasedWords: string[] }) {

    return (
        //center the button
        <div className="flex justify-center mt-4 sticky top-32">
            <button className='btn btn-wide' onClick={() => addUnderline(potentiallyBiasedWords)}>See Problematic Words</button>
        </div>

    )

// bug: html can be seen if the word "class is passed in", also underline words lose uppercase letters (not sure if this matters)

    // function that adds a span with underline class to each of the html text that matches the input text
function addUnderline(inputText: string[]) {
    // add each element with an id of inputText to an array
    const inputTextElements = document.querySelectorAll("#inputText")
    // loop through each element in the array
    inputTextElements.forEach((element) => {
        // loop through each word in the inputText array
        inputText.forEach((word) => {
            // create a regex to match the word
            const regex = new RegExp(word, "gi")
            // replace the word with a span with the underline class
            element.innerHTML = element.innerHTML.replace(regex, `<span class="underline">${word}</span>`)
        })
    })
    console.log(inputTextElements)
}
}
