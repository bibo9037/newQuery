let quesId = sessionStorage.getItem('readQuesId')
// readQaByQuestionnaireTitle(quesId)
let queryAddList = JSON.parse(sessionStorage.getItem('questionList'))//問題、選秀
let queryManager = JSON.parse(sessionStorage.getItem('questionnaireInfo'))//問卷
let title = sessionStorage.getItem('title')
let content = sessionStorage.getItem('content')


// let qaList = sessionFileList

$(document).ready(function () {



    if (queryManager !== null) {
        countByAns(queryManager.caption)
        $('#queName').val(queryManager.caption)
        $('#textName').val(queryManager.content)
        $('#strDate').val(queryManager.startDate.substring(0, 10));
        $('#endDate').val(queryManager.endDate.substring(0, 10));
    }


    $.each(queryAddList, function (index, value) {
        $('#epName').val(value.question)
        // $('#textName').val(item.)
        if (value.selectedOption == true) {
            sel = '多選'
        } else {
            sel = '單選'
        }

        if (value.required == true) {
            nes = '必填'
        } else {
            nes = '非必填'
        }
        $('#question-list').append(`<tr id="tableRow_${value.question}_${value.caption}"><td><input type="checkbox" name="check1" id="checkboxQusUpdate_${value.question}_${value.caption}"></td<td></td><td id="td1"> ${value.question}  </td><td id="td2"> ${sel} </td><td id="td3"> ${nes} </td><td id="td4"><button id="updateButton_${value.question}_${value.caption}">編輯</button></td></tr>`);


    })

    // console.log(queryManager.startDate);
    showUserInfoByCaption(title);

})

$('#changeIntCreate').on('click', function (e) {

    let queName = $('#queName').val();
    let textName = $('#textName').val();
    let strDate = $('#strDate').val();
    let endDate = $('#endDate').val();
    sessionStorage.setItem('queSessionFile1', JSON.stringify({
        title: queName,
        description: textName,
        startTime: strDate,
        endTime: endDate
    })

    )
    //===修改問卷
    reviseCaption(title, queName, content, textName, strDate, endDate)
    sessionStorage.setItem('newTitle', queName)//拿到新的問卷名稱ps.主key1

})


$(document).on('click', 'button[id*=updateButton_]', function (e) {
    e.preventDefault()
    let selQuestion = $(this).prop('id').split('_')[1]
    alert(selQuestion)
    sessionStorage.setItem('question', selQuestion)//拿到舊的問題ps.主key2

    let indexNum = $(this).parent('td').parent('tr').index() - 1
    sessionStorage.setItem('index1', indexNum)

    let updateQes = queryAddList[indexNum]


    console.log(indexNum);
    $('#tab2Question').val(updateQes.question);

    if (updateQes.selectedOption) {
        $('#sel11').val('true')
    } else {
        $('#sel11').val('false')
    }


    if (updateQes.required) {
        $("#check123").prop("checked", true)
    } else {
        $("#check123").prop("checked", false)
    }
    $('#epNameOptions').val(updateQes.opt);


    // 將create鈕外觀改成update 新增href屬性 值為被點選的Id
    $('#intRevise').show();
    $('#intCreateBtn2').hide();

})


