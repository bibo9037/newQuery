///-----顯示所有問卷標題-----///
$(document).ready(function () {

    showAllCaption()
    sessionStorage.removeItem('questionList')
    sessionStorage.removeItem('questionnaireInfo')
    sessionStorage.removeItem('readQuesId')
    // sessionStorage.removeItem('index')
})

///-----前往統計按鈕-----///
$(document).on('click', 'input[id*=countBnt_]', function (e) {
    e.preventDefault()
    let goToTheStatistics = $(this).prop('id').split('_')[1]
    alert(goToTheStatistics)
    console.log(goToTheStatistics);
    sessionStorage.setItem('readQuesId', goToTheStatistics)
    countByAns2(goToTheStatistics)
    // showUserInfoByCaption(goToTheStatistics)
    // window.location.href = "/Revisebackstage/Revisebackstage.html#tab-4"
    alert("跳轉成功")
})