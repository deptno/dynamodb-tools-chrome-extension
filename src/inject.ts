import isBase64 from 'is-base64'
import {inflateSync} from 'browserify-zlib'
import {Buffer} from 'buffer'

(async () => {
  if (document.querySelector('refine-dynamodb')) {
    return
  }

  const container = document.createElement('div')
  const panel = document.createElement('pre')
  const closeButton = document.createElement('a')

  closeButton.addEventListener('click', () => container.classList.remove('show'))
  closeButton.textContent = 'X'

  container.id = 'refine-dynamodb'
  container.appendChild(closeButton)
  container.appendChild(panel)

  const handler = function (mutations) {
    mutations.forEach(function (mutation) {
      const element = mutation.target as Element
      const nodes = element.querySelectorAll('.tree.node-last-column-value>div[contenteditable]')

      if (element.firstElementChild) {
        if (element.firstElementChild.tagName === 'FORM') {
          for (const n of nodes) {
            if (isBase64(n.textContent)) {
              try {
                const buffer = Buffer.from(n.textContent, 'base64')
                const unzipped = inflateSync(buffer)
                const data = JSON.parse(unzipped)

                const enter = () => {
                  panel.innerHTML = JSON.stringify(data, null, 2)
                  container.classList.add('show')
                }

                n.addEventListener('mouseenter', enter)
              } catch (e) {
                console.error(e)
              }
            }
          }
        }
      }
    })
  }
  const observer = new MutationObserver(handler)
  observer.observe(document.body, {
    attributes: true,
    subtree   : true,
  })

  const css = /* language=css */ `#refine-dynamodb {
      position: fixed;
      left: 0;
      bottom: 0;
      height: 30%;
      width: 100%;
      padding: 1em;
      margin: 0;
      background: mediumblue;
      color: white;
      font-size: 1em;
      white-space: pre-wrap;
      display: none;
      z-index: 110;
      overflow: scroll;
  }
  #refine-dynamodb>a {
      font-size: 2em;
      color: red;
  }
  #refine-dynamodb.show {
      display: block;
  }
  `
  const style = document.createElement('style')
  style.id = 'refine-dynamodb-stylesheet'
  const cssNode = document.createTextNode(css)
  style.append(cssNode)

  document.head.appendChild(style)
  document.body.appendChild(container)

})()
