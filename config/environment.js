const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});

const development ={
    name: 'development',
    asset_path:process.env.TODO_ASSET_PATH,
    session_cookie_key:process.env.TODO_SESSION_COOKIE_KEY,
    db:process.env.TODO_DB,
    google_client_id:process.env.TODO_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.TODO_GOOGLE_CLIENT_SECRET,
    google_call_back_url:process.env.TODO_GOOGLE_CALL_BACK_URL,
    jwt_secret_key:process.env.TODO_JWT_SECRET_KEY,
    morgan:{
        node:'dev',
        options:{stream:accessLogStream}
    }
}
const production ={
    name:'production',
    asset_path:process.env.TODO_ASSET_PATH,
    session_cookie_key:process.env.TODO_SESSION_COOKIE_KEY,
    db:process.env.TODO_DB,
    google_client_id:process.env.TODO_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.TODO_GOOGLE_CLIENT_SECRET,
    google_call_back_url:process.env.TODO_GOOGLE_CALL_BACK_URL,
    jwt_secret_key:process.env.TODO_JWT_SECRET_KEY,
    morgan:{
        node:'combined',
        options:{stream:accessLogStream}
    }
    
}
module.exports = eval(process.env.TODO_ENVIRONMENT )==undefined?development:eval(process.env.TODO_ENVIRONMENT)