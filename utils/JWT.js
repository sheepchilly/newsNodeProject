const jsonwebtoken = require('jsonwebtoken');
const secret = "chilly"; //JWT的密钥

const JWT = {
    //1.生成token的
    generate(value,expires){   
        //生成签名 （传进来的值，密钥，过期时间）
        return jsonwebtoken.sign(value,secret,{expiresIn:expires})
    },
    //2.验证token的
    verify(token){
        // 解密 （传进来的token，密钥）
        try{
            return jsonwebtoken.verify(token,secret)
        }catch(err){
            return false
        }
    }
}

module.exports = JWT
