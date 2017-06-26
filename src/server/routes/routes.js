const url = require('url')
const BADURLSTRING = "BAD URL";

module.exports = routes = (req, res, callback) => {

    var params = url.parse(req.url).pathname.slice(1).split('/');
    
    switch (params[0].toLowerCase()) {
        case 'user':
            //Trying to Log In
            if (req.method == 'GET') {
                callback(undefined, 'user');
            }
            else if (req.method == 'POST') {
                retrieveData(req, (data) => {
                    callback(undefined, data);
                });
            }
            // IMPLEMENT PATCH?
        break;

        case 'characters':
            //requesting a specific character
            if (params[1]) {
                //getting a specific character
                if (req.method == 'GET') {
                    callback(undefined, 'character: ' + params[1]);
                }
                //adding a new character
                else if (req.method == 'POST') {
                    retrieveData(req, (data) => {
                        callback(undefined, data);
                    });
                }
                // TODO: Implement Patch ??
            } else {
            //Get user character list or return bad url
                if (req.method == 'GET') {
                    callback(undefined, 'characters');
                } 
                else
                    callback(BADURLSTRING);
            }
        break;

        case 'stats':
            if (req.method == 'GET') {
                callback(undefined, 'stat');
            }
        break;

        default:
            callback(BADURLSTRING);
    }
};

retrieveData = (request, callback) => {
    var postData = '';
    request.on('data', (part) => {
        postData += part.toString();
    });
    request.on('end', () => {
        callback(postData);
    });
}