module.exports = {
    apps: [{
            name: 'API-MAIN',
            script: 'api/index.js',
            instances: 2,
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
            script: 'mysql/index.js',
            instances: 2,
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
            script: 'post/index.js',
            instances: 2,
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