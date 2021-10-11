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
    $(".exampleFormControlSelect1").selectmenu().selectmenu("menuWidget");


    $("#searchIcon").click(() => {
        $("#nicCodeModal").modal("show");
        let searchKey = $('#searchField1').val();
        ajaxCall(searchKey);
    });
    $("#searchField1").keypress(function (e) {
        if (e.keyCode == 13) {
            $("#nicCodeModal").modal("show");
            let searchKey = e.target.value;
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
                bPaginate: false,
                searchHighlight: true,
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
            $.each($('#fetchedDataTable tbody tr td:first-child input[type="checkbox"]'), function () {
                const checkboxId = $(this).data('id');
                var foundValue = checkedValues.filter(obj => obj.id === checkboxId);
                if (foundValue.length) {
                    $(this).trigger('click');
                }
            })
            if (!checkedValues.length) {
                $('#modal-add-btn').attr('disabled', true);
            }
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
        if (checkedValues.length >= 3) {
            this.checked = false;
            let id = $(this).data('id');
            var foundValue = checkedValues.filter(obj => obj.id === id);
            if (foundValue.length) {
                let index = checkedValues.findIndex(x => x.id === id);
                checkedValues.splice(index, 1)
            }
            return false
        }
        if ($(this).is(':checked')) {
            let id = $(this).data('id');
            $('#modal-add-btn').removeAttr('disabled');
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
        if (checkedValues.length) {
            $('#modal-add-btn').removeAttr('disabled');
        } else {
            $('#modal-add-btn').attr('disabled', true);
        }
    });

    $(document).on('click', '#modal-add-btn', function () {
        $("#nicCodeModal").modal("hide");
        let html = '';
        let searchField2Value = [];
        let searchField3Value = [];
        $.each(checkedValues, function (inx, val) {
            searchField2Value.push(val.id);
            searchField3Value.push(val.title);
            if (checkedValues) {
                $('#info').removeClass('d-none');
            }
            html += ` <div class="form-check form-check-inline custom-radio-check modal-radio-btns p-0" id="checked-radio-values">
                                <input class="form-check-input" type="radio" name="selectedRadioOption" id="inlineRadio7${val.id}"
                                value="${val.id}" data-label="${val.title}" ${(inx === 0) ? 'checked' : ''}>
                                <label class="form-check-label p-2" for="inlineRadio7${val.id}"><span class="selected-value-id">${val.id}</span>, 
                                    <div class="selected-modal-values d-flex ml-1">
                                            ${val.title}
                                                <span class="remove-selected-values ml-3" ${val.id} onClick="removeDiv(this)">X</span>
                                    </div>
                                </label>
                            </div> `
        })

        searchField2Value = searchField2Value.join(', ');
        searchField3Value = searchField3Value.join(', ');
        $('#searchField2').val(searchField2Value);
        $('#searchField3').val(searchField3Value);
        $('#selectedCheckboxesValue').html(html);
        if (checkedValues.length == '3') {
            $('#searchField1,#searchIcon').attr('disabled', true);
            $('#searchIcon').addClass('event-none');
        } else {
            $('#searchField1,#searchIcon').attr('disabled', false);
            $('#searchIcon').removeClass('event-none');
        }
        $("#searchField1").val('');
    })

    $(document).on('click', '[name="selectedRadioOption"]', function () {
        let id = $(this).val();
        $.each(checkedValues, function (inx, data) {
            if (data.id == id) {
                checkedValues.splice(inx, 1);
                checkedValues.unshift(data);
            }
        });

        let searchField2Value = [];
        let searchField3Value = [];
        $.each(checkedValues, function (inx, val) {
            searchField2Value.push(val.id);
            searchField3Value.push(val.title);
        });
        searchField2Value = searchField2Value.join(', ');
        searchField3Value = searchField3Value.join(', ');
        $('#searchField2').val(searchField2Value);
        $('#searchField3').val(searchField3Value);
    })
})

function removeDiv(elem) {
    const dataId = $(elem).closest('.custom-radio-check').find('input[type="radio"]').val();
    const isChecked = $(elem).closest('.custom-radio-check').find('input[type="radio"]').is(':checked');
    var foundId = checkedValues.filter(obj => obj.id == dataId);
    if (foundId.length) {
        let index = checkedValues.findIndex(x => x.id == dataId);
        checkedValues.splice(index, 1)
    }
    if (isChecked) {
        $('#searchField2').val('');
        $('#searchField3').val('');
    }
    if (checkedValues.length == '3') {
        $('#searchField1,#searchIcon').attr('disabled', true);
        $('#searchIcon').addClass('event-none');
    } else {
        $('#searchField1,#searchIcon').attr('disabled', false);
        $('#searchIcon').removeClass('event-none');
    }
    $(elem).closest('.custom-radio-check').remove();
    if (!$('#checked-radio-values').length) {
        $('#info').addClass('d-none');
    }
    let searchField2Value = [];
    let searchField3Value = [];
    $.each(checkedValues, function (inx, val) {
        searchField2Value.push(val.id);
        searchField3Value.push(val.title);
    });
    searchField2Value = searchField2Value.join(', ');
    searchField3Value = searchField3Value.join(', ');
    $('#searchField2').val(searchField2Value);
    $('#searchField3').val(searchField3Value);

    var html = '';
    $.each(checkedValues, function (inx, val) {
        if (checkedValues) {
            $('#info').removeClass('d-none');
        }
        html += ` <div class="form-check form-check-inline custom-radio-check modal-radio-btns p-0">
                                <input class="form-check-input" type="radio" name="selectedRadioOption" id="inlineRadio7${val.id}"
                                value="${val.id}" data-label="${val.title}" ${(inx === 0) ? 'checked' : ''}>
                                <label class="form-check-label p-2" for="inlineRadio7${val.id}"><span class="selected-value-id">${val.id}</span>, 
                                    <div class="selected-modal-values d-flex ml-1">
                                        ${val.title}
                                            <span class="remove-selected-values ml-3" ${val.id} onClick="removeDiv(this)">X</span>
                                    </div>
                                </label>
                            </div> `
    })
    $('#selectedCheckboxesValue').html(html);
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