pm.sendRequest("https://api.hh.ru/suggests/skill_set?text=autocad", function (err, response) {
   var jsonData = response.json(); 
   pm.collectionVariables.set("ID", jsonData.items[0].id);
});

pm.sendRequest("https://api.hh.ru/suggests/areas?text=Санкт+петербург", function (err, response) {
   var jsonData = response.json(); 
   pm.collectionVariables.set("ID_metro", jsonData.items[0].id);
});

pm.sendRequest("https://api.hh.ru/employers?text=QA", function (err, response) {
   var jsonData = response.json(); 
   pm.collectionVariables.set("ID_employer", jsonData.items[0].id);
});

pm.sendRequest({
    url: 'https://isu.ifmo.ru/pls/apex/f?p=2437:3:105758445782604::NO::P3_LIST,P3_CLOSE_FILTER:0,1',
    method: 'POST', 
    header: { 
        "token":"01b8c3515331246214c2dc801cdf855e", 
        "Content-Type": "application/json"
    },
    body: { 
        mode: 'raw',
        raw: JSON.stringify({ 
            "name": "Название этой статьи",
            "abstract": "Тут будет большая и красивая аннотация"
         })
    }
}, function (error, response) {
    pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
    })
});

pm.test("Body matches string", function () {
    pm.expect(pm.response.text()).to.include("статья");
});
pm.test("Response body is equal to a string", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.name).to.eql("Университет ИТМО");
});
pm.test("Status code name has string", function () {
    pm.response.to.have.status("OK");
});

pm.test("Body matches string", function () {
    pm.expect(pm.response.text()).to.include("628426");
});

pm.test("Status code name has string", function () {
    pm.response.to.have.status("OK");
});

pm.test("Response time is less than 150ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(150);
});
