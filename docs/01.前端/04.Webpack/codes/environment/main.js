// document.write('<h1>Hello World</h1>');
const myDiv = document.createElement('div')
const content = document.createTextNode(new Date())
myDiv.appendChild(content)

if (__DEV__) {
  document.body.appendChild(myDiv)
  // document.write(new Date());
}
