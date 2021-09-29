let rowHtml = `<tr>
                    <td>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="randomId">
                            <label class="custom-control-label" for="randomId"></label>
                        </div>
                    </td>

                    <td></td> 

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

    $('#fetchedDataTable').dataTable().fnClearTable();
    $('#fetchedDataTable').dataTable().fnDestroy();
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
                            return `<div class="custom-control custom-checkbox">
                                                <input type="checkbox" name="modal-check" class="custom-control-input checked-buttons" data-id=${data} id="tableCheck${data}">
                                                <label class="custom-control-label" for="tableCheck${data}"> ${data}</label>
                                            </div>`;
                        },
                    },
                    { 'data': 'title' },
                ]
            })
        },
        complete: function () {
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
    checkedValues = [];
    $(document).on('change', '.checked-buttons', function () {
        if ($('.checked-buttons:checked').length > 3) {
            this.checked = false;
            return false
        }
        if ($(this).is(':checked')) {
            let id = $(this).data('id');
            var foundValue = checkedValues.filter(obj => obj.id === id);
            if (!foundValue.length) {
                let obj = {
                    id: $(this).data('id'),
                    title: $(this).closest('td').next().text()
                }
                checkedValues.push(obj);
            }
        } else {
            let id = $(this).data('id');
            var foundValue = checkedValues.filter(obj => obj.id === id);
            if (foundValue.length) {
                let index = checkedValues.findIndex(x => x.id === id);
                checkedValues.splice(index, 1)
            }
        }
    });

    $(document).on('click', '#modal-add-btn', function () {
        $("#nicCodeModal").modal("hide");
        let html = '';
        $.each(checkedValues, function (inx, val) {
            html += ` <div class="form-check form-check-inline custom-radio-check modal-radio-btns">
                                <input class="form-check-input" type="radio" name="selectedRadioOption" id="inlineRadio7${val.id}"
                                value="${val.id}" data-label="${val.title}">
                                <label class="form-check-label" for="inlineRadio7${val.id}">${val.id}, 
                                    <div class="selected-modal-values">
                                    ${val.title}
                                    </div>
                                </label>
                                <span class="remove-selected-values" ${val.id} onClick="removeDiv(this)">X</span>
                            </div> `
        })
        $('#selectedCheckboxesValue').html(html);
        checkedValues = [];
    })

    $(document).on('click', '[name="selectedRadioOption"]', function () {
        $('#searchField2').val($(this).val())
        $('#searchField3').val($(this).data('label'))
    })
})

function removeDiv(elem) {
    $(elem).parent('div').remove();
}

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