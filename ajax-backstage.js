let pageNumber = 0;
///-----顯示所有問卷標題-----///
function showAllCaption() {
    let ary = [];
    let suppage = '';
    let nextpage = '';
    suppage = '<button id="sup-page" class="page-btn">上一頁</button>&nbsp;&nbsp;&nbsp;';
    nextpage = '&nbsp;&nbsp;&nbsp;<button id="next-page" class="page-btn">下一頁</button>';

    $.ajax({
        url: "http://localhost:8080/api/showAllCaption",
        method: 'POST',
        contentType: "application/json",
        dataType: "json",
        success: function (response) {

            $('#table1').empty()
            $('#table1').append(`<thead><th><th>#</th><th>問卷</th><th>狀態</th><th>開始時間</th><th>結束時間</th><th>觀看統計</th></th></thead>`);
            let { message, queryManagerList } = response

            changePage(1, queryManagerList);

            var page = document.querySelector('.page_btn'); //要塞按鈕的位置

            var btnNum = Math.ceil(queryManagerList.length / 10); //算出每頁要顯示10筆資料所需要的按鈕
            console.log(btnNum + "btnNum")

            var str = '';

            // //看要幾個按鈕，塞進span並且顯示在heml元素的容器
            for (var i = 0; i < btnNum; i++) {
                str += `<span>${(i + 1)}</span>`
            };

            // //塞進html元素中的容器
            page.innerHTML = suppage + str + nextpage;

            // //使用 querySelectorAll 選出下面所有的按鈕
            var btn = document.querySelectorAll('.page_btn span')

            // //選取到了每顆按鈕後，我們分別去做綁定監聽的動作
            for (var i = 0; i < btn.length; i++) {
                btn[i].addEventListener('click', changePage.bind(this, (i + 1), queryManagerList))
            }

            // //監聽上一頁、下一頁
            const nextPageBtn = document.querySelector('#next-page');
            const supPageBtn = document.querySelector('#sup-page');
            supPageBtn.addEventListener('click', (e) => {
                e.preventDefault()
                alert(pageNumber + "Api")
                if (pageNumber <= 1) {
                    alert("已經是第一頁")
                    changePage(1, queryManagerList);
                } else {

                    //回到當前頁面的上一筆
                    changePage(pageNumber - 1, queryManagerList);
                }
            });

            nextPageBtn.addEventListener('click', (e) => {
                e.preventDefault()
                if (pageNumber >= btn.length) {
                    alert("已經是最後一頁")
                    changePage(pageNumber, queryManagerList);
                } else {
                    //回到當前頁面的下一筆
                    changePage(pageNumber + 1, queryManagerList);
                }
            });

        },
        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    })
}
///顯示 指定問卷
function findByCaption(caption) {
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
            let { queryManager, queryAddList } = response
            window.location.href = "Revisebackstage/Revisebackstage.html"
            // alert(message)
            // let qusList = { caption: queryManager.caption, content: queryManager.content, startDate: queryManager.startDate, endDate: queryManager.endDate }
            sessionStorage.setItem('questionnaireInfo', JSON.stringify(queryManager))
            sessionStorage.setItem('questionList', JSON.stringify(queryAddList))
            sessionStorage.setItem('title', (queryManager.caption))
            sessionStorage.setItem('content', (queryManager.content))
            // sessionStorage.setItem('questionList', JSON.stringify(queryAddList))

        },
        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    })
}

///-----刪除問卷-----///
function deleteCaption(caption) {
    let objPostData = {
        caption: caption
    }
    $.ajax({
        url: "http://localhost:8080/api/deleteCaption",
        method: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(objPostData),
        success: function (response) {
            let { message } = response
            alert('刪除成功')
            window.location.reload();
        },
        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    })
}


