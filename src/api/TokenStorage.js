export default class TokenStorage
{
    write(token, remember)
    {
        let exp = (new Date().getTime()) + 3600 * 24 * 1000;
        if (remember) {
            exp += 3600 * 24 * 6 * 1000;
        }

        localStorage.setItem('admin_token', JSON.stringify({token: token, exp: exp}));
    }

    isValid()
    {
        let token = localStorage.getItem('admin_token');
        if (token == null)
            return false;

        token = JSON.parse(token);
        let now = new Date().getTime();
        if (now > token.exp)
        {
            localStorage.removeItem('admin_token');
            return false;
        }

        return true;
    }

    get()
    {
        if (this.isValid())
            return JSON.parse(localStorage.getItem('admin_token')).token;
        else return null;
    }

    delete()
    {
        if(this.isValid())
            localStorage.removeItem('token');
    }
}
