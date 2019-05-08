var env = {
    port: process.env.PORT || 3000,
    environment:process.env.NODE_ENV || "dev",
    database: function(){
        if (this.process.env.NODE_ENV === "production") {
            return 'mongodb+srv://admin:2ZVI9XKboriqsc81@cluster0-d0edu.mongodb.net/cafe?retryWrites=true'
        }
        return 'mongodb://localhost:27017/cafe' 
    },
    exp:60*60,
    secret:'s-e-c-r-e-t',
    clientID:'921353977648-36jhlh50er5r7bud1mu5lcegnkgg5c8k.apps.googleusercontent.com'
}

module.exports = env;