
const staticAccessToken = 'This_Is_A_STATIC_ACCESS_TOKEN'
const staticEmail = 'a'
const staticPassword = 'a'

export function checkAccessToken(accessToken) {
    if (staticAccessToken === accessToken){
        return true;
    }
    return false;
}

export const checkLogin = async (req, res) => {
    // get the data form request
    const userName = req.body.username;
    const password = req.body.password;

    // send access token back
    if (staticEmail === userName &&
        staticPassword === password
    ){
        res.status(200).json({accessToken: staticAccessToken});
    }else {
        return res.status(403).json({ error: `Permission denied. Username or Email is wrong` });
    }
};