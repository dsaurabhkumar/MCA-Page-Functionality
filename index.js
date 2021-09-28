let rowHtml = `<tr>
                    <td>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="randomId">
                            <label class="custom-control-label" for="randomId"></label>
                        </div>
                    </td> 
                    <td>
                        
                    </td> 
                    <td>
                    <div class="form-group">
                                <input type="text" class="form-control" 
                                    placeholder="Enter here">
                            </div>
                    </td> 
                    <td>
                    <div class="form-group">
                                <input type="text" class="form-control" 
                                    placeholder="Enter here">
                            </div>
                    </td> 
                    <td>
                    <div class="form-group">
                                <input type="text" class="form-control" 
                                    placeholder="Enter here">
                            </div>
                    </td> 
                    <td>
                    <div class="form-group">
                                <input type="text" class="form-control" 
                                    placeholder="Enter here">
                            </div>
                    </td>
            </tr>`;

$(function () {
    $("#addRows").click(function () {
        $("#maintable").append(rowHtml);
        resetSrNo("#maintable");
    });
})

$("#deleteRows").on("click", function () {
    $('input:checked').parents("tr").remove();
    resetSrNo("#maintable");
});

function resetSrNo(tableId) {
    $.each($(tableId).find('tbody tr'), function (index, trEL) {
        $(trEL).find('td:eq(1)').text(index + 1);
        let randomId = genRandomStr();
        $(trEL).find('td:eq(0) [type="checkbox"]').attr('id', randomId).siblings('label').attr('for', randomId);
    })

}

function genRandomStr() {
    var str = '';
    var strings = '1234567890';
    for (var i = 0; i < 8; i++) {
        str += strings.charAt(Math.floor(Math.random() * strings.length));
    }
    return str;
}

$(function () {
    $("#speed").selectmenu();
    $("#files").selectmenu();
    $(".exampleFormControlSelect1")
        .selectmenu()
        .selectmenu("menuWidget");



    $("#searchIcon").click(() => {
        $("#nicCodeModal").modal("show");
        let searchKey = event.target.value;
        ajaxCall(searchKey);
    });

    $("#searchField1").keypress(function (e) {
        if (e.keyCode == 13) {
            $("#nicCodeModal").modal("show");
            let searchKey = event.target.value;
            ajaxCall(searchKey);
        }
    });

    

});

function ajaxCall(searchKey) {
    const endpoint = `https://jsonplaceholder.typicode.com/albums`;
    $.ajax({
        url: endpoint,
        type: 'GET',
        success: function (data) {
            $('#fetchedDataTable').dataTable({
                oLanguage: {
                    "sSearch": ""
                },
                data: data,
                columns: [
                    {
                        data: "id",
                        render: function (data, type, row, meta) {
                            return ` <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="tableCheck${data}">
                            <label class="form-check-label" for="tableCheck${data}"> ${data}</label>
                        </div> `;
                        },
                    },
                    { 'data': 'title' },
                ]
            })
            
        },
        complete: function() {
            $('.dataTables_filter input').val(searchKey);
            $('.dataTables_filter input').keyup();
        }
    })
}

$(".datepicker").datepicker({
    dateFormat: 'dd/mm/yy',
    buttonImage: '../assets/calendar.svg',
    buttonImageOnly: true,
    changeMonth: true,
    changeYear: true,
    showOn: 'both',
});

$(function () {
    $('.custom-file-input').each(function () {
        $(this).change(function (e) {
            for (var i = 0; i < this.files.length; i++) {
                var uploadedFile = this.files[i].name;
                var uploadedFileSize = e.target.files[i].size;
                if (uploadedFileSize > 2000000) {
                    $(this).siblings(".showError").show();
                } else {
                    $(this).siblings('.show-uploaded-file').append('<div class="name">' + uploadedFile + '<span class="size">' + uploadedFileSize + '</span>' + '' + 'KB' + '<span class="delete-file">' + 'X' + '</span>' + '</div>');
                    $(this).siblings('.show-uploaded-file').find('.delete-file').click(function () {
                        $(this).parent().remove();
                    })
                }
            }
        });
    })
});



$(document).ready(function () {
   

    $(".search-input-form").scroll(function () {
        var scroll = $('.search-input-form').scrollTop();
        if (scroll >= 10) {
            $(".modal-add-btn").addClass("darkHeader");
        } else {
            $(".modal-add-btn").removeClass("darkHeader");
        }
    });
})