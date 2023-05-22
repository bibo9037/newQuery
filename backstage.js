////////////首頁搜尋////////////

$('#searchQusBackstage').on('click', function (e) {
    e.preventDefault()

    let caption = $('#queTitleBackstage').val()
    let startDate = $('#startDateSearcah').val()
    let endDate = $('#endDateSearch').val()
    findByCaptionContaining(caption, startDate, endDate)

})

////////////刪除問卷////////////

$(document).on('click', 'button[id*=deleteHomePage]', function (e) {

    $('input[id*=ckb]:checked').each(function () {
        if ($(this).prop('checked') == true) {
            deleteCaption($(this).prop('id').split('_')[1])
        }
    })
}) 