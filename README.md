<h1 align="center" id="0"> 一个简单的账单处理系统 </h1> 

---

**Table of Content:**


[1 Pre-requires](#pre)

---


<h1 id="pre"> 1. Pre-requires </h1>

Before starting this Node services, we should first start our MongoDB Database, to achieve this:

> docker-compose up

You should have seen the following messages: 

~~~bash
MBP-de-XICUN:CompteSystem xicunhan$ docker-compose up
Creating network "comptesystem_default" with the default driver
Pulling mongodb (mongo:latest)...
Digest: sha256:2c55bcc870c269771aeade05fc3dd3657800540e0a48755876a1dc70db1e76d9
Status: Downloaded newer image for mongo:latest
Creating mongodb ...
Creating mongodb ... done
Attaching to mongodb
mongodb    | 2017-11-12T11:34:45.078+0000 I CONTROL  [initandlisten] MongoDB starting : pid=1 port=27017 dbpath=/data/db 64-bit host=4d100454aa88
mongodb    | 2017-11-12T11:34:45.079+0000 I CONTROL  [initandlisten] db version v3.4.10
mongodb    | 2017-11-12T11:34:45.079+0000 I CONTROL  [initandlisten] git version: 078f28920cb24de0dd479b5ea6c66c644f6326e9
mongodb    | 2017-11-12T11:34:45.079+0000 I CONTROL  [initandlisten] OpenSSL version: OpenSSL 1.0.1t  3 May 2016
mongodb    | 2017-11-12T11:34:45.079+0000 I CONTROL  [initandlisten] allocator: tcmalloc
mongodb    | 2017-11-12T11:34:45.079+0000 I CONTROL  [initandlisten] modules: none
mongodb    | 2017-11-12T11:34:45.079+0000 I CONTROL  [initandlisten] build environment:
mongodb    | 2017-11-12T11:34:45.079+0000 I CONTROL  [initandlisten]     distmod: debian81
mongodb    | 2017-11-12T11:34:45.079+0000 I CONTROL  [initandlisten]     distarch: x86_64
mongodb    | 2017-11-12T11:34:45.079+0000 I CONTROL  [initandlisten]     target_arch: x86_64
mongodb    | 2017-11-12T11:34:45.079+0000 I CONTROL  [initandlisten] options: {}
mongodb    | 2017-11-12T11:34:45.139+0000 I STORAGE  [initandlisten] wiredtiger_open config: create,cache_size=487M,session_max=20000,eviction=(threads_min=4,threads_max=4),config_base=false,statistics=(fast),log=(enabled=true,archive=true,path=journal,compressor=snappy),file_manager=(close_idle_time=100000),checkpoint=(wait=60,log_size=2GB),statistics_log=(wait=0),
mongodb    | 2017-11-12T11:34:45.527+0000 I CONTROL  [initandlisten]
mongodb    | 2017-11-12T11:34:45.527+0000 I CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
mongodb    | 2017-11-12T11:34:45.527+0000 I CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.
mongodb    | 2017-11-12T11:34:45.527+0000 I CONTROL  [initandlisten]
mongodb    | 2017-11-12T11:34:45.546+0000 I FTDC     [initandlisten] Initializing full-time diagnostic data capture with directory '/data/db/diagnostic.data'
mongodb    | 2017-11-12T11:34:45.562+0000 I INDEX    [initandlisten] build index on: admin.system.version properties: { v: 2, key: { version: 1 }, name: "incompatible_with_version_32", ns: "admin.system.version" }
mongodb    | 2017-11-12T11:34:45.562+0000 I INDEX    [initandlisten] 	 building index using bulk method; build may temporarily use up to 500 megabytes of RAM
mongodb    | 2017-11-12T11:34:45.570+0000 I INDEX    [initandlisten] build index done.  scanned 0 total records. 0 secs
mongodb    | 2017-11-12T11:34:45.573+0000 I COMMAND  [initandlisten] setting featureCompatibilityVersion to 3.4
mongodb    | 2017-11-12T11:34:45.575+0000 I NETWORK  [thread1] waiting for connections on port 27017
~~~

Then all the Data persistent will be saved to ./Mongodb-mount

In a production mode, run docker-compose -d up letting the container run in background. 

swagger docs url:
http://localhost:3000/api-docs/

