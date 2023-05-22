///-----創建問卷-----///
function creatNewQuery(caption, content, startDate, endDate) {

    let objPostData = {
        caption: caption,
        content: content,
        start_date: startDate,
        end_date: endDate,
    }
    $.ajax({
        url: "http://localhost:8080/api/creatNewCaption",
        method: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(objPostData),
        success: function (response) {
            let { message } = response
            // alert(message)
        },
        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    })
}


///-----創建題目-----///
function creatQuestion(caption, question, opt, selectedOption, required) {
    alert(question)
    let objPostData = {
        //key/value
        caption: caption,
        question: question,
        opt: opt,
        selectedOption: selectedOption,
        required: required

    }
    $.ajax({
        url: "http://localhost:8080/api/creatQuestion",
        method: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(objPostData),
        success: function (response) {
            let { message } = response
            // alert(message)
        },
        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    })
}



///-----修改問卷名稱-----///
function reviseCaption(caption, newCaption, content, newContent, startDate, endDate) {
    let objPostData = {
        caption: caption,
        new_caption: newCaption,
        content: content,
        new_content: newContent,
        startDate: startDate,
        endDate: endDate
    }
    $.ajax({
        url: "http://localhost:8080/api/reviseCaption",
        method: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(objPostData),
        success: function (response) {
            let { message } = response
            // alert(message)
        },
        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    })
}
// ///-----修改問卷問題跟選項-----///
function reviseQuestions(caption, question, newQuestion, newOpt, selectedOption, required) {
    alert(newQuestion)
    let objPostData = {
        //新問卷名
        caption: caption,
        //舊問題
        question: question,
        //新問題
        new_question: newQuestion,
        //舊選項 (可為空)
        // opt: opt,
        //新選項
        new_opt: newOpt,
        //複選
        selectedOption: selectedOption,
        //必填
        required: required

    }
    $.ajax({
        url: "http://localhost:8080/api/reviseQuestions",
        method: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(objPostData),
        success: function (response) {
            let { message } = response
            // alert(message)
        },
        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    })
}

///-----儲存作答者資料-----///
function creatUserInfo(caption, question, ans, name, phone, mail, age, finishTime) {

    let objPostData = {
        caption: caption,
        question: question,
        ans: ans,
        name: name,
        phone: phone,
        mail: mail,
        age: age,
        finishTime: finishTime
    }
    $.ajax({
        url: "http://localhost:8080/api/creatUserInfo",
        method: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(objPostData),
        success: function (response) {
            let { message } = response
            // alert(message)
        },
        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    })
}


