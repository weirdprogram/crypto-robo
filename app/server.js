const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const bodyParser = require('body-parser');
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()
    server.use(bodyParser.urlencoded({ extended: true }))
    server.use(bodyParser.json())
  
  
//   server.get('/a', (req, res) => {
//     return app.render(req, res, '/a', req.query)
//   })

//   server.get('/b', (req, res) => {
//     return app.render(req, res, '/b', req.query)
//   })
    server.get('/service-worker.js', (req, res) => {
        app.serveStatic(req, res, './.next/service-worker.js');
    });

     //scoping the service workers
     const serviceWorkers = [{
            filename: 'service-worker.js',
            path: './.next/service-worker.js',
        },
        {
            filename: 'firebase-messaging-sw.js',
            path: './public/firebase-messaging-sw.js',
        },
    ];
    
    serviceWorkers.forEach(({
        filename,
        path
    }) => {
        server.get(`/${filename}`, (req, res) => {
            app.serveStatic(req, res, path);
        });
    });
    
    server.all('*', (req, res) => {
        return handle(req, res)
    })
    
    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
});