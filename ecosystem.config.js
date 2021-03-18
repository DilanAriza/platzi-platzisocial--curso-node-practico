module.exports = {
    apps: [{
            name: 'API-MAIN',
            script: 'src/api/index.js',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '150M',
            env: {
                "NODE_ENV": "DEV",
            },
            env_production: {
                "NODE_ENV": false
            }
        },
        {
            name: 'API-MYSQL',
            script: 'src/microservices/mysql/index.js',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '150M',
            env: {
                "NODE_ENV": "DEV",
            },
            env_production: {
                "NODE_ENV": false
            }
        },
        {
            name: 'API-POST',
            script: 'src/microservices/post/index.js',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '150M',
            env: {
                "NODE_ENV": "DEV",
            },
            env_production: {
                "NODE_ENV": false
            }
        }
    ]
}