///-----讀取問卷-----///
function findByCaption(caption) {
    let suppage = '';
    let nextpage = '';
    suppage = '<button id="sup-page" class="page-btn">上一頁</button>&nbsp;&nbsp;&nbsp;';
    nextpage = '&nbsp;&nbsp;&nbsp;<button id="next-page" class="page-btn">下一頁</button>';
    let objPostData = {
        caption: caption

    }
    $.ajax({
        url: "http://localhost:8080/api/findByCaption",
        method: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(objPostData),
        success: function (response) {
            let { message, queryAddList } = response
            // alert(message)
            //==
            changePageForPeople(1, queryAddList);

            var page = document.querySelector('.page_btnForPeople'); //要塞按鈕的位置

            var btnNum = Math.ceil(queryAddList.length / 10); //算出每頁要顯示10筆資料所需要的按鈕 ##

            console.log(btnNum + "btnNum")

            let str = '';

            // //看要幾個按鈕，塞進span並且顯示在heml元素的容器
            for (var i = 0; i < btnNum; i++) {
                str += `<span id="spanPage">${i + 1}</span>`;

            };

            // //塞進html元素中的容器
            page.innerHTML = suppage + str + nextpage;

            // //使用 querySelectorAll 選出下面所有的按鈕
            var btn = document.querySelectorAll('.page_btnForPeople span')

            // //選取到了每顆按鈕後，我們分別去做綁定監聽的動作
            for (var i = 0; i < btn.length; i++) {
                btn[i].addEventListener('click', changePageForPeople.bind(this, (i + 1), queryAddList))
            }

            // //監聽上一頁、下一頁
            const nextPageBtn = document.querySelector('#next-page');
            const supPageBtn = document.querySelector('#sup-page');
            supPageBtn.addEventListener('click', (e) => {
                e.preventDefault()
                if (pageNumber <= 1) {
                    changePageForPeople(1, queryAddList);
                } else {
                    //回到當前頁面的上一筆
                    changePageForPeople(pageNumber - 1, queryAddList);
                }
            });

            nextPageBtn.addEventListener('click', (e) => {
                e.preventDefault()
                if (pageNumber >= btn.length) {

                    changePageForPeople(pageNumber, queryAddList);
                } else {
                    //回到當前頁面的下一筆
                    changePageForPeople(pageNumber + 1, queryAddList);
                }
            });

            //==
            //     $('#tab3feedBack').empty()
            //     $('#tab3feedBack').append(`<thead>
            //     <tr>
            //         <th>#</th>
            //         <th>姓名</th>
            //         <th>填寫時間</th>
            //         <th>觀看細節</th>
            //     </tr>
            //     </thead>`)

            //     $.each(usersList, function(index, value){
            //         let num = index + 1
            //     $('#tab3feedBack').append(`<tr><td>${num}</td><td>${value.name}</td/><td>${value.finishTime}</td/><td><button id="GotofeedbackBtn_${value.id}">前往</button></td></tr>`)

            // })

        },
        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    })
}


///-----上一頁 下一頁 問卷回饋分頁-----///
function changePageForPeople(page, data) {

    //全域變數:用於得知當前頁數
    pageNumber = page;
    console.log(pageNumber + "頁")

    //代表每頁出現 10 筆資料
    var items = 10;

    //按鈕按下 1，會出現 1～10筆資料，但陣列索引值卻是 0～9 的資料，以此類推
    var pageIndexStart = (page - 1) * items

    var pageIndexEnd = page * items

    //每次近來這function先清空
    $('#tab3feedBack').empty()


    $('#tab3feedBack').append(`<thead>
                    <tr>
                        <th>#</th>
                        <th>姓名</th>
                        <th>填寫時間</th>
                        <th>觀看細節</th>
                    </tr>
                    </thead>`)

    //索引1-10資料
    for (var i = pageIndexStart; i < pageIndexEnd; i++) {
        if (i >= data.length) { break; }
        let num = i + 1;
        //解構，看第幾筆資料
        let item = data[i]
        let time = (item.finishTime).replace('T', ' ')
        $('#tab3feedBack').append(`<tr><td>${num}</td><td>${item.name}</td/><td>${time}</td/><td><button id="GotofeedbackBtn_${item.id}">前往</button></td></tr>`)
    }
};

///-----讀取使用者資料-----///
function findUserByCaption() {

    $.ajax({
        url: "http://localhost:8080/api/findUserByCaption",
        method: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(),
        success: function (response) {
            let { message, queryDepositList, user } = response
            // alert(message)

            $('#userName').val(queryDepositList.name)
            $('#userPhone').val(queryDepositList.phone)
            $('#userEmail').val(queryDepositList.mail)
            $('#userAge').val(queryDepositList.age)
            $('#userFinish').val(queryDepositList.finishTime.replace('T', ' '))

            let qa = queryDepositList.userAns.split(',')
            for (let item of qa) {
                let question = item.split('=')[0].trim()
                let answer = item.split('=')[1].trim()

                if (answer.includes(';')) {
                    manyAns = answer.split(';')

                    for (let item2 of manyAns) {
                        $('#topic1').find('#' + question + '_' + item2).prop("checked", true)
                    }
                } else {
                    $('#topic1').find('#' + question + '_' + answer).prop("checked", true)
                }
                // $("#check123").prop("checked",true)
            }
        },
        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    })
}


