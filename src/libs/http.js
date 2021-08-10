class Http {
    static instance = new Http();

    get = async (url) => {
        try {
            let req = await fetch(url);

            let json = req.json();

            return json;

        } catch (err) {
            console.log("HTTP/GET error: ", err);

            throw Error(err);
        }
    }

    post = async (url, body) => {
        try {
            let req = await fetch(url, {
                method: 'POST',
                body
            });

            let json = await req.json();

            return json;

        } catch (err) {
            console.log("HTTP/POST error: ", err);

            throw Error(err);
        }
    }


}