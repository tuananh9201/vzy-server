let serverUrl = 'http://localhost:8001/public'
if (process.env.NODE_ENV !== "development") {
    serverUrl = 'https://backend.vzy.co'
    //todo:prelaunch check this
    //Host on amazon S3
}


const generate = () => {
    return (`
        </div>
    </body>
    <script src="https://vzy.netlify.app/hosted/js/helper.js"></script>
    <script src="https://vzy.netlify.app/hosted/js/vzy.js"></script>
    <script src="https://vzy.netlify.app/hosted/js/theme.js"></script>

</html>`
    )
}

export default { generate }
