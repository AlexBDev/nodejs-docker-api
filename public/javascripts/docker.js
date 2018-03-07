const apiBaseUri = 'http://localhost:3000';
let xhr = null;


const actionContainerStop = (ev) => {
    let element = $(ev.currentTarget);
    let id = element.data('id');

    if (xhr !== null) {
        xhr.abort();
    }

    xhr = $.get(apiBaseUri+'/containers/stop/'+id)
        .done(response => {
            if (response.hasOwnProperty('success') && response.success) {
                element.parents('.container-attr').remove();

                return;
            }

            alert('Unable to stop container "'+id+'"');
        });
};

const formatLog = (content) => {
    return '<ul class="list-unstyled">'+content.split(/\n/).map((value) => {
        return '<li>'+value.substr(8, value.length - 1)+'</li>';
    }).join('')+'</ul>';
};

const actionContainerLogs = (ev) => {
    let id = $(ev.currentTarget).data('id');

    if (xhr !== null) {
        xhr.abort();
    }

    xhr = $.get(apiBaseUri+'/containers/logs/'+id)
        .done(response => {
            let $modal = $('#container-logs.modal');

            $modal.find('.modal-title').text(id);
            $modal.find('.modal-body').html(formatLog(response));
        });
};

const actionContainerRemove = (ev) => {
    let $element = $(ev.currentTarget);
    let id = $element.data('id');

    if (xhr !== null) {
        xhr.abort();
    }

    xhr = $.ajax({
            url: apiBaseUri+'/containers/remove/'+id,
            method: 'DELETE'
        })
        .done(response => {
            $element.parents('.container-attr').remove();
        });
};

$(() => {
    $('.container-action.action-stop').on('click', (ev) => {
        actionContainerStop(ev);
    });

    $('.container-action.action-logs').on('click', (ev) => {
        actionContainerLogs(ev);
    });

    $('.container-action.action-remove').on('click', (ev) => {
        actionContainerRemove(ev);
    });
});