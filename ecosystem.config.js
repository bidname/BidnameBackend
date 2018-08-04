/**
 * Created by lilu on 2018/8/4.
 */
module.exports = {
  apps : [{
    name   : "bidnameCloud",
    script : "./bin/www",
    watch  : true,
    log_date_format: "YYYY-MM-DD HH:mm:ss Z",
    env: {
      EOSIO_CONTRACT_ACCOUNT: "bidname",
      EOSIO_STARTING_BLOCK: 1,
      EOSIO_HTTP_URL: 'http://127.0.0.1:8888',
      PORT: 4000,
      MONGODB_URL: 'mongodb://139.196.84.116/bidname_dev',
      MONGODB_USER: 'bidname',
      MONGODB_PASS: 'bidname401a',
    },
    env_staging : {
      EOSIO_CONTRACT_ACCOUNT: "bidnamefirst",
      EOSIO_STARTING_BLOCK: 1,
      EOSIO_HTTP_URL: 'https://api.kylin-testnet.eospace.io',
      PORT: 4000,
      MONGODB_URL: 'mongodb://139.196.84.116/bidname_stg',
      MONGODB_USER: 'bidname',
      MONGODB_PASS: 'bidname401a',
    },
    env_production : {
      EOSIO_CONTRACT_ACCOUNT: "eosiobidname",
      EOSIO_STARTING_BLOCK: 1,
      EOSIO_HTTP_URL: 'http://api.eosnewyork.io:80',
      PORT: 4000,
      MONGODB_URL: 'mongodb://139.196.84.116/bidname',
      MONGODB_USER: 'bidname',
      MONGODB_PASS: 'bidname401a',
    }
  }]
}