///-----編輯按鈕-----///
$('#intRevise').on('click', function (e) {
    e.preventDefault()
    let newTitle = sessionStorage.getItem('newTitle')
    let question = sessionStorage.getItem('question')
    alert(newTitle + "新問卷")
    alert(question + "舊問題")
    indexNum = sessionStorage.getItem('index1')

    queryAddList[indexNum].question = $('#tab2Question').val();
    queryAddList[indexNum].opt = $('#epNameOptions').val();
    if ($('#sel11').val() === 'true') {
        queryAddList[indexNum].selectedOption = true
    } else {
        queryAddList[indexNum].selectedOption = false
    }

    if ($("#check123").is(":checked")) {
        queryAddList[indexNum].required = true
    } else {
        queryAddList[indexNum].required = false
    }


    console.log(queryAddList);
    $('#question-list').empty()
    let sel1 = ''
    let nes1 = ''

    $('#question-list').append(`
        <thead>
                    <tr>
                        <th>&nbsp;</th>
                        <th>問題</th>
                        <th>種類</th>
                        <th>必填</th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    `)
    for (let item of queryAddList) {

        if (item.selectedOption === true) {
            sel1 = '多選'
        } else {
            sel1 = '單選'
        }

        if (item.required) {
            nes1 = '必填'
        } else {
            nes1 = '非必填'
        }
        //修改問題、選向
        // update_s_list(sId, qaList[indexNum].questions, oneOrManyString, qaList[indexNum].necessary, qaList[indexNum].ans);
        //--
        $('#question-list').append(`<tr id="tableRow_${item.question}"><td><input type="checkbox" name="check1" id="checkboxQus__${item.question}_${item.caption}"></td<td></td><td id="td1"> ${item.question}  </td><td id="td2"> ${sel1} </td><td id="td3"> ${nes1} </td><td id="td4"><button id="updateButton_${item.question}">編輯</button></td></tr>`);
    }
    // alert(queryAddList[indexNum].selectedOption + "?")
    $('#intRevise').hide();
    $('#intCreateBtn2').show();
    sessionStorage.removeItem('index')
    reviseQuestions(newTitle, question, queryAddList[indexNum].question, queryAddList[indexNum].opt, queryAddList[indexNum].selectedOption, queryAddList[indexNum].required)
    sessionStorage.setItem('questionList', JSON.stringify(queryAddList))
    // cleanString()
})


///-----新增按鈕-----///
$('#changeIntCreate2').on('click', function (e) {

    e.preventDefault();
    let newTitle = sessionStorage.getItem('newTitle')
    let questions = $('#tab2Question').val();
    let selectedOption = false
    let required11 = false
    if ($('#sel11').val() === 'true') {
        selectedOption = true
    } else {
        selectedOption = false
    }
    if (required11 = $("#check123").is(":checked")) {
        required11 = true
    } else {
        required11 = false
    }
    let options = $('#epNameOptions').val();
    let checkQuestion = queryAddList.map(x => x.questions).indexOf(questions)

    // console.log(checkQuestion)
    if (checkQuestion != -1) {
        alert('問題名稱重複123456')
        return false
    }
    queryAddList.push({ question: questions, opt: options, selectedOption: selectedOption, required: required11 });
    // 將問題存入 Session  
    sessionStorage.setItem('questionList', JSON.stringify(queryAddList))
    // console.log(sessionFileList)
    let sel = '';
    let nes = '';
    if (selectedOption === true) {
        sel = '多選'
    } else {
        sel = '單選'
    }

    if (required11) {
        nes = '必填'
    } else {
        nes = '非必填'
    }

    $('#question-list').append(`<tr id="tableRow_${questions}"><td><input type="checkbox" name="check1" id="checkboxQus_${newTitle}_${questions}"></td<td></td><td id="td1"> ${questions}  </td><td id="td2"> ${sel} </td><td id="td3"> ${nes} </td><td id="td4"><button id="btnChange1_${questions}">編輯</button></td></tr>`);

    creatQuestion(newTitle, questions, options, selectedOption, required11);
})

$('#deleteQusBtn').on('click', function (e) {
    e.preventDefault()

    let delIds = []
    $('[id*=checkboxQus]:checked').each(function () {
        if ($(this).prop('checked') == true) {
            let captionId = $(this).prop('id').split('_')[1];
            let questionId = $(this).prop('id').split('_')[2];
            delIds.push({ caption: captionId, question: questionId });
        }
    })
    for (let item of delIds) {
        deleteQuestion(item.question, item.caption)

    }
    sessionStorage.setItem('qaList', JSON.stringify(queryAddList));
    console.log(delIds);
    console.log(queryAddList);
})


///-----確認修改按鈕-----///
$('#changeIntCreate3').on('click', function (e) {

    e.preventDefault()

    // let sessionData = JSON.parse(sessionStorage.getItem('queSessionFile1'));
    let qaList2 = JSON.parse(sessionStorage.getItem('questionList'))

    let newQuestion = $('#tab2Question').val();
    let newOpt = $('#epNameOptions').val();
    if ($('#sel11').val() === 'true') {
        queryAddList[indexNum].selectedOption = true
    } else {
        queryAddList[indexNum].selectedOption = false
    }

    if ($("#check123").is(":checked")) {
        queryAddList[indexNum].required = true
    } else {
        queryAddList[indexNum].required = false
    }


    // reviseCaption(title, newCaption, content, newContent, question)
    // reviseQuestions(caption, queryAddList.question, newQuestion, queryManager.opt, newOpt, selectedOption, required)
    alert("修改成功");
})

///-----點擊到問卷回饋(指定作答者填寫的內容)-----///
// $(document).on('click', 'button[id*=GotofeedbackBtn_]', function (e) {
//     $('#testtesttt').hide()
//     $('#userInfo').show()
//     $('#topic1').empty()
//     $.each(qaList, function (index, value) {
//         let num = index + 1
//         $('#topic1').append(`<p>${num}. ${value.question}</p>`)
//         let allAns = value.ans.split(';')
//         for (let item of allAns) {
//             $('#topic1').append(`<input type="checkbox" disabled id="${value.question}_${item}"><label>${item} </label>`)

//             console.log(item);
//         }

//     })
//     $('#topic1').append(`<br><br><button id="backFeedbackBtn">返回</button>`)
//     let usersId = $(this).prop('id').split('_')[1]
//     showUserInfoByCaption(title)


//     $('#backFeedbackBtn').on('click', function (e) {
//         e.preventDefault()
//         $('#userInfo').hide()
//         $('#testtesttt').show()
//         console.log('222');

//     })
// })

$(document).on('click', 'button[id*=GotofeedbackBtn_]', function (e) {
    $('#testtesttt').hide()
    $('#userInfo').show()
    $('#topic1').empty()
    let queryDepositList = JSON.parse(sessionStorage.getItem('qaListVo'))
    let mail = $(this).prop('id').split('_')[1]
    let finishTime = $(this).prop('id').split('_')[2]
    let list = []
    let list2 = []
    for (let item of queryDepositList) {
        if (item.mail === mail && item.finishTime === finishTime) {
            list.push({ name: item.name, phone: item.phone, mail: item.mail, age: item.age, finishTime: item.finishTime, question: item.question, answer: item.ans })
        }
    }
    for (let item of list) {
        let finishTime = (item.finishTime).replace('T', '  ')
        $('#userName').val(item.name)
        $('#userPhone').val(item.phone)
        $('#userEmail').val(item.mail)
        $('#userAge').val(item.age)
        $('#userFinish').val(finishTime)
        // $('#topic1').append(`${item.question}`)
        // $('#topic1').append(`<br></br>`)
        // $('#topic1').append(`${item.answer}`)
        // $('#topic1').append(`<br></br>`)
    }
    let nochooseList = JSON.parse(sessionStorage.getItem('queryAddList'))
    for (let item of nochooseList) {
        $('#topic1').append(`${item.question}`)
        manyAns = item.opt.split(';')
        $('#topic1').append(`<br></br>`)
        // $('#topic1').append(`${manyAns}`)
        list2.push(manyAns)
        for (let item2 of manyAns) {// 問卷題目
            for (let item3 of list) {
                if (item2 === item3.answer) { //比對相同答案
                    //答案打勾
                    $('#topic1').append('<input type="checkbox" checked disabled></input>')
                    $('#topic1').append(`${item2}`)
                    $('#topic1').append(`<br></br>`)
                } else {    // 非答案不打勾
                    $('#topic1').append('<input type="checkbox" disabled></input>')
                    $('#topic1').append(`${item2}`)
                    $('#topic1').append(`<br></br>`)
                }
            }
            // $('#topic1').append(`${item2}`)
            // $('#topic1').append(`<br></br>`)
        }
    }

    $('#topic1').append(`<br><br><button id="backFeedbackBtn">返回</button>`)

    // findUserByCaption(title)


    $('#backFeedbackBtn').on('click', function (e) {
        e.preventDefault()
        $('#userInfo').hide()
        $('#testtesttt').show()
        console.log('222');

    })


})





