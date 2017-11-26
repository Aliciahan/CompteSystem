<h1 align="center" id="0">API 文档</h1> 



---

**Table of Content:**


- [1 票据接口](#piao)
    - [1.1 票据的录入](#piao-insert)
    - [1.2 票据的获取](#piao-get)
    - [1.3 由票据单号查询票据](#piao-get-by-Name)
- [2 用户](#user)

---


<h2 id="piao">1. 票据接口</h2>

在这里我们进行票据的录入, 排序, 更新, 删除 等操作. 

<h3 id="piao-insert">1.1 票据的录入 </h3>


**Access Point**:

| Method | Path | 
|:----------------:|:----------------:|
| POST | /piao |

**Content**:

| Attribute | Description | Example |
|:----------------:|:----------------:|:-----------:|
| idNum | 汇票号 | 12345678|
| bank | 银行名称 | ICBC |
| type | 类别 | dianpiao 或者 guogu |
| amount | 金额 | 50000 |
| endDate | 截止日期 | 以秒记, shell: date +%s, js: Date.now() |
| addDate | 加入日期 | 同上 |

**Example:**

~~~bash
curl -H "Content-Type: application/json" \
-X POST "http://localhost:3000/piao" \
-d '{"idNum":"9326","bank":"CCB","type":"dianpiao","amount":"5106","addDate":"1511719139","endDate":"1511719706"}'
~~~

[Back To Top](#0)

<h3 id="piao-get"> 1.2 票据的获取 </h3>

**Access Point** :

| Method | Path | 
|:----------------:|:----------------:|
| GET | /piao |


**Parameters** :

| Attribute | Description | Example |
|:----------------:|:----------------:|:-----------:|
| order | 查询的顺序 | add-date-desc, add-date-ace, idNum-desc, idNum-ace, endDate-desc, endDate-ace |
| page | 页数 | 2 |
| n | 每页的项目数 | 25 |


**Examples:**

~~~bash
# get all in a time, parameters by default 
curl "http://localhost:3000/piao"

# 按照idNum降序排序, 取得第二页, 每页五行
curl "http://localhost:3000/piao?page=2&n=5&order=idNum-desc"

~~~


<h3 id="piao-get-by-Name"> 1.3 由票据单号查询票据</h3>

**Access Point** :

| Method | Path | 
|:----------------:|:----------------:|
| GET | /piao/piaoid |


**Parameters** :

| Attribute | Description | Example |
|:----------------:|:----------------:|:-----------:|
| idNum | 票据号 | 12345678 |


**Examples:**

~~~bash
curl "http://localhost:3000/piao/piaoid?idNum=8982"
~~~



