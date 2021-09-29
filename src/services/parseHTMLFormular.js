export function parseHTMLFormular(htmlFormular, parseValues) {
    parseValues.forEach(obj => {
        htmlFormular = htmlFormular.replace(obj.placeholder, obj.replacement)
    })
    return htmlFormular;
}