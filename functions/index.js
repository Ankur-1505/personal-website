const functions = require('firebase-functions');

const express = require('express');
const fetch = require('node-fetch');

const url = require('url');
const app = express();
 
const appUrl = 'https://websiteproject-sanketnaik99.firebaseapp.com';
const renderUrl = 'https://render-tron.appspot.com/render'; 

function generateUrl(request){
    return url.format({
        protocol : request.protocol,
        host : appUrl,
        pathname : request.originalUrl
    });
}

function detectBot(userAgent){
    const bots = [
        //crawlers
        'googlebot',
        'bingbot',
        'yandexbot',
        'duckduckbot',
        'slurp',
        //social media bots
        'twitterbot',
        'facebookexternalhit',
        'linkedinbot',
        'embedly',
        'baiduspider',
        'pinterest',
        'slackbot',
        'vkShare',
        'facebot',
        'outbrain',
        'W3C_Validator'
    ]
    const agent = userAgent.toLowerCase();

    for(bot of bots){
        if(agent.indexOf(bot) > -1){
            console.log('bot detected', bot, agent);
            return true;
        }
    }

    console.log('no bots'); 
    return false;
}


app.get('*', (req, res) => {

    const isBot = detectBot(req.headers['user-agent']);

    if(isBot) {
        const botUrl = generateUrl(req);

        fetch('${renderUrl}/${botUrl}')
        .then(res => res.text())
        .then(body => {

            res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
            res.set('Vary', 'User-Agent');

            res.send(body.toString());
            return 0;
        })
        .catch(err => console.log(err));
    } else {
        fetch('https://${appUrl}')
        .then(res=> res.text())
        .then(body => {
            res.send(body.toString());
            return 0;
        })
        .catch(err => console.log(err));
    }


});
//exports.app = functions.https.onRequest(app);