///-----修改問卷-----///
function reviseQuestions(caption, question, newQuestion, opt, newOpt, selectedOption, required) {
    let objPostData = {
        caption: caption,
        question: question,
        new_question: newQuestion,
        opt: opt,
        new_opt: newOpt,
        selectedOption: selectedOption,
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


///-----刪除題目-----///
function deleteQuestion(caption, question) {
    let objPostData = {
        caption: caption,
        question: question
    }
    $.ajax({
        url: "http://localhost:8080/api/deleteQuestion",
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

///-----搜尋-----///
function findByCaptionContaining(caption, startDate, endDate) {
    let suppage = '';
    let nextpage = '';
    suppage = '<button id="sup-page2" class="page-btn">上一頁</button>&nbsp;&nbsp;&nbsp;';
    nextpage = '&nbsp;&nbsp;&nbsp;<button id="next-page2" class="page-btn">下一頁</button>';

    let objPostData = {
        caption: caption,
        start_date: startDate,
        end_date: endDate
    }
    $.ajax({
        url: "http://localhost:8080/api/findByCaptionContaining",
        method: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(objPostData),
        success: function (response) {
            let { message, queryManagerList } = response
            if (message === "開始日期不得大於結束日期!") {
                alert(message)
            }

            changePage(1, queryManagerList);

            var page = document.querySelector('.page_btn'); //要塞按鈕的位置

            var btnNum = Math.ceil(queryManagerList.length / 10); //算出每頁要顯示10筆資料所需要的按鈕
            console.log(btnNum + "btnNum")

            var str = '';
            // //看要幾個按鈕，塞進span並且顯示在heml元素的容器
            for (var i = 0; i < btnNum; i++) {
                str += `<a href="#"><span>${(i + 1)}</span></a>`
            };

            // //塞進html元素中的容器
            page.innerHTML = suppage + str + nextpage;

            // //使用 querySelectorAll 選出下面所有的按鈕
            var btn = document.querySelectorAll('.page_btn span')

            // //選取到了每顆按鈕後，我們分別去做綁定監聽的動作
            for (var i = 0; i < btn.length; i++) {
                btn[i].addEventListener('click', changePage.bind(this, (i + 1), queryManagerList))
            }

            // //監聽上一頁、下一頁
            const nextPageBtn = document.querySelector('#next-page2');
            const supPageBtn = document.querySelector('#sup-page2');
            supPageBtn.addEventListener('click', (e) => {
                e.preventDefault()
                if (pageNumber <= 1) {
                    alert("已經是第一頁")
                    changePage(1, queryManagerList);
                } else {

                    //回到當前頁面的上一筆
                    changePage(pageNumber - 1, queryManagerList);
                }
            });

            nextPageBtn.addEventListener('click', (e) => {
                e.preventDefault()
                if (pageNumber >= btn.length) {
                    alert("已經是最後一頁")
                    changePage(pageNumber, queryManagerList);
                } else {
                    //回到當前頁面的下一筆
                    changePage(pageNumber + 1, queryManagerList);
                }
            });
        },
        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    })
}
//-----------------------------------------------------------------------------------
///-----問卷回饋-----///
function showUserInfoByCaption(caption) {
    let suppage = '';
    let nextpage = '';
    suppage = '<button id="sup-page2" class="page-btn">上一頁</button>&nbsp;&nbsp;&nbsp;';
    nextpage = '&nbsp;&nbsp;&nbsp;<button id="next-page2" class="page-btn">下一頁</button>';
    let objPostData = {
        caption: caption
    }

    $.ajax({
        url: "http://localhost:8080/api/showUserInfoByCaption",
        method: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(objPostData),
        success: function (response) {
            let { message, queryDepositList, queryAddList } = response
            sessionStorage.setItem('qaListVo', JSON.stringify(queryDepositList))
            sessionStorage.setItem('queryAddList', JSON.stringify(queryAddList))
            // alert(message)
            // console.log(queryDepositList.length + "長度")

            // $('#tab3feedBack').append(`<thead>
            //         <tr>
            //             <th>#</th>
            //             <th>姓名</th>
            //             <th>填寫時間</th>
            //             <th>觀看細節</th>
            //         </tr>
            //         </thead>`)

            $.each(queryDepositList, function (index, value) {
                let i = 1;
                $('#tab3feedBack').append(`<thead>
                    <tr>
                        <td>${0}</td>
                        <td>姓名</td>
                        <td>填寫時間</td>
                        <td>觀看細節</td>
                    </tr>
                    </thead>`)
                i++;
            })

            changePageForProple(1, queryDepositList);

            var page = document.querySelector('.page_btnForPeople'); //要塞按鈕的位置

            var btnNum = Math.ceil(queryDepositList.length / 10); //算出每頁要顯示10筆資料所需要的按鈕
            console.log(btnNum + "btnNum")

            var str = '';
            // //看要幾個按鈕，塞進span並且顯示在heml元素的容器
            for (var i = 0; i < btnNum; i++) {
                str += `<a href="#"><span>${(i + 1)}</span></a>`
            };

            // //塞進html元素中的容器
            page.innerHTML = suppage + str + nextpage;

            // //使用 querySelectorAll 選出下面所有的按鈕
            var btn = document.querySelectorAll('.page_btnForPeople span')

            // //選取到了每顆按鈕後，我們分別去做綁定監聽的動作
            for (var i = 0; i < btn.length; i++) {
                btn[i].addEventListener('click', changePageForProple.bind(this, (i + 1), queryDepositList))
            }

            // //監聽上一頁、下一頁
            const nextPageBtn = document.querySelector('#next-page2');
            const supPageBtn = document.querySelector('#sup-page2');
            supPageBtn.addEventListener('click', (e) => {
                e.preventDefault()
                if (pageNumber <= 1) {
                    alert("已經是第一頁")
                    changePageForProple(1, queryDepositList);
                } else {

                    //回到當前頁面的上一筆
                    changePageForProple(pageNumber - 1, queryDepositList);
                }
            });

            nextPageBtn.addEventListener('click', (e) => {
                e.preventDefault()
                if (pageNumber >= btn.length) {
                    alert("已經是最後一頁")
                    changePageForProple(pageNumber, queryDepositList);
                } else {
                    //回到當前頁面的下一筆
                    changePageForProple(pageNumber + 1, queryDepositList);
                }
            });
        },
        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    })
}

function changePage(page, size) {
    //全域變數:用於得知當前頁數
    pageNumber = page;
    console.log(pageNumber + "頁")

    //代表每頁出現 10 筆資料
    var items = 10;

    //按鈕按下 1，會出現 1～10筆資料，但陣列索引值卻是 0～9 的資料，以此類推
    var pageIndexStart = (page - 1) * items
    var pageIndexEnd = page * items

    //每次近來這function先清空
    $('#table1').empty()
    $('#table1').append(`<th><th>#</th><th>問卷</th><th>狀態</th><th>開始時間</th><th>結束時間</th><th>觀看統計</th></th>`);
    //索引1-10資料
    for (var i = pageIndexStart; i < pageIndexEnd; i++) {
        if (i >= size.length) { break; }
        let num = i + 1;
        //解構，看第幾筆資料
        let item = size[i]
        let startTime = (item.startDate.substring(0, 10));
        let endTime = (item.endDate.substring(0, 10));
        let time = new Date();
        let status = ""
        if (time < new Date(item.startDate) || time > new Date(item.endDate)) {
            status = '未開放'
        } else {
            status = '開放'
        }
        openOrClosure = "";


        $('#table1').append(`<tbody id="myTbody"><tr><td><input type="checkbox" name="check1" id="ckb_${item.caption}_${item.content}"></td><td>${num}</td><td><button id="hrefQues_${item.caption}" class="test123456">${item.caption}</button></td><td>${status}</td><td>${startTime}</td><td>${endTime}</td>><td><input type="button" value="前往" id="countBnt_${item.caption}"></td></tr></tbody>`);
        // x++;
    }
};
//-----------------------------------
function changePageForProple(page, data) {
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
        $('#tab3feedBack').append(`<tr><td>${num}</td><td>${item.name}</td/><td>${time}</td/><td><button id="GotofeedbackBtn_${item.mail}_${item.finishTime}">前往</button></td></tr>`)
    }
};


function countByAns2(caption) {
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

            window.location.href = "Revisebackstage/Revisebackstage.html"

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


            let num = 0
            statistics.forEach(function (value, index) {
                num++
                $('#tab4statistics').append(`<h2 style="color:red;">${index} </h2>`)
                $('#tab4statistics').append(`<canvas id="myChart_${num}"></canvas> 
                <br>
                <hr>
                <br>`)

                let numList = []
                let numList2 = []
                // numList.push(item.answer)
                // numList2.push(item.percentage)
                value.forEach(function (value2, key) {
                    numList.push(key)
                    numList2.push(value2)
                })

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