// ///-----顯示統計資料帶入問卷Id-----///
function countByAns(caption) {
    let objPostData = {
        caption: caption
    }
    $.ajax({
        url: "http://localhost:8080/api/countByAns",
        method: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(objPostData),
        success: function (response) {
            let { message, queryCountList } = response
            alert(message)


            $('#tab4statistics').empty()
            var statistics = new Map()

            for (let item of queryCountList) {
                statistics.set(item.question, '')
            }

            statistics.forEach(function (value2, key2) {
                var option = new Map()
                for (let item2 of queryCountList) {
                    if (key2 === item2.question) {
                        option.set(item2.answer, item2.percentage)
                    }
                }
                statistics.set(key2, option)
            })

            // MAP<item.question, Map<item2.answer, item2.percentage>>


            let num =0
            statistics.forEach(function (value, index){
                num++
                $('#tab4statistics').append(`<h2 style="color:red;">${index} </h2>`)
                $('#tab4statistics').append(`<canvas id="myChart_${num}"></canvas> 
                <br>
                <hr>
                <br>`)

                let numList = []
                let numList2= []
                // numList.push(item.answer)
                // numList2.push(item.percentage)
                value.forEach(function (value2, key){
                    numList.push(key)
                    numList2.push(value2)
                })

                // 用ID找出元素(問題名稱)
                const ctx = document.getElementById('myChart_'+ num);
                // 將找到的值帶進ctx
                new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: numList,
                        datasets: [{
                            label: "%",
                            data: numList2,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                            beginAtZero: true
                            }
                        }
                    }
                });
            })
        },
        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    })
}

// ///-----顯示統計資料帶入問卷Id-----///
// function countByAns(caption) {
    //     let objPostData = {
    //         caption: caption
    //     }
    //     $.ajax({
    //         url: "http://localhost:8080/api/countByAns",
    //         method: 'POST',
    //         contentType: "application/json",
    //         dataType: "json",
    //         data: JSON.stringify(objPostData),
    //         success: function (response) {
    //             let { message, queryCountList } = response
    //             alert(message)
    
    
    //             $('#tab4statistics').empty()
    //             // 單一題的選項
    //             // let ansList = []
    //             // 要想辦法讓不同提的問卷作答不要塞在同一個List裡
    
    
    //             // 統計結果(百分比) 一樣要讓不同提的問卷作答不要塞在同一個List裡
    //             // let statistics = []
    
    //             // 問卷題目
    //             // let question = ''
    
    
    
    //             let ansList = [queryCountList.question]
    //             let list = []
    //             for (let item of queryCountList) {
    //                 list.set(item)
    //             }
    //             //     // 新增圖表，給他ID(myChart_問題名稱)
    //             $('#tab4statistics').append(`<canvas id="myChart_${value.question}"></canvas><br><hr><br>`)
    
    
    
    
    //             // let map = new Map
    //             // $.each(queryCountList, function (key, value) {
    //             //     // 新增圖表，給他ID(myChart_問題名稱)
    //             //     $('#tab4statistics').append(`<canvas id="myChart_${value.question}"></canvas><br><hr><br>`)
    //             //     question = value.question
    //             //     ansList.push(value.answer)
    //             //     statistics.push(value.percentage)
    
    
    //             // })
    
    //             // 用ID找出元素(問題名稱)
    //             const ctx = document.getElementById('myChart_' + question);
    
    //             // 將找到的值帶進ctx
    //             new Chart(ctx, {
    //                 type: 'pie',
    //                 data: {
    //                     labels: ansList,
    //                     datasets: [{
    //                         label: question,
    //                         data: statistics,
    //                         borderWidth: 1
    //                     }]
    //                 },
    //                 options: {
    //                     scales: {
    //                         y: {
    //                             beginAtZero: true
    //                         }
    //                     }
    //                 }
    //             });
    //         },
    //         error: function (e) {
    //             console.log(e)
    //             alert('Failed')
    //         },
    //     })
    